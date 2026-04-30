import './Forms.css'

function Forms({ onSubmit, children, ...props }) {
    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(e);
    }

    return <form
        className="form-card"
        onSubmit={handleSubmit}
        {...props}>
        {children}
    </form>;
}

export default Forms;