import { usePokemonDetail } from "@/hooks/usePokemons";
import Image from "next/image";

interface Props {
  url: string;
  name: string;
}

export default function PokemonCard({ url, name }: Props) {
  const { data: pokemon, isLoading } = usePokemonDetail(url);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <span>Loading image...</span>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="flex flex-col items-center justify-between p-2 ">
      <h3 className="">{name}</h3>
      <Image
        className="w-20"
        src={pokemon.sprites.other.showdown.front_default}
        alt={pokemon.name}
        width={10}
        height={10}
        priority={false}
      />

      <p className="">Number: {pokemon.id}</p>
    </div>
  );
}
