import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonProps } from "./Button";

interface ButtonFacebookProps extends ButtonProps { }

const ButtonFacebook = (props: ButtonFacebookProps) => {
    return (<Button {...props} className="button--facebook" leftIcon={<FontAwesomeIcon icon={faFacebook} />} text="Entra con Facebook"/>)
}

export default ButtonFacebook