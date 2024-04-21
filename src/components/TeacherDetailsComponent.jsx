import React, { useState, useEffect } from 'react';

const TeacherDetailsComponent = () => {

    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [currentDate, setCurrentDate] = useState('');


    useEffect(() => {
      
        fetch('/api/classes')
            .then(response => response.json())
            .then(data => setClasses(data))
            .catch(error => console.error('Error fetching classes:', error));

        fetch('/api/subjects')
            .then(response => response.json())
            .then(data => setSubjects(data))
            .catch(error => console.error('Error fetching subjects:', error));
    }, []);

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
      
    };

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
                        {classes.map(cls => (
                            <option key={cls._id} value={cls._id}>{cls.name}</option>
                        ))}
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
                        {subjects.map(subject => (
                            <option key={subject._id} value={subject._id}>{subject.name}</option>
                        ))}
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
