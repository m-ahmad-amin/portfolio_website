import ExperienceCard from "./ExperienceCard";

export default function ExperienceGallery({ experiences }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}
