import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { ProductRepository } from "../../repositories/product.repository";
import { StockRepository } from "../../repositories/stock.repository";

export class ProductController extends BaseController {

  repository: ProductRepository;
  stockRepository: StockRepository;

  constructor() {
    super();
    this.repository = new ProductRepository()
    this.stockRepository = new StockRepository()
  }

  /**
   *
   * @param req
   * @param res
   * @returns
   */
  public create = async (req: Request, res: Response) => {

    let body = req.body;
    try {

        // Check stock
        if(body.stock_id) {
          let stock = await this.stockRepository.get(body.stock_id);
          if(!stock) return this.errResponse(res, 'Stock Id not valid');

          body = {
            ...body,
            stocks: [stock]
          }
        }

        let product = await this.repository.create(body);

        //
        return this.okResponse(res,
            "Product successfully created", product);
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

        let paginator = await this.repository.paginate({}, options);

        //
        return this.paginateResponse(res,
            "Products successfully fetched", paginator);
    } 
    catch (error: any) {
      return this.errResponse(res, error.message);
    }
  }
}
