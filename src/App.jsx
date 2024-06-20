import { useState, useEffect } from 'react';
import Form from './components/Form.jsx';
import IndexPosts from './components/IndexPosts.jsx';

import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_API_URL;


function App() {

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [response, setResponse] = useState(null);

  const [tags, setTags] = useState([]);
  const getIngredienti = async () => {
      const url = `${apiUrl}/tags`;
      const { data: array } = await axios.get(url);
      setTags(array);
  }

  const [categories, setCategories] = useState([]);
  const getCategorie = async () => {
      const url = `${apiUrl}/categories`;
      const { data: array } = await axios.get(url);
      setCategories(array);
  }

  useEffect(() => {
      getIngredienti();
      getCategorie();
  },[])

  const getPosts = async (page) => {
    setResponse(null);
    const url = `${apiUrl}/posts?page=${page}&postPerPage=10`;
    const { data: response } = await axios.get(url);
    setResponse(response);
    console.log(response.posts);
}

  return (
    <>
    <div style={{padding: '1rem'}}>
        <button onClick={() => setShowCreateForm(curr => !curr)}>{showCreateForm ? 'Annulla' : 'Crea Post'}</button>
    </div>
    {showCreateForm && <Form 
      categories={categories} 
      tags={tags} 
      onCreate={() => {
          setShowCreateForm(false);
          getPosts(1);
      }}/>}

    <IndexPosts 
        response={response}
        onPageChange={page => getPosts(page)}/>
    </>
  )
}

export default App
