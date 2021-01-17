import './styles.css';
const Loading = ({ fullheight = true }) => {
    const height = fullheight ? 'is-fullheight' : '';
    return (
        // is fullheight?
        <section className={`hero ${height}`}>
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
