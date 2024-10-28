
import Link from 'next/link'
import React from 'react'

const Form = ({type,post,setPost,submitting,handleSubmit}) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} post</span>
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world and let your imagination run with any AI powered platform.

      </p>

      <form onSubmit={handleSubmit} className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label htmlFor="" className='font-satoshi font-semibold text-base text-gray-700'>
          <span>your AI prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e)=>setPost({...post,prompt:e.target.value})}  //spread operator to copy the previous state and then update the prompt value with the new value from the input field 
            placeholder='write your prompt here'
            className="form_textarea"
          />
        </label>
        <label htmlFor="" className='font-satoshi font-semibold text-base text-gray-700'>
          
          <span>Tag {' '}
            <span className='font-normal'>(#product,#webdevelopment,#idea)</span>
          </span>
          <textarea
            value={post.tag}
            onChange={(e)=>setPost({...post,tag:e.target.value})}  //spread operator to copy the previous state and then update the prompt value with the new value from the input field 
            placeholder='#tag'
            required
            className="form_textarea"
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href="/" className='text-gray-500 text-sm'>
          Cancel
          </Link>

          <button type='submit' disabled={submitting} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>
            {submitting ? `${type}...`:type} 
          </button>
        </div>
      </form>

    </section>
  )
}

export default Form




// this file is doing the following things:
// 1. It imports the Link component from the next/link module to create a link to the home page.
// 2. It defines a functional component called Form that takes four props: type, post, setPost, and handleSubmit from the parent component i.e create-prompt/page.jsx file.
// 3. the type prop is a string that represents the type of form to be displayed, which can be either create or edit.
// 4. The post prop is an object that contains the prompt and tag fields of the form.
// 5. The setPost prop is a function that updates the post object with the new values from the form fields.
// 6. The handleSubmit prop is a function that handles the form submission event.
// 7. The Form component renders a form with two text areas for the prompt and tag fields.
// 8. The prompt and tag fields are controlled components that update the post object using the setPost function when the user types in the input fields.
// 9. The form also contains a submit button that is disabled when the form is submitting and displays a loading message.
// 10. The form also contains a cancel button that links back to the home page using the Link component.
// 11. The Form component is exported as a default export to be used in the parent component create-prompt/page.jsx file.
// 12. The Form component is a reusable component that can be used to create and edit prompts in the application.