import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      const message =
        requestError?.response?.data || "Login failed. Please try again.";
      setError(String(message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#020617] to-black flex items-center justify-center px-4">
      <div className="grid w-full max-w-6xl gap-12 lg:grid-cols-2 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Task Manager
          </p>

          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Welcome back
            <span className="block bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Let’s get things done
            </span>
          </h1>

          <p className="text-slate-400 max-w-md">
            Sign in to manage your tasks, track progress, and stay productive every day.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-white">Login</h2>
            <p className="text-sm text-slate-400">
              Enter your credentials to continue
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email address"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 transition"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-300 bg-red-500/10 border border-red-400/20 px-4 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 py-3 font-bold text-black transition hover:scale-[1.02] disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>

          <p className="text-sm text-slate-400 text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-cyan-300 font-semibold hover:text-cyan-200"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}