import CartWidget from './CartWidget'
import {NavLink, Link} from 'react-router-dom'
import { setImageToSrc } from '../../util/StorageUtils'
import { useEffect, useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import {userContext} from '../User/UserContext'

const NavBar = () => {
    const {userState, dispatch} = useContext(userContext)
    const {email, fileImage} = userState

    const logout = ()=>{
        dispatch({type: 'clear'})
    }

    useEffect(() => {
        if(email.length > 0) setImageToSrc(fileImage, 'userAvatar')
    }, [fileImage])

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
                            <Link  to={'/fav'} className='nav-link'><i className="bi-suit-heart"/>Favoritos</Link>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link cartWidget" to={'/Carro'}><CartWidget/></NavLink>
                        </li>
                    </ul>
                </div>

                <Dropdown>
                    <Dropdown.Toggle variant="avatarDropdown" id="dropdown-basic">
                        {
                            (email.length > 0) 
                            ? (fileImage.length > 0) ? <img id="userAvatar" src="" width="40" height="40" className="rounded-circle"/> : <i className="bi-person-check-fill"/>
                            : <i className="bi-person-x-fill"/>
                        }
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="avatarDropdownMenu">
                        { 
                        
                        (email.length == 0) ?
                            <div>
                            <Link  to={'/loginForm'} className='dropdown-item'><i className="bi-person"/>Login</Link>
                            <Link  to={'/userForm'} className='dropdown-item'><i className="bi-person"/>Nuevo usuario</Link>
                            </div>
                        :
                            <div>
                            <Link  to={'/userForm'} className='dropdown-item'><i className="bi-person"/>Perfil</Link>
                            
                            <Link  to={'/orderList'} className='dropdown-item'><i className="bi-basket3"/>Ordenes</Link>
                            <Link  to={'/'} onClick={logout} className='dropdown-item'><i className="bi-arrow-left-square"/>Log out</Link>
                            </div>
                        }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </nav>
    )
}

export default NavBar
