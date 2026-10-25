import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { searchWord } from "../api/words.ts";
import { LoaderCircle, ChevronLeft } from "lucide-react";
import { NavLink } from "react-router";

export default function SearchWordsPage() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    useSearch(query);
  };

  const {
    data: searchResult,
    error: searchError,
    isPending: searchLoading,
    mutate: useSearch,
  } = useMutation({
    mutationKey: ["searchWord", query],
    mutationFn: (query: string) => searchWord(query),
  });

  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="flex flex-col text-lg font-bold">
        <NavLink
          to="/"
          className="flex text-lg items-center font-bold mb-2 text-center gap-1"
        >
          <ChevronLeft />
          Takaisin
        </NavLink>
        <div className="flex mb-2 w-100">
          <input
            type="text"
            placeholder="Kirjoita sana..."
            className="border p-2 mt-4 rounded-lg w-full"
            id="searchWord"
            value={query}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="border p-2 ml-1 mt-4 rounded-lg cursor-pointer"
            onClick={handleSearch}
            disabled={searchLoading}
          >
            {searchLoading ? "Haetaan..." : "Hae"}
          </button>
        </div>
        {searchLoading && (
          <div className="mt-4 justify-center flex items-center">
            <LoaderCircle className="animate-spin" />
          </div>
        )}
        {searchResult &&
          (searchResult.fin && searchResult.eng ? (
            <>
              <div className="flex w-full justify-between items-center gap-4 text-(--text-muted) text-lg text-center">
                <p>Suomi</p>
                <p>Englanti</p>
              </div>
              <div className="w-full h-px bg-gray-300 my-2" />
              <div className="flex w-full justify-between items-center gap-4 text-lg text-center">
                <p>{searchResult.fin}</p>
                <p>{searchResult.eng}</p>
              </div>
            </>
          ) : (
            <div className="text-lg text-center">Ei tuloksia</div>
          ))}
        {searchError && (
          <div className="mt-4 text-red-500">{searchError?.message}</div>
        )}
      </div>
    </div>
  );
}
