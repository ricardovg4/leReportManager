function LoginError(props) {
    if (props.auth === false) {
        return (
            <article className="message is-danger">
                <div className="message-body">Email or password incorrect.</div>
            </article>
        );
    }
    return null;
}

export default LoginError;
