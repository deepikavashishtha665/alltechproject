// import React, { useState } from 'react';
// import { analyzeResume } from './gemini';

// export default function App() {
//   const [apiKey, setApiKey] = useState('');
//   const [resume, setResume] = useState('');
//   const [jd, setJd] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleAnalyze = async () => {
//     if (!apiKey) return alert('Please enter your Gemini API Key!');
//     if (!resume || !jd) return alert('Both Resume & Job Description fields are required!');
    
//     setLoading(true);
//     try {
//       const data = await analyzeResume(resume, jd, apiKey);
//       setResult(data);
//     } catch (err) {
//       console.error(err);
//       alert(err.message || 'Analysis failed.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-10 font-sans">
//       <header className="max-w-5xl mx-auto mb-8 text-center">
//         <h1 className="text-4xl font-extrabold text-blue-400">AI Resume & ATS Optimizer</h1>
//         <p className="text-slate-400 mt-2">Hack Devengers 2.0 | Instant Match Score & ATS Recommendations</p>
//       </header>

//       <main className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Input Panel */}
//         <div className="space-y-4 bg-slate-800 p-6 rounded-xl border border-slate-700">
//           <div>
//             <label className="block text-sm font-semibold mb-1 text-slate-300">Gemini API Key</label>
//             <input
//               type="password"
//               className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-slate-100"
//               placeholder="Enter Gemini API Key..."
//               value={apiKey}
//               onChange={(e) => setApiKey(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold mb-1 text-slate-300">Resume Content</label>
//             <textarea
//               className="w-full h-36 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-slate-100"
//               placeholder="Paste raw resume text here..."
//               value={resume}
//               onChange={(e) => setResume(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-semibold mb-1 text-slate-300">Job Description (JD)</label>
//             <textarea
//               className="w-full h-36 p-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-sm text-slate-100"
//               placeholder="Paste job description here..."
//               value={jd}
//               onChange={(e) => setJd(e.target.value)}
//             />
//           </div>

//           <button
//             onClick={handleAnalyze}
//             disabled={loading}
//             className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold transition disabled:opacity-50 cursor-pointer"
//           >
//             {loading ? 'Analyzing with AI...' : 'Analyze Resume'}
//           </button>
//         </div>

//         {/* Results Panel */}
//         <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
//           {!result ? (
//             <div className="h-full min-h-[300px] flex items-center justify-center text-slate-500 text-center">
//               Fill details & click "Analyze Resume" to view ATS report.
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="flex items-center justify-between border-b border-slate-700 pb-4">
//                 <div>
//                   <h2 className="text-lg font-bold">Match Score</h2>
//                   <p className="text-xs text-slate-400 mt-1">{result.summary}</p>
//                 </div>
//                 <div className="text-3xl font-extrabold text-emerald-400 bg-slate-900 px-4 py-2 rounded-lg border border-emerald-500/30">
//                   {result.matchScore}%
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold text-rose-400 mb-2">Missing Keywords</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {result.missingKeywords.map((kw, idx) => (
//                     <span key={idx} className="bg-rose-950/60 text-rose-300 border border-rose-800/50 text-xs px-2.5 py-1 rounded-full">
//                       + {kw}
//                     </span>
//                   ))}
//                 </div>
//               </div>

//               <div>
//                 <h3 className="text-sm font-semibold text-blue-400 mb-2">Optimized Bullet Points</h3>
//                 <ul className="space-y-2 text-xs text-slate-300">
//                   {result.optimizedBullets.map((bullet, idx) => (
//                     <li key={idx} className="bg-slate-900/60 p-2.5 rounded border border-slate-700">
//                       • {bullet}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }
// new code
import { useState } from "react";
import "./App.css";

const initialEvents = [
  {
    id: 1,
    name: "Tech Fest 2026",
    date: "2026-10-05",
    time: "10:00 AM",
    venue: "Main Auditorium",
    category: "Technology",
    description: "A college tech fest featuring coding, AI and innovation activities."
  },
  {
    id: 2,
    name: "Cultural Night",
    date: "2026-10-10",
    time: "5:00 PM",
    venue: "College Ground",
    category: "Cultural",
    description: "An exciting evening of music, dance and cultural performances."
  },
  {
    id: 3,
    name: "Sports Meet",
    date: "2026-10-15",
    time: "9:00 AM",
    venue: "Sports Complex",
    category: "Sports",
    description: "Inter-college sports competitions and activities."
  }
];

