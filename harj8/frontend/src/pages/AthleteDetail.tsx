import { Link, NavLink, useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ChevronLeft, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { deleteAthlete, getAthlete } from "../api/athletes";
import AthleteCard from "../components/AthleteCard";

export default function AthleteDetailPage() {
  const id = Number(useParams().id);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: athlete,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["athletes", id],
    queryFn: () => getAthlete(id),
  });

  const { mutateAsync: remove, isPending } = useMutation({
    mutationFn: () => deleteAthlete(id),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["athletes", id] });
      queryClient.invalidateQueries({ queryKey: ["athletes"] });
      navigate("/");
    },
  });

  const handleDelete = () => {
    if (
      athlete &&
      confirm(`Delete ${athlete.firstName} ${athlete.lastName}?`)
    ) {
      toast.promise(remove(), {
        loading: "Deleting athlete...",
        success: "Athlete deleted",
        error: (err) => err.message,
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="flex items-center gap-1 text-sm hover:scale-102 duration-200"
        >
          <ChevronLeft className="size-4" /> Back to athletes
        </Link>
      </div>

      {isLoading && <LoaderCircle className="animate-spin" />}
      {error && <p className="text-red-500">{error.message}</p>}

      {athlete && (
        <>
          <AthleteCard athlete={athlete} />
          <div className="flex w-full max-w-sm gap-2">
            <NavLink
              to={`/athletes/${id}/edit`}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold hover:scale-102 duration-200"
            >
              <Pencil className="size-4" /> Edit
            </NavLink>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-600 hover:scale-102 duration-200 disabled:opacity-60"
            >
              <Trash2 className="size-4" /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
