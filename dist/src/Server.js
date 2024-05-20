"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const App_1 = __importDefault(require("./App"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
(0, App_1.default)().then((app) => {
    if (process.env.NODE_ENV === "development") {
        const options = {
            definition: {
                openapi: "3.0.0",
                info: {
                    title: "Sce Web Application Backend API",
                    version: "1.0.0",
                    description: "List of all the routes in the backend API...",
                },
                servers: [
                    {
                        url: `http://localhost:${process.env.PORT}`,
                    },
                ],
            },
            apis: ["./src/routes/*.ts"],
        };
        const specs = (0, swagger_jsdoc_1.default)(options);
        app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    app.listen(process.env.PORT, () => {
        console.log(`Second Hand app listening on port http://localhost:${process.env.PORT}!`);
    });
});
//# sourceMappingURL=Server.js.map