import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import fs from "node:fs";
import path from "node:path";
import remarkGfm from "remark-gfm";

export async function generateStaticParams() {
  const postDir = path.join(process.cwd(), "src/content");
  const files = fs.readdirSync(postDir);
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export default async function PostPage({params}:{ params: { slug: string } }) {
  const {slug} = await params
  const filePath = path.join(
    process.cwd(),
    "src/content",
    `${slug}.mdx`
  );
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  return (
    <article className="prose prose-neutral dark:prose-invert max-w-2xl mx-auto py-10 px-4">
      <h1 className="mb-2">{data.title}</h1>
      <p className="text-gray-500 text-sm mb-6">{data.date}</p>

      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      ></MDXRemote>
    </article>
  );
}
