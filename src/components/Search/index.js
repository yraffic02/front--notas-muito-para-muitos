'use client'

import { getNotas, getNotasByTagId } from "@/redux/features/notas-slice"
import { useState } from "react"
import { useDispatch } from "react-redux"

export const Search = ({tags}) =>{
    const dispatch = useDispatch()
    const [selectedTag, setSelectedTag] = useState(""); 
    
    const handleSearchNotas = (id) =>{
        setSelectedTag(id)
        dispatch(getNotasByTagId(id))
    }

    
    return(
        <select 
            className="form-select w-50 " 
            aria-label="Default select example"
            onChange={(e)=> handleSearchNotas(e.target.value)}
            defaultValue={selectedTag}
        >
            <option defaultValue>Filtro tag</option>
            {
                tags.length === 0 &&
                ''
            }
            {
                tags.length > 0 && Array.isArray(tags) &&
                tags.map((tag)=>{
                    return <option key={tag.id} value={tag.id}>{tag.titulo}</option>
                })
            }
        </select>
    )
}