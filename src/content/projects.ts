export type Project = {
  slug: string;
  title: string;
  year: string;
  summary: string;
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
};

export const defaultProjects: Project[] = [
  {
    slug: "Chatbot",
    title: "JK Police Chatbot",
    year: "2026",
    summary: "A spatial dashboard for distributed engineering teams.",
    description:
      "Atlas reimagines the engineering dashboard as a living map of services, owners, and incidents. Built for teams that want a single, calm surface to understand their system.",
    tech: ["TypeScript", "React", "PostgreSQL", "WebSockets"],
    live: "https://example.com",
  },
  {
    slug: "CarRental",
    title: "Car Rental System",
    year: "2025-2026",
    summary: "A long-form reading and annotation tool with shared margins.",
    description:
      "Marginalia turns reading into a quiet, communal activity. Highlight, annotate, and discover what other careful readers found in the same paragraph.",
    tech: ["Next.js", "Tailwind", "Supabase"],
    repo: "https://github.com",
  },
  {
    slug: "EcommercePlatform",
    title: "E-commerce Platform",
    year: "2024",
    summary: "A modern e-commerce solution for online businesses.",
    description:
      "A feature-rich e-commerce platform designed to help online businesses manage their inventory, process orders, and provide a seamless shopping experience.",
    tech: ["TypeScript", "SQLite", "Tauri"],
  },
  {
    slug: "URLShortener",
    title: "URL Shortener",
    year: "2023",
    summary: "A simple URL shortening service.",
    description:
      "A lightweight URL shortening service that allows users to create shortened links for easy sharing.",
    tech: ["Node.js", "Express", "MongoDB"],
  },
];
