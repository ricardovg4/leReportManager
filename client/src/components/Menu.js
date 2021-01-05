import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import getFile from '../apiCalls/files/getFile';

import logo from '../assets/images/logo3.png';

const Menu = (props) => {
    const [excelProgress, setExcelProgress] = useState(null);
    const [lampuxProgress, setLampuxProgress] = useState(null);

    return (
        <div
            style={{
                position: 'fixed',
                top: '0px',
                left: '0px',
                bottom: '0px',
                height: '100%',
                width: '158px'
            }}
        >
            <aside
                // className="menu is-fullheight section pt-3 has-background-grey-dark"
                //px-4
                className="menu pt-3 has-background-grey-dark is-unselectable"
                style={{ height: '100%' }}
            >
                <a
                    className="is-flex is-align-items-center is-justify-content-center is-flex-grow-0 is-flex-shrink-0"
                    href="/"
                    style={{
                        paddingBottom: '1.25em',
                        margin: 'auto',
                        padding: '0.5rem 1.75rem'
                    }}
                >
                    <img src={logo} alt="logo" style={{ margin: 'auto' }} />
                </a>

                <p className="menu-label">General</p>
                <ul className="menu-list">
                    <li>
                        <a
                            className="has-text-white"
                            // className="has-text-white is-active"
                            onClick={() => {
                                const dr = document.getElementById('daily-report');
                                dr.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Daily Report
                        </a>
                    </li>
                    {/* <li>
                        <a className="has-text-white">Dashboard</a>
                    </li> */}
                </ul>
                <p className="menu-label">Utilities</p>
                <ul className="menu-list">
                    <li>
                        <a
                            className="has-text-white"
                            onClick={props.toggletrackingrender}
                        >
                            Track an order
                        </a>
                    </li>
                    <li>
                        <a className="has-text-white" onClick={props.toggleskurender}>
                            SKU status
                        </a>
                    </li>
                </ul>
                <p className="menu-label">Docs</p>
                <ul className="menu-list">
                    <li>
                        <a
                            className="has-text-white"
                            onClick={() => {
                                getFile('LampUX-Guide-20200518.pdf', (progress) => {
                                    setLampuxProgress(progress);
                                    if (progress === 100) {
                                        setLampuxProgress(null);
                                    }
                                });
                            }}
                        >
                            Lampux PDF
                            {!lampuxProgress ? null : (
                                <progress
                                    className="progress is-primary is-small"
                                    value={lampuxProgress}
                                    max="100"
                                >
                                    0%
                                </progress>
                            )}
                        </a>
                    </li>
                </ul>
                <p className="menu-label">Training</p>
                <ul className="menu-list">
                    <li>
                        <a className="has-text-white">Videos</a>
                    </li>
                    <li>
                        <a
                            className="has-text-white"
                            onClick={() => {
                                getFile('le-cs-training.xlsx', (progress) => {
                                    setExcelProgress(progress);
                                    if (progress === 100) {
                                        setExcelProgress(null);
                                    }
                                });
                            }}
                        >
                            Excel sheet
                            {!excelProgress ? null : (
                                <progress
                                    className="progress is-primary is-small"
                                    value={excelProgress}
                                    max="100"
                                >
                                    0%
                                </progress>
                            )}
                        </a>
                    </li>
                </ul>

                <button
                    className="button is-danger"
                    style={{
                        position: 'absolute',
                        bottom: '0%',
                        left: '0%',
                        width: '100%'
                    }}
                >
                    <span className="icon">
                        <FontAwesomeIcon icon={['fas', 'sign-out-alt']} size="1x" />
                    </span>
                </button>
            </aside>
        </div>
    );
};

export default Menu;
