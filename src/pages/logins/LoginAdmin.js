import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import FormLogin from "~/components/formLogin";

function LoginAdmin() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies("token");
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:9000/loginadmin", {
        username,password
      })
      .then((res) => res.data)
      .then((data) => {
        if(data.data.length > 0) {
          setCookie('token', data.token, {path: '/'});
        }
        if(data.data.length > 0) navigate('/student')
        
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
  <FormLogin></FormLogin>
  );
}

export default LoginAdmin;
