import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Alert from "./components/Alert.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { TAlertProps } from "./types/TAlert.ts";

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [alertas, setAlertas] = useState([] as TAlertProps[]);

  const style = {
    background: 'linear-gradient(to bottom, white, lightblue)'
  };

  const adcionarAlerta = (alerta: TAlertProps) => {
    alerta.id = Date.now().toString();
    setAlertas([
      ...alertas,
      alerta
    ]);
  };

  const removerAlerta = (alertaRemocao: TAlertProps) => {
    setAlertas((prevAlertas) => {
      const indiceAlerta = prevAlertas.findIndex((item) => item.id === alertaRemocao.id);
      const ultimoIndice = indiceAlerta === prevAlertas.length - 1;

      return ultimoIndice ? [] : prevAlertas;
    });
  };

  return (
    <div className="container-fluid vh-100" style={style}>
      <div style={{ position: "absolute", top: 0, right: 0, padding: '10px' }}>
        {alertas.map((item: TAlertProps, i: number) => {
          return (
            <Alert key={item.id} id={item.id} tipo={item.tipo} mensagem={item.mensagem} removerAlerta={removerAlerta} />
          )
        })}
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={
            <Login
              setUsuarioLogado={setUsuarioLogado}
              adcionarAlerta={adcionarAlerta} />} />
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
