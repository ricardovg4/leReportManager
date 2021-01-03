import './styles.css';
const Loading = () => {
    return (
        // is fullheight?
        <section className="hero is-fullheight">
            <div className="hero-body">
                <div className="container">
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Loading;
