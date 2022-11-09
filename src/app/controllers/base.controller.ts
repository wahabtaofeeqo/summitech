import { Response } from "express";
import { HTTP_STATUS } from "../constants/http.status";

export class BaseController {

    public index = (req, res) => {
        this.okResponse(res, 'Welcome 🥂!');
    }

    private okResponse = (res: Response, message: string, data: any = null, status: number = HTTP_STATUS.OK) => {
        res.status(status).json({
            status: true,
            message,
            data
        })
    }

    errResponse(res: Response, message: string, error: any, status: number = HTTP_STATUS.BAD_REQUEST) {
        res.status(status).json({
            status: false,
            message,
            error
        })
    }
}