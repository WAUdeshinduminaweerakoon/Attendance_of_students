import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Welcome from "./page/Welcome";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./page/LoginPage";

function App() {
  return (
    <BrowserRouter>
     <Header/>
      <Routes>
       <Route path="/" element={<Welcome/>}/>
       <Route path="/login" element={<LoginPage/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  
  );
}

export default App;
