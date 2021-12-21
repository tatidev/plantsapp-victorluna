import CartWidget from './CartWidget'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand flex-grow-1 h1">PhotoShoot</span>
                <div className="collapse navbar-collapse flex-grow-1 justify-content-center">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Info</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Favoritos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#"><CartWidget/>&nbsp;Carro</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar
