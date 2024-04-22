import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TeacherDetailsComponent = () => {
  const location = useLocation();
  const teacherData = location.state || {};
  const [students, setStudents] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/Sclass/Students/${teacherData.teachSclass._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const studentsWithAttendance = response.data.map(student => ({
          ...student,
          status: 'absent' // default status
        }));
        setStudents(studentsWithAttendance);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    if (teacherData.teachSclass && teacherData.teachSclass._id) {
      fetchStudents();
    }
  }, [teacherData.teachSclass, token]);

  const handleAttendanceChange = (studentId, status) => {
    setStudents(students.map(student => {
      if (student._id === studentId) {
        return { ...student, status }; // Update the status of the specific student
      }
      return student;
    }));
  };

  const submitAttendance = async () => {
    try {
      const date = new Date().toISOString();
      const attendanceUpdates = students.map(student => ({
        studentId: student._id,
        status: student.status,
        date: date
      }));
  
      // Send attendanceUpdates to the backend
      await axios.put(`http://localhost:5000/StudentAttendance/${teacherData.teachSclass._id}`, { attendanceUpdates }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      setSuccessMsg('Attendance successfully updated.');
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };
  

  return (
    <div className="container px-4 mx-auto mt-8">
      <h3 className="mt-8 mb-4 text-xl font-semibold">Students</h3>
      <div className="overflow-x-auto">
        <form onSubmit={(e) => {
          e.preventDefault();
          submitAttendance();
        }}>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={student._id}>
                  <td className="px-4 py-2">{student.name}</td>
                  <td className="px-4 py-2">
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${student._id}`}
                        value="present"
                        checked={student.status === 'present'}
                        onChange={() => handleAttendanceChange(student._id, 'present')}
                      /> Present
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${student._id}`}
                        value="absent"
                        checked={student.status === 'absent'}
                        onChange={() => handleAttendanceChange(student._id, 'absent')}
                      /> Absent
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="submit" className="px-4 py-2 mt-4 text-white bg-blue-500 rounded shadow">Submit Attendance</button>
        </form>
        {successMsg && <div className="p-4 mt-4 text-green-700 bg-green-100 rounded">{successMsg}</div>}
      </div>
    </div>
  );
};

export default TeacherDetailsComponent;
