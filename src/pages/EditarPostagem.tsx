import { useContext, useEffect, useState } from "react";
import { TEdicaoPostagem } from "../types/TPostagem";
import { PostagemService } from "../service/postagem.service";
import { useNavigate, useParams } from "react-router-dom";
import { SessionContext } from "../sessionContext";
import { TipoAlerta } from "../types/TAlert";
import Header from "../components/Header";
import Button from "../components/Button";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

const EditarPostagem = () => {
    const [postagem, setPostagem] = useState({} as TEdicaoPostagem);
    const [carregando, setCarregando] = useState(false);
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

            setPostagem({
                id: postagem.id,
                titulo: postagem.titulo,
                descricao: postagem.descricao,
            });
        }
    };

    useEffect(() => {
        buscarPostagem();
    }, []);

    const gravar = async (event: any) => {
        event.preventDefault();

        const form = document.getElementById('formEdicao') as HTMLFormElement;

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return;
        }

        setCarregando(true);

        try {
            if (postagem.id) {
                const erros = await postagemService.editarPostagem(postagem);

                if (erros) {
                    for (const erro of erros) {
                        context.adcionarAlerta({
                            tipo: TipoAlerta.Erro,
                            mensagem: erro.mensagem
                        });
                    }
                    return;
                }

                context.adcionarAlerta({
                    tipo: TipoAlerta.Sucesso,
                    mensagem: 'Postagem editada com sucesso',
                });
            } else {
                const { postagem: postagemCadastrada, erros } =
                    await postagemService.cadastrarPostagem(postagem);

                if (erros) {
                    for (const erro of erros) {
                        context.adcionarAlerta({
                            tipo: TipoAlerta.Erro,
                            mensagem: erro.mensagem
                        });
                    }
                    return;
                }

                context.adcionarAlerta({
                    tipo: TipoAlerta.Sucesso,
                    mensagem: 'Postagem cadastrada com sucesso',
                });

                setPostagem(postagemCadastrada);
            }
        } finally {
            setCarregando(false);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="d-flex align-items-center justify-content-center">
                    <div>
                        <p className="fw-semibold h5 mb-4">{postagem.id ? 'Edição de postagem' : 'Cadastro de postagem'}</p>
                        <form id="formEdicao" noValidate onSubmit={(e) => { gravar(e); }}>
                            <div>
                                {postagem.id && (
                                    <div className='form-group mb-1'>
                                        <label className='fw-semibold'>Código</label>
                                        <Input
                                            placeholder=""
                                            titulo="Código da postagem"
                                            valor={postagem.id.toString()}
                                            onChange={(e: any) => { }}
                                            obrigatorio={true}
                                            desabilitado={true}
                                            style={{ maxWidth: '250px' }}
                                        />
                                        <div className="invalid-feedback">
                                        </div>
                                    </div>
                                )}
                                <div className='form-group mb-1'>
                                    <label className='fw-semibold'>Título</label>
                                    <Input
                                        placeholder="Informe o título da postagem"
                                        titulo="Informe o título da postagem"
                                        valor={postagem.titulo}
                                        onChange={(e: any) => setPostagem({ ...postagem, titulo: e.target.value })}
                                        obrigatorio={true}
                                        style={{ maxWidth: '250px' }}
                                    />
                                    <div className="invalid-feedback">
                                        O título é obrigatório
                                    </div>
                                </div>
                                <div className='form-group mb-1'>
                                    <label className='fw-semibold'>Descrição:</label>
                                    <TextArea
                                        valor={postagem.descricao}
                                        onChange={(e: any) => setPostagem({ ...postagem, descricao: e.target.value })}
                                        obrigatorio={true}
                                        style={{ width: '80vw', height: '40vh' }} />
                                    <div className="invalid-feedback">
                                        A descrição é obrigatória
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-2">
                                <Button
                                    tipo="submit"
                                    class="primary"
                                    carregando={carregando}>
                                    Gravar
                                </Button>
                                <Button
                                    tipo="button"
                                    class="secondary"
                                    desabilitado={carregando}
                                    onClick={() => { navigator('/postagens') }}>
                                    Voltar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditarPostagem;