"use client";

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'  //import the useRouter hook from the next/navigation module to redirect the user to the home page after creating a new prompt

import Form from '@components/Form'


const page = () => {

    const Router=useRouter();  // use the useRouter hook to access the router object and redirect the user to the home page after creating a new prompt R should be capital
    const {data:session}=useSession();

    const [ submitting , setSubmitting]=useState(false);
    const [post,setPost]=useState({
        prompt:"",
        tag:""
    });

    const createPrompt=async(e)=>{ 
        e.preventDefault(); //prevent the default behavior of the form
        setSubmitting(true); //set the submitting state to true

        try{ //try to send a post request to the api endpoint to create a new prompt using the data from the form fields
          const response=await fetch('/api/prompt/new',{ //fetch the api endpoint to create a new prompt
            method:'POST',
            body:JSON.stringify({
              prompt:post.prompt,
              userId:session?.user.id,
              tag:post.tag
            }),  //send all this data to an api endpoint to create a new prompt using the post request api/prompt/new which is using the POST function to create a new prompt in the database and using prompt schema to plug in the data

            
          })
          if (response.ok){
            Router.push('/'); //if the response is ok, redirect the user to the home page
          }
        }
        catch (error){
          console.error(error);
        }
        finally{
          setSubmitting(false); //set the submitting state to false 
        }
        
    }


  return (
    <Form    //reusable self closing component
    type="create"
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={createPrompt}
    />  
  )
}

export default page


// this file is doing the following things:
// 1. Importing the useState hook from the react module to manage the local state of the component.
// 2. Importing the useSession and useRouter hooks from the next-auth/react and next/navigation modules to access the session data and redirect the user to the home page.
// 3. Importing the Form component from the components/form.jsx file to render the form for creating a new prompt.
// 4. Defining a functional component called page that renders the Form component with the type, post, setPost, submitting, and handleSubmit props.
// 5. The page component uses the useSession hook to access the session data and the useRouter hook to access the router object.
// 6. The page component defines a local state using the useState hook to manage the submitting and post values.
// 7. The createPrompt function is an asynchronous function that handles the form submission event.
// 8. The createPrompt function sends a post request to the /api/prompt/new endpoint to create a new prompt in the database using the data from the form fields.
// 9. If the response is successful, the user is redirected to the home page using the Router.push method.
// 10. If any errors occur during the process, they are logged to the console.
// handle submit is the function which is called when the form is submitted and it is sending a post request to the api endpoint to create a new prompt using the data from the form fields. If the response is successful, the user is redirected to the home page. If any errors occur during the process, they are logged to the console. This code snippet demonstrates how to create a new resource in a database using an API endpoint in a Next.js application.
// Compare this snippet from app/api/prompt/new/route.js: