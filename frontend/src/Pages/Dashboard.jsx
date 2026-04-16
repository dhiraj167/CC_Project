import { useState, useEffect } from "react";
import API from "../api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await API.get("/notes");
      const pinnedFirst = data.sort((a, b) => b.pinned - a.pinned);
      setNotes(pinnedFirst);
    } catch (e) {
      setError("Failed to fetch notes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingId) {
        res = await API.put(`/notes/${editingId}`, form);
        setEditingId(null);
      } else {
        res = await API.post("/notes", form);
      }
      setForm({ title: "", content: "" });
      fetchNotes();
    } catch (e) {
      setError("Operation failed");
    }
  };

  const deleteNote = async (id) => {
    if (!confirm("Delete this note?")) return;
    try {
      await API.delete(`/notes/${id}`);
      fetchNotes();
    } catch (e) {
      setError("Delete failed");
    }
  };

  const togglePin = async (id, pinned) => {
    try {
      await API.put(`/notes/${id}`, { pinned: !pinned });
      fetchNotes();
    } catch (e) {
      setError("Pin toggle failed");
    }
  };

  const editNote = (note) => {
    setForm({ title: note.title, content: note.content });
    setEditingId(note._id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <header className="max-w-4xl mx-auto mb-8 flex justify-between items-center bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-600 to-slate-700 bg-clip-text text-transparent">
          My Notes
        </h1>
        <button 
          onClick={logout}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Logout
        </button>
      </header>
      <div className="max-w-4xl mx-auto space-y-6">
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-xl">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl backdrop-blur-sm">
          <div className="grid md:grid-cols-1 gap-4">
            <input 
              className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-lg"
              placeholder="Note title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <textarea 
              className="p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-vertical"
              placeholder="Start writing your note..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-xl font-bold text-lg hover:from-emerald-600 hover:to-green-700 shadow-xl hover:shadow-2xl transition-all duration-200"
          >
            {editingId ? "Update Note" : "Create New Note"}
          </button>
        </form>
        <div className="grid md:grid-cols-1 gap-6">
          {notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-200 group border hover:border-indigo-200">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-indigo-700 transition-colors pr-4 flex-1 min-w-0 truncate">
                  {note.title}
                </h3>
                <div className="flex gap-2 flex-shrink-0">
                  <button 
                    onClick={() => togglePin(note._id, note.pinned)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      note.pinned
                        ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 shadow-md hover:shadow-lg"
                        : "bg-gray-200 text-gray-700 hover:bg-yellow-200 hover:text-yellow-900"
                    }`}
                  >
                    {note.pinned ? "⭐ Pinned" : "Pin"}
                  </button>
                  <button 
                    onClick={() => editNote(note)}
                    className="text-blue-500 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-all"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteNote(note._id)}
                    className="text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 min-h-[80px]">{note.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
        {notes.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl font-bold text-gray-500 mb-2">No notes yet</h2>
            <p className="text-gray-400">Create your first note above!</p>
          </div>
        )}
      </div>
    </div>
  );
}
