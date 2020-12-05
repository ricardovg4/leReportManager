import logo from '../assets/images/logo3.png';
// https://codepen.io/edualves15/pen/jOOoEqR?editors=1100
const Menu = () => {
    return (
        <aside
            // className="menu is-fullheight section pt-3 has-background-grey-dark"
            className="menu section pt-3 has-background-grey-dark"
            style={{ height: '100%' }}
        >
            <a className="navbar-item" href="/">
                <img src={logo} alt="logo" />
            </a>
            <p className="menu-label">General</p>
            <ul className="menu-list">
                <li>
                    <a className="has-text-white">Dashboard</a>
                </li>
                <li>
                    <a>Customers</a>
                </li>
            </ul>
            <p className="menu-label">Administration</p>
            <ul className="menu-list">
                <li>
                    <a>Team Settings</a>
                </li>
                <li>
                    <a className="is-active">Manage Your Team</a>
                    <ul>
                        <li>
                            <a>Members</a>
                        </li>
                        <li>
                            <a>Plugins</a>
                        </li>
                        <li>
                            <a>Add a member</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a>Invitations</a>
                </li>
                {/* <li>
                    <a>Cloud Storage Environment Settings</a>
                </li> */}
                <li>
                    <a>Authentication</a>
                </li>
            </ul>
            <p className="menu-label">Transactions</p>
            <ul className="menu-list">
                <li>
                    <a>Payments</a>
                </li>
                <li>
                    <a>Transfers</a>
                </li>
                <li>
                    <a>Balance</a>
                </li>
            </ul>
        </aside>
    );
};

export default Menu;
