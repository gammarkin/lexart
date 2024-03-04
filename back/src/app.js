import "dotenv/config";

import express from "express";
import cors from "cors";

import routes from "./routes/index.js";

const PORT = 3001;

const app = express();

app.use(routes);

app.get("/", (_req, res) => { res.status(200).json({ message: "Hello from lex" }) });

app.use((err, _req, res, _next) => {
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
