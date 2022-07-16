import { useEffect, useState } from "react";
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import ButtonFacebook from "../../components/Button/ButtonFacebook";
import Divider from "../../components/Divider/Divider";
import Link from "../../components/Link/Link";
import Textfield from "../../components/Textfield/Textfield";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { authenticateUser, loginWithFacebook } from "../../reducers/authentication";
import styles from "./login.module.scss";

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.authentication)
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [picture, setPicture] = useState('');

    const handleLogin = async () => {
        dispatch(authenticateUser({ email: form.email, password: form.password }))
    }

    const responseFacebook = async (facebookResponse: ReactFacebookLoginInfo) => {
        if (!facebookResponse) return

        const { accessToken } = facebookResponse

        dispatch(loginWithFacebook(accessToken))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles["login-form"]}>
                    <NavLink to="/" className={styles["login-form-header"]}>
                        <h1>Amnazom</h1>
                    </NavLink>
                    <div className={styles["login-form-body"]}>
                        <div className={styles["login-form-body-picture"]}>
                            <img src={picture} alt="" />
                        </div>
                        <div className={styles["login-form-body-form"]}>
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                handleLogin()
                            }}>
                                <div className={styles["login-form-body-form-input"]}>
                                    <Textfield type="email"  name="email" label="Email" placeholder="Email" autocomplete="email" fullWidth value={form.email} onChange={handleChange} />
                                </div>
                                <div className={styles["login-form-body-form-input"]}>
                                    <Textfield type="password" name="password" label="Password" placeholder="●●●●●●●●" autocomplete="current-password" fullWidth value={form.password} onChange={handleChange} />
                                </div>
                                <div className={styles["login-form-body-form-button"]}>
                                    <Button text="Login" type="submit" />
                                </div>
                           </form>
                            <Divider text="oppure" />
                            <div className={styles["login-form-body-form-button"]}>
                                <FacebookLogin
                                    appId="486585759895782"
                                    // autoLoad={true}
                                    fields="first_name,last_name,email,picture"
                                    scope="public_profile,email"
                                    callback={responseFacebook}
                                    icon="fa-facebook"
                                    render={renderProps => (
                                        <ButtonFacebook onClick={renderProps.onClick} />
                                    )}
                                />
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <p>Non sei ancora registrato? <Link to="/signup">Registrati</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login