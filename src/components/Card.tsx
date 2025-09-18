import { useContext, useEffect, useState } from "react";
import { TCard } from "../types/TCard";
import { SessionContext } from "../sessionContext";

const PostagemCard = (props: TCard) => {
    const context = useContext(SessionContext);
    const [edicao, setEdicao] = useState(false);

    useEffect(() => {
        setEdicao(context.usuarioPossuiPermissao('editar_postagem'));
    }, []);

    return (
        <div className="card" style={{ width: '20rem', height: '19rem' }}>
            <div className="card-body">
                <h5 className="card-title">{props.titulo}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subTitulo}</h6>
                <p className="card-text" style={{ minHeight: '4rem' }}>{props.descricao.length > 50 ? `${props.descricao.substring(0, 50)}...` : props.descricao}</p>
                <hr />
                <p style={{ margin: '5px' }}><strong className="fw-semibold">Postado pelo usuário {props.usuarioInclusao}</strong></p>
                <p style={{ margin: '5px' }}><strong className="fw-semibold">Data de criação </strong> {props.dataInclusao.replace(' ', ' as ')}</p>
                {edicao ? (<>
                    <div className="row">
                        <div className="col d-flex flex-column justify-content-center">
                            <button 
                                style={{ border: 'none', backgroundColor: 'white', fontSize: '19px', padding: '0'}}
                                title="Clique para visualizar a postagem completa">
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
                                title="Clique para remover a postagem">
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

export default PostagemCard;
