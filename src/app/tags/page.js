import Link from "next/link";
import { ListCardsTags } from "./components/ListCardsTags";


export default function Tags() {
  return (
    <main className="container mt-5">
      <Link
        href='/'
      >
        Ver lista de notas
      </Link>
      <ListCardsTags />
    </main>
  );
}
