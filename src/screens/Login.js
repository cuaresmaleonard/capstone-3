import { useState, useEffect, useContext, Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import Swal  from 'sweetalert2';
import UserContext from '../UserContext';

import './Login.css'



export default function Login () {
	
	const { user, setUser } = useContext(UserContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isActive, setIsActive] = useState(false)

	function loginUser(e){

		e.preventDefault();

		fetch('https://evening-forest-87496.herokuapp.com/user/login',
			{
				method: 'POST',
				headers: {
					'Content-Type' : 'application/json'
				},
				body: JSON.stringify({
					email: email,
					password: password,
				})
			}
		)
		.then(res => res.json())
		.then(data => {

			console.log(data);
			if(typeof data.access !== 'undefined'){
				localStorage.setItem('token', data.access )
				retrieveUserDetails(data.access)

				Swal.fire({
					title: 'Login successful',
					icon: 'success',
					text: 'You may now start shopping'
				})
			} else {

				Swal.fire({
					title: 'Authentication failed',
					icon: 'error',
					text: 'Check details and try again'
				})
			}
		});

		setEmail('');
		setPassword('')

	}

	const retrieveUserDetails = (token) => {
		fetch('https://evening-forest-87496.herokuapp.com/user/details', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.then(data => {
			console.log(data);
			setUser({
				id: data._id,
				isAdmin: data.isAdmin
			})
		})
	}

	useEffect(() => {
		if(email !== '' && password !== '') {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password])

	return (

		(user.id !== null) ?
			<Navigate to="/"/>
		:

		<Fragment>
			<h1>Login</h1>

			<div className='form'>
                <div className='form-info'>
					<form onSubmit={(e) => loginUser(e)}>
                    <span>
                        <label>Email</label>
						<input 
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email@mail.com"
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
							<button type="submit" >Login</button>
							:
							<button type="submit" disabled>Login</button>
						}
                    </span>
					</form>
                </div>
            </div>
		</Fragment>
	)
}