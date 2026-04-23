import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    setError("");

    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
        return;
      }

      setError("Could not load tasks. Please refresh.");
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;

    setIsSaving(true);
    setError("");

    try {
      await API.post("/tasks", { title: title.trim() });
      setTitle("");
      await fetchTasks();
    } catch {
      setError("Could not add task. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTask = async (id) => {
    setError("");
    try {
      await API.delete(`/tasks/${id}`);
      await fetchTasks();
    } catch {
      setError("Could not delete task.");
    }
  };

  const toggleTask = async (task) => {
    setError("");
    try {
      await API.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });
      await fetchTasks();
    } catch {
      setError("Could not update task status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    let isMounted = true;

    const loadInitialTasks = async () => {
      try {
        const res = await API.get("/tasks");
        if (isMounted) setTasks(res.data);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }

        if (isMounted) {
          setError("Could not load tasks. Please refresh.");
        }
      }
    };

    loadInitialTasks();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] via-[#020617] to-black px-4 py-8">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <header className="mb-8 flex flex-col gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between shadow-xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-white">
              Task Manager
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Stay organized and track your progress
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-white/20 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:bg-red-500/10 hover:border-red-400 hover:text-red-300"
          >
            Logout
          </button>
        </header>

        {/* STATS */}
        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total", value: tasks.length, color: "text-white" },
            { label: "Pending", value: pendingCount, color: "text-yellow-300" },
            { label: "Completed", value: completedCount, color: "text-green-300" },
          ].map((card, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-md hover:scale-[1.02] transition"
            >
              <p className="text-xs uppercase tracking-wider text-slate-400">
                {card.label}
              </p>
              <p className={`mt-3 text-4xl font-extrabold ${card.color}`}>
                {card.value}
              </p>
            </div>
          ))}
        </section>

        {/* ADD TASK */}
        <section className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl shadow-xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/30 focus:border-cyan-400 transition"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />

            <button
              onClick={addTask}
              disabled={isSaving}
              className="rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 px-6 py-3 text-sm font-bold text-black transition hover:scale-105 disabled:opacity-60"
            >
              {isSaving ? "Adding..." : "Add"}
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 border border-red-400/20 px-4 py-2 text-sm text-red-300">
              {error}
            </p>
          )}
        </section>

        {/* TASK LIST */}
        <section className="space-y-4">
          {tasks.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-slate-400 backdrop-blur-xl">
              No tasks yet. Start by adding one.
            </div>
          )}

          {tasks.map((task) => (
            <div
              key={task._id}
              className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:bg-white/10 hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTask(task)}
                  className={`mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center transition ${
                    task.completed
                      ? "bg-green-400 border-green-400"
                      : "border-slate-500 hover:border-cyan-400"
                  }`}
                >
                  {task.completed && (
                    <div className="h-2 w-2 rounded-full bg-black"></div>
                  )}
                </button>

                <div>
                  <p
                    className={`text-sm font-semibold ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-white"
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {task.completed ? "Completed" : "In Progress"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => deleteTask(task._id)}
                className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:border-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                Delete
              </button>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}