import logo from '../../assets/images/logo1.png';
import LoginForm from './LoginForm';

function LoginPage(props) {
    return (
        <div className="hero columns is-mobile is-centered is-vcentered is-fullheight pb-2">
            <div className="column is-narrow has-background-white px-6 py-6 box is-two-third-tablet is-one-quarter-fullhd">
                <div className="container py-4">
                    <figure className="is-161x48 has-text-centered">
                        <img src={logo} alt="logo" />
                    </figure>
                </div>
                <h1 className="title has-text-centered">LE Report Manager</h1>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
