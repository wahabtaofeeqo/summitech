export interface IRepository<T> {

    get(id: any): Promise<T>;
    create(input: any): Promise<T>;
    update(id: any, input: any): Promise<any>;
    delete(id: any): Promise<any>;
    findBy(clause: any): Promise<any>;
    findOneBy(clause: any): Promise<T>;
}