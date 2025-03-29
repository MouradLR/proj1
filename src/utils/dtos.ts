export interface CreatArticleDTO{
    title:string;
    description:string;
}

export interface UpdateArticleDTO{
    title?:string;
    description?:string;
}

export interface registerUserDTO{
   username:string;
   email:string;
   password:string;
}

export interface LoginUserDTO{
    email:string;
    password:string;
 }
 export interface UpdateUserDTO{
    username?:string;
    email?:string;
    password?:string;
 }

 export interface CreateCommentDTO{
    text:string;
    articleId:number;
 }

 export interface UpdateCommentDTO{
   text:string;
}


 
