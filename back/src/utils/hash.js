import { hash, compare } from 'bcrypt'

export const hashPassword = async (password) => {
    return hash(password, 10)
}

export const comparePassword = async (password, hashedPassword) => {
    return compare(password, hashedPassword)
}