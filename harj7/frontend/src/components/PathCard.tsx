import { NavLink } from "react-router";

type PathCardProps = {
  title: string;
  description: string;
  icon?: React.ReactNode;
  path: string;
};

export default function PathCard({
  title,
  description,
  path,
  icon,
}: PathCardProps) {
  return (
    <NavLink
      to={path}
      className="flex flex-col border p-4 rounded border-(--border) w-full"
    >
      <div className="flex flex-row items-center gap-2">
        {icon} <p className="font-bold text-2xl">{title}</p>
      </div>
      <p className="text-lg text-(--text-muted)">{description}</p>
    </NavLink>
  );
}
