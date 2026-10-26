import { useState } from "react";
import { NavLink } from "react-router";
import { LoaderCircle, Plus, Search } from "lucide-react";
import { getAthletes } from "../api/athletes";
import { useQuery } from "@tanstack/react-query";
import AthleteCard from "../components/AthleteCard";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const {
    data: athletes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["athletes"],
    queryFn: getAthletes,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const query = search.trim().toLowerCase();

  const filtered = athletes?.filter(
    (ath) =>
      `${ath.firstName} ${ath.lastName} ${ath.nickname ?? ""} ${ath.sport}`
        .toLowerCase()
        .includes(query), // Filter athletes by the search query
  );

  return (
    <div className="flex flex-col min-h-screen p-4 items-center gap-2">
      <p className="text-6xl font-bold">Athlete Database</p>

      {/* Search and New Athlete Button */}
      <div className="flex w-full max-w-xl items-center gap-2">
        <div className="flex w-full gap-1 px-4 py-2 items-center border border-(--border) rounded-lg">
          <Search />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, nickname or sport..."
            className="w-full text-md outline-none"
          />
        </div>
        <NavLink
          to="/athletes/new"
          className="flex items-center gap-1 rounded-lg px-4 py-2 border border-(--border) hover:bg-(--accent-bg)"
        >
          <Plus /> New
        </NavLink>
      </div>

      {isLoading && <LoaderCircle className="animate-spin" />}
      {error && (
        <p className="text-red-500">Error loading athletes: {error.message}</p>
      )}
      {filtered && filtered.length === 0 && (
        <p className="text-center text-(--text-muted)">No athletes found.</p>
      )}
      {filtered && (
        <div className="flex flex-wrap items-stretch justify-center gap-4">
          {filtered.map((athlete) => (
            <NavLink
              key={athlete.id}
              to={`/athletes/${athlete.id}`}
              className="flex w-full max-w-sm"
            >
              <AthleteCard athlete={athlete} />
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
