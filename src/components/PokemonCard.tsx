import { usePokemonDetail } from "@/hooks/usePokemons";

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
      <img
        src={pokemon.sprites.other.showdown.front_default}
        alt={pokemon.name}
        className="w-20"
        loading="lazy"
      />

      <p className="">Number: {pokemon.id}</p>
    </div>
  );
}
