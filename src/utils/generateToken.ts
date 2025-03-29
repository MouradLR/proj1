import Jwt  from "jsonwebtoken";
import {JWTPayload} from "@/utils/types";
import {serialize} from "cookie" ;


// Genereate JWT  Token
export function generateJWT(jwtPayload:JWTPayload) : string{
    const privatekey = process.env.JWT_SECRET as string
    const token = Jwt.sign(jwtPayload,privatekey,{
                expiresIn:'30d'
            });
            return token;
}

// Set Cookie Whit JWT

export function setCookie(jwtPayload:JWTPayload):string{
     const token = generateJWT(jwtPayload);
       const cookie= serialize("jwtToken",token,{
                 httpOnly:true,
                 secure:process.env.NODE_ENV === 'production',
                 sameSite:'strict',
                 path:'/',
                 maxAge:60*60*24*30, // 30 day
     
             });
    return cookie;
           
}