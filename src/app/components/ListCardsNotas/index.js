'use client'
import { api } from "@/lib/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CardNota } from "../CardNota";
import { getNota } from "@/redux/features/nota-slice";
import { getNotas } from "@/redux/features/notas-slice";
import { Spiner } from "@/components/Spiner";


export const ListCardsNotas = () =>{
    const dispatch = useDispatch()
    const notas = useSelector((state)=>  state.notasReducer.value)
    const notasStatus = useSelector((state)=>  state.notasReducer.status)

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
                notasStatus === "loading" ?
                <Spiner />
                :
               <>
                {
                    notasStatus === 'idle' && notas.length === 0?
                    <p>Não há notas</p>
                    :
                    <div>
                        {notas.map((nota) => (
                            <CardNota 
                                key={nota.id}
                                nota={nota}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />
                        ))}
                    </div>
                }
               </>
            }
        </div>
    )
}