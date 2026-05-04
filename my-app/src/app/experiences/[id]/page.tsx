import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperienceCard } from "@/components/ExperienceCard";
import { experiences } from "@/data/experiences";
import { routes } from "@/data/routes";

type ExperienceDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === id);

  if (!experience) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <Link href={routes.experiences} className="inline-block text-sm font-semibold text-sky-700 hover:underline">
        Back to all experiences
      </Link>
      <h1 className="text-3xl font-black text-slate-900">Experience Details</h1>
      <div className="max-w-2xl">
        <ExperienceCard experience={experience} showFullDetails />
      </div>
    </section>
  );
}
