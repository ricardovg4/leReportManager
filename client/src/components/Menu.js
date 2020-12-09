import logo from '../assets/images/logo3.png';

const Menu = () => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '0px',
                left: '0px',
                height: '100%',
                width: '158px'
            }}
        >
            <aside
                // className="menu is-fullheight section pt-3 has-background-grey-dark"
                className="menu pt-3 px-4 has-background-grey-dark"
                style={{ height: '100%' }}
            >
                <a className="navbar-item" href="/" style={{ paddingBottom: '1em' }}>
                    <img src={logo} alt="logo" style={{ margin: 'auto' }} />
                </a>
                <p className="menu-label">General</p>
                <ul className="menu-list">
                    <li>
                        <a className="has-text-white">Dashboard</a>
                    </li>
                    <li>
                        <a className="has-text-white is-active">Customers</a>
                    </li>
                </ul>
            </aside>
        </div>
    );
};

export default Menu;
