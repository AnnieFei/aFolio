"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { portfolioContent, type Project } from "../content";
import { LampRig } from "./LampRig";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectDialog } from "./ProjectDialog";

const sections = ["about", "work", "experience", "skills", "archive", "experiments", "collage", "contact", "closing"] as const;

function ImageSlot({ label = "PLACE IMAGE HERE", className = "" }: { label?: string; className?: string }) {
  return <div className={`image-slot ${className}`} role="img" aria-label={label}><span>{label}</span></div>;
}

function Rings() {
  return <div className="binder-spine" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <span className="ring-window" key={index}><img src="/assets/binder-ring-reference.png" alt="" /></span>)}</div>;
}

function Spread({ id, index, label, children, onTurn }: { id: string; index: number; label: string; children: React.ReactNode; onTurn: (direction: -1 | 1) => void }) {
  const click = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button, a")) return;
    const rect = event.currentTarget.getBoundingClientRect();
    onTurn(event.clientX < rect.left + rect.width / 2 ? -1 : 1);
  };
  return <section id={id} className={`binder-spread ${id}-spread`} onClick={click} aria-label={`${label}. Click the left or right page to turn.`}>
    <Rings />{children}<div className="spread-plastic-sheet" aria-hidden="true" />
  </section>;
}

function MediaButton({ item, className, onOpen, label = "PLACE IMAGE HERE" }: { item: Project; className: string; onOpen: (project: Project) => void; label?: string }) {
  return <button className={`collage-item ${className}`} onClick={() => onOpen(item)} aria-label={`Open ${item.title}`}><ProjectMedia project={item} emptyLabel={label} /></button>;
}

export function PortfolioExperience() {
  const [opened, setOpened] = useState(false);
  const [page, setPage] = useState(0);
  const [turning, setTurning] = useState<{ direction: "next" | "prev"; target: number } | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const timers = useRef<number[]>([]);
  const turnLock = useRef(false);
  const openProject = useCallback((project: Project) => setSelected(project), []);

  const turn = useCallback((direction: -1 | 1) => {
    if (turnLock.current || turning || selected) return;
    const target = page + direction;
    if (target < 0) { setOpened(false); return; }
    if (target >= sections.length) return;
    turnLock.current = true;
    setTurning({ direction: direction === 1 ? "next" : "prev", target });
    timers.current.push(window.setTimeout(() => setPage(target), 350));
    timers.current.push(window.setTimeout(() => { setTurning(null); turnLock.current = false; }, 720));
  }, [page, selected, turning]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);
  useEffect(() => {
    const key = (event: KeyboardEvent) => {
      if (!opened || selected) return;
      if (event.key === "ArrowRight" || event.key === "PageDown") turn(1);
      if (event.key === "ArrowLeft" || event.key === "PageUp") turn(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [opened, selected, turn]);

  const common = { index: page, label: sections[page], onTurn: turn };
  let spread: React.ReactNode;
  if (page === 0) spread = <Spread id="about" {...common}><div className="page page-left portrait-page"><h1 className="visually-hidden">About Annie</h1><figure className="passport"><ImageSlot label="PLACE PORTRAIT HERE" /></figure></div><div className="page page-right profile-page"><header><p>Personal file / current</p><h2>Annie<br />Fei</h2></header><div className="profile-grid"><dl><div><dt>Email</dt><dd>{portfolioContent.person.email}</dd></div><div><dt>Location</dt><dd>{portfolioContent.person.location}</dd></div><div><dt>Focus</dt><dd>{portfolioContent.person.focus}</dd></div></dl><div><p className="bio">{portfolioContent.person.bio}</p><p>{portfolioContent.person.availability}</p></div></div></div></Spread>;
  else if (page === 1) spread = <Spread id="work" {...common}><div className="page page-left work-page"><h2>Selected<br />work</h2><MediaButton item={portfolioContent.projects[0]} className="project-a" onOpen={openProject} /><MediaButton item={portfolioContent.projects[2]} className="project-c" onOpen={openProject} /></div><div className="page page-right work-page"><MediaButton item={portfolioContent.projects[1]} className="project-b" onOpen={openProject} /></div></Spread>;
  else if (page === 2) spread = <Spread id="experience" {...common}><div className="page page-left record-page"><h2>Experience</h2>{portfolioContent.experience.map((item, index) => <article className="record" key={index}><span>0{index + 1}</span><header><h3>{item.organization}</h3><p>{item.role}</p></header><p>{item.dates}<br />{item.location}</p><p>{item.description}</p></article>)}</div><div className="page page-right record-page"><h2>Education</h2>{portfolioContent.education.map((item, index) => <article className="record" key={index}><span>E{index + 1}</span><header><h3>{item.organization}</h3><p>{item.role}</p></header><p>{item.dates}<br />{item.location}</p><p>{item.description}</p></article>)}</div></Spread>;
  else if (page === 3) spread = <Spread id="skills" {...common}><div className="page page-left index-cover"><p>Index divider</p><h2>Skills &amp;<br />capabilities</h2></div><div className="page page-right skill-index">{Object.entries(portfolioContent.skills).map(([group, skills], index) => <section key={group}><span>0{index + 1}</span><h3>{group.replace(/([A-Z])/g, " $1")}</h3><ul>{skills.map((skill, i) => <li key={i}>{skill}</li>)}</ul></section>)}</div></Spread>;
  else if (page === 4) spread = <Spread id="archive" {...common}><div className="page page-left archive-page"><h2>Image<br />archive</h2><p>Reserved for monochrome and colour studies.</p><MediaButton item={portfolioContent.archive[0] as Project} className="archive-a" onOpen={openProject} /></div><div className="page page-right archive-page"><MediaButton item={portfolioContent.archive[1] as Project} className="archive-b" onOpen={openProject} /><MediaButton item={portfolioContent.archive[2] as Project} className="archive-c" onOpen={openProject} /></div></Spread>;
  else if (page === 5) spread = <Spread id="experiments" {...common}><div className="page page-left experiment-image"><ImageSlot label="PLACE PROCESS IMAGE HERE" /></div><div className="page page-right experiment-list"><h2>Studies,<br />experiments,<br />process.</h2>{portfolioContent.experiments.map((item) => <article key={item.label}><span>{item.label}</span><div><small>{item.type}</small><h3>{item.title}</h3><p>{item.note}</p></div></article>)}</div></Spread>;
  else if (page === 6) {
    const collageItems = [...portfolioContent.projects, ...portfolioContent.archive.slice(0, 2)] as Project[];
    spread = <Spread id="collage" {...common}><div className="page page-left collage-page"><MediaButton item={collageItems[0]} className="sticker-one" onOpen={openProject} /><MediaButton item={collageItems[1]} className="sticker-two" onOpen={openProject} /><MediaButton item={collageItems[2]} className="sticker-three" onOpen={openProject} /></div><div className="page page-right collage-page"><MediaButton item={collageItems[3]} className="sticker-four" onOpen={openProject} /><MediaButton item={collageItems[4]} className="sticker-five" onOpen={openProject} /></div></Spread>;
  }
  else if (page === 7) spread = <Spread id="contact" {...common}><div className="page page-left contact-portrait"><ImageSlot label="PLACE FINAL IMAGE HERE" /></div><div className="page page-right contact-page"><p>Final insert</p><h2>Let&apos;s make<br />something<br />considered.</h2><p>{portfolioContent.contact.statement}</p><dl><div><dt>Email</dt><dd>{portfolioContent.contact.email}</dd></div><div><dt>Location</dt><dd>{portfolioContent.contact.location}</dd></div></dl></div></Spread>;
  else spread = <section className="closing-scene" aria-label="Thank you. Click to close the binder." onClick={() => { setOpened(false); setPage(0); }}><div className="closing-cover"><img className="closing-hardware" src="/assets/cover-ring-sticker.png" alt="Four silver binder rings" /><h2>Thank you</h2><span className="closing-plastic-sheet" aria-hidden="true" /></div></section>;

  return <main className={`portfolio ${opened ? "is-open" : ""}`}><div className="room-light" aria-hidden="true" /><LampRig open={opened} />
    {!opened && <section className="cover-scene"><button className="binder-cover" onClick={() => setOpened(true)} aria-label="Open portfolio binder"><img className="cover-hardware" src="/assets/cover-ring-sticker.png" alt="Four silver binder rings" /><span className="cover-pocket"><b>Annie Fei</b></span><span className="cover-plastic-sheet" aria-hidden="true" /></button></section>}
    {opened && <div className={`open-binder ${turning ? `turn-${turning.direction}` : ""}`}>{page < sections.length - 1 && <div className="plastic-backing" aria-hidden="true" />}{spread}{turning && <div className="turning-sheet" aria-hidden="true"><span /></div>}</div>}
    <ProjectDialog project={selected} onClose={() => setSelected(null)} />
  </main>;
}
