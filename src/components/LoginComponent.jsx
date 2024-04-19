import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:5000/TeacherLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data && data._id) {
                    navigate('/teacherDetails');
                } else {
                    setError('Invalid email or password');
                }
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error logging in. Please try again later.');
        }
    };
    
    return (
        <div className="max-w-md p-6 mx-auto mt-8 bg-gray-500 border shadow-md rounded-2xl ">
            <h2 className="mb-4 text-2xl font-semibold">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className="block font-bold text-gray-900">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-black"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block font-bold text-gray-900">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-black"
                        required
                    />
                </div>
                {error && <p className="text-red-600">{error}</p>}
                <button type="submit" className="w-full px-4 py-2 mt-4 text-white border rounded-2xl bg-slate-400 hover:bg-slate-800">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginComponent;
