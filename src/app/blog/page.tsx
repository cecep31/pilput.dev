"use client";
import React, { useEffect, useState } from "react";
import Postlist from "@/components/post/Postlist";
import Postlistpulse from "@/components/post/postlistpulse";
import { axiosInstence } from "@/utils/fetch";
import { toast } from "react-hot-toast";
import Navigation from "@/components/header/Navbar";

const Blog = () => {
  const [posts, setposts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [endPage, setendPage] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      if (endPage) return;
      setIsLoading(true);
      try {
        const { data } = await axiosInstence.get("/v1/posts", {
          params: { limit: 6, offset: page * 6 },
        });
        console.log(data);
        
        setposts(page === 0 ? data.data : [...posts, ...data.data]);
        setendPage(data.total === posts.length);
      } catch (error) {
        toast.error("Error checking connection");
      }
      setIsLoading(false);
    }
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight ||
        isLoading
      ) {
        return;
      }
      setPage((prevPage) => prevPage + 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <>
      <Navigation />
      <div className="mx-auto max-w-7xl min-h-screen mt-5">
        <h2 className="text-2xl font-semibold">Posts</h2>
        <div className="mb-10">
          {posts.map((post: Post) => (
            <Postlist key={post.id} post={post} />
          ))}
          {isLoading && <Postlistpulse />}
        </div>
      </div>
    </>
  );
};

export default Blog;
