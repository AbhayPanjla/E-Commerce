import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const Login = () => {
    // Input States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation()

    // submit Handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/login`, { email, password })
            if (res && res.data.success) {
                console.log(res);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });
                localStorage.setItem("auth", JSON.stringify(res.data))
                navigate(location.state || '/')
                toast.success(res.data.massage);

            } else {
                toast.error(res.data.massage)
            }

        } catch (error) {
            console.log("error in Registering");
            toast.error("Something Went Wrong")
        }
    }
    return (
        <Layout title={"Register Sign-Up"}>
            <div className="form-container">
                <form onSubmit={submitHandler}>
                    <div className="mb-3"><h1>Login Now</h1></div>

                    <div className="mb-3" >
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter Your email"
                            className="form-control"
                            id="exampleInputEmail1"
                            required />
                    </div>
                    <div className="mb-3" >
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Your Password"
                            className="form-control"
                            id="exampleInputPassword1"
                            required />
                    </div>
                    <div className="mb-3" >
                        <button className="btn btn-primary" onClick={() => navigate("/forget-password")}>Forget password</button>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;