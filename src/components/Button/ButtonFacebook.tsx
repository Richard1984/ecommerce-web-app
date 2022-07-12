import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button, { ButtonProps } from "./Button";
import styles from './button.module.scss';

interface ButtonFacebookProps extends ButtonProps { }

const ButtonFacebook = (props: ButtonFacebookProps) => {
    return (<Button {...props} className={styles["button--facebook"]} leftIcon={<FontAwesomeIcon icon={faFacebook} />} text="Entra con Facebook"/>)
}

export default ButtonFacebook