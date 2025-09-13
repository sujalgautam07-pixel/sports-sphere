import { isVerified } from "@/lib/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireAuth() {
  const location = useLocation();
  if (!isVerified()) {
    return <Navigate to="/signup" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
