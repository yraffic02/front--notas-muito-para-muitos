'use client'
import { api } from "@/lib/api";
import { getNota } from "@/redux/features/nota-slice";
import { getNotas } from "@/redux/features/notas-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Card } from "../Card";
import { Spiner } from "../Spiner";

export const ListCards = () =>{
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const notas = useSelector((state)=>  state.notasReducer.value)

    const handleEdit = (id) => {
        dispatch(getNota(id))
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/notas/${id}`);
            
            dispatch(getNotas())
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        dispatch(getNotas())
    }, [])

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