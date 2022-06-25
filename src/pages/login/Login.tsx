import { useState } from "react";
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login';
import api from "../../config/api";

interface User {
    first_name: string;
    last_name: string;
    email: string;
}

const Login = () => {

    const [login, setLogin] = useState<boolean>(false);
    const [data, setData] = useState<User>({
        first_name: "",
        last_name: "",
        email: ""
    });
    const [picture, setPicture] = useState('');

    const handleFacebookLogin = () => {
        console.log("handleFacebookLogin");
    }

    const responseFacebook = async (facebookResponse: ReactFacebookLoginInfo) => {
        console.log(facebookResponse.accessToken)
        if (!facebookResponse) return
        setData({
            first_name: facebookResponse.name?.split(" ")[0] || "",
            last_name: facebookResponse.name?.split(" ")[1] || "",
            email: facebookResponse.email || ""
        });
        setPicture(facebookResponse.picture?.data?.url || "");

        const { accessToken } = facebookResponse

        try {
            const response = await api.post('facebook', {
                facebook_access_token: accessToken
            })
            setLogin(true)
            console.log(response)
        } catch (e) {
            setLogin(false)
            console.log("ERRORE!!!")
        }


    }

    return (
        <div className="container">
            <div style={{ width: '600px' }}>
                <div>
                    {!login &&
                        <FacebookLogin
                            appId="486585759895782"
                            // autoLoad={true}
                            fields="first_name,last_name,email,picture"
                            scope="public_profile,email"
                            onClick={handleFacebookLogin}
                            callback={responseFacebook}
                            icon="fa-facebook" />
                    }
                    {login &&
                        <img src={picture} alt="Profile" />
                    }
                </div>
                {login &&
                    <div>
                        <h1>{data.first_name + " " + data.last_name}</h1>
                        <p>
                            {data.email}
                        </p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Login