import { Router } from "express";
import { ProductController } from "../app/controllers/product.controller";
import { AuthMiddleware } from "../app/middleware/auth.middleware";
import { validate } from "../app/middleware/validate.middleware";
import { ProductValidator } from "../app/validators/product.validator";

export class ProductRouter {

    router: Router;
    private auth: AuthMiddleware;
    private validator: ProductValidator;
    private controller: ProductController;

    constructor() {
        this.router = Router();
        this.auth = new AuthMiddleware();
        this.validator = new ProductValidator();
        this.controller = new ProductController()

        //
        this.init();
    }

    init() {
        this.router.get('/', this.auth.verifyAuth(''), this.controller.fetchAll);
        this.router.post('/', this.auth.verifyAuth(''),
            validate(this.validator.create), this.controller.create);
    }
}

export default new ProductRouter().router;
