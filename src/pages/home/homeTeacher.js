import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomeTeacher() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  axios
    .get("http://localhost:9000/getuser", { withCredentials: true })
    .then((res) => res.data)
    .then((data) => {
      console.log(data);
      if (data) {
        setUsername(data.username);
      } else {
        navigate("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return <h1>Hello teacher</h1>;
}

export default HomeTeacher;
