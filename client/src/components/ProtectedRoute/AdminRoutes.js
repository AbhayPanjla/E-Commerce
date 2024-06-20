import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoutes() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            await axios.get(`/api/v1/auth/admin-auth`)
                .then(res => setOk(true));
        };
        if (auth?.token) { authCheck() };
    });

    return ok ? <Outlet /> : <Spinner path={""} />;
}