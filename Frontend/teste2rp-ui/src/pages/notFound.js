
import { Link } from 'react-router-dom'

//components

const NotFound = () => {
    //verificar se o usuario está registrado(token)

    return (
        <div>
            <div className="notfoundimg">
                <h1 className="test">Página não encontrada :(</h1>
                <p className="p pNotfound">Parece que essa página não existe ou há algum erro de conexão.</p>
                <p className="p pNotfound">Por favor, volte e tente novamente.</p>
                <Link to="/">
                    <button className='button buttonNotfound'>Voltar</button>
                </Link>
            </div>
            <div>
            </div>
        </div>

    );
}

export default NotFound;