import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Welcome from "./page/Welcome";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./page/LoginPage";
import TeacherDetailsPage from "./page/TeacherDetailsPage";
import AttendancePage from "./page/AttendancePage";

function App() {
  return (
    <BrowserRouter>
     <Header/>
      <Routes>
       <Route path="/" element={<Welcome/>}/>
       <Route path="/login" element={<LoginPage/>}/>
       <Route path="/teacherDetails" element={<TeacherDetailsPage/>}/>
       <Route path="/attendance" element={<AttendancePage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  
  );
}

export default App;
