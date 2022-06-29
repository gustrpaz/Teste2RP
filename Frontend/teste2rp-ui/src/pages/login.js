import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import '../assets/css/login.css'
import ImgLogin from '../assets/img/imglogin.png'
import Header from '../componentes/header/header'
import { API } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from '../services/auth'

export default function Login() {
    const [IsLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useNavigate();

    const FazerLogin = (e) => {
        setIsLoading(true);
        e.preventDefault();

        var myUrl = API + "/api/Login"
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('teste2rp-chave-autenticacao') },
            // body: JSON.stringify({ "email": email, "password": password, "idUser": parseJwt().idUser })
            body: JSON.stringify({ "email": email, "password": password })
        };

        fetch(myUrl, requestOptions)
            .then((resposta) => {
                if (resposta.status === 200) {
                    return resposta.json()
                        .then((data) => {
                            console.log('Logou')
                              localStorage.setItem('teste2rp-chave-autenticacao', data.token);
                                console.log(parseJwt().role)

                                if (parseJwt().role === '1' || parseJwt().role === '2') {
                                    history('/listaUsuariosAdm')
                                }
                                else if (parseJwt().role === '3') {
                                    history('/perfil')
                                    console.log('logado: ' + usuarioAutenticado())
                                }
                                else {
                                    history('/notFound')
                                }
                        })
                }
                setIsLoading(false);
            })

            .catch((error) => {
                console.log(error)
                this.setState({ erroMensagem: 'E-mail e/ou senha inválidos', isLoading: false })
                setIsLoading(false);
            })
        setIsLoading(false);
    };


    return (
        <div>
            <Header />
            <div className='body-login'>

                <section className='container-login'>
                    <div>
                        <img className='ImgLogin' src={ImgLogin} alt='imagem Login'></img>
                    </div>
                    <div className='box-login'>
                        <h1>Login</h1>
                        <form onSubmit={FazerLogin} className='FormLogin'>

                            <input
                                className='InputLogin'
                                type="text"
                                name="Email"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>

                            <input
                                className='InputLogin'
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Senha'
                            ></input>

                            {
                                IsLoading === true ?
                                    <input className='SubmitLogin' type='submit' disabled >Carregando...</input> : <input type="submit" className="SubmitLogin" value="Entrar"></input>
                            }

                        </form>
                    </div>
                </section>

            </div>
        </div>
    )
}