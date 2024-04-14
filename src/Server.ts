import appInit from "./App";
import SwaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

appInit().then((app) => {
    if (process.env.NODE_ENV === "development") {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Sce Web Application Backend API",
                    version: "1.0.0",
                    description:
                        "List of all the routes in the backend API...",
                },
                servers: [
                    {
                        url: `http://0.0.0.0:${process.env.PORT}`,
                    },
                ],
            },
            apis: ["./src/routes/*.ts"],
        };
        const specs = swaggerJsDoc(options);
        app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(specs));
    }
        
    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port http://0.0.0.0:${process.env.PORT}!`);
        });
    });