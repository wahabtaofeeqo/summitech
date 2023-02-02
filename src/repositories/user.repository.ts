import { User } from "../app/models/user.model";
import { Database } from "../config/database";
import { BaseRepository } from "./base.repository";

export class UserRepository extends BaseRepository<User> {

    constructor() {
        super(Database.getRepository(User));
    }
}
