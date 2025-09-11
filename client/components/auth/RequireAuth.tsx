import { isVerified } from "@/lib/auth";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const location = useLocation();
  if (!isVerified()) {
    return <Navigate to="/signup" replace state={{ from: location }} />;
  }
  return <>{children}</>;
}