function App() {
  const [page, setPage] = useState("home");

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : initialEvents;
  });

  const [registrations, setRegistrations] = useState(() => {
    const saved = localStorage.getItem("registrations");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    phone: ""
  });

  const [adminForm, setAdminForm] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    category: "Technology",
    description: ""
  });

  const [editingId, setEditingId] = useState(null);

  function saveEvents(data) {
    setEvents(data);
    localStorage.setItem("events", JSON.stringify(data));
  }

  function saveRegistrations(data) {
    setRegistrations(data);
    localStorage.setItem("registrations", JSON.stringify(data));
  }

  function registerStudent(e) {
    e.preventDefault();

    const newRegistration = {
      ...form,
      event: selectedEvent.name,
      id: Date.now()
    };

    saveRegistrations([...registrations, newRegistration]);

    alert("Registration successful!");

    setForm({
      name: "",
      email: "",
      college: "",
      phone: ""
    });

    setSelectedEvent(null);
  }

  function addEvent(e) {
    e.preventDefault();

    if (editingId) {
      const updated = events.map((event) =>
        event.id === editingId
          ? { ...adminForm, id: editingId }
          : event
      );

      saveEvents(updated);
      setEditingId(null);
      alert("Event updated!");
    } else {
      const newEvent = {
        ...adminForm,
        id: Date.now()
      };

      saveEvents([...events, newEvent]);
      alert("Event added!");
    }

    setAdminForm({
      name: "",
      date: "",
      time: "",
      venue: "",
      category: "Technology",
      description: ""
    });
  }

  function editEvent(event) {
    setEditingId(event.id);

    setAdminForm({
      name: event.name,
      date: event.date,
      time: event.time,
      venue: event.venue,
      category: event.category,
      description: event.description
    });
  }

  function deleteEvent(id) {
    if (confirm("Delete this event?")) {
      saveEvents(events.filter((event) => event.id !== id));
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">CampusConnect</div>

        <div className="nav-links">
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("events")}>Events</button>
          <button onClick={() => setPage("admin")}>Admin</button>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <>
          <section className="hero">
            <div>
              <p className="tag">COLLEGE CLUB EVENTS</p>
              <h1>Discover. Participate. Connect.</h1>
              <p>
                Discover exciting college events, register easily and
                participate in experiences that matter.
              </p>

              <button
                className="primary-btn"
                onClick={() => setPage("events")}
              >
                Explore Events
              </button>
            </div>
          </section>

          <section className="section">
            <h2>About Our Club</h2>
            <p>
              CampusConnect brings students together through technology,
              cultural, sports and educational events.
            </p>
          </section>

          <section className="section">
            <h2>Featured Event</h2>

            <div className="featured">
              <div>
                <span>FEATURED</span>
                <h2>{events[0]?.name}</h2>
                <p>{events[0]?.description}</p>
                <p>
                  📅 {events[0]?.date} &nbsp; | &nbsp; 📍{" "}
                  {events[0]?.venue}
                </p>

                <button
                  className="primary-btn"
                  onClick={() => setSelectedEvent(events[0])}
                >
                  Register Now
                </button>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>Upcoming Events</h2>

            <div className="event-grid">
              {events.slice(0, 3).map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onRegister={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* EVENTS */}
      {page === "events" && (
        <section className="section page-section">
          <h1>All Events</h1>

          <div className="filters">
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>All</option>
              <option>Technology</option>
              <option>Cultural</option>
              <option>Sports</option>
              <option>Workshop</option>
              <option>Other</option>
            </select>
          </div>

          <div className="event-grid">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onRegister={() => setSelectedEvent(event)}
              />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <p className="empty">No events found.</p>
          )}
        </section>
      )}

      {/* ADMIN */}
      {page === "admin" && (
        <section className="section page-section">
          <h1>Admin Dashboard</h1>

          <div className="admin-stats">
            <div>
              <h3>{events.length}</h3>
              <p>Total Events</p>
            </div>

            <div>
              <h3>{registrations.length}</h3>
              <p>Registrations</p>
            </div>
          </div>

          <div className="admin-box">
            <h2>{editingId ? "Edit Event" : "Add Event"}</h2>

            <form onSubmit={addEvent} className="admin-form">
              <input
                required
                placeholder="Event Name"
                value={adminForm.name}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    name: e.target.value
                  })
                }
              />

              <input
                required
                type="date"
                value={adminForm.date}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    date: e.target.value
                  })
                }
              />

              <input
                required
                placeholder="Time"
                value={adminForm.time}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    time: e.target.value
                  })
                }
              />

              <input
                required
                placeholder="Venue"
                value={adminForm.venue}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    venue: e.target.value
                  })
                }
              />

              <select
                value={adminForm.category}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    category: e.target.value
                  })
                }
              >
                <option>Technology</option>
                <option>Cultural</option>
                <option>Sports</option>
                <option>Workshop</option>
                <option>Other</option>
              </select>

              <textarea
                required
                placeholder="Event Description"
                value={adminForm.description}
                onChange={(e) =>
                  setAdminForm({
                    ...adminForm,
                    description: e.target.value
                  })
                }
              />

              <button className="primary-btn">
                {editingId ? "Update Event" : "Add Event"}
              </button>
            </form>
          </div>

          <h2>Manage Events</h2>

          <div className="admin-list">
            {events.map((event) => (
              <div className="admin-event" key={event.id}>
                <div>
                  <h3>{event.name}</h3>
                  <p>
                    {event.date} • {event.venue} • {event.category}
                  </p>
                </div>

                <div>
                  <button
                    className="edit-btn"
                    onClick={() => editEvent(event)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteEvent(event.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h2>Registered Students</h2>

          {registrations.length === 0 ? (
            <p>No registrations yet.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>College/Year</th>
                    <th>Phone</th>
                    <th>Event</th>
                  </tr>
                </thead>

                <tbody>
                  {registrations.map((student) => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.college}</td>
                      <td>{student.phone}</td>
                      <td>{student.event}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* REGISTRATION MODAL */}
      {selectedEvent && (
        <div className="modal-bg">
          <div className="modal">
            <button
              className="close"
              onClick={() => setSelectedEvent(null)}
            >
              ×
            </button>

            <h2>Register for {selectedEvent.name}</h2>

            <form onSubmit={registerStudent}>
              <input
                required
                placeholder="Full Name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <input
                required
                placeholder="College / Year"
                value={form.college}
                onChange={(e) =>
                  setForm({ ...form, college: e.target.value })
                }
              />

              <input
                required
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <button className="primary-btn">
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function EventCard({ event, onRegister }) {
  return (
    <div className="event-card">
      <span className="category">{event.category}</span>

      <h3>{event.name}</h3>

      <p>📅 {event.date}</p>
      <p>⏰ {event.time}</p>
      <p>📍 {event.venue}</p>

      <p>{event.description}</p>

      <button className="primary-btn" onClick={onRegister}>
        Register
      </button>
    </div>
  );
}

export default App;