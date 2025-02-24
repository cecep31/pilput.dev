"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { postsStore } from "@/stores/postsStorage";
import { getProfilePicture } from "@/utils/getImage";
import { useEffect, useState } from "react";
import Link from "next/link";
import ActionComponent from "@/components/post/dashboard/action";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Posts() {
  const limit = 10;
  const [Offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const poststore = postsStore();
  const totalPages = Math.ceil(poststore.total / limit);
  const currentPage = Math.floor(Offset / limit) + 1;

  useEffect(() => {
    poststore.fetch(limit, Offset);
  }, [Offset]);

  function changeOffset(newOffset: number) {
    if (newOffset >= 0 && newOffset < poststore.total) {
      setOffset(newOffset);
    }
  }

  const refetchPosts = () => {
    poststore.fetch(limit, Offset);
  };

  const filteredPosts = poststore.posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      status === "all" ||
      (status === "published" && post.published) ||
      (status === "draft" && !post.published);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mx-auto p-8">
      <Card className="">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Posts</CardTitle>
            <Link href="/dashboard/posts/create">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add new post
              </Button>
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Posts</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>Total {poststore.total} posts found</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="w-[40%]">Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">
                    {poststore.posts.indexOf(post) + 1 + Offset}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={getProfilePicture(post.creator.image)}
                          alt={`@${post.creator.username}`}
                        />
                        <AvatarFallback>
                          {post.creator.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {post.creator?.first_name} {post.creator?.last_name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          @{post.creator.username}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium line-clamp-2">{post.title}</div>
                  </TableCell>
                  <TableCell>
                    {post.published ? (
                      <Badge variant="default" className="bg-green-500">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {format(post.created_at, "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <ActionComponent post={post} refetchPosts={refetchPosts} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {Offset + 1} to{" "}
              {Math.min(Offset + limit, poststore.total)} of {poststore.total}{" "}
              posts
            </div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => changeOffset(Offset - limit)}
                    className="cursor-pointer"
                    aria-disabled={Offset === 0}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => {
                  const pageOffset = index * limit;
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        className="cursor-pointer"
                        onClick={() => changeOffset(pageOffset)}
                        isActive={Offset === pageOffset}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext
                    className="cursor-pointer"
                    onClick={() => changeOffset(Offset + limit)}
                    aria-disabled={Offset + limit >= poststore.total}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
