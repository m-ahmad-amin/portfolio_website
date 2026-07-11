import projectsData from "../data/projects.json";

const assetImages = import.meta.glob("../assets/images/*.{png,jpg,jpeg,webp,svg,gif}", {
  eager: true,
  import: "default",
});

export function resolveImageSrc(src) {
  if (!src) return "";

  if (src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/")) {
    return src;
  }

  const assetPath = `../assets/images/${src}`;
  if (assetImages[assetPath]) {
    return assetImages[assetPath];
  }

  return `/images/${src}`;
}

export function normalizeProject(project) {
  return {
    ...project,
    coverImage: resolveImageSrc(project.coverImage),
    previewImages: (project.previewImages || []).map((image) => ({
      ...image,
      src: resolveImageSrc(image.src),
    })),
  };
}

export const projects = projectsData.projects.map(normalizeProject);

export function getProjectById(id) {
  return projects.find((project) => project.id === id);
}
