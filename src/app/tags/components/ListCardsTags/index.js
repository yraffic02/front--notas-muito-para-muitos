'use client'
import { Spiner } from "@/components/Spiner";
import { api } from "@/lib/api";
import { getTag } from "@/redux/features/tag-slice";
import { getTags } from "@/redux/features/tags-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { CardTag } from "../CardTag";
import { useRouter } from "next/navigation";


export const ListCardsTags = () =>{
    const dispatch = useDispatch()
    const tags = useSelector((state)=>  state.tagsReducer.value)
    const tagsStatus = useSelector((state)=>  state.tagsReducer.status)
    const router = useRouter()

    const handleEditTag = (id) => {
        dispatch(getTag(id))
        router.push('/edite-tag')
    };

    const handleDeleteTag = async (id) => {
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
                    tagsStatus === 'idle' && tags.length === 0 &&
                    <p>Não há Tags</p>
                }

                {
                    Array.isArray(tags) &&
                    <div>
                        {tags.map((tag) => (
                            <CardTag 
                                key={tag.id}
                                tag={tag}
                                handleDeleteTag={handleDeleteTag}
                                handleEditTag={handleEditTag}
                            />
                        ))}
                    </div>
                }
               </>
            }
        </div>
    )
}