import { DOMAIN } from "@/utils/constants";
import { Comment } from "@prisma/client";


//Get All Comments
export async function getAllComments(token:string):Promise<Comment[]> {
    const response = await fetch(`${DOMAIN}/api/comments`,{
          headers:{
            Cookie:`jwtToken=${token}`
          }
        });
        if(!response.ok){
          throw new Error("failed to fetch comment");
        }
        return response.json();
}