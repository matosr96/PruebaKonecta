import React from "react";
import "../styles/header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <nav className="nav">
          <div className="logo_header">
            <h1>Edgar Alexander Matos</h1>
          </div>

          <div className="nav-list">
            <ul className="items">
              <li>
                <a href="/">Prueba Tecnica</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
