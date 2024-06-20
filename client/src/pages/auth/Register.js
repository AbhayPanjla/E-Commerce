import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from 'axios';
import { redirect, useNavigate } from "react-router-dom";
import '../../styles/authStyles.css';
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const Register = () => {
    // Input States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [answer, setAnswer] = useState("");
    const [auth, setAuth] = useAuth()
    const navigate = useNavigate();
    // submit Handler
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/register`, { name, email, password, phone, address, answer })

            if (res && res.data.success) {
                toast.success(res.data && res.data.massage);

                navigate('/login')

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
                    <div className="mb-3"><h1>Register Now</h1></div>
                    <div className="mb-3">

                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter Your Name"
                            className="form-control"
                            id="exampleInputName"
                            required />
                    </div>
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
                        <input type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Enter Your Address"
                            className="form-control"
                            id="exampleInputAddress"
                            required />
                    </div>
                    <div className="mb-3" >
                        <input type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="Enter Your Phone Number"
                            className="form-control"
                            id="exampleInputPhone"
                            required />
                    </div>
                    <div className="mb-3" >
                        <input type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="Please Enter Your nickname"
                            className="form-control"
                            id="exampleInputAnswer"
                            required />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>

    )
}

export default Register