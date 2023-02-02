import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET: any = process.env.JWT_SECRET_KEY;
export const generateToken = (params: object) => {
    return jwt.sign({ ...params }, SECRET);
}

export const hashPassword = (password: string)  => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
}

export const matchPassword = (password: string, hash: string) => compareSync(password, hash);
