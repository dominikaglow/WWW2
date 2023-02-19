import React, {useState, useContext} from "react";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import {AuthContext} from "../helpers/AuthContext";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    /*acces the function that enables us to change the state of ou AuthState*/
    const {setAuthState} = useContext(AuthContext);

    let history = useHistory();

    const login = () => {
        const data = {username: username, password: password};
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                //show alert box
                alert(response.data.error);
            }
            else {
                /*set item to local storage*/
                //response.data - access token that we receive
                localStorage.setItem("accessToken", response.data);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    status: true,
                });
                history.push("/");
            }
        });
    };
    return (
        <div className="LoginPage">
            <div className="LoginForm">
                <label>Username: </label>
                <input type="text" onChange={(event) => {setUsername(event.target.value)}}/>
                <label>Password: </label>
                <input type="password" onChange={(event) => {setPassword(event.target.value)}}/>
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
}

export default Login