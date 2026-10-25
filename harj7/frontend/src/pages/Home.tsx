import { Plus, Search } from "lucide-react";
import PathCard from "../components/PathCard";

const paths = [
  {
    title: "Lisää",
    description: "Lisää uusi sana sanastoon",
    path: "/add",
    icon: <Plus />,
  },
  {
    title: "Haku",
    description: "Hae sanaa sanastosta",
    path: "/search",
    icon: <Search />,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center gap-2">
      <div className="flex flex-col gap-4 items-center">
        <p className="text-lg">Valitse toiminto:</p>
        {paths.map((path) => (
          <PathCard
            key={path.title}
            title={path.title}
            description={path.description}
            path={path.path}
            icon={path.icon}
          />
        ))}
      </div>
    </main>
  );
}
