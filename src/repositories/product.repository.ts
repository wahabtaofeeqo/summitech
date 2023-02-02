import { Product } from "../app/models/product.model";
import { Database } from "../config/database";
import { BaseRepository } from "./base.repository";

export class ProductRepository extends BaseRepository<Product> {

    constructor() {
        super(Database.getRepository(Product));
    }
}
