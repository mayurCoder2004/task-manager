import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await API.post("/auth/signup", data);

      const loginResponse = await API.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      localStorage.setItem("token", loginResponse.data.token);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      const message =
        requestError?.response?.data || "Signup failed. Please try again.";
      setError(String(message));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-black flex items-center justify-center px-4">
      <div className="grid w-full max-w-6xl gap-12 lg:grid-cols-2 items-center">

        {/* LEFT SIDE */}
        <div className="space-y-6">
          <p className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            Get Started
          </p>

          <h1 className="text-5xl font-extrabold text-white leading-tight">
            Create your account
            <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
              Start organizing today
            </span>
          </h1>

          <p className="text-slate-400 max-w-md">
            Build habits, track tasks, and stay consistent with your daily goals.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl space-y-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-white">Sign up</h2>
            <p className="text-sm text-slate-400">
              Takes less than a minute
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={data.name}
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-400/30 transition"
              required
            />

            <input
              type="email"
              placeholder="Email address"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-400/30 transition"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-400/30 transition"
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
            className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 py-3 font-bold text-black transition hover:scale-[1.02] disabled:opacity-60"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-sm text-slate-400 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-300 font-semibold hover:text-emerald-200"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}