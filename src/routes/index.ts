import { Router } from "express";
import { BaseController } from "../app/controllers/base.controller";

export class AppRoute {

    router: Router;

    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get("/", new BaseController().index);
    }
}

export default new AppRoute().router;