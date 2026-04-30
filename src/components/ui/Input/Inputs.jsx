import './Inputs.css'

function Inputs({ type = "text", placeholder, value, onChange, className = "", ...props }) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`input-field ${className}`}
            {...props} />
    )
}

export default Inputs;