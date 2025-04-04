import {NextRequest,NextResponse} from "next/server";
import {LoginUserDTO}  from "@/utils/dtos";
import { loginschema } from "@/utils/validationSchemas";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import {setCookie} from "@/utils/generateToken";


/**
 * @method POST
 * @route  ~/api/users/login
 * @desc   Login User
 * @access public
 */

export async function POST(request:NextRequest){
    try {
        const body = await request.json() as LoginUserDTO;
        const validation = loginschema.safeParse(body);
        if(!validation.success){
            return NextResponse.json(
                {message:validation.error.errors[0].message},
                {status:400}
            );
        }

        const user = await prisma.user.findUnique({where:{email:body.email}});
        if(!user){
            return NextResponse.json(
                {message:"invalid email or password"},
                {status:400}
            )
        }
        const isPasswordMatch = await bcrypt.compare(body.password, user.password);
        if(!isPasswordMatch){
            return NextResponse.json(
                {message:'invalid email or password'},
                {status:400}
            )
        }


        

        const cookie= setCookie({
            id:user.id,
            isAdmin:user.isAdmin,
            username:user.username
        }
    )
      

        return NextResponse.json(
            {message:'authenticated'},
            {
                status:200,
                headers:{"Set-Cookie":cookie}
            }
        )


    } catch (error) {
        return NextResponse.json(
            {message:"internal server error"},
            {status:500}
        )
    }
}