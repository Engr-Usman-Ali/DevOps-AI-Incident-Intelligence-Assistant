import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { getCurrentUser } from "../services/userService";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setAuthorized(false);
      setLoading(false);
      return;
    }

    try {
      await getCurrentUser();
      setAuthorized(true);
    } catch (error) {
      localStorage.removeItem("access_token");
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader2 className="animate-spin text-cyan-500" size={45} />;
  }

  if (!authorized) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}
