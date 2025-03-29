import {NextRequest,NextResponse} from 'next/server';
import  prisma  from '@/utils/db';



/**
 * @method GET
 * @route  ~/api/articles/search?searchText=value
 * @desc   Get Single Article By Search Text
 * @access public
 */

export async function GET(request:NextRequest) {
    try {
        const searchText = request.nextUrl.searchParams.get("searchText");
        let articles;
        if(searchText){
            articles =await prisma.article.findMany({
                where:{
                    title:{
                        equals:searchText,
                        mode:"insensitive"
                    }
                }
            })

        }else{
            articles =await prisma.article.findMany({take:6});

        }
        return NextResponse.json(articles, {status:200})
            
    } catch (error) {
        return NextResponse.json(
            {message:'internal srver error'},
            {status:500}
         );
    }
}

