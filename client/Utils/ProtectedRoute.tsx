"use client";

import { Loader } from "@/components/layout/Loader";
import { useAuth } from "./Auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/feed");
      //   toast.error("Please login to access this page");
    }
  }, [isAuthenticated, router]);

  // Render children only if the user is authenticated
  if (!isAuthenticated) {
    return <Loader />; // Optionally show a loading spinner while redirecting
  }

  return <>{children}</>;
}
