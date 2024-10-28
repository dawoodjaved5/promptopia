"use client"

import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile'


const myProfile = () => {
    const router=useRouter();
    const{data:session}= useSession()

    const[posts,setPosts]=useState([])

    useEffect(() => { 
        //fetch data from the api endpoint to get the list of prompts
        const fetchPosts=async()=>{
        const response=await fetch(`/api/users/${session?.user.id}/posts`);
        const data=await response.json();
    
        setPosts(data);
        }
    
        if (session?.user.id)fetchPosts();
    }, [])

    const handleEdit=(post)=>{
        router.push(`/update-prompt?id=${post._id}`);
    } 

    const handleDelete=async(post)=>{
        const hasConfirmed=confirm("Are you sure you want to delete this post?");
        if (hasConfirmed){
            try{
                await fetch(`/api/prompt/${post._id.toString()}`,{
                    method:'DELETE'

                })
                const filteredPosts=posts.filter((p)=>p._id!==post._id);
                setPosts(filteredPosts);
            }
            
            catch (error){
                console.error(error);
            }
        }
    }

  return (
    <Profile 
        name={session?.user.name}
        desc="Welcome to your personalized profile page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}

    />
    ) 
}

export default myProfile