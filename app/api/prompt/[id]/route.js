import { connectToDb } from "@utils/database";
import Prompt from "@models/Prompt";


// GET (read)
export const GET = async (req,{params}) => {
    try{    
        await connectToDb();
        const prompt = await Prompt.findById(params.id).populate('creator'); //fetch the prompt by id from the database and populate the creator field to get the user details

        if (!prompt){
            return new Response("prompt not found",{status:404});
        }

        return new Response(JSON.stringify(prompt),{status:200}); 
    }   
    catch{

        return new Response("failed to fetch all prompts",{status:500}); 

    }
}

// patch (update)
export const PATCH = async(req,{params}) => {
    const { prompt, tag } = await req.json(); //destructure the prompt and tag values from the request body

    try{
        await connectToDb();
        const existingPrompt=await Prompt.findById(params.id); //find the prompt by id in the database //p of the prompt should be capital
        if (!existingPrompt){
            return new Response("prompt not found",{status:404});
        }
        existingPrompt.prompt=prompt; //update the prompt value
        existingPrompt.tag=tag; //update the tag value
        await existingPrompt.save(); //save the updated prompt document
        return new Response(JSON.stringify(existingPrompt),{status:200}); //return a JSON response with the updated prompt document and a status code of 200 (OK)
    }
    catch (error){
        return new Response("failed to update the prompt",{status:500});
    }
}

// Delete (delete)

export const DELETE = async(req,{params}) => {
    try{
        await connectToDb();
        await Prompt.findByIdAndDelete(params.id); //find and delete the prompt by id in the database
        return new Response("prompt deleted successfully",{status:200}); //return a success message with a status code of 200 (OK)

    }

    catch(error){
        return new Response("failed to delete the prompt",{status:500});
    }
}
