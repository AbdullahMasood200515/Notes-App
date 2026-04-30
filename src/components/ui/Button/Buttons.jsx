import './Buttons.css'

function Buttons({ text, children, onClick, type = "button", className = "", ...props }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn ${className}`}
            {...props}>
            {children || text}
        </button>
    )
}

export default Buttons;