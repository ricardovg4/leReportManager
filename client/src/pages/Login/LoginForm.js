import { useState } from 'react';
import LoginError from './LoginError';
import loginUser from '../../apiCalls/login/loginUser';

import { withRouter } from 'react-router-dom';

// Context
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

function LoginForm(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState(null);

    // Context
    const [user, setUser] = useContext(UserContext);

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const userRes = await loginUser(email, password);
        if (userRes) {
            setAuth(true);
            // Set context
            setUser(userRes.email);
        } else {
            setAuth(false);
        }
    };

    return (
        <form onSubmit={handleSubmitForm}>
            <LoginError auth={auth} />
            <div className="field">
                <label>Email</label>
                <div className="control">
                    <input
                        className="input"
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        autoFocus
                        required
                    />
                </div>
            </div>
            <div className="field pb-6">
                <label>Password</label>
                <div className="control">
                    <input
                        className="input"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        required
                    />
                </div>
            </div>
            <div className="buttons is-centered">
                <button className="button is-primary">Login</button>
            </div>
        </form>
    );
}

export default withRouter(LoginForm);
