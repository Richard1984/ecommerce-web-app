import { useState } from "react";
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { toast } from "react-toastify";
import Button from "../../components/Button/Button";
import ButtonFacebook from "../../components/Button/ButtonFacebook";
import Divider from "../../components/Divider/Divider";
import Textfield from "../../components/Textfield/Textfield";
import api from "../../config/api";
import "./signup.scss";


const SignUp = () => {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })
    const [picture, setPicture] = useState('');

    const handleSignup = async () => {
        const response = await api.post('users/signup', {
            user: {
                firstname: form.firstname,
                lastname: form.lastname,
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
            <div className="signup">
                <div className="signup-form">
                    <div className="signup-form-header">
                        <h1>Amnazom</h1>
                    </div>
                    <div className="signup-form-body">
                        <div className="signup-form-body-picture">
                            <img src={picture} alt="" />
                        </div>
                        <div className="signup-form-body-form">
                            <div className="signup-form-body-form-input">
                                <Textfield type="text" name="firstname" label="Nome" placeholder="Nome" fullWidth value={form.firstname} onChange={handleChange} />
                            </div>
                            <div className="signup-form-body-form-input">
                                <Textfield type="email" name="lastname" label="Cognome" placeholder="Cognome" fullWidth value={form.lastname} onChange={handleChange} />
                            </div>
                            <div className="signup-form-body-form-input">
                                <Textfield type="email" name="email" label="Email" placeholder="Email" fullWidth value={form.email} onChange={handleChange} />
                            </div>
                            <div className="signup-form-body-form-input">
                                <Textfield type="password" name="password" label="Password" placeholder="●●●●●●●●" fullWidth value={form.password} onChange={handleChange} />
                            </div>
                            <div className="signup-form-body-form-button">
                                <Button text="Registrati" onClick={() => handleSignup()} />
                            </div>
                            <Divider text="oppure" />
                            <div className="signup-form-body-form-button">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;