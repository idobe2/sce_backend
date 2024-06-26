import { Request, Response } from "express";
import User from "../models/user_model";
import Student from "../models/student_model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client();

const register = async (req: Request, res: Response) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).send("missing email or password");
  }

  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).send("user already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email: email,
      password: hashedPassword,
    });

    return res.status(200).send(newUser);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

const generateTokens = (
  userId: string
): { accessToken: string; refreshToken: string } => {
  const accessToken = jwt.sign(
    {
      _id: userId,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRATION,
    }
  );

  const refreshToken = jwt.sign(
    {
      _id: userId,
      salt: Math.random(),
    },
    process.env.REFRESH_TOKEN_SECRET
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const login = async (req: Request, res: Response) => {
  console.log("login");

  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).send("missing email or password");
  }

  try {
    const user = await User.findOne({ email: email });

    if (user == null) {
      return res.status(400).send("invalid email or password");
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(400).send("invalid email or password");
    }

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    console.log("User id:", user._id.toString());

    if (user.tokens == null) {
      user.tokens = [refreshToken];
    } else {
      user.tokens.push(refreshToken);
    }
    await user.save();
    return res.status(200).send({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

const logout = (req: Request, res: Response) => {
  res.status(400).send("logout");
};

const refresh = async (req: Request, res: Response) => {
  //extract token from http header
  console.log("Refresh")
  const authHeader = req.headers['authorization'];
  const refreshTokenOrig = authHeader && authHeader.split(' ')[1];

  if (refreshTokenOrig == null) {
      return res.status(401).send("missing token");
  }

  //verify token
  jwt.verify(refreshTokenOrig, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo: { _id: string }) => {
      if (err) {
          return res.status(403).send("invalid token");
      }

      try {
          const user = await User.findById(userInfo._id);
          if (user == null || user.tokens == null || !user.tokens.includes(refreshTokenOrig)) {
              if (user.tokens != null) {
                  user.tokens = [];
                  await user.save();
              }
              return res.status(403).send("invalid token");
          }

          //generate new access token
          const { accessToken, refreshToken } = generateTokens(user._id.toString());

          //update refresh token in db
          user.tokens = user.tokens.filter(token => token != refreshTokenOrig);
          user.tokens.push(refreshToken);
          await user.save();

          //return new access token & new refresh token
          return res.status(200).send({
              accessToken: accessToken,
              refreshToken: refreshToken
          });
      } catch (error) {
          console.log(error);
          return res.status(400).send(error.message);
      }
  });
}

const googleSignIn = async (req: Request, res: Response) => {
  console.log(req.body);
  try{
      const ticket = await client.verifyIdToken({
      idToken: req.body.credentialResponse,
      audience: req.body.audience
  });
  const payload = ticket.getPayload();
  const email = payload?.email;
  if(email != null){
      let user = await User.findOne({'email': email});
          if(user == null){
              user = await User.create({
                  email: email,
              });
              console.log("User:", user);
          }
          const { accessToken, refreshToken } = generateTokens(user._id.toString());
          if (user.tokens == null){
              user.tokens = [refreshToken];
          }else {
              user.tokens.push(refreshToken);
          }
          console.log("User:", user);
          await user.save();
          let student = await Student.findOne({'_id': user._id});
          if (student == null) {
            student = await Student.create({
              _id: user._id,
              name: payload?.name,
              age: 0,
              image: payload?.picture
            });
          }
        console.log("Student:", student);

          await student.save();
          return res.status(200).send({
              accessToken: accessToken,
              refreshToken: refreshToken,
              email: email,
              _id: user._id,
              image: student.image,
              message: "Login successful",
          });
      }
  }catch (error){
      return res.status(400).send(error.message);
    }
}

const deleteUser = async (req: Request, res: Response) => {
        console.log("Item delete");
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(400).send(err.message);
        }
}

export default {
  register,
  login,
  logout,
  refresh,
  googleSignIn,
  deleteUser
};
