'use client'
import { Spiner } from "@/components/Spiner";
import { api } from "@/lib/api";
import { getTag } from "@/redux/features/tag-slice";
import { getTags } from "@/redux/features/tags-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CardTag } from "../CardTag";


export const ListCardsTags = () =>{
    const dispatch = useDispatch()
    const tags = useSelector((state)=>  state.tagsReducer.value)
    const tagsStatus = useSelector((state)=>  state.tagsReducer.status)

    const handleEdit = (id) => {
        dispatch(getTag(id))
    };

    const handleDelete = async (id) => {
        try {
            const res = await api.delete(`/tags/${id}`);
            
            if(res.status === 204){
                return dispatch(getTags())
            }
        } catch (error) {
            alert(error.message)
            console.log(error);
        }
    };

    useEffect(()=>{
        dispatch(getTags())
    }, [])

    return(
        <div>
            {
                tagsStatus === "loading" ?
                <Spiner />
                :
               <>
                {
                    tagsStatus === 'idle' && tags.length === 0?
                    <p>Não há Tags</p>
                    :
                    <div>
                        {tags.map((tag) => (
                            <CardTag 
                                key={tag.id}
                                tag={tag}
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