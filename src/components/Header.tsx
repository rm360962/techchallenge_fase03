import { useEffect, useState } from "react";
import { TPageProps } from "../types/TPage";
import iconeLogout from '../assets/logout.svg';
import iconeUsuario from '../assets/person.svg';

const Header = (props: TPageProps) => {
    const [tempoSessaoRestante, setTempoSessaoRestante] = useState(0);
    const [acessoPgUsuario, setAcessoPgUsuario] = useState(false);
    const [acessoPgCategorias, setAcessoPgCategorias] = useState(false);

    const usuarioPossuiPermissao = (permissao) => {
        const usuarioLogado = props.sessao.usuarioLogado;
        const permissaoUsuario = usuarioLogado.categoria.permissoes.find(elemento => elemento === permissao);
        return permissaoUsuario != null;
    };

    useEffect(() => {
        setAcessoPgUsuario(usuarioPossuiPermissao('buscar_usuario'));
        setAcessoPgCategorias(usuarioPossuiPermissao('buscar_categoria'));

        const atualizarTimer = () => {
            const tempoRestanteMs = (props.sessao.expiracao * 1000) - Date.now();

            tempoRestanteMs <= 0 ? setTempoSessaoRestante(0) : setTempoSessaoRestante(tempoRestanteMs);
        };

        atualizarTimer();

        const intervalId = setInterval(atualizarTimer, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);


    const minutos = Math.floor((Math.max(0, tempoSessaoRestante) / 1000 / 60) % 60).toString().padStart(2, '0');
    const segundos = Math.floor((Math.max(0, tempoSessaoRestante) / 1000) % 60).toString().padStart(2, '0');

    return (
        <nav className="navbar navbar-expand-lg " style={{ backgroundColor: 'lightblue' }}>
            <a className="navbar-brand p-2" style={{ letterSpacing: '1.5px', fontWeight: '600' }} href="#">Blog Educa</a>
            <button className="navbar-toggler ms-1" type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div id="menu" className="collapse navbar-collapse">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Página inicial</a>
                    </li>
                    {acessoPgUsuario && (
                        <li className="nav-item">
                            <a className="nav-link" href="#">Usuários</a>
                        </li>
                    )}
                    {acessoPgCategorias && (
                        <li className="nav-item">
                            <a className="nav-link" href="#">Categorias</a>
                        </li>
                    )}
                </ul>
                <span className="navbar-text d-flex">
                    <div style={{ fontSize: '14px' }}>
                        <p style={{ marginBottom: '0', fontWeight: '700' }}>Olá, {props.sessao?.usuarioLogado.nome}.</p>
                        <p style={{ marginBottom: '0', fontWeight: '700' }}>Sua sessão expira em {minutos}:{segundos}</p>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center ps-4 pe-2">
                        <img src={iconeUsuario} style={{ width: '25px', height: '25px', cursor: 'pointer', paddingBottom: '5px' }} title="Clique para acessar seu perfil"></img>
                        <img src={iconeLogout} style={{ width: '25px', height: '25px', cursor: 'pointer', paddingLeft: '5px' }} title="Clique para sair do sistema"></img>
                    </div>
                </span>
            </div>
        </nav>
    )
};

export default Header;