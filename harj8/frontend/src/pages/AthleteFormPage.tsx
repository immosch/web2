import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import {
  createAthlete,
  getAthlete,
  updateAthlete,
  type AthleteInput,
} from "../api/athletes";
import AthleteForm from "../components/AthleteForm";

// Handles both /athletes/new and /athletes/:id/edit
export default function AthleteFormPage() {
  const params = useParams();

  const id = params.id ? Number(params.id) : undefined; // athlete ID from URL, if exists
  const isEdit = id !== undefined; // if id exists, we are editing an athlete, else creating a new one

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: athlete,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["athletes", id],
    queryFn: () => getAthlete(id!),
    enabled: isEdit,
  });

  const save = useMutation({
    mutationFn: (input: AthleteInput) =>
      isEdit ? updateAthlete(id, input) : createAthlete(input), // if editing, update, else create new athlete
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["athletes"] }); // refresh the list of athletes after creating or updating one
      toast.success(isEdit ? "Athlete updated" : "Athlete created");
      navigate(isEdit ? `/athletes/${id}` : "/");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleCancel = () => navigate(isEdit ? `/athletes/${id}` : "/");

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <p className="text-3xl font-bold">
        {isEdit ? "Edit athlete" : "New athlete"}
      </p>

      {isEdit && isLoading && <LoaderCircle className="animate-spin" />}

      {error && <p className="text-red-500">{error.message}</p>}

      {(!isEdit || athlete) && (
        <AthleteForm
          initialState={
            athlete && {
              ...athlete,
              dateOfBirth: String(athlete.dateOfBirth).split("T")[0],
            }
          }
          submitLabel={isEdit ? "Save changes" : "Create athlete"}
          isSubmitting={save.isPending}
          onSubmit={(input) => save.mutate(input)}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
