import { useContext, useEffect } from "react"; //לשליפת המשתמש המחובר
import { Link, useNavigate, Outlet } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import "./Home.css";


function Home() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) {
        return <p>טוען משתמש...</p>;
    }

    function handleLogout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }

    return (
        <div className="home-layout">

            {/* תפריט צד */}
            <aside className="side-menu">
                <div className="user-name">
                    שלום {user.username}
                </div>

                <nav>
                    <Link to={`/users/${user.id}/info`}>Info</Link>
                    <Link to={`/users/${user.id}/todos`}>Todos</Link>
                    <Link to={`/users/${user.id}/posts`}>Posts</Link>
                    <Link to={`/users/${user.id}/albums`}>Albums</Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
            </aside>

            {/* אזור תוכן משתנה */}
            <main className="home-content">
                <Outlet />
            </main>

        </div>
    );
}
export default Home;