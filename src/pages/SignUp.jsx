import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Buttons from "../components/ui/Button/Buttons";
import Inputs from "../components/ui/Input/Inputs";
import Forms from "../components/ui/Forms/Forms";

function SignUp() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit() {
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const existingUsers = JSON.parse(localStorage.getItem("users")) || []

        const checkEmail = existingUsers.find((user) => user.email === form.email)

        if (checkEmail) {
            alert("Email already registered!")
            return;
        }

        const newUser = {
            username: form.username,
            email: form.email,
            password: form.password
        }

        const updateUser = [...existingUsers, newUser]

        localStorage.setItem("users", JSON.stringify(updateUser))
        console.log(form);
        setForm({
            username: "",
            email: "",
            password: "",
            confirmPassword: ""
        })
        navigate('/login')
        alert("Account Created!")
    }

    return (
        <div className="auth-page">
            <Forms onSubmit={handleSubmit} autoComplete="off">
                <input type="text" style={{ display: 'none' }} />
                <input type="password" style={{ display: 'none' }} />
                <h1 className="form-title">Signup</h1>
                <Inputs
                    name="username"
                    placeholder="Enter Username"
                    value={form.username || ""}
                    onChange={handleChange}
                    autoComplete="username-new"
                    required
                />

                <Inputs
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    value={form.email || ""}
                    onChange={handleChange}
                    autoComplete="email-new"
                    required
                />

                <Inputs
                    name="password"
                    type="password"
                    placeholder="Enter Password"
                    value={form.password || ""}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                />

                <Inputs
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={form.confirmPassword || ""}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                />

                <Buttons text="Signup" type="submit" />

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </Forms>
        </div>
    );
}

export default SignUp;