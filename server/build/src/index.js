"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 8080;
// define a route handler for the default home page
app.get("/", function (_, res) {
    res.send("Hello world!");
});
// start the Express server
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
