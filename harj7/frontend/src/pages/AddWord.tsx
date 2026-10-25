import { useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addWord } from "../api/words";

export type Word = {
  fin: string;
  eng: string;
};

export default function AddWordPage() {
  const [newWord, setNewWord] = useState<Word>({ fin: "", eng: "" });

  const handleAddWord = () => {
    console.log("Adding word:", newWord);

    if (!newWord.fin || !newWord.eng) {
      alert("Täytä molemmat kentät!");
      return;
    }

    addWordMutation(newWord);
  };

  const { mutate: addWordMutation, isPending } = useMutation({
    mutationFn: (word: Word) => addWord(word),
    onSuccess: () => {
      setNewWord({ fin: "", eng: "" });
      toast.success("Sana lisätty onnistuneesti!", {
        duration: 3000,
      });
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col text-lg font-+bold">
        <NavLink
          to="/"
          className="flex text-lg items-center font-bold mb-2 text-center gap-1"
        >
          <ChevronLeft />
          Takaisin
        </NavLink>
        <div className="flex flex-col gap-2 w-100">
          <input
            type="text"
            placeholder="Kirjoita sana suomeksi..."
            className="border p-2 rounded-lg w-full"
            value={newWord.fin}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddWord();
            }}
            onChange={(e) => setNewWord({ ...newWord, fin: e.target.value })}
          />
          <input
            type="text"
            placeholder="Kirjoita sana englanniksi..."
            className="border p-2 rounded-lg w-full"
            value={newWord.eng}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddWord();
            }}
            onChange={(e) => setNewWord({ ...newWord, eng: e.target.value })}
          />
          <button
            onClick={handleAddWord}
            disabled={isPending}
            className="border p-2 rounded-lg cursor-pointer disabled:opacity-50"
          >
            {isPending ? "Lisätään..." : "Lisää sana"}
          </button>
        </div>
      </div>
    </div>
  );
}
