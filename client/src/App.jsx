import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Overview from "./pages/overview";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;