import Navigation from "@/components/header/Navbar";
import { getData } from "@/utils/fetch";
import React from "react";

async function getpost(id: string) {
  const res = await getData("/posts/" + id);
  return res.data;
}
const page = async ({ params }: { params: { page: string } }) => {
  const data = await getpost(params.page);
  return (
    <>
      <div className="mx-auto p-3 max-w-2xl min-h-screen">
        <div className="border-b-2">
          <h2 className="text-2xl max-w-2xl mx-auto my-7 font-bold">
            {data.title}
          </h2>
        </div>
        <div className="my-10 mx-auto flex justify-center ">
          {/* {data.body} */}
          <div
            className="prose"
            dangerouslySetInnerHTML={{ __html: data.body }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default page;
