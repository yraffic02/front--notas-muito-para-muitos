import { ListCards } from "@/components/ListCards";

export default function Home() {
  return (
    <div className="container mt-5">
      <h1 className="mb-4 ">
        Lista de Notas
      </h1>
      <ListCards />
    </div>
  );
}
