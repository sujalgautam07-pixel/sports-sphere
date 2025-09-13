import { isVerified } from "@/lib/auth";
import { Navigate } from "react-router-dom";

export default function Gate() {
  const verified = isVerified();
  return <Navigate to={verified ? "/home" : "/signup"} replace />;
}
