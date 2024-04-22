import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const TeacherDetailsComponent = () => {
  const location = useLocation();
  const teacherData = location.state || {};
  const [students, setStudents] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [token, setToken] = useState('');
  const [attendanceData, setAttendanceData] = useState({}); // State to hold attendance data for each student
  const [errorMsg, setErrorMsg] = useState('');

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
    // Update attendance data for the specific student
    setAttendanceData({
      ...attendanceData,
      [studentId]: status
    });
  };

  const submitAttendance = async () => {
    try {
      if (!teacherData || !teacherData.teachSclass || !teacherData.teachSclass._id) {
        setErrorMsg('Teacher data is missing or incomplete.');
        return;
      }

      const date = new Date().toISOString();
      
      // Iterate over each student and send their attendance separately
      for (const student of students) {
        const studentAttendance = attendanceData[student._id] || 'absent'; // Get attendance for this student
        await axios.put(`http://localhost:5000/studentAttendance/${teacherData.teachSclass._id}`, {
          studentId: student._id,
          status: studentAttendance,
          date: date
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }

      setSuccessMsg('Attendance successfully updated.');
    } catch (error) {
      console.error('Error updating attendance:', error);
      setErrorMsg('An error occurred while updating attendance.');
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
                        checked={attendanceData[student._id] === 'present'}
                        onChange={() => handleAttendanceChange(student._id, 'present')}
                      /> Present
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`attendance-${student._id}`}
                        value="absent"
                        checked={attendanceData[student._id] === 'absent'}
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
        {errorMsg && <div className="p-4 mt-4 text-red-700 bg-red-100 rounded">{errorMsg}</div>}
      </div>
    </div>
  );
};

export default TeacherDetailsComponent;

