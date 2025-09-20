import { ROUTES } from "@/lib/const";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(ROUTES.POKEMON);
}
