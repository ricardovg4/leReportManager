import { useEffect, useState, Suspense, lazy } from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';

// scss
import './App.scss';

// routes
// import LoginPage from './pages/Login/LoginPage';
// import NotFound from './pages/NotFound/NotFound';
// import Dashboard from './pages/Dashboard/Dashboard';
import Loading from './pages/Loading/Loading';

// Context
import { useContext } from 'react';
import { UserContext } from './context/UserContext';

// Utils
import userIfLoggedIn from './apiCalls/ping/userIfLoggedIn';

// lazy loading
const LoginPage = lazy(() => import('./pages/Login/LoginPage'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
// const Loading = lazy(() => import('./pages/Loading/Loading'));

function App() {
    const [user, setUser] = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        document.body.classList.add('has-background-light');

        const userResponse = async () => {
            setLoading(true);
            const res = await userIfLoggedIn();
            // setUser(res ? res.username : res);
            setUser(res.username ? res : false);
            setLoading(false);
            return res;
        };
        userResponse();
    }, []);

    return (
        <Router>
            <Suspense fallback={<Loading />}>
                <div className="App">
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            render={() =>
                                loading ? (
                                    <Loading />
                                ) : user ? (
                                    <Redirect to="/dashboard" />
                                ) : (
                                    <LoginPage />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/dashboard"
                            render={() =>
                                loading ? (
                                    <Loading />
                                ) : user ? (
                                    <Dashboard />
                                ) : (
                                    <LoginPage />
                                )
                            }
                        />
                        <Route
                            exact
                            path="/"
                            render={() =>
                                loading ? (
                                    <Loading />
                                ) : user ? (
                                    <Dashboard />
                                ) : (
                                    <LoginPage />
                                )
                            }
                        />
                        <NotFound />
                    </Switch>
                </div>
            </Suspense>
        </Router>
    );
}

export default App;
