import { Router } from "express";
import { BaseController } from "../app/controllers/base.controller";
import AuthRouter  from "./auth.route";
import ProductRouter from "./product.route";
import StockRouter from "./stock.route";

export class AppRoute {

    router: Router;
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get("/", new BaseController().index);
        this.router.use("/auth", AuthRouter);
        this.router.use("/stocks", StockRouter);
        this.router.use("/products", ProductRouter);
        
    }
}

export default new AppRoute().router;