import Header from '../componentes/header/header'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../assets/css/listaUsuarios.css'
import { API } from '../services/api';
import Edit from '../assets/img/edit.png'
import Trash from '../assets/img/trash.png'
import { parseJwt, usuarioAutenticado } from '../services/auth'

export default function ListaUsuarios() {

    const [listaUsuarios, setListaUsuarios] = useState([])

    console.log('TipoUser ' + parseJwt().role)

    function ListarUsers() {
        console.log('getUsers')
        fetch(API + '/api/UserName/ListAll', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('teste2rp-chave-autenticacao')
            }
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                        .then((data) => {
                            setListaUsuarios(data)
                            // console.log(data)
                        })
                }
            })
            .catch(erro => console.log(erro))
    }

    function ExcluirUser(idUser) {
        fetch(API + '/api/UserName/' + idUser, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('teste2rp-chave-autenticacao')
            },
        })
            .then((resposta) => {
                if (resposta.status === 200) {
                    console.log('Usuário excluido');
                    // CloseModal(assistant.idAssistant)
                    // window.location.href = API + "/home"
                }
            })
            .catch((erro) => console.log(erro))
    };


    useEffect(() => {
        ListarUsers();
    }, [])

    return (
        <div>
            <Header />
            <div className="fundo">
                <section className='body-lista'>
                    <h1>Listagem de Usuários</h1>
                    <div className='container-lista'>
                        <div className='box-tabela'>

                            <table id="tabela-lista">
                                <thead>
                                    <tr>
                                        <th>Nome Usuário</th>
                                        <th>Email</th>
                                        <th>Tipo de Usuário</th>
                                        <th>Status</th>

                                    </tr>
                                </thead>
                                <tbody id="">
                                    {
                                        listaUsuarios.map((event) => {
                                            return (
                                                <tr>
                                                    <td>{event.userName1}</td>
                                                    <td>{event.email}</td>
                                                    <td>{event.idUserTypeNavigation.titleUserType}</td>
                                                    {
                                                        event.status == true ?
                                                            <td className='status'>
                                                                <div className='green'></div>
                                                                Ativo
                                                                <img src={Edit}></img>
                                                                {
                                                                    parseJwt().role === '2' ?
                                                                    <button onClick={ExcluirUser(event.idUser)} type="button"><img src={Trash}></img></button> :
                                                                    <button className="DisableBtn" type="button"><img src={Trash}></img></button> 
                                                                }
                                                            </td> :
                                                            <td className='status'>
                                                                <div className='red'></div>
                                                                Inativo
                                                                <button type="button"><img src={Edit}></img></button>
                                                                {
                                                                    parseJwt().role === '2' ?
                                                                    <button onClick={ExcluirUser(event.idUser)} type="button"><img src={Trash}></img></button> : 
                                                                    <button className="DisableBtn" type="button"><img src={Trash}></img></button> 
                                                                }
                                                            </td>
                                                    }

                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </section>
            </div>
        </div >
    );

}