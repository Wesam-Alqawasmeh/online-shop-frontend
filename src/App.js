import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Header from "./components/Header/Header";
import cookies from "react-cookies";
import { logIn } from "./features/user/userSlice";
import ProductsList from "./components/ProductsList/ProductsList";

function App() {
  const user = useSelector((state) => state.user);
  const dispatcher = useDispatch();

  useEffect(() => {
    if (cookies.load("token")) {
      dispatcher(logIn());
    }
  }, [dispatcher]);

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user.status !== "auth" ? <SignIn /> : <ProductsList />}
          />
          <Route
            path="/sign-up"
            element={
              user.status !== "auth" ? <SignUp /> : <Navigate replace to="/" />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
