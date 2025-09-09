import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import Alert from "./components/Alert.js";
import imagemFundo from './assets/bg-ia-generated.png';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { TAlertProps } from "./types/TAlert.js";
import { TSession } from "./types/TSession.js";
import { SessionContext } from "./sessionContext.js";

function App() {
  const [sessao, setSessao] = useState({} as TSession);
  const [alertas, setAlertas] = useState([] as TAlertProps[]);
  const [carregando, setCarregando] = useState(true);

  const style = {
    backgroundImage: `url(${imagemFundo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '0'
  };

  useEffect(() => {
    try {
      const tokenJwt = localStorage.getItem('token');

      if (tokenJwt == null || tokenJwt.length === 0) {
        return;
      }

      const payload = JSON.parse(atob(tokenJwt.split('.')[1]));
      const expiracao = payload.exp;
      const dataAtualSegundos = Date.now() / 1000;

      if (dataAtualSegundos < expiracao) {
        setSessao({
          usuarioLogado: {
            ...payload
          },
          token: tokenJwt,
          expiracao: expiracao,
        });
      }
    } catch (erro) {
      console.log("Erro ao decodificar o token:", erro);
    } finally {
      setCarregando(false);
    }
  }, []);

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

  if (carregando) {
    return (<></>)
  }

  return (
    <SessionContext.Provider value={{ sessao: sessao, setSessao: setSessao, adcionarAlerta: adcionarAlerta }}>
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
              <Login />} 
            />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </SessionContext.Provider>
  );
};

export default App;
