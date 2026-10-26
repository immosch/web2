import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import type { AthleteInput } from "../api/athletes";

type Props = {
  initialState?: AthleteInput;
  submitLabel: string;
  isSubmitting: boolean;
  onSubmit: (athlete: AthleteInput) => void;
  onCancel: () => void;
};

const empty: AthleteInput = {
  firstName: "",
  lastName: "",
  nickname: "",
  dateOfBirth: "",
  weight: 0,
  imageUrl: "",
  sport: "",
  achievements: [],
};

const inputClass =
  "w-full rounded-lg border border-(--border) px-3 py-2 text-sm outline-none";

function InputField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

export default function AthleteForm({
  initialState,
  submitLabel,
  isSubmitting,
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<AthleteInput>(initialState ?? empty);

  const [achievementsText, setAchievementsText] = useState(
    (initialState?.achievements ?? []).join("\n"),
  );

  // update specific field in the form state
  const setValue = <K extends keyof AthleteInput>(
    key: K,
    value: AthleteInput[K],
  ) => setForm((form) => ({ ...form, [key]: value }));

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      ...form,
      nickname: form.nickname?.trim() || undefined,
      imageUrl: form.imageUrl?.trim() || undefined,
      achievements: achievementsText
        .split("\n")
        .map((a) => a.trim())
        .filter(Boolean),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl space-y-4 rounded-2xl border border-(--border) p-6 shadow-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label="First name *">
          <input
            required
            className={inputClass}
            value={form.firstName}
            onChange={(e) => setValue("firstName", e.target.value)}
          />
        </InputField>
        <InputField label="Last name *">
          <input
            required
            className={inputClass}
            value={form.lastName}
            onChange={(e) => setValue("lastName", e.target.value)}
          />
        </InputField>
        <InputField label="Nickname">
          <input
            className={inputClass}
            value={form.nickname ?? ""}
            onChange={(e) => setValue("nickname", e.target.value)}
          />
        </InputField>
        <InputField label="Sport *">
          <input
            required
            className={inputClass}
            value={form.sport}
            onChange={(e) => setValue("sport", e.target.value)}
          />
        </InputField>
        <InputField label="Date of birth *">
          <input
            required
            type="date"
            className={inputClass}
            value={form.dateOfBirth}
            onChange={(e) => setValue("dateOfBirth", e.target.value)}
          />
        </InputField>
        <InputField label="Weight (kg) *">
          <input
            required
            type="number"
            min={1}
            step="0.1"
            className={inputClass}
            value={form.weight || ""}
            onChange={(e) => setValue("weight", Number(e.target.value))}
          />
        </InputField>
      </div>
      <InputField label="Image URL">
        <input
          type="url"
          className={inputClass}
          value={form.imageUrl ?? ""}
          onChange={(e) => setValue("imageUrl", e.target.value)}
        />
      </InputField>
      <InputField label="Achievements (one per line)">
        <textarea
          rows={4}
          className={inputClass}
          value={achievementsText}
          onChange={(e) => setAchievementsText(e.target.value)}
        />
      </InputField>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-(--border) px-4 py-2 text-sm font-medium  hover:scale-102 duration-200 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 rounded-lg bg-(--accent-bg) px-4 py-2 text-sm font-semibold disabled:opacity-60 cursor-pointer hover:scale-102 duration-200"
        >
          {isSubmitting && <LoaderCircle className="size-4 animate-spin" />}
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
