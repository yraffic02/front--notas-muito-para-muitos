import { ListCards } from "@/components/ListCards";
import { useDispatch } from "react-redux";

export default function Home() {
  return (
    <main className="container mt-5">
      <ListCards />
    </main>
  );
}
