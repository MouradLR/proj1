import jwt from "jsonwebtoken";
import {NextRequest} from "next/server";
import {JWTPayload} from "@/utils/types";

// Verify token for api end point
export function verifyToken(request:NextRequest) :JWTPayload | null{
    try {
        const jwtToken = request.cookies.get("jwtToken");
        const token = jwtToken?.value as string;
        if (!token) return null ;

        const privatekey = process.env.JWT_SECRET as string ;
        const userPayoad = jwt.verify(token,privatekey) as JWTPayload ;

        return userPayoad ;
        
    } catch (error) {
        return null;
    }
}


// verify token for page
export function verifyTokenForPage(token:string) :JWTPayload | null{
    try {
       

        const privatekey = process.env.JWT_SECRET as string ;
        const userPayoad = jwt.verify(token,privatekey) as JWTPayload ;
        if(!userPayoad) return null ;

        return userPayoad ;
        
    } catch (error) {
        return null;
    }
}




