"use client";

import { useEffect, useState } from 'react'
import { useRouter,useSearchParams } from 'next/navigation'  //import the useRouter hook from the next/navigation module to redirect the user to the home page after creating a new prompt

import Form from '@components/Form'


const page = () => {

    const searchParams=useSearchParams();  //use the useSearchParams hook to get the search parameters from the url
    const promptId=searchParams.get('id');  //get the prompt id from the search parameters

    const Router=useRouter();  // use the useRouter hook to access the router object and redirect the user to the home page after creating a new prompt R should be capital

    const [ submitting , setSubmittig]=useState(false);
    const [post,setPost]=useState({
        prompt:"",
        tag:""
    });

    useEffect (()=>{

        const getPromptDetails=async()=>{ //fetch the prompt details from the api endpoint using the prompt id
            const response=await fetch(`/api/prompt/${promptId}`);
            const data=await response.json();

            setPost({
                prompt:data.prompt,
                tag:data.tag
            })
        }  


        if (promptId) getPromptDetails();  //if the prompt id is present in the search parameters call the getPromptDetails function to fetch the prompt details


    },[promptId])  // the additional useEffect in this file and the remaining code is same as create prompt file

    const updatePrompt=async(e)=>{ 
        e.preventDefault(); //prevent the default behaviour of the form
        setSubmittig(true); //set the submitting state to true

        if (!promptId) return alert("prompt id not found");  //if the prompt id is not present in the search parameters return from the function

        try{ //try to send a post request to the api endpoint to create a new prompt using the data from the form fields
          const response=await fetch(`/api/prompt/${promptId}`,{ //fetch the api endpoint to update the prompt
            method:'PATCH',  //use the PATCH method to update the prompt 
            body:JSON.stringify({
            prompt:post.prompt,
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
          setSubmittig(false); //set the submitting state to false 
        }
        
    }


return (
    <Form    //reusable self closing component
    type="Edit"  //change the create to edit
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={updatePrompt}
    />  
  )
}

export default page
