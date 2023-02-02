import { randomInt } from "crypto";
import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { HTTP_STATUS } from "../constants/http.status";
import { UserRepository } from "../../repositories/user.repository";
import { generateToken, hashPassword, matchPassword } from "../../utils/common";

export class AuthController extends BaseController {

  repository: UserRepository;

  constructor() {
    super();
    this.repository = new UserRepository()
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public signUp = async (req: Request, res: Response) => {

    const { email } = req.body;
    try {

      // Validate
      let user = await this.repository.findOne({ email });
      if (user)
        return this.errResponse(res, "You already have an account.");
    
      // Create
      user = await this.repository.create({
        ...req.body,
        password: hashPassword(req.body.password)
      });

      //
      return this.okResponse(res,
        "Account successfully created",
        user, HTTP_STATUS.CREATED
      );
    } 
    catch (error: any) {
      return this.errResponse(res, error.message);
    }
  };

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
    try {

      //
      const user = await this.repository.findOne({ email });
      if (!user) return this.errResponse(res, "Email not correct");

      // Password Check
      const matched = matchPassword(password, user.password);
      if (!matched) return this.errResponse(res, "Password not correct");
        
      // Generate token
      const token = generateToken({
        id: user.id,
        email: user.email,
      });

      //
      return this.okResponse(res, "Logged in successfully", {
        token, user,
      });
    } 
    catch (error: any) {
      return this.errResponse(res, error.message);
    }
  };

}
