import CartWidget from './CartWidget'
import {NavLink} from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <span className="navbar-brand flex-grow-1 h1">PlantsShop</span>
                <div className="collapse navbar-collapse flex-grow-1 justify-content-center">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 gap-5">
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/'}><i className="bi-house"/>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/info'}><i className="bi-info-square"/>Info</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/fav'}><i className="bi-suit-heart"/>Favoritos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to={'/Carro'}><CartWidget/>&nbsp;Carro</NavLink>
                        </li>
                    </ul>
                </div>
                <div className='flex-grow-1'></div>
            </div>
        </nav>
    )
}

export default NavBar
