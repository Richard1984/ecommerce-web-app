import { useEffect, useState } from "react";
import { ReactFacebookLoginInfo } from 'react-facebook-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import ButtonFacebook from "../../components/Button/ButtonFacebook";
import Divider from "../../components/Divider/Divider";
import Textfield from "../../components/Textfield/Textfield";
import { useAppDispatch, useAppSelector } from "../../config/store";
import { loginWithFacebook, signup } from "../../reducers/authentication";
import "./signup.scss";


const SignUp = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(state => state.authentication)
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    })
    const [picture, setPicture] = useState('');

    const handleSignup = async () => {
        dispatch(signup({ firstname: form.firstname, lastname: form.lastname, email: form.email, password: form.password }))
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
        <div className="container">
            <div className="signup">
                <div className="signup-form">
                    <NavLink to="/" className="signup-form-header">
                        <h1>Amnazom</h1>
                    </NavLink>
                    <div className="signup-form-body">
                        <div className="signup-form-body-picture">
                            <img src={picture} alt="" />
                        </div>
                        <div className="signup-form-body-form">
                            <div className="signup-form-body-form-input">
                                <Textfield type="text" name="firstname" label="Nome" placeholder="Nome" fullWidth value={form.firstname} onValueChange={handleChange} />
                            </div>
                            <div className="signup-form-body-form-input">
                                <Textfield type="email" name="lastname" label="Cognome" placeholder="Cognome" fullWidth value={form.lastname} onValueChange={handleChange} />
                            </div>
                            <div className="signup-form-body-form-input">
                                <Textfield type="email" name="email" label="Email" placeholder="Email" fullWidth value={form.email} onValueChange={handleChange} />
                            </div>
                            <div className="signup-form-body-form-input">
                                <Textfield type="password" name="password" label="Password" placeholder="●●●●●●●●" fullWidth value={form.password} onValueChange={handleChange} />
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