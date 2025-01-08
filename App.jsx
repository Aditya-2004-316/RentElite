import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // Ensure this import matches your file structure
import SignUp from "./components/SignUp"; // Import the SignUp component

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />{" "}
                {/* Set Login as the default route */}
                <Route path="/signup" element={<SignUp />} />{" "}
                {/* Add SignUp route */}
            </Routes>
        </Router>
    );
};

export default App;
