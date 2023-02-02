import { NextFunction, Request, Response } from "express";
import config from "../../config/config";
import jwt from 'jsonwebtoken';
import { HTTP_STATUS } from "../constants/http.status";
import { UserRepository } from "../../repositories/user.repository";

export class AuthMiddleware {

    userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     *
     * @param req
     */
    public getTokenFromRequest(req: Request): string | null {
        let authorization = req.header("Authorization");
        let token = authorization ? authorization.split(" ") : [];
        return token.length ? token[1] : null;
    }

    /**
     *
     * @param req
     * @param userType
     */
    public getAuthUser = async (req: Request, type: any): Promise<object | null> => {
        const token = this.getToken(req);
        return await this.getAuthUserByToken(token, type);
    };

    /**
     *
     * @param token
     * @param userType
     */
    public getAuthUserByToken = async (token: string, userType: string): Promise<object | null > => {
        const user: any = jwt.verify(token, String(config.JWT_SECRET_KEY))
        return user;
    }

  /**
   *
   * @param req
   */
  public getToken = (req: Request): string => {
    const token = this.getTokenFromRequest(req);
    if (!token) throw new Error("Unauthorized");
    return token;
  };

  /**
   *
   * @param userType
   * @returns
   */
  public verifyAuth = (userType : any): any => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
      try {
          let user = await this.getAuthUser(req, userType);
          if (user) {
            res.locals = { user };

          return next();
        }
        else {
          return res.status(HTTP_STATUS.UNAUTHORIZED)
            .json({
                status: false,
                message: 'Unauthorized'
            })
        }
      }
      catch (err: any) {
        return res.status(HTTP_STATUS.UNAUTHORIZED)
            .json({
                status: false,
                message: err.message
            })
      }
  }

}

export default new AuthMiddleware();
