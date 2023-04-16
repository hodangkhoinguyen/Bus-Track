import "./style.css";

function NavBar() {
    return (
        <nav>
            <div className="logo">
                <a className="link" href="/">LOGO</a>
            </div>
            <div className="shortcut">
                <ul>
                    <li>
                        <a className="link" href="/">Home</a>
                    </li>
                    <li>
                        <a className="link" href="/fare">Fare</a>
                    </li>
                    <li>
                        <a className="link" href="/schedule">Schedule</a>
                    </li>
                    <li>
                        <a className="link" href="/track">Track</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;