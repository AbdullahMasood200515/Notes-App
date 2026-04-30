import { useNavigate } from "react-router-dom";
import Buttons from "../Button/Buttons";
import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import './Navbar.css'
import { useTheme, useThemeUpdate } from "../../../context/ThemeContext";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";

function Navbar({ onToggleSidebar }) {
    const navigate = useNavigate();
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    function getCurrentUser() {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"))
        return currentUser ? currentUser.username : "Guest";
    }

    function Logout() {
        localStorage.removeItem("currentUser")
        navigate('/login')
    }

    return (
        <header className="navbar">
            <div className="logo-section">
                <button className="menu-btn" onClick={onToggleSidebar}>
                    <FiMenu size={24} />
                </button>
                <h1>UHF Notes</h1>
            </div>

            <div className="user-section">
                <span className="user-name">
                    <CgProfile className="user-logo" />
                    {getCurrentUser()}
                </span>


                <div className="nav-actions">
                    <button className="theme-toggle-btn" onClick={toggleTheme}>
                        {darkTheme ? <IoSunnyOutline size={22} /> : <FaRegMoon size={20} />}
                    </button>

                    <Buttons
                        text="Logout"
                        onClick={Logout}
                        className="logout-btn"
                    />
                </div>
            </div>
        </header>
    )
}

export default Navbar;