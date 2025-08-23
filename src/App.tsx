import React from "react"
import Login from "./pages/Login.tsx";

function App() {
  const style = {
	background: 'linear-gradient(to bottom, white, lightblue)'
  };
  return (
    <div className="container-fluid vh-100" style={style}>
		<Login></Login>
	</div>
  );
};

export default App;
