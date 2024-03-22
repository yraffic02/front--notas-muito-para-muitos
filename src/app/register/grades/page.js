import Link from "next/link";

export default function Home() {
  return (
    <main>
        <Link
            href='/registro/notas'
        >
            Criar nota
        </Link>
        <Link
            href='/registro/tags'
        >
            Criar tags
        </Link>
    </main>      
  );
}
