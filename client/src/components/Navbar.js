import logo from '../assets/images/logo2.png';
import avatar from '../assets/images/avatar.jpg';

import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Navbar = (props) => {
    const [user, setUser] = useContext(UserContext);

    const hamburgerAnimation = (e) => {
        const burguer = document.querySelector('.navbar-burger');
        const burguerElements = document.querySelector('#navbarMain');
        burguer.classList.toggle('is-active');
        burguerElements.classList.toggle('is-active');
    };
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="/">
                    <img src={logo} alt="logo" />
                </a>

                <button
                    style={{
                        border: 'none',
                        background: 'none'
                    }}
                    className="navbar-burger burger"
                    onClick={hamburgerAnimation}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div id="navbarMain" className="navbar-menu">
                <div className="navbar-start">
                    <a className="navbar-item" href="/">
                        Home
                    </a>

                    {/* <a className="navbar-item">
        Documentation
      </a>

      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link">
          More
        </a>

        <div className="navbar-dropdown">
          <a className="navbar-item">
            About
          </a>
          <a className="navbar-item">
            Jobs
          </a>
          <a className="navbar-item">
            Contact
          </a>
          <hr className="navbar-divider">
          <a className="navbar-item">
            Report an issue
          </a>
        </div> */}
                    {/* </div> */}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="level is-mobile">
                            <div className="level-left mr-3">
                                <figure className="level-item image is-32x32">
                                    <img
                                        className="is-rounded"
                                        src={avatar}
                                        alt="avatar"
                                    />
                                </figure>
                                <div className="level-item">{user}</div>
                            </div>
                            <div className="level-right"></div>
                        </div>
                    </div>
                    <div className="navbar-item">
                        <div className="buttons">
                            <a className="button is-danger" href="/logout">
                                Log out
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
