import { getPokemonList } from "@/services/pokemon";
import App from "./App";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  if (!cookies().get('user')) {
    redirect('/login')
  }

  const { list, count } = await getPokemonList(1)
  return (
    <App list={list} count={count} />
  );
}
