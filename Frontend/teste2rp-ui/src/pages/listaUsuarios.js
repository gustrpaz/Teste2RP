import Header from '../componentes/header/header'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../assets/css/listaUsuarios.css'
import { API } from '../services/api';
import Edit from '../assets/img/edit.png'
import Trash from '../assets/img/trash.png'
import '../assets/css/componentes/modal.css'
import { useNavigate } from 'react-router-dom';
import { parseJwt, usuarioAutenticado } from '../services/auth'

export default function ListaUsuarios() {

    const [IdUser, setIdUser] = useState("");
    // const [IdUserType, setIdUserType] = useState("");
    const [listaUsuarios, setListaUsuarios] = useState([]);
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
                    CloseModal()
                    ListarUsers()
                }
            }).catch(error => console.log(error))
    }

    function OpenModal(idUser) {
        var modal = document.getElementById("modalUser");
        modal.style.display = "flex";
        console.log(idUser)
    };
    function CloseModal() {
        var modal = document.getElementById("modalUser");
        modal.style.display = "none";
    };

    function ListarUsers() {
        console.log('GetUsers chamada')
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
                    console.log('Usuário excluido ' + idUser);
                    ListarUsers();
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
                {
                    listaUsuarios.map((event) => {
                        return (
                            <div id={"modalUser"} className='modalABackground'>
                                <div className='modalAContainer'>
                                    <div className='modalA-header'>
                                        <button
                                            className='exitA-button'
                                            onClick={(event) => {
                                                event.preventDefault()
                                                CloseModal()
                                            }}
                                        >x
                                        </button>
                                    </div>
                                    <div className='body-modal'>
                                        <form className='FormPerfil'>
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

                                            <select
                                                className='InputCadastro'
                                                name="select">
                                                <option value="0" selected disabled>
                                                    Selecione o Status do usuário
                                                </option>

                                                <option value='1' >Ativo</option>
                                                <option value='2' >Inativo</option>
                                        
                                            </select>

                                            {/* <input type="submit"
                                                className="SubmitPerfil"
                                                value="Salvar">
                                            </input> */}
                                            <button
                                                type="button"
                                                className="SubmitPerfil"
                                                onClick={() => cadastrarNewUser(event.idUser)}
                                            >Salvar
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }

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
                                                                <button
                                                                    type="button"
                                                                    onClick={(event) => {
                                                                        event.preventDefault()
                                                                        OpenModal(event.idUser)
                                                                    }}><img src={Edit}></img>
                                                                </button>

                                                                {
                                                                    parseJwt().role === '2' ?
                                                                        <button onClick={() => ExcluirUser(event.idUser)} type="button"><img src={Trash}></img></button> :
                                                                        <button className="DisableBtn" type="button"><img src={Trash}></img></button>
                                                                }
                                                            </td> :
                                                            <td key={event.idUser} className='status'>
                                                                <div className='red'></div>
                                                                Inativo
                                                                <button
                                                                    type="button"
                                                                    onClick={(event) => {
                                                                        event.preventDefault()
                                                                        OpenModal(event.idUser)
                                                                    }}><img src={Edit}></img>
                                                                </button>

                                                                {
                                                                    parseJwt().role === '2' ?
                                                                        <button onClick={() => ExcluirUser(event.idUser)} type="button"><img src={Trash}></img></button> :
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