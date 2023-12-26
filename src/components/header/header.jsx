import style from './header.module.css';
import {Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

function Header() {
  const ruta = useLocation()
  const {user, handleLogout} = useContext(AuthContext);
  return (
    <nav
      className={`navbar navbar-expand-md navbar-dark fixed-top ${style['navar-bg']}`}
    >
      <div className={`container-fluid ${style['max-nvm']}`}>
        <span className="navbar-brand mb-0 fs-3 h1 text-danger">JS FusionTech</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {ruta.pathname === "/" ? (<a className="nav-link" href="#index">Inicio</a>)
              :(<Link to="/" className="nav-link">Inicio</Link>)}
            </li>
            {ruta.pathname === "/" ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="#category">
                    Categorías
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#main-products">
                    Productos Principales
                  </a>
                </li>
                <li className="nav-item">
                  <Link to="/buyproducts" className="nav-link">Comprar Productos</Link>
                </li>
              </>
            ):(
              <>
                <li className="nav-item">
                  <Link to="/buyproducts" className="nav-link">Comprar Productos</Link>
                </li>
              </>
            )}
          </ul>
          {/* Botones de login */}
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            
            {!user ? (
              <>
                <Link to="/register" className="btn btn-outline-danger" >Registrate</Link> 
                <Link to="/login" className="btn btn-danger">Login</Link>
              </>
            ):(
              <button className="btn btn-danger" type="button" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
