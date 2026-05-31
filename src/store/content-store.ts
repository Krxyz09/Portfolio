import { create } from "zustand";
import { defaultProfile, type Profile } from "@/content/profile";
import { defaultSkills, type SkillGroup } from "@/content/skills";
import { defaultProjects, type Project } from "@/content/projects";

type ContentState = {
  profile: Profile;
  skills: SkillGroup[];
  projects: Project[];
  setProfile: (p: Profile) => void;
  setSkills: (s: SkillGroup[]) => void;
  setProjects: (p: Project[]) => void;
  reset: () => void;
};

export const useContentStore = create<ContentState>((set) => ({
  profile: defaultProfile,
  skills: defaultSkills,
  projects: defaultProjects,
  setProfile: (profile) => set({ profile }),
  setSkills: (skills) => set({ skills }),
  setProjects: (projects) => set({ projects }),
  reset: () =>
    set({
      profile: defaultProfile,
      skills: defaultSkills,
      projects: defaultProjects,
    }),
}));
