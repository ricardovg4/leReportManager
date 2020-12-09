const FormField = (props) => {
    return (
        <div className="field is-horizontal">
            <div className="field-label is-normal">
                <label className="label">{props.label}</label>
            </div>
            <div className="field-body">{props.children}</div>
        </div>
    );
};

export default FormField;
