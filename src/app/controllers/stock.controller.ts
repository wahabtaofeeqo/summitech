import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { StockRepository } from "../../repositories/stock.repository";

export class StockController extends BaseController {

  repository: StockRepository;

  constructor() {
    super();
    this.repository = new StockRepository()
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public create = async (req: Request, res: Response) => {

    const body = req.body;
    try {

        // Check stock
        let stock = await this.repository.findOneBy({batch_id: body.batch_id});
        if(stock) return this.errResponse(res, 'Batch already exist');

        stock = await this.repository.create(body);

        //
        return this.okResponse(res,
            "Stock successfully created", stock);
    } 
    catch (error: any) {
      return this.errResponse(res, error.message);
    }
  }
  
   /**
   *
   * @param req
   * @param res
   * @returns
   */
   public fetchAll = async (req: Request, res: Response) => {

    try {

        let options = {
            ...req.query
        };

        let stocks = await this.repository.paginate({}, options, {product: true});

        //
        return this.paginateResponse(res,
            "Stocks successfully fetched", stocks);
    } 
    catch (error: any) {
      return this.errResponse(res, error.message);
    }
  }

}
