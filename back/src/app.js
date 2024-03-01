import "dotenv/config";

import express from "express";
import routes from "./routes/index.js";
import cors from "cors";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(routes);

app.get("/ping", (req, res) => {
    console.log("ping");

    res.status(200).json({
        message: "Hello from lex",
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        message: "Message from scheduled actions interval function: Something broke",
        error: err,
        stackTrace: err.stack,
    });
});

const server = app.listen(PORT, function () {
    const host = server.address().address === "::" ? "localhost" : server.address().address;
    const port = server.address().port;

    console.log(` Listening at http://${host}:${port}`);
});
