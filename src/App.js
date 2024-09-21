import { useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { magic } from "./lib/magic";
import { useNavigate, useState } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const getMetadata = useCallback(async () => {
    try {
      const metadata = await magic.user.getInfo();
      setUser(metadata);
    } catch (err) {
      navigate("/");
      console.error(err);
    }
  }, [navigate]);

  const printMetadata = useCallback(async () => {
    try {
      const metadata = await magic.user.getInfo();
      console.log(metadata);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await magic.user.logout();
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route 
          path="/" 
          element={
            <Login isRedirect={getMetadata}/>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <Dashboard 
              user={user}
              logout={logout}
              setUser={setUser}
              printMetadata={printMetadata}
            />
          } 
        />
      </Routes>
    </div>
  );
}

export default App;