'use client'
import Link from "next/link";
import { ListCardsNotas } from "./components/ListCardsNotas";
import { Search } from "@/components/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTags } from "@/redux/features/tags-slice";


export default function Home() {
  const tags = useSelector((state)=>  state.tagsReducer.value)
  const dispatch = useDispatch()


  useEffect(()=>{
    dispatch(getTags())
  }, [])

  return (
    <main className="container mt-5">
      <div className="d-flex justify-content-between p-3 ">
        <Link
          href='/tags'
        >
          Ver lista de tags
        </Link>

        <Search tags={tags}/>
      </div>
      <ListCardsNotas />
    </main>
  );
}
