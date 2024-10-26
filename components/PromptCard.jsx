"use client"

import {useState} from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation' //import the useRouter hook from the next/navigation module to redirect the user to the home page after creating a new prompt and use the usePathname hook to get the current pathname of the page the user is on

const PromptCard = ({post,handleTagClick,handleEdit,handleDelete}) => {

  const {data:session}=useSession();
  const [copied, setCopied] = useState("")
  const pathName=usePathname();  //use the usePathname hook to get the current pathname of the page the user is on
  const Router=useRouter();  // use the useRouter hook to access the router object and redirect the user to the home page after creating a new prompt R should be capital

  const handleCopy = () => {
    setCopied(post.prompt)
    navigator.clipboard.writeText(post.prompt)
    setTimeout ( ()=>setCopied(""), 3000)  //set the copied state to an empty string after 3 seconds
  }

  const handleIdClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return Router.push("/profile");

    Router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  }

  

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
      <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer' onClick={handleIdClick}>
        <Image 
          src={post.creator.image}
          alt="user_image"
          width={40}
          height={40}
          className='rounded-full object-contain'
        />

        <div className='flex flex-col'>
          <h3 className='font-satoshi font-semibold text-gray-900'>
            {post.creator.username}
          </h3>
          <p className='font-inter text-sm text-gray-500'>{post.creator.email}</p>
        </div>
      </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={copied===post.prompt ? 'assets/icons/tick.svg' : 'assets/icons/copy.svg'}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p className='text-inter text-sm blue_gradient cursor-pointer' onClick={()=>handleTagClick && handleTagClick(post.tag)}>  
        #{post.tag}
      </p>
      {session?.user.id===post.creator._id && pathName==='/profile' && (  //check if the currently logged in user is the creator of the post and the pathname is '/profile' i.e he is on his profile page
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p className='font-inter text-sm green_gradient cursor-pointer' onClick={handleEdit}>
            Edit
          </p>

          <p className='font-inter text-sm orange_gradient cursor-pointer' onClick={handleDelete}>
            Delete
          </p>
        </div>
      )}
    </div>
  )
}

export default PromptCard
