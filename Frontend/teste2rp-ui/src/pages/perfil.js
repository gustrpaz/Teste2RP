import { Component } from 'react';
import React, { useState, useEffect } from 'react';
import '../assets/css/perfil.css'
import Header from '../componentes/header/header'
import Edit from '../assets/img/edit2.png'
import { API } from '../services/api';
import { parseJwt, usuarioAutenticado } from '../services/auth'
import { useNavigate } from 'react-router-dom';

export default function PerfilUsuario() {

    const [IdUser, setIdUser] = useState("");
    // const [IdUserType, setIdUserType] = useState("");
    const [InfoUser, setInfoUser] = useState("");
    const [Nome, setNome] = useState("");
    const [Email, setEmail] = useState("")
    const [Senha, setSenha] = useState("");

    let history = useNavigate();

    function cadastrarNewUser(event) {
        event.preventDefault();
        console.log('entrou no update')
        
        var myUrl = API + "/api/UserName/" + parseJwt().role
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('teste2rp-chave-autenticacao') },
            body: JSON.stringify({
                "idUser": InfoUser.idUser,
                "idUserType": InfoUser.idUserType,
                "userName1": Nome,
                "email": Email,
                "passwd": Senha,
                "status": InfoUser.status
            })
        };
        fetch(myUrl, requestOptions)
            .then(response => {
                if (response.status === 200) {
                    console.log('atualizou')
                    console.log(response)
                    // ListarPerfil()
                }
            }).catch(error => console.log(error))
    }
    useEffect(() => {
        ListarPerfil();
    }, [cadastrarNewUser])

    function ListarPerfil() {
        var myUrl = API + "/api/UserName/" + parseJwt().jti
        const requestOptions = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('teste2rp-chave-autenticacao')
            }
        };
        fetch(myUrl, requestOptions
        ).then(response => {
            if (response.status === 200) {
                return response.json()
                    .then((data) =>
                        setInfoUser(data)
                        // console.log(data)
                    )
            }
        })
            .catch(erro => console.log(erro))
    }

    useEffect(() => {
        ListarPerfil();
    }, [])

    return (
        <div>
            <Header />
            <div className='body-perfil'>
                <section className='container-perfil'>
                    <h1>Meu Perfil</h1>
                    <div className='box-perfil'>
                        <form onSubmit={cadastrarNewUser} className='FormPerfil'>
                            <div className="Info-User">
                                <h3>Nome de Usuário:
                                    <span>
                                        {InfoUser.userName1}
                                    </span>
                                </h3>
                                <h3>Email:
                                    <span>
                                        {InfoUser.email}
                                    </span>
                                </h3>
                            </div>
                            <div className="box-Form">
                                <label className='label-perfil'>Novo nome:</label>
                                <input className='InputPerfil' type="text" name="nome" value={Nome} onChange={(campo) => setNome(campo.target.value)} placeholder='Novo nome'></input>
                            </div>
                            <div className="box-Form">
                                <label>Novo email:</label>
                                <input className='InputPerfil' type="email" name="Email" value={Email} onChange={(campo) => setEmail(campo.target.value)} placeholder='Novo email'></input>
                            </div>
                            <div className="box-Form">
                                <label>Nova Senha</label>
                                <input className='InputPerfil' type="password" name="password" value={Senha} onChange={(campo) => setSenha(campo.target.value)} placeholder='Nova Senha'></input>
                            </div>

                            <input type="submit"
                                className="SubmitPerfil"
                                value="Salvar">
                            </input>
                        </form>
                    </div>
                </section>

            </div>

        </div>
    );
}