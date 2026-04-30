import Navbar from "../components/ui/NavBar/Navbar";
import Inputs from "../components/ui/Input/Inputs";
import Buttons from "../components/ui/Button/Buttons";
import Sidebar from "../components/ui/SideBar/Sidebar";
import '../components/styles/Home.css';
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { MdCheck } from "react-icons/md";

function Home() {
    const [input, setInput] = useState("");
    const [filter, setFilter] = useState("all");
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userTaskKey = currentUser ? `tasks_${currentUser.email}` : "tasks_guest";

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem(userTaskKey);
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem(userTaskKey, JSON.stringify(tasks));
    }, [tasks, userTaskKey]);

    function handleChange(e) {
        setInput(e.target.value);
    }

    function addTasks() {
        if (!input.trim()) return;
        const newTask = {
            id: Date.now(),
            text: input,
            completed: false
        };
        setTasks([...tasks, newTask])
        setInput("")
    }

    function toggleTask(id) {
        const updatedTask = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        )
        setTasks(updatedTask)
    }

    function startEdit(task) {
        setEditingId(task.id);
        setEditText(task.text);
    }

    function saveEdit() {
        if (!editText.trim()) return;

        setTasks(
            tasks.map((task) =>
                task.id === editingId ? { ...task, text: editText } : task
            )
        )

        setEditingId(null);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            saveEdit()
        }
        if (e.key === "Escape") {
            setEditingId(null)
        }
    }

    function deleteTask(id) {
        const updatedTask = tasks.filter((task) => task.id !== id)
        setTasks(updatedTask)
    }

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    return (
        <div className="home-container">
            <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

            <main className="home-main">
                <div className="home-layout">
                    <Sidebar
                        currentFilter={filter}
                        setFilter={setFilter}
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                    />

                    <div className="home-content">
                        <div className="task-input-section">
                            <Inputs
                                placeholder="What needs to be done?"
                                className="add-task-input"
                                value={input}
                                onChange={handleChange} />
                            <Buttons text="Add Task"
                                className="add-btn"
                                onClick={addTasks} />
                        </div>

                        <div className="tasks-container">
                            <div className="tasks-header">
                                <h2>{filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks</h2>
                                <span className="task-count">{filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}</span>
                            </div>

                            <div className="tasks-scroll-area">
                                {filteredTasks.length > 0 ? (
                                    filteredTasks.map((task) => (
                                        <div className={`task-item ${editingId === task.id ? 'editing' : ''}`} key={task.id}>
                                            <div className="task-content">
                                                {editingId === task.id ? (
                                                    <Inputs
                                                        className="edit-task-input"
                                                        value={editText}
                                                        onChange={(e) => setEditText(e.target.value)}
                                                        onKeyDown={handleKeyDown}
                                                        onBlur={saveEdit}
                                                        autoFocus
                                                    />
                                                ) : (
                                                    <>
                                                        <Inputs
                                                            type="checkbox"
                                                            className="task-checkbox"
                                                            checked={task.completed}
                                                            onChange={() => toggleTask(task.id)}
                                                        />
                                                        <p
                                                            className="task-text"
                                                            onDoubleClick={() => startEdit(task)}
                                                            style={{
                                                                textDecoration: task.completed ? "line-through" : "none",
                                                                opacity: task.completed ? 0.6 : 1
                                                            }}
                                                        >
                                                            {task.text}
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                            <div className="task-actions">
                                                {editingId === task.id ? (
                                                    <Buttons
                                                        onClick={saveEdit}
                                                        className="save-btn">
                                                        <MdCheck />
                                                    </Buttons>
                                                ) : null}
                                                <Buttons
                                                    onClick={() => deleteTask(task.id)}
                                                    className="delete-btn">
                                                    <RxCross2 />
                                                </Buttons>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <h3>No {filter !== 'all' ? filter : ''} tasks found</h3>
                                        <p>Time to be productive!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home;