import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const style = {
    background: 'linear-gradient(to bottom, white, lightblue)'
  };

  return (
    <div className="container-fluid vh-100" style={style}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/" element={   
            <ProtectedRoute usuarioLogado={usuarioLogado}>
              <Home />
            </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
