import React from 'react'
import { Link } from 'react-router-dom';
import '../../assets/css/componentes/header.css'
import logo from '../../assets/img/logo2RP.png'
import { parseJwt, usuarioAutenticado } from '../../services/auth'

export default function Header() {

    return (
        <div>
            <header className='header2'>
                <div className="container container_header">
                    <Link to="/"><img className='logo' src={logo}></img></Link>
                    <div>
                        {
                            usuarioAutenticado() ? <Link to="/login"><button onClick={() => localStorage.clear()} >Logout</button></Link> : <Link to="/login"><button>Login</button></Link>
                        }
                        {
                            localStorage.getItem('teste2rp-chave-autenticacao') !== null && 
                             (parseJwt().role === '1' || parseJwt().role === '2' ) ?
                            <Link to="/cadastroUsuario"><button>Cadastrar</button></Link> : <button></button>
                        }

                    </div>
                </div>
            </header>
        </div>
    )

}