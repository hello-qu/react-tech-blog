import { getAllPostMeta } from "@/lib/posts";
import Link from "next/link";



export default function Home() {


  const postData = getAllPostMeta()

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">My Blog</h1>
      <ul>
        {
          postData.map((post) => (
            <li key={post.slug} className="mb-6">
            <Link href={`/posts/${post.slug}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">
                {post.title}
              </h2>
              </Link>
               <p className="text-sm text-gray-500">{post.excerpt}</p>
               </li>
          ))
        }
      </ul>
    </div>
  );
}
