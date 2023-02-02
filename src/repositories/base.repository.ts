import { Repository } from "typeorm";
import { IRepository } from "../app/interfaces/ibase.repository";

export class BaseRepository<T> implements IRepository<T> {
    
    protected repository: Repository<any>;

    constructor(repository: Repository<any>) {
        this.repository = repository;
    }

    delete(id: any): Promise<any> {
        return this.repository.delete(id);
    }

    findBy(clause: any): Promise<any> {
        return this.repository.findBy(clause);
    }

    findOneBy(clause: any): Promise<T> {
        return this.repository.findOneBy(clause);
    }

    find(): Promise<T[]> {
        return this.repository.find()
    }

    get(id: any): Promise<T> {
        return this.repository.findOneBy({id});
    }

    create(input: any): Promise<T> {
        return this.repository.save(input);
    }

    update(id: any, input: any): Promise<any> {
        return this.repository.update(id, input);
    }

    findOne(clause: any): Promise<T> {
        return this.repository.findOneBy(clause);
    }

     /**
     *
     * @param clause
     * @param options
     * @param relations
     * @returns
     */
    async paginate(clause = {}, options: any = {}, relations = {}) {
        //
        const page = options.page || 1;
        const limit = options.limit || 10;
        const offset = page == 1 ? 0 : page * limit;

        // Count Models
        const total = await this.repository.countBy(clause);

        // Get Models
        const data = await this.repository.find({
            where: clause,
            skip: offset,
            relations: relations,
            take: limit,
        });

        //
        return {
            data,
            meta: {
                limit,
                total,
                current_page: page,
                last_page: Math.ceil(total / limit),
            },
        };
    }
}