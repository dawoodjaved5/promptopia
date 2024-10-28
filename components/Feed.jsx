"use client";
import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

// Component to render a list of prompt cards
const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick} // Pass handleTagClick function as a prop to handle tag clicks
          handleEdit={{}}
          handleDelete={{}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch all posts initially
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setPosts(data);
      setSearchResults(data); // Initialize search results with all posts
    };
    fetchPosts();
  }, []);

  // Fetch search results whenever searchText changes
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchText.trim()) {
        const response = await fetch(`/api/prompt/${searchText}`);
        const data = await response.json();
        setSearchResults(data);
      } else {
        setSearchResults(posts); // Reset to all posts if searchText is empty
      }
    };
    fetchSearchResults();
  }, []);

  // Update search text and filter posts based on tags
  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    if (searchValue.trim()) {
      const filteredPosts = posts.filter((post) =>
        post.tag.includes(searchValue) || post.prompt.includes(searchValue) || post.creator.username.includes(searchValue)

      );
      setSearchResults(filteredPosts);
    } else {
      setSearchResults(posts); // Reset to all posts if input is cleared
    }
  };

  // Set search text when a tag is clicked
  const handleTagClick = (tag) => {
    setSearchText(tag);
    const filteredPosts = posts.filter((post) => post.tag.includes(tag));
    setSearchResults(filteredPosts);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={searchResults} // Pass filtered search results to PromptCardList
        handleTagClick={handleTagClick} // Pass handleTagClick function to make tags clickable
      />
    </section>
  );
};

export default Feed;
