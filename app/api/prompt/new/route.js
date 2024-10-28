import { connectToDb } from "@utils/database";
import Prompt from "@models/Prompt";


export const POST = async (req) => {
    const { userId, prompt, tag } = await req.json();  //destructure the prompt, userId, and tag values from the request body the request body is created by the user when they submit the form and it is coming from the file create-prompt/page.jsx 

    try{
        await connectToDb();

        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:201}); //return a JSON response with the new Prompt document and a status code of 201 (Created) to the client side i.e create-prompt/page.jsx
    }
    catch (error){
        return new Response("failed to create a new prompt",{status:500});
    }
}

// this code is doing the following:
// 1. Importing the connectToDb function from the utils/database.js file and the Prompt model from the models/prompt.js file.
// 2. Defining a POST function that takes a request object as an argument.
// 3. Destructuring the prompt, userId, and tag values from the request body.
// 4. Connecting to the database using the connectToDb function.
// 5. Creating a new Prompt document with the provided userId, prompt, and tag values.
// 6. Saving the new Prompt document to the database.
// 7. Returning a JSON response with the new Prompt document and a status code of 201 (Created).
// 8. Catching and logging any errors that occur during the
// the req is coming from the client side and it is a post request that is sending the prompt, userId, and tag values to the /api/prompt/new endpoint to create a new prompt in the database. The POST function handles this request by creating a new Prompt document with the provided values and saving it to the database. If the operation is successful, it returns a JSON response with the new Prompt document and a status code of 201 (Created). If any errors occur during the process, it logs the error to the console. This code snippet demonstrates how to create a new resource in a database using an API endpoint in a Next.js application.