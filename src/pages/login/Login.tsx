import { useState } from "react";
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import ButtonFacebook from "../../components/Button/ButtonFacebook";
import Divider from "../../components/Divider/Divider";
import Link from "../../components/Link/Link";
import Textfield from "../../components/Textfield/Textfield";
import api from "../../config/api";
import "./login.scss";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const [picture, setPicture] = useState('');

    const handleLogin = async () => {
        const response = await api.post('/users/login', {
            user: {
                email: form.email,
                password: form.password
            }
        });
        toast.success("Login successful");
    }


    const handleFacebookLogin = () => {
        console.log("handleFacebookLogin");
    }

    const responseFacebook = async (facebookResponse: ReactFacebookLoginInfo) => {
        if (!facebookResponse) return

        const { accessToken } = facebookResponse

        const response = await api.post('facebook', {
            facebook_access_token: accessToken
        })

        // store token to localStorage

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <div className="container">
            <div className="login">
                <div className="login-form">
                    <div className="login-form-header">
                        <h1>Amnazom</h1>
                    </div>
                    <div className="login-form-body">
                        <div className="login-form-body-picture">
                            <img src={picture} alt="" />
                        </div>
                        <div className="login-form-body-form">
                            <div className="login-form-body-form-input">
                                <Textfield type="email" name="email" label="Email" placeholder="Email" fullWidth value={form.email} onChange={handleChange} />
                            </div>
                            <div className="login-form-body-form-input">
                                <Textfield type="password" name="password" label="Password" placeholder="●●●●●●●●" fullWidth value={form.password} onChange={handleChange} />
                            </div>
                            <div className="login-form-body-form-button">
                                <Button text="Login" onClick={() => handleLogin()} />
                            </div>
                            <Divider text="oppure" />
                            <div className="login-form-body-form-button">
                                <FacebookLogin
                                    appId="486585759895782"
                                    // autoLoad={true}
                                    fields="first_name,last_name,email,picture"
                                    scope="public_profile,email"
                                    onClick={handleFacebookLogin}
                                    callback={responseFacebook}
                                    icon="fa-facebook"
                                    render={renderProps => (
                                        <ButtonFacebook onClick={renderProps.onClick} />
                                    )}
                                />
                            </div>
                            <div style={{ textAlign: "center" }}>
                                <p>Non sei ancora registrato? <Link href="/signup">Registrati</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login