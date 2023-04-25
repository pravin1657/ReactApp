import "./App.css";
import Movies from "./components/movies";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/NavBar";
import MovieForm from "./components/movieForm";
import Loginform from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <div className="App container">
      <NavBar />
      <Routes>
      <Route path="/register" exact Component={RegisterForm}></Route>
        <Route path="/movies" exact Component={Movies}></Route>
        <Route path="/loginform" exact Component={Loginform}></Route>
        <Route path="/movies/:id" exact Component={MovieForm}></Route>
        <Route path="/" element={<Navigate replace to="/movies" />} />
        <Route path="/customers" Component={Customers}></Route>
        <Route path="/rentals" Component={Rentals}></Route>
        <Route path="/not-found" Component={NotFound}></Route>
        <Route path="*" element={<Navigate replace to="/not-found" />} />
      </Routes>
    </div>
  );
}

export default App;
