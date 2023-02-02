import { Router } from "express";
import { ProductController } from "../app/controllers/product.controller";
import { StockController } from "../app/controllers/stock.controller";
import { AuthMiddleware } from "../app/middleware/auth.middleware";
import { validate } from "../app/middleware/validate.middleware";
import { ProductValidator } from "../app/validators/product.validator";
import { StockValidator } from "../app/validators/stock.validator";

export class StockRouter {

    router: Router;
    private auth: AuthMiddleware;
    private validator: StockValidator
    private controller: StockController;

    constructor() {
        this.router = Router();
        this.auth = new AuthMiddleware();
        this.validator = new StockValidator()
        this.controller = new StockController()

        //
        this.init();
    }

    init() {
        this.router.get('/', this.auth.verifyAuth(''), this.controller.fetchAll);
        this.router.post('/', this.auth.verifyAuth(''),
            validate(this.validator.create), this.controller.create); 
    }
}

export default new StockRouter().router;
