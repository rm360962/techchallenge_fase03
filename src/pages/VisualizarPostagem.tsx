import { useContext, useEffect, useState } from "react";
import { TPostagem } from "../types/TPostagem";
import { PostagemService } from "../service/postagem.service";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../sessionContext";
import { TipoAlerta } from "../types/TAlert";
import Header from "../components/Header";
import Button from "../components/Button";

const VisualizarPostagem = () => {
    const [postagem, setPostagem] = useState({} as TPostagem);
    const postagemService = new PostagemService();
    const context = useContext(SessionContext);
    const navigator = useNavigate();
    const { id: idPostagem } = useParams();

    const buscarPostagem = async () => {
        if (idPostagem && idPostagem !== 'null') {
            const { erro, postagem } = await postagemService.buscarPostagemPorId(+idPostagem);

            if (erro) {
                context.adcionarAlerta({
                    tipo: TipoAlerta.Erro,
                    mensagem: erro,
                });
                return;
            }

            setPostagem(postagem);
        }
    };

    useEffect(() => {
        buscarPostagem();
    }, []);

    return (
        <>
            <Header />
            <div className="conteiner-fluid" style={{ height: '700px', overflowY: 'scroll' }}>
                <div className="d-flex align-items-center justify-content-center">
                    <div className="p-3 w-100 h-100">
                        <div className="d-flex align-items-center justify-content-between">
                            <p className="fw-semibold" style={{ fontSize: '13px'}}>{postagem.usuarioInclusao} - {postagem.dataInclusao}</p>
                            <Button class="secondary" onClick={() => { navigator('/postagens')}}>Voltar</Button>
                        </div>
                        <div style={{ textAlign: 'center'}}>
                            <p className="h3" style={{ letterSpacing: '1px'}}>{postagem.titulo}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <div style={{ width: '80%'}}>
                                <p style={{ fontSize: '17px', fontWeight: '500'}}>{postagem.descricao}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VisualizarPostagem;