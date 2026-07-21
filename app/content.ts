export type MediaItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  description: string;
  tone?: "mono" | "colour";
};

export const portfolioContent = {
  person: {
    name: "Annie Fei",
    portrait: "/images/portrait-placeholder.png",
    portraitAlt: "[PORTRAIT]",
    bio: "[SHORT BIO]",
    email: "[EMAIL]",
    location: "[LOCATION]",
    focus: "[CURRENT FOCUS]",
    availability: "[AVAILABILITY]",
    links: ["[SOCIAL LINK]", "[SOCIAL LINK]"],
  },
  projects: [
    {
      id: "project-01",
      src: "/images/editorial-placeholder.png",
      alt: "[COLOUR IMAGE]",
      title: "[PROJECT TITLE]",
      subtitle: "[PROJECT SUBTITLE]",
      description: "[PROJECT DESCRIPTION]",
      role: "[ROLE]",
      year: "[YEAR]",
      tools: "[TOOLS]",
    },
    {
      id: "project-02",
      src: "/images/archive-placeholder.png",
      alt: "[IMAGE]",
      title: "[PROJECT TITLE]",
      subtitle: "[PROJECT SUBTITLE]",
      description: "[PROJECT DESCRIPTION]",
      role: "[ROLE]",
      year: "[YEAR]",
      tools: "[TOOLS]",
    },
    {
      id: "project-03",
      src: "/images/portrait-placeholder.png",
      alt: "[BLACK-AND-WHITE IMAGE]",
      title: "[PROJECT TITLE]",
      subtitle: "[PROJECT SUBTITLE]",
      description: "[PROJECT DESCRIPTION]",
      role: "[ROLE]",
      year: "[YEAR]",
      tools: "[TOOLS]",
    },
  ],
  experience: [
    { organization: "[ORGANIZATION]", role: "[ROLE]", dates: "[DATES]", location: "[LOCATION]", description: "[DESCRIPTION]", disciplines: "[TOOLS / DISCIPLINES]" },
    { organization: "[ORGANIZATION]", role: "[ROLE]", dates: "[DATES]", location: "[LOCATION]", description: "[DESCRIPTION]", disciplines: "[TOOLS / DISCIPLINES]" },
  ],
  education: [
    { organization: "[EDUCATION]", role: "[QUALIFICATION]", dates: "[DATES]", location: "[LOCATION]", description: "[DESCRIPTION]", disciplines: "[DISCIPLINES]" },
  ],
  skills: {
    development: ["[SKILL]", "[SKILL]", "[SKILL]", "[SKILL]"],
    creativeCoding: ["[SKILL]", "[SKILL]", "[SKILL]"],
    design: ["[SKILL]", "[SKILL]", "[SKILL]"],
    tools: ["[TOOL]", "[TOOL]", "[TOOL]", "[TOOL]"],
    interests: ["[INTEREST]", "[INTEREST]", "[INTEREST]"],
  },
  archive: [
    { id: "archive-01", src: "/images/portrait-placeholder.png", alt: "[BLACK-AND-WHITE IMAGE]", title: "[IMAGE TITLE]", subtitle: "[IMAGE SUBTITLE]", description: "[IMAGE DESCRIPTION]", role: "[TYPE]", year: "[YEAR]", tools: "[FORMAT]", tone: "mono" },
    { id: "archive-02", src: "/images/editorial-placeholder.png", alt: "[COLOUR IMAGE]", title: "[IMAGE TITLE]", subtitle: "[IMAGE SUBTITLE]", description: "[IMAGE DESCRIPTION]", role: "[TYPE]", year: "[YEAR]", tools: "[FORMAT]", tone: "mono" },
    { id: "archive-03", src: "/images/archive-placeholder.png", alt: "[COLOUR IMAGE]", title: "[IMAGE TITLE]", subtitle: "[IMAGE SUBTITLE]", description: "[IMAGE DESCRIPTION]", role: "[TYPE]", year: "[YEAR]", tools: "[FORMAT]", tone: "mono" },
  ] satisfies MediaItem[],
  experiments: [
    { label: "01", type: "[CANVAS STUDY]", title: "[EXPERIMENT TITLE]", note: "[SHORT DESCRIPTION]" },
    { label: "02", type: "[THREE.JS STUDY]", title: "[EXPERIMENT TITLE]", note: "[SHORT DESCRIPTION]" },
    { label: "03", type: "[PROCESS MATERIAL]", title: "[EXPERIMENT TITLE]", note: "[SHORT DESCRIPTION]" },
  ],
  contact: {
    statement: "[SHORT CONTACT STATEMENT]",
    email: "[EMAIL]",
    location: "[LOCATION]",
    resume: "[RÉSUMÉ DOWNLOAD]",
    links: ["[SOCIAL LINK]", "[SOCIAL LINK]"],
  },
};

export type Project = (typeof portfolioContent.projects)[number];
