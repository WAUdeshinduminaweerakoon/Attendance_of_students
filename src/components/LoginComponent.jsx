import React, { useState } from 'react';

const LoginComponent = () => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Email:', email);
        console.log('Password:', password);
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
                <button type="submit" className="px-4 py-2 font-bold text-white border rounded bg-slate-400 hover:bg-slate-800">
                    Login
                </button>
            </form>
        </div>
    );
}

export default LoginComponent;
