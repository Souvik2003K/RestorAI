import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        await axios.post(import.meta.env.VITE_LOGIN_URI, 
            {email, password},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then((response) => {
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        }).catch((error) => {
            console.log(error);
        })
    }


    return (
        <form className="w-2/5 mx-auto p-8 shadow-lg rounded-lg bg-white mt-20" onSubmit={login}>
            <h2 className="text-4xl font-extrabold mb-10">Log in</h2>
            <label htmlFor="email" className="block mt-8 mb-4">
                Email
            </label>
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                required
                className="p-2 rounded border border-gray-300 text-base w-full"
            />
            <div className="email error text-pink-500 mt-2 text-sm font-bold"></div>
            <label htmlFor="password" className="block mt-8 mb-4">
                Password
            </label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                required
                className="p-2 rounded border border-gray-300 text-base w-full"
            />
            <div className="password error text-pink-500 mt-2 text-sm font-bold"></div>
            <button className='bg-orange-400 px-5 py-3 text-white rounded-xl font-bold mt-3'>Log In</button>
        </form>
    );
};

export default LoginForm;
