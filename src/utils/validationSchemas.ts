
import {z} from 'zod';


// Create Article schema
export const  createArticlesSchema =  z.object({
    title: z.string({
        required_error:"Title Is Required",
        invalid_type_error:" title should be of type string"
    }).min(2,{message:"title should be at least 2 character long"} )
    .max(200 ,{message:"title should be less then 200 character"}),
    description: z.string().min(10),
 });

 // Register Schema
export const registerschema = z.object({
    username : z.string().min(2).max(100),
    email : z.string().min(3).max(200).email(),
    password : z.string().min(6),
});


 //Login Schema
 export const loginschema = z.object({
    email : z.string().min(3).max(200).email(),
    password : z.string().min(6),
});

// Create Comment Schema

export const CreateCommentSchema =z.object({
    text : z.string().min(2).max(500),
    articleId : z.number(),
});


// Update User Profile Schema
export const UpdateUserschema = z.object({
    username : z.string().min(2).max(100).optional(),
    email : z.string().min(3).max(200).email().optional(),
    password : z.string().min(6).optional(),
});

