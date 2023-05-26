import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/home";
import LoginStudent from './pages/logins/LoginStudent';
import InforStudent from './pages/home/InforStudent';
import InforTeacher from './pages/home/InforTeacher';
import LoginTeacher from './pages/logins/LoginTeacher';
import LoginAdmin from './pages/logins/LoginAdmin';


function App() {
  return (
    <div className="App"> 
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loginstudent" element={<LoginStudent />} />
          <Route path="/loginteacher" element={<LoginTeacher />} />
          <Route path="/loginadmin" element={<LoginAdmin />} />
          <Route path="/student" element={<InforStudent />} />
          <Route path="/teacher" element={<InforTeacher />} />  
        </Routes>
      </Router>
    </div>
  );
}

export default App;
