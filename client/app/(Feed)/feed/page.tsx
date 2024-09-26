"use client";

import Sidebar from "@/components/feed/Sidebar";
import { Loader } from "@/components/layout/Loader";
import { useGetUniversalFeedQuery } from "@/redux/services/UserAPI";
import ProtectedRoute from "@/Utils/ProtectedRoute";
import SingleFeedCard from "@/components/feed/SingleFeedCard";

const FeedPage = () => {
  const { data, isLoading, refetch } = useGetUniversalFeedQuery();

  if (isLoading) return <Loader />;

  return (
    <ProtectedRoute>
      <div className="flex flex-col justify-start items-end w-full relative">
        <div className="sidebar-container absolute top-0 left-0 bg-white w-[20%] h-screen shadow-lg">
          <Sidebar />
        </div>

        <div className="feed-content-container flex flex-col justify-start items-center w-[80%] h-screen overflow-y-scroll bg-slate-100 p-8">
          {data?.feed.map((post) => (
            <SingleFeedCard key={post._id} {...post} refetch={refetch} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default FeedPage;
