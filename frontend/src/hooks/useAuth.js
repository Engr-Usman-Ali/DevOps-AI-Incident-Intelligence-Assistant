import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate("/signin");
  };

  return {
    ...auth,
    logout,
  };
}