import Link from "next/link";
import { BlogQueryResult } from "../lib/types";
import { contentfulClient } from "@/lib/functions/createClient";
import { renderTags, getAllTags } from "@/lib/functions/tagFunction";

const client = contentfulClient;


const getBlogEntries = async (): Promise<BlogQueryResult> => {
    const entries = await client.getEntries({ content_type: "blog", order: ['-fields.date'] });
    return entries as unknown as BlogQueryResult;
  }
  
  export default async function Aside() {
    const blogEntries = await getBlogEntries();
    const limitedBlogEntries = blogEntries.items.slice(0, 4);
    const allTags = getAllTags(blogEntries.items);

    return (
        <div>
        <div className="flex-col py-12 gap-y-8 md:sticky md:top-0 md:flex md:min-h-screen  ">
          <span className="flex content-between items-center gap-3">
            <h3 className="text-xl font-bold">Recent Posts</h3>
            <hr className="border-[#ff46569d] border-2 w-full"/>
            </span>
                {limitedBlogEntries.map((singlePost) => {
                const { slug, title, image } = singlePost.fields;
                return (
                <div key={slug}>
                     <Link className="group flex justify-center items-center" href={`/articles/${slug}`}>
                    <span className="w-1/4">
                        <img className="rounded-sm mb-1"
                             src={`https:${image.fields.file.url}`}
                            alt={title}
                        />
                    </span>
                    <span className="w-3/4 ml-4">
                        <h4 className="truncate overflow-hidden font-bold text-md text-left underline decoration-transparent transition-colors duration-300 hover:decoration-[#ff46569d] md:whitespace-normal">
                        {title}
                        </h4>
                        <span className="flex gap-1">
                        </span>
                    </span>
                    </Link>
                </div>
              );
            })}
          <div> 
          <span className="flex content-between items-center gap-3 mb-8">
            <h3 className="text-xl font-bold">Tags</h3>
            <hr className="border-[#ff46569d] border-2 w-full"/>
            </span>
             <ul className="grid grid-cols-3 gap-1 justify-items-center">
              {allTags.map((tag, index) => (
                  <li key={index}>
                  {renderTags([tag])}
                  </li>
              ))}
            </ul> 
        </div> 
      </div>
    </div>
  );
}