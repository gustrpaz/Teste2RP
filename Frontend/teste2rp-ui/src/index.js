import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';

import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
  useNavigate
} from 'react-router-dom';

import LandingPage from './pages/landingpage';
import Login from './pages/login';
import ListaUsuarios from './pages/listaUsuarios';
import PerfilUsuario from './pages/perfil';
import CadastroUsuario from './pages/cadastroUsuario';
import NotFound from './pages/notFound';
import { parseJwt, usuarioAutenticado } from "../src/services/auth"

// const PermissaoAdm = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       usuarioAutenticado() && parseJwt().role === '1' || '2' ? (
//         // operador spread
//         <Component {...props} />
//       ) : (
//         <Navigate to="login" />
//       )
//     }
//   />
// );

// const PermissaoGeral = ({ component: Component }) => (
//   <Route
//     render={(props) =>
//       usuarioAutenticado() && parseJwt().role === '3' ? (
//         // operador spread
//         <Component {...props} />
//       ) : (
//         <Navigate to="login" />
//       )
//     }
//   />
// );

const routing = (
  <Router>
    <div>
      <Routes>
        <Route exact path="/" element={LandingPage} /> {/* LandingPage */}
        <Route path="/login" element={Login} /> {/* Login */} 
        {/* <PermissaoAdm path="/listaUsuariosAdm" element={ListaUsuarios} />
        <PermissaoGeral path="/perfil" element={PerfilUsuario} /> 
        <PermissaoAdm path="/cadastroUsuario" element={CadastroUsuario} />  */}
        <Route path="/notFound" element={<NotFound />} /> {/* Not Found */}
        <Route path="*" element={<Navigate to="notFound" />} /> 
      </Routes>
    </div>
  </Router>
);

const ValidateToken = () => {
  let navigate = useNavigate();
  console.log("validado")
  console.log(parseJwt())
}

ReactDOM.render(routing, document.getElementById('root'));
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );


