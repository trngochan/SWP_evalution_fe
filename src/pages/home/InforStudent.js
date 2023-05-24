import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function InforStudent() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

    axios
      .get("http://localhost:9000/getuser", { withCredentials: true })
      .then((res) => res.data)
      .then(data => {
        console.log(data);
        if(data) {
          
        setUsername(data.username)
        } 
      })
      .catch((err) => {
        console.log(err)
        navigate("/");
      });
    return ( <div>
        <h1>Helo student {username}</h1>
    </div>);
}

export default InforStudent;