import { auth } from "../firebase/firebase";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Buttons from "../components/ui/Button/Buttons";
import Inputs from "../components/ui/Input/Inputs";
import Forms from "../components/ui/Forms/Forms";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
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

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            localStorage.setItem("currentUser", JSON.stringify({
                username: user.displayName,
                email: user.email,
                photo: user.photoURL
            }));

            alert(`Welcome ${user.displayName}`);
            navigate("/home");

        } catch (error) {
            console.log(error);
            alert("Google login failed");
        }
    };

    const handleFacebookLogin = async () => {
        try {
            const provider = new FacebookAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const user = result.user;

            localStorage.setItem("currentUser", JSON.stringify({
                username: user.displayName,
                email: user.email,
                photo: user.photoURL
            }));

            alert(`Welcome ${user.displayName}`);
            navigate("/home");

        } catch (error) {
            console.log(error);
            alert("Facebook login failed");
        }
    };

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

                <div className="separator">
                    <span>OR</span>
                </div>

                <div className="social-login">
                    <button type="button" className="social-btn google" onClick={handleGoogleLogin}>
                        <FcGoogle size={22} />
                        <span>Continue with Google</span>
                    </button>

                    <button type="button" className="social-btn facebook" onClick={handleFacebookLogin}>
                        <FaFacebook size={22} color="#1877F2" />
                        <span>Continue with Facebook</span>
                    </button>
                </div>

                <p>Don't have an account? <Link to={'/signup'}>Signup</Link></p>
            </Forms>
        </div>
    )
}

export default LogIn;