import "./Button.css";

/*
The Button component will provide the interactivity for the app.
Each component will have the value and onClick props.
*/

const Button = ({className, value, onClick}) => {
    return (
        <button className={className} onClick={onClick}>
            {value}
        </button>
    );
};

export default Button;