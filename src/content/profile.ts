export type Profile = {
  name: string;
  shortName: string;
  tagline: string;
  location: string;
  bio: string[];
  email: string;
  socials: { label: string; href: string }[];
};

export const defaultProfile: Profile = {
  name: "Krish Jindal",
  shortName: "Krish",
  tagline: "Building scalable web applications and intelligent systems.",
  location: "Punjab, India",
  bio: [
    "I'm Krish, a full-stack developer and machine learning enthusiast who enjoys building products that blend great user experiences with solid engineering.",
    "I love taking ideas from a blank page to a working product—designing interfaces, building backend systems, working with data, and deploying applications that people can actually use.",
    "Right now, I'm focused on growing as a software engineer, exploring AI, and building projects that challenge me to think bigger. Every project is an opportunity to learn, experiment, and create something impactful.",
  ],
  email: "jindalkrish25@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/Krxyz09" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/krish-jindal-0417002aa/" },
    { label: "Instagram", href: "https://www.instagram.com/jindalkrish25/" },
  ],
};
