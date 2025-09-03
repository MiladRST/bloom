import { hash, compare } from "bcryptjs"
import { sign, verify } from "jsonwebtoken"

export const hashPassword = async (password) => {
    const hashedPassword = await hash(password, 12)
    return hashedPassword;
}

export const verifyPassword = async (password , hashedPassword) => {
    const isValid = await compare(password, hashedPassword)
    return isValid;
}

export const generateAccessToken = (data) => {
    const token = sign({...data}, process.env.ACCESS_TOKEN_SECRET_KEY, {
        expiresIn: "24h"
    })
    return token
}

export const verifyAccessToken = (token) => {
    try{
        const tokenPayload = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        return tokenPayload;
    }catch(err) {
        console.log('token is not verified!', err)
        return false
    }    
}

export const generateRefreshToken = (data) => {
     const token = sign({...data}, process.env.REFRESH_TOKEN_SECRET_KEY, {
        expiresIn: "15d"
    })
    return token
}

export const validateEmail = (email) => {
    const pattern = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
    return pattern.test(email)
}

export const validatePhone = (phone) => {
    const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;
    return pattern.test(phone)
}

export const validatePassword = (password) => {
    const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
    return pattern.test(password)
}