import Link from "next/link";
import { ListCardsNotas } from "./components/ListCardsNotas";


export default function Home() {
  return (
    <main className="container mt-5">
      <Link
        href='/tags'
      >
        Ver lista de tags
      </Link>
      <ListCardsNotas />
    </main>
  );
}
