import {Textfit} from "react-textfit";
import "./Screen.css"

/*
The Screen component will be the top section child of the Wrapper component, 
and its purpose will be to display the calculated values.
*/
const Screen = ({value}) => {
    return (
        <Textfit className="screen" mode="single" max={70}>
            {value}
        </Textfit>
    );
};

export default Screen;