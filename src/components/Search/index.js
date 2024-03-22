'use client'

import { getNotasByTagId } from "@/redux/features/notas-slice"
import { useDispatch } from "react-redux"

export const Search = ({tags}) =>{
    const dispatch = useDispatch()
    
    const handleSearchNotas = (id) =>{
        dispatch(getNotasByTagId(id))
    }

    
    return(
        <select 
            class="form-select w-50 " 
            aria-label="Default select example"
            onChange={(e)=> handleSearchNotas(e.target.value)}
        >
            <option selected>Filtro tag</option>
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