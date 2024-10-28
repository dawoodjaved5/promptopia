import PromptCard from './PromptCard'

const Profile = ({name,dec,data,handleEdit,handleDelete}) => {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{dec}</p>

      <div className='mt-10 prompt_layout'>
      {data.map((post)=>( //map over the data array to render a list of prompt cards using the PromptCard component and pass the post object as a prop to the PromptCard component this will render a list of prompt cards with the data from the data array the prompt card will be rendered as many times as the length of the data array
        <PromptCard 
          key={post._id}
          post={post}
          handleEdit={ ()=>handleEdit&&handleEdit(post)}
          handleDelete={ ()=>handleDelete&&handleDelete(post)}

        />

      ))}
    </div>
    </section>
  )
}

export default Profile



//this is not a profile page but a reusable component that will be used in the profile page