import { Stock } from "../app/models/stock.model";
import { Database } from "../config/database";
import { BaseRepository } from "./base.repository";

export class StockRepository extends BaseRepository<Stock> {

    constructor() {
        super(Database.getRepository(Stock));
    }
}
