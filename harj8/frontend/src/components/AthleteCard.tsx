import { Trophy, Weight, Cake } from "lucide-react";
import type { Athlete } from "../utils/types";
import { calculateAge } from "../utils/athleteUtils";

type Props = {
  athlete: Athlete;
};

export default function AthleteCard({ athlete }: Props) {
  const {
    firstName,
    lastName,
    nickname,
    dateOfBirth,
    weight,
    imageUrl,
    sport,
    achievements,
  } = athlete;

  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase(); // used when no image is available

  return (
    <div
      className="group w-full max-w-sm overflow-hidden rounded-2xl border border-(--border) shadow-sm transition hover:scale-102 duration-200"
      title={`Click to edit`}
    >
      <div className="relative h-60 bg-linear-to-br from-(--bg) to-(--accent-bg)">
        {/* If an image URL is available, display the image; otherwise, display initials */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${firstName} ${lastName} image`}
            className="h-full w-full object-scale-down"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-6xl font-bold text-white/80">
            {initials}
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold bg-(--surface) text-(--text) shadow">
          {sport}
        </span>
      </div>

      {/* Athlete details*/}
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xl font-bold">
            {firstName} {lastName}
          </p>
          {nickname && (
            <p className="text-sm italic text-(--text-muted)">“{nickname}”</p>
          )}
        </div>

        {/* Age and weight*/}
        <div className="flex gap-4 text-sm text-(--text-muted)">
          <span className="flex items-center gap-1.5">
            <Cake className="size-4 text-blue-500" />
            {calculateAge(dateOfBirth)} yrs
          </span>
          <span className="flex items-center gap-1.5">
            <Weight className="size-4 text-blue-500" />
            {weight} kg
          </span>
        </div>

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <div className="flex flex-col border-t border-(--border) pt-4">
            {achievements.map((achv) => (
              <div
                key={achv}
                className="flex items-start gap-2 text-sm text-(--text-muted)"
              >
                <Trophy className="mt-0.5 size-4 shrink-0 text-yellow-500" />
                {achv}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
