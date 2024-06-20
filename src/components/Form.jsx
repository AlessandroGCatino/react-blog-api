import { useEffect, useState } from "react"
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BASE_API_URL;
export default function({ categories, tags, onCreate}){

    // const categories = ["Food", "Drink", "Travel", "Sports", "Other"];
    // const tags = [ "travel", "food", "fitness", "photography", "technology", "health", "fashion", "lifestyle", "nature", "art"];

    const [list, setList] = useState([]);
    const [published, setPublished] = useState(false);

    const initialData = {
        title: '',
        content: '',
        image: '',
        categoryID: "",
        tags: [],
        published: false
    }

    
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        return(
            console.log(formData)
        )
    }, [formData])

    const handleField = (name, value) => {

        setFormData(curr => ({
            ...curr,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const res = await axios.post(`${apiUrl}/posts`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log(res);
        if(res.status < 400){
            onCreate();
        }
    }

    useEffect(() => {
        if (published) {
        alert("Post created")
        }
    }, [published]);

    return (<>

        <h1>Create a new Post</h1>
    
        <form onSubmit={handleSubmit} className="create">
            {Object.keys(initialData).map((name, index) => {
                const value = initialData[name];
                if(name === 'categoryID'){
                    return (
                        <label key={`formElement${index}`} >
                            {name}
                            <select
                                value={formData[name]}
                                onChange={(e) => handleField(name, Number(e.target.value))}
                            >
                                <option value="" disabled>Seleziona una categoria</option>
                            {categories.map(c => (
                                <option key={`categoryId${c.id}`} value={c.id}>{c.title}</option>
                            ))}        
                            </select>
                        </label>
                    ) 
                }
                switch(typeof value){
                    case 'boolean':
                    return (
                        <label key={`formElement${index}`}>
                            {name}
                            <input
                                name={name}
                                type="checkbox"
                                checked={formData[name]}
                                onChange={(e) => handleField(name, e.target.checked)}
                            />
                        </label>
                    )
                    case 'object':
                    return (
                        <div key={`formElement${index}`} className="tags">
                            <p>Tags:</p>
                            <ul>
                                {tags.map(({ id, title }, index) => (
                                    <li key={`tag${index}`}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={formData.tags.includes(id)}
                                                onChange={() => {
                                                    const curr = formData.tags;
                                                    const newTags = curr.includes(id) ? 
                                                    curr.filter(el => el !== id) : 
                                                    [...curr, Number(id)];
                                                    handleField('tags', newTags);
                                                }}
                                            />
                                            {title}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                    default:
                    return (
                        <label key={`formElement${index}`}>
                            {name}:
                            <input
                                name={name}
                                type={typeof value === 'number' ? 'number' : 'text'}
                                value={formData[name]}
                                onChange={(e) => handleField(name, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
                            />
                        </label>
                    )
                }
            })}
            <button>Salva</button>
        </form>
    
    </>);
}