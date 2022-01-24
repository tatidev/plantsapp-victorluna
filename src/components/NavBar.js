import CartWidget from './CartWidget'
import {NavLink, Link} from 'react-router-dom'
import { setImageToSrc } from '../util/StorageUtils'
import { useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'

const NavBar = () => {
    useEffect(() => {
        setImageToSrc('vlprofile.jpg', 'userAvatar')
    }, [])
    
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
                            <NavLink className="nav-link cartWidget" to={'/Carro'}><CartWidget/></NavLink>
                        </li>
                    </ul>
                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="avatarDropdown" id="dropdown-basic">
                    <img id="userAvatar" src="" width="40" height="40" className="rounded-circle"/>
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="avatarDropdownMenu">
                        <Dropdown.Item href="#/action-1"><i className="bi-person"/>Perfil</Dropdown.Item>
                        <Link  to={'/OrderList'} className='dropdown-item'><i className="bi-basket3"/>Ordenes</Link>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
    )
}

export default NavBar
