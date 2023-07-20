import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import './HeaderAdmin.css'
import './Admin.css'
import { useDispatch } from 'react-redux';
import { setAdminList } from "../../Slices/uiSlice";
import { useAuth } from '../../Hooks/auth';
import { useEffect } from 'react';
function HeaderAdmin () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useAuth();
    //while user is editing or creating and wants to get back to the lists through the header 
    const {pathname} = useLocation();
    useEffect(() => {
        if(!auth.isAuthenticated) {
            navigate('/');
            localStorage.removeItem('token');
        }
    }, [])
        

    //Checking if the user is in the admin page
    const handleClick = (list) => {
        if (pathname === '/admin') {
            dispatch(setAdminList(list))
        } else {
            navigate('/admin')
        }
        
    }

    //Logout function
     const logout = () => {
        auth.logout();
    }
    return (
        <div>

            <header className="header-container">
                <h1>Pagina de administrador</h1>
                <nav className="navbar-for-admin"> 
                    <ul>
                        <li 
                            className='clickable'
                            onClick={() => handleClick('students')}>Estudiantes</li>
                        <li 
                            className='clickable'
                            onClick={() => handleClick('courses')}>Cursos</li>
                        <li 
                            className='clickable'
                            onClick={() => handleClick('users')}>Usuarios</li>
                    </ul>
                </nav>

                <button className='cerrar-sesion clickable'
                 onClick={logout}>Cerrar sesión </button>
            </header>
            <Outlet />
        </div>
    )
}

export {HeaderAdmin}