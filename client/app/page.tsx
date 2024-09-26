"use client";

import Hero from "@/components/home/Hero";
import { useAuth } from "@/Utils/Auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/feed");
    }
  }, [isAuthenticated]);

  return <Hero />;
};

export default HomePage;
