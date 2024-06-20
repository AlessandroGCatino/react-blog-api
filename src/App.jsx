import { useState } from 'react';
import Form from './components/Form.jsx';
import IndexPosts from './components/IndexPosts.jsx';

import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_API_URL;


function App() {

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [response, setResponse] = useState(null);

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
    {showCreateForm && <Form />}

    <IndexPosts 
        response={response}
        onPageChange={page => getPosts(page)}/>
    </>
  )
}

export default App
