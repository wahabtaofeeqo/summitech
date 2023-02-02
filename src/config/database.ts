import { DataSource } from "typeorm";
import { models } from "../app/models";
import config from "./config";

export const Database = new DataSource({
    type: "mysql",
    host: config.DB_HOST,
    port: config.DB_PORT,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
    entities: models,
    synchronize: config.NODE_ENV == 'dev' ? true : false,
    logging: false,
});