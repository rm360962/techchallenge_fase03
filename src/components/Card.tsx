import { useContext, useEffect, useState } from "react";
import { TCard } from "../types/TCard";
import { SessionContext } from "../sessionContext";

const Card = ({ postagem, visualizar, remover} : TCard) => {
    const context = useContext(SessionContext);
    const [edicao, setEdicao] = useState(false);

    useEffect(() => {
        setEdicao(context.usuarioPossuiPermissao('editar_postagem'));
    }, []);

    return (
        <div className="card" style={{ width: '20rem', height: '19rem' }}>
            <div className="card-body">
                <h5 className="card-title">{postagem.titulo}</h5>
                <p className="card-text" style={{ minHeight: '4rem' }}>{postagem.descricao.length > 50 ? `${postagem.descricao.substring(0, 50)}...` : postagem.descricao}</p>
                <hr />
                <p className="mb-1"><strong className="fw-semibold">Postado pelo usuário {postagem.usuarioInclusao}</strong></p>
                <p className="mb-1"><strong className="fw-semibold">Data de criação </strong> {postagem.dataInclusao.replace(' ', ' as ')}</p>
                {edicao ? (<>
                    <hr />
                    <div className="row">
                        <div className="col d-flex flex-column justify-content-center">
                            <button 
                                style={{ border: 'none', backgroundColor: 'white', fontSize: '19px', padding: '0'}}
                                title="Clique para visualizar a postagem completa"
                                onClick={() => {if(visualizar) visualizar(postagem);}}>
                                &#128269;
                            </button>
                        </div>
                        <div className="col d-flex flex-column justify-content-center">
                            <button 
                                style={{ border: 'none', backgroundColor: 'white', fontSize: '19px', padding: '0'}}
                                title="Clique para editar a postagem">
                                    &#128221;
                            </button>
                        </div>
                        <div className="col d-flex flex-column justify-content-center">
                            <button 
                                style={{ border: 'none', backgroundColor: 'white', fontSize: '19px', padding: '0'}}
                                title="Clique para remover a postagem"
                                onClick={() => {if(remover) remover(postagem);}}>
                                    &#10060;
                            </button>
                        </div>
                    </div>
                </>) : (
                    <a title="Clique para continuar lendo a postagem">Continuar lendo</a>
                )}
            </div>
        </div>
    );
};

export default Card;
