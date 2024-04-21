import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const TeacherDetailsComponent = () => {
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const date = new Date();
        setCurrentDate(date.toLocaleDateString());
    }, []);

    const handleClassChange = (e) => {
        setSelectedClass(e.target.value);
    };

    const handleSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
    };

    // Function to fetch teacher details
    const fetchTeacherDetails = async () => {
        try {
            const response = await axios.get('/api/Teacher/teacher_id'); // Replace 'teacher_id' with the actual ID of the teacher
            const data = response.data;
            // Handle the fetched teacher details
        } catch (error) {
            console.error('Error fetching teacher details:', error);
        }
    };

    useEffect(() => {
        fetchTeacherDetails();
    }, []);

    return (
        <div className="max-w-md p-6 mx-auto mt-8 bg-gray-500 border shadow-md rounded-2xl ">
            <h2 className="mb-4 text-2xl font-semibold">Adding Details</h2>
            <p className="mb-4 font-bold text-gray-800">Current Date: {currentDate}</p>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="class" className="block font-bold text-gray-800">Class:</label>
                    <select
                        id="class"
                        value={selectedClass}
                        onChange={handleClassChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-black"
                    >
                        <option value="">Select a class</option>
                        {/* Render options based on teacher details */}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="subject" className="block font-bold text-gray-800">Subject:</label>
                    <select
                        id="subject"
                        value={selectedSubject}
                        onChange={handleSubjectChange}
                        className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:border-black"
                    >
                        <option value="">Select a subject</option>
                        {/* Render options based on teacher details */}
                    </select>
                </div>
                <button type="submit" className="w-full px-4 py-2 mt-4 text-white border bg-slate-400 hover:bg-slate-800">
                    Add
                </button>
            </form>
        </div>
    );
}

export default TeacherDetailsComponent;
