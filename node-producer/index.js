const express = require("express");
const Kafka = require("./provider/Kafka");
const Locals = require("./provider/Locals");
const Api = require("./api/router");

class Server {
    /** start the server */
    static app = express();
    static initServer = () => {
        this.app.listen(Locals.SERVER_PORT, () => {
            console.log("[Sever running on port]", Locals.SERVER_PORT);
        });
        this.initRoute();
    };

    static initRoute = () => {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use("/api", Api.router);
        this.app.use((err, req, res, next) => {
            console.log(err);
            res.status(400).json({ error: err.message });
        });
        this.app.use((req, res, next) => {
            res.status(404).json({ message: "Not found.!" });
        });
    };

    /** Init kafka client */
    static initKafka = () => {
        Kafka.init();
    };
}

/** Initialize server - entry point */
Server.initServer();
Server.initKafka();
