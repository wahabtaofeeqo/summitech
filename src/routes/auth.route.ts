import { Router } from "express";
import { AuthController } from "../app/controllers/auth.controller";
import { validate } from "../app/middleware/validate.middleware";
import { AuthValidator } from "../app/validators/auth.validator";

export class AuthRouter {

    router: Router;
    private validator: AuthValidator;
    private controller: AuthController;

    constructor() {
        this.router = Router();
        this.validator = new AuthValidator();
        this.controller = new AuthController();

        //
        this.init();
    }

    init() {
        this.router.post('/login',
            validate(this.validator.login), this.controller.login);
        this.router.post('/register',
            validate(this.validator.register), this.controller.signUp);
    }
}

export default new AuthRouter().router;
