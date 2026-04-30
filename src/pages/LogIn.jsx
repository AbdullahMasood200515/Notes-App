import { Link, useNavigate } from "react-router-dom";
import Buttons from "../components/ui/Button/Buttons";
import Inputs from "../components/ui/Input/Inputs";
import Forms from "../components/ui/Forms/Forms";
import { useState } from "react";
import '../components/styles/LogIn.css'

function LogIn() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit() {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || []

        const validUser = existingUsers.find(
            (user) => user.email === form.email && user.password === form.password)

        if (validUser) {
            localStorage.setItem("currentUser", JSON.stringify(validUser))
            alert(`Welcome ${validUser.username}`)
            navigate('/home')
        }
        else {
            alert("Wrong Email or Password")
        }

        setForm({
            email: "",
            password: ""
        })
    }

    return (
        <div className="auth-page">
            <Forms onSubmit={handleSubmit} autoComplete="off">
                <input type="text" style={{ display: 'none' }} />
                <input type="password" style={{ display: 'none' }} />

                <div>
                    <h1 className="form-title">Login</h1>
                    <Inputs
                        name="email"
                        type="email"
                        placeholder="Enter Email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="off"
                        required />
                </div>
                <div>
                    <Inputs
                        name="password"
                        type="password"
                        placeholder="Enter Password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required />
                </div>
                <Buttons text="Login" type="submit" />
                <p>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
            </Forms>
        </div>
    )
}

export default LogIn;