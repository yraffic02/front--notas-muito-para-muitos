'use client'
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Spiner } from "../Spiner";

export const ListCards = () =>{
    const [notas, setNotas] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    const getNotas = async () => {
        try {
            setIsLoading(true)

            const { data } = await api.get('/notas');
        
            setNotas(data);
        } catch (error) {
            console.log(error);
        } finally {
           return setIsLoading(false)
        }
    };

    const handleEdit = (id) => {
    
        console.log(`Editar nota com ID ${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/notas/${id}`);
            
            setNotas(notas.filter((nota) => nota.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getNotas();
    }, []);

    return(
        <div>
            {
                isLoading ?
                <Spiner />
                :
               <>
                {notas.map((nota) => (
                    <div key={nota.id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{nota.titulo}</h5>
                            <p className="card-text">{nota.conteudo}</p>
                            {
                                nota.Tags.length > 0 ?
                                <div className="mb-2">
                                {nota.Tags.map((tag) => (
                                    <span key={tag.id} className="badge bg-primary me-1">
                                    {tag.titulo}
                                    </span>
                                ))}
                                </div>
                                : <p>Não tags para esta nota!</p>
                            }
                            <button
                                onClick={() => handleEdit(nota.id)}
                                className="btn btn-primary me-2"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(nota.id)}
                                className="btn btn-danger"
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                ))}
               </>
            }
        </div>
    )
}