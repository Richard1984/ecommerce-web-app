import { useEffect, useState } from "react";
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
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
    const location = useLocation()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.authentication)
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [picture, setPicture] = useState('');
    const from = (location.state as { from?: string  })?.from || "/";

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
            navigate(from, { replace: true })
        }
    }, [user])

    return (
        <div className={styles.container}>
            <div className={styles.login}>
                <div className={styles.form}>
                    <NavLink to="/" className={styles.header}>
                        <h1>Amnazom</h1>
                    </NavLink>
                    <div className={styles["login-form-body"]}>
                        <div className={styles["login-form-body-form"]}>
                            <form onSubmit={(event) => {
                                event.preventDefault();
                                handleLogin()
                            }}>
                                <div className={styles["login-form-body-form-input"]}>
                                    <Textfield id="email" type="email" name="email" label="Email" placeholder="Email" autoComplete="email" fullWidth value={form.email} onValueChange={handleChange} />
                                </div>
                                <div className={styles["login-form-body-form-input"]}>
                                    <Textfield id="password" type="password" name="password" label="Password" placeholder="●●●●●●●●" autoComplete="current-password" fullWidth value={form.password} onValueChange={handleChange} />
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