import { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import UserContext from "../UserContext";
import Swal from "sweetalert2";
import './Register.css'

const Register = () => {
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch("https://evening-forest-87496.herokuapp.com/user/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data._id) {
            setUsername("")
          setEmail("");
          setPassword("");

          Swal.fire({
            title: "Regitration Succesful",
            icon: "success",
            text: "Welcome!",
          });
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again",
          });
        }
      })
        // Clear input fields
        setUsername("")
        setEmail("");
        setPassword("");
    }
    useEffect(() => {
		if(username !== '' && email !== '' && password !== ''){
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [username, email, password
	]);
    return (
        (user.id) ? 
			<Navigate to="/"/>
			:
			<Container>

			<div className='register'>
                <div className='form-register'>
					<form onSubmit={(e) => registerUser(e)}>
                    <span>
                        <label>Email Address</label>
						<input 
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							placeholder="Email@mail.com"
							required>
						</input>
						
                    </span>
					<span>
                        <label>User Name</label>
						<input 
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Username"
							required>
						</input>
						
                    </span>
                    <span>
						<label>Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							required>
						</input>
                    </span>
                    <span> 
                        { isActive ?
							<button type="submit" >Submit</button>
							:
							<button type="submit" disabled >Submit</button>
						}
                    </span>
					</form>
                </div>
            </div>
			</Container>
    )
};

export default Register;
