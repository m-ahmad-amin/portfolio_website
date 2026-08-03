import experienceData from "../data/experience.json";
import { resolveImageSrc } from "./projectUtils";

export function normalizeExperience(experience) {
  return {
    ...experience,
    company: experience.company || "",
    date: experience.date || "",
    tag: experience.tag || "",
    bullets: experience.bullets || [],
    techStack: experience.techStack || [],
    liveUrl: experience.liveUrl || "",
    githubUrl: experience.githubUrl || "",
    coverImage: resolveImageSrc(experience.coverImage),
    previewImages: (experience.previewImages || []).map((image) => ({
      ...image,
      src: resolveImageSrc(image.src),
    })),
  };
}

export const experiences = experienceData.experience.map(normalizeExperience);

export function getExperienceById(id) {
  return experiences.find((experience) => experience.id === id);
}
