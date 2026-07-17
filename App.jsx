import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/api/projects";

function App() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addProject = async () => {
    if (!title || !description) {
      alert("Please enter title and description");
      return;
    }

    try {
      await axios.post(API, {
        title,
        description,
        status,
      });

      setTitle("");
      setDescription("");
      setStatus("Pending");

      fetchProjects();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add project");
    }
  };

  return (
    <div className="container">
      <h1>Project Management Dashboard</h1>

      <input
        type="text"
        placeholder="Project Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <br /><br />

      <button onClick={addProject}>Add Project</button>

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;