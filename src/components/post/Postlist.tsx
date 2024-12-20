import Link from "next/link";
import { Button } from "@/components/ui/button";
import WordLimit from "@/components/word/WordLimit";
import Image from "next/image";
import { getProfilePicture, getUrlImage } from "@/utils/getImage";
import { format } from "date-fns";

const Postlist = ({ post }: { post: Post }) => {
  const plaintext = post.body.replace(/(<([^>]+)>)/gi, " ");
  return (
    <div className="mt-4 px-5 py-5 bg-gray-50 dark:bg-slate-800 border dark:border-gray-700 text-gray-600 shadow-md rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <div>
          {post.creator?.image && (
            <a href={`/${post.creator.username}`}>
              <img
                className="rounded-full object-cover h-7 w-7 hover:ring-2 ring-blue-500"
                src={getProfilePicture(post.creator?.image)}
                width={50}
                height={50}
                loading="lazy"
                alt={post.creator?.first_name}
              />
            </a>
          )}
        </div>
        <div className="font-bold dark:text-gray-400">
          {post.creator?.first_name} {post.creator?.last_name}
        </div>
        <div>{format(post.created_at, "dd MMM yyyy")}</div>
      </div>
      <div className="flex gap-3">
        {post.photo_url && (
          <Image
            className="object-cover mx-auto rounded-md"
            src={getUrlImage(post.photo_url)}
            alt={post.title}
            width={150}
            height={150}
          />
        )}
        <div className="px-4">
          <Link href={`/${post.creator.username}/${post.slug}`}>
            <span className="font-bold capitalize text-xl dark:text-gray-300 hover:underline">
              {post.title}
            </span>
          </Link>
          <p className=" dark:text-gray-400">
            <WordLimit text={plaintext} limit={50} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Postlist;
