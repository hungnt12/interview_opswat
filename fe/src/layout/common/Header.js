import {Link, useLocation,} from "react-router-dom";
import {useEffect, useState} from "react";

const Header = props => {
    const location = useLocation()
    const [tag, setTag] = useState("users");
    useEffect(() => {
        let url = (location.pathname || "").split("/");
        if ((location.pathname || "").split("/").length > 1 && (url[1] !== "")) {
            setTag(url[1])
        }else{
            setTag("users")
        }
    }, [location]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
            <a className="navbar-brand" href="#">Code Challenges</a>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className={`nav-item ${tag === "users" ? "active" : ""} me-3`}>
                        <Link className="nav-link" to="/">Users</Link>
                    </li>
                    <li className={`nav-item ${tag === "articles" ? "active" : ""}`}>
                        <Link className="nav-link" to="/articles/list">Articles</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
