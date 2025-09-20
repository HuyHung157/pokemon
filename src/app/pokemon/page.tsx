"use client";

import { useState, memo, useEffect } from "react";
import {
  usePokemonByTypes,
  usePokemonList,
  useTypes,
} from "@/hooks/usePokemons";
import PokemonCard from "@/components/PokemonCard";
import Pagination from "@/components/Pagination";
import TypeFilter from "@/components/TypeFilter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { APP_CONFIG } from "@/lib/const";
import { PokemonByTypeItem } from "@/types/pokemon.types";

const queryClient = new QueryClient();
const PAGE_SIZE = APP_CONFIG.PAGE_SIZE;

const Header = memo(function Header() {
  return <p className="text-center">Welcome to Pokemon world</p>;
});

const TotalCount = memo(function TotalCount({ total }: { total: number }) {
  return <p>Total count: {total}</p>;
});

function PokemonPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  const pageFromUrl = Number(searchParams.get("page") || "1");
  const typesFromUrl = searchParams.get("type")
    ? searchParams.get("type")!.split(",")
    : [];

  const [page, setPage] = useState(pageFromUrl);
  const [activeTypes, setActiveTypes] = useState<string[]>(typesFromUrl);

  const { data: typesData } = useTypes();
  const { data: listData } = usePokemonList(page);

  const { results: typeResults, total: typeTotal } =
    usePokemonByTypes(activeTypes);

  const total = listData?.total ?? 0;
  const totalCurrent = activeTypes.length > 0 ? typeTotal : listData?.total || 0;
  const results = activeTypes.length > 0
    ? typeResults
        ?.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
        .map((p: PokemonByTypeItem) => p.pokemon) || []
    : listData?.results || [];

  const updateURL = (newPage: number, newTypes: string[]) => {
    if (!mounted) return;
    
    const params = new URLSearchParams();
    if (newTypes.length > 0) params.set("type", newTypes.join(","));
    params.set("page", String(newPage));
    router.replace(`/pokemon?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    updateURL(newPage, activeTypes);
  };

  const handleTypeChange = (newTypes: string[]) => {
    setActiveTypes(newTypes);
    setPage(1);
    updateURL(1, newTypes);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const urlPage = Number(searchParams.get("page") || "1");
    const urlTypes = searchParams.get("type")
      ? searchParams.get("type")!.split(",")
      : [];
    
    setPage(urlPage);
    setActiveTypes(urlTypes);
  }, [searchParams, mounted]);

  if (!mounted) {
    return <div className="flex justify-center py-10">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 px-10">
      <Header />
      <TotalCount total={total} />

      {typesData && (
        <TypeFilter
          types={typesData.results}
          onSelect={handleTypeChange}
          activeTypes={activeTypes}
        />
      )}

      <section className="flex flex-col justify-center gap-8">
        <section className="grid grid-cols-6 gap-16">
          {results?.map((p) => (
            <PokemonCard key={p.name} url={p.url} name={p.name} />
          ))}
        </section>

        <Pagination
          currentPage={page}
          total={totalCurrent}
          pageSize={PAGE_SIZE}
          onChange={handlePageChange}
        />
      </section>
    </div>
  );
}

export default function PokemonPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <PokemonPageContent />
    </QueryClientProvider>
  );
}