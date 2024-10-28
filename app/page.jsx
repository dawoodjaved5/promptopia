import React from 'react'
import Feed from '@components/Feed'
const home = () => {
  return (
    <div>
      <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
          Discover and Share
          <br className='max-md:hidden'/>
          <span className='orange_gradient text-center'>AI powered prompts</span>
        </h1>
        <p className='desc text-center'>
          Promptopia is a platform for discovering and sharing AI generated prompts for writing, drawing, and more.
        </p>
        <Feed/>
      </section>
    </div>
  )
}

export default home
