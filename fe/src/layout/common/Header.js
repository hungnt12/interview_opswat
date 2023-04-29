import {Link, useLocation, useNavigate,} from "react-router-dom";
import {useEffect, useState} from "react";
import LogoutIcon from '@mui/icons-material/Logout';


const Header = props => {
    const location = useLocation(),
        navigate = useNavigate();
    const [tag, setTag] = useState("users");
    useEffect(() => {
        let url = (location.pathname || "").split("/");
        if ((location.pathname || "").split("/").length > 1 && (url[1] !== "")) {
            setTag(url[1])
        } else {
            setTag("users")
        }
    }, [location]);

    const onLogout = () => {
        localStorage.removeItem("tk");
        navigate("/login")
    }

    return (

        <div className="row bg-light">
            <div className="col-9">
                <nav className="navbar navbar-expand-lg navbar-light  px-4 w-100">
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
            </div>
            <div className="col-3 text-end p-3 pe-4">
                <LogoutIcon className="cursor--pointer" onClick={e => onLogout()}/>
            </div>
        </div>
    )
}

export default Header
