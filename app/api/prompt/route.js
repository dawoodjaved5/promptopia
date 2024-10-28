import { connectToDb } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req) => {
    try{    
        await connectToDb();
        const prompts = await Prompt.find({}).populate('creator'); //fetch all prompts from the database
        return new Response(JSON.stringify(prompts),{status:200}); 
    }   
    catch{

        return new Response("failed to fetch all prompts",{status:500}); 

    }
}