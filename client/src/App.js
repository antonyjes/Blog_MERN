import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
