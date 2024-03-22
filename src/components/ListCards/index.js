'use client'
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Spiner } from "../Spiner";
import { Button, TypeButton } from "../Button";
import { Card } from "../Card";

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
                    <Card 
                        key={nota.id}
                        nota={nota}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                ))}
               </>
            }
        </div>
    )
}