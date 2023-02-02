import express, { Application, Express} from "express";
import AppRoute from "../routes";

export class App {

    express: Application;

    constructor() {
        this.express = express();
        this.middlewares();

        //
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(express.urlencoded({extended: true}))
    }

    routes() {

        // Base route
        this.express.get("/", (req, res) => {
            res.json({
                status: true,
                message: "Welcome 🥂"
            });
        });

        // API routes
        this.express.use("/api/v1", AppRoute);

        // Not found handler
        this.express.use((req, res, next) => {
            let error = new Error('Not Found');
            //@ts-ignore
            error.status = 404;
            next(error);
        })

        // Error Handler
        this.express.use((error, req, res, next) => {
            return res.status(error.status || 500).json({
                status: false,
                message: error.message || 'Internal Server Error',
                error: error
            });
        })
    }
}

export default new App().express;