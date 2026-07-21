import type { Project } from "../content";

export function ProjectMedia({
  project,
  emptyLabel = "PLACE IMAGE HERE",
  className = "",
}: {
  project: Project;
  emptyLabel?: string;
  className?: string;
}) {
  const hasImage = Boolean(project.src && !project.src.includes("placeholder"));

  if (hasImage) {
    return <img className={className} src={project.src} alt={project.alt} />;
  }

  return (
    <div className={`image-slot ${className}`} role="img" aria-label={emptyLabel}>
      <span>{emptyLabel}</span>
    </div>
  );
}
