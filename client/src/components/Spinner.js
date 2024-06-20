import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Spinner = ({ path = "/login" }) => {
    const location = useLocation()
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const Interval = setInterval(() => {
            setCount((prev) => --prev)
        }, 1000)
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        });
        return () => clearInterval(Interval)
    }, [count, navigate, location, path])
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
            <h1 className="text-center">Redirecting in {count} seconds</h1>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
export default Spinner;