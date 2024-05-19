"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const App_1 = __importDefault(require("../App"));
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = __importDefault(require("fs"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("beforeAll");
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("afterAll");
    mongoose_1.default.connection.close();
}));
jest.setTimeout(30000);
describe("Image Tests", () => {
    test("Upload image", () => __awaiter(void 0, void 0, void 0, function* () {
        const imagePath = `${__dirname}/avatar.png`;
        const rs = fs_1.default.existsSync(imagePath);
        if (rs) {
            const response = yield (0, supertest_1.default)(App_1.default)
                .post("/file/file?file=123.jpeg").attach('file', imagePath);
            expect(response.statusCode).toEqual(200);
        }
    }));
});
//# sourceMappingURL=image.test.js.map