import BlogPageLayout from "@/components/BlogPageLayout";
import { BLOGS_DATA } from "@/app/data/blogs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Generate static routes for each slug in BLOGS_DATA
export async function generateStaticParams() {
  return Object.keys(BLOGS_DATA).map((slug) => ({
    slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Dynamically generate SEO metadata for each blog
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const data = BLOGS_DATA[slug];
  if (!data) return {};
  
  return {
    title: `${data.title} | Zenora`,
    description: data.excerpt,
    alternates: {
      canonical: `https://www.zenoravillas.in/blog/${slug}`,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const data = BLOGS_DATA[slug];
  
  if (!data) {
    notFound();
  }

  return (
    <BlogPageLayout
      tag={data.tag}
      title={data.title}
      excerpt={data.excerpt}
      time={data.time}
      img={data.img}
    >
      {data.content}
    </BlogPageLayout>
  );
}
