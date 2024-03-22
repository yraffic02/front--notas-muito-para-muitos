'use client'
import Link from "next/link";
import { ListCardsNotas } from "./components/ListCardsNotas";


export default function Home() {
  return (
    <main className="container mt-5">
      <div className="d-flex justify-content-between p-3 ">
        <Link
          href='/tags'
        >
          Ver lista de tags
        </Link>
      </div>
      <ListCardsNotas />
    </main>
  );
}
