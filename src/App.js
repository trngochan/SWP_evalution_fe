import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import LoginStudent from './pages/logins/LoginStudent';
import HomeStudent from './pages/home/homeStudent';
import HomeTeacher from './pages/home/homeTeacher';
import LoginTeacher from './pages/logins/LoginTeacher';
import LoginAdmin from './pages/logins/LoginAdmin';
import HomeAdmin from './pages/home/homeAdmin';
import Evaluation from './pages/evaluation';
import TeacherBoardScore from './pages/boardScore';
import StudentsInCourse from './pages/Teacher/StudentsInCourse';


function App() {
  return (
    <div className="App"> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginstudent" element={<LoginStudent />} />
          <Route path="/loginteacher" element={<LoginTeacher />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/student" element={<HomeStudent />} />
          <Route path="/teacher" element={<HomeTeacher />} />  
          <Route path="/admin" element={<HomeAdmin />} />  
          <Route path="/evaluation" element={<Evaluation />} />  
          <Route path="/teacherboardscore" element={<TeacherBoardScore />} />  
          <Route path="/studentsInCourse" element={<StudentsInCourse />} />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
