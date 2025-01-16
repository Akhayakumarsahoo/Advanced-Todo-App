import { useSelector } from "react-redux";
import Navbar from "./components/layouts/Navbar.jsx";
import Content from "./components/Layout.jsx";
import Auth from "./components/auth/Auth.jsx";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Content />
        </>
      ) : (
        <Auth />
      )}
    </>
  );
}

export default App;
