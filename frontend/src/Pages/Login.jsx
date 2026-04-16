import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function Login() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    try {
      setLoading(true);
      setError("");
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const submitForm = isRegister ? form : { email: form.email, password: form.password };
      const { data } = await API.post(endpoint, submitForm);
      localStorage.setItem("token", data.token);
      navigate("/");
      console.log("Login/Register success, token set");
    } catch (e) {
      console.error("Login/Register error:", e.response || e);
      setError(e.response?.data?.message || "Operation failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6 text-center">
          Notes App
        </h1>
        <div className="space-y-4">
          {isRegister && (
            <input 
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Full Name" 
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}
          <input 
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
            placeholder="Email" 
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input 
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
            type="password" 
            placeholder="Password" 
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl text-sm">{error}</div>}
          <button 
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={submit}
          >
            {isRegister ? "Register" : "Login"}
            {loading && <div className="text-indigo-600 text-sm animate-pulse">Processing...</div>}
          </button>
        </div>
        <button 
          className="w-full mt-4 text-indigo-600 hover:text-indigo-700 font-medium text-sm p-2 transition-colors"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have account? Login" : "Need account? Register"}
        </button>
      </div>
    </div>
  );
}
