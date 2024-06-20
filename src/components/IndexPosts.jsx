import { useEffect, useState } from "react"
import { MdDeleteForever } from "react-icons/md";


export default function({response, onPageChange}){

    const [currPage, setCurrPage] = useState(1);

    useEffect(() => {
        onPageChange(currPage);
    },[currPage]);

    return (<>
        {response !== null &&
            <div className="paginator">
                <span>Pagina corrente: {currPage}</span>
                <button 
                    style={{visibility: currPage - 1 > 0 ? 'visible' : 'hidden'}} 
                    onClick={()=>setCurrPage(curr => curr - 1)
                }>-</button>
                <button 
                    style={{visibility: currPage + 1 <= response.totalPages ? 'visible' : 'hidden'}} 
                    onClick={()=>setCurrPage(curr => curr + 1)
                }>+</button>
            </div>
        }
        <div className="show">
            {response === null && 'Carico i Post'}
            {response?.posts?.length === 0 && 'Non ci sono Post!'}
            {response?.posts?.length > 0 && 
                response.posts.map((p, index) => (
                <div key={`listElement${index}`} className="postCard" >
                    { <>
                    
                        <h2>{p.title}</h2>
                        <p>{p.content}</p>
                    <figure>
                        <img src={p.image} alt=""/>
                    </figure>
                    <p>Categoria: {p.category.title}</p>
                    <p>Tags: {p.tags.map(el => el.title).join(', ')}</p>
                    <p className={p.published?"publ":"notPubl"}>{p.published? 'Pubblicato' : 'Non pubblicato'}</p>
                    <button className="delete" onClick={() => setList(curr => curr.filter(el => el!== p))}>
                        <MdDeleteForever/>
                    </button>
                    </>}
                </div>
                ))
            }
        </div>
    </>)

}