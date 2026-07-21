"use client";
import { useEffect, useRef } from "react";
import type { Project } from "../content";
import { ProjectMedia } from "./ProjectMedia";

export function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!project) return;
    const key = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", key); closeRef.current?.focus();
    return () => document.removeEventListener("keydown", key);
  }, [project, onClose]);
  if (!project) return null;
  return <div className="detail-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><article className="project-detail" role="dialog" aria-modal="true" aria-labelledby="project-title"><button ref={closeRef} className="detail-close" onClick={onClose}>Close</button><div className="detail-image"><ProjectMedia project={project} emptyLabel="PLACE PROJECT IMAGE HERE" /></div><div className="detail-copy"><p>Selected material / {project.year}</p><h2 id="project-title">{project.title}</h2><p>{project.subtitle}</p><p>{project.description}</p><dl><div><dt>Role</dt><dd>{project.role}</dd></div><div><dt>Tools</dt><dd>{project.tools}</dd></div></dl></div></article></div>;
}
