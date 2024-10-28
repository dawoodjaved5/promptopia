import { connectToDb } from "@utils/database";
import Prompt from "@models/Prompt";

export const GET = async (req,{params}) => {
    try{    
        await connectToDb();
        const prompts = await Prompt.find({
            creator:params.id
        }).populate('creator'); //fetch all prompts from the database
        return new Response(JSON.stringify(prompts),{status:200}); 
    }   
    catch{

        return new Response("failed to fetch all prompts",{status:500}); 

    }
}


//same as the app/api/prompt/route.js file, this code is doing the following:
// 1. Importing the connectToDb function from the utils/database.js file and the Prompt model from the models/prompt.js file.
// 2. Defining a GET function that takes a request object as an argument.
// 3. Connecting to the database using the connectToDb function.
// 4. Fetching all prompts from the database using the Prompt model and populating the creator field.
// 5. but this time fetching for a specific user