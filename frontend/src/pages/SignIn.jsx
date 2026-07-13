import AuthCard from "../components/auth/AuthCard";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

      <AuthCard mode="signin" />

    </div>
  );
}