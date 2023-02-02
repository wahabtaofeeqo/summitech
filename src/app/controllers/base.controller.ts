import { Response } from "express";
import { HTTP_STATUS } from "../constants/http.status";

export class BaseController {

    public index = (req, res) => {
        this.okResponse(res, 'Welcome 🥂!');
    }

    protected okResponse = (res: Response, message: string, data: any = null, status: number = HTTP_STATUS.OK) => {
        res.status(status).json({
            status: true,
            message,
            data
        })
    }

    protected errResponse(res: Response, message: string, error: any = null, status: number = HTTP_STATUS.BAD_REQUEST) {
        res.status(status).json({
            status: false,
            message,
            error
        })
    }

    paginateResponse(res: Response, message: any, paginator: any) {
        res.json({
            status: false,
            message,
            data: paginator.data,
            meta: paginator.meta,
        })
    }
}