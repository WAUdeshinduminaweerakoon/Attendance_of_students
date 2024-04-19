import React, { useState, useEffect } from 'react';

const AttendanceComponent = ({ selectedClass, selectedSubject }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedClass || !selectedSubject) {
      setStudents([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/students?class=${selectedClass}&subject=${selectedSubject}`)
      .then(response => response.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching students:', error));
  }, [selectedClass, selectedSubject]);

  const handleAttendanceChange = (id, value) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === id ? { ...student, attendance: value } : student
      )
    );
  };

  const handleSubmit = () => {
    // Here you can send the attendance data to the backend
    console.log(students);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto bg-gray-500 border shadow-md rounded-2xl">
      <h2 className="mb-4 text-2xl font-bold text-center">Attendance Table</h2>
      <table className="min-w-full felx">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Student Name</th>
            <th className="px-4 py-2 border">Student Number</th>
            <th className="px-4 py-2 border">Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td className="px-4 py-2 border">{student.name}</td>
              <td className="px-4 py-2 border">{student.number}</td>
              <td className="px-4 py-2 border">
                <div className="flex items-center">
                  <label className="mr-2">
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="Yes"
                      checked={student.attendance === 'Yes'}
                      onChange={() => handleAttendanceChange(student.id, 'Yes')}
                      className="mr-1"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`attendance-${student.id}`}
                      value="No"
                      checked={student.attendance === 'No'}
                      onChange={() => handleAttendanceChange(student.id, 'No')}
                      className="mr-1"
                    />
                    No
                  </label>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Submit Attendance
      </button>
    </div>
  );
};

export default AttendanceComponent;
