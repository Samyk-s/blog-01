import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';  // Assuming Signup.jsx is inside 'pages' folder
import Login from './pages/Login';
import Blogs from './pages/Blogs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Add root route */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        {/* Handle other routes */}
      </Routes>
    </Router>
  );
}

export default App;
