import {NextRequest ,NextResponse} from 'next/server';
import {createArticlesSchema} from '@/utils/validationSchemas';
import {CreatArticleDTO} from '@/utils/dtos';
import {Article} from '@prisma/client';
import  prisma  from '@/utils/db';
import {ARTICLE_PER_AGE} from '@/utils/constants';
import {verifyToken} from '@/utils/verifyToken';



/**
 * @method GET
 * @route  ~/api/articles
 * @desc   Get Article by Page Number
 * @access public
 */

export async function GET(request:NextRequest) {
          
          try {
        
            const pageNumber  = request.nextUrl.searchParams.get("pageNumber") || "1";
            const articles =await prisma.article.findMany({
               skip: ARTICLE_PER_AGE * (parseInt(pageNumber)-1),
               take:ARTICLE_PER_AGE,
               orderBy:{createdAt:'desc'}
            });
            return NextResponse.json(articles,{status:200})
          } catch (error) {
            return NextResponse.json(
               {message:'internal srver error'},
               {status:500}
            )
          }
}



/**
 * @method POST
 * @route  ~/api/articles
 * @desc   Creat New Article
 * @access private (only admin can create article) 
 */



export async function  POST(request:NextRequest){
   try {
      const user = verifyToken(request);
      if(user === null || user.isAdmin === false){
          return NextResponse.json(
              {message:'only admin, access denied'},
              {status:403}
          )
      }
      const body =(await request.json())as CreatArticleDTO;
     

      const validation = createArticlesSchema.safeParse(body);
 
      if(!validation.success){
         return NextResponse.json({message:validation.error.errors[0].message},{status:400})
      }
    
      const newArticle:Article = await prisma.article.create({
       data:{
          title:body.title,
          description:body.description
       }
      })
 
      
      return NextResponse.json(newArticle,{status:201});
   } catch (error) {
      return NextResponse.json(
         {message:'internal srver error'},
         {status:500}
      )
   }
}
