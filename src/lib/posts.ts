import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags?: string[];
};

const postDir = path.join(process.cwd(), "src/content");



export function getAllPostMeta() {
  const files = fs.readdirSync(postDir)
  return files.map((filename) => {
    const filePath = path.join(postDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug:filename.replace(/\.mdx$/,''),
      ...data
    } as PostMeta
  });
}
