import { useState } from "react";
import { TEditModalProps } from "../types/TEditModal";
import Button from "./Button";

const EditModal = ({ visivel, setVisivel, postagem, children, gravar }: TEditModalProps) => {
    const [carregando, setCarregando] = useState(false);

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const form = document.getElementById('formEdicao') as HTMLFormElement;

        if (!form.checkValidity()) {
            form.classList.add('was-validated')
            return;
        }

        setCarregando(true);
        await gravar();
        setCarregando(false);
    };

    const fecharFormEdicao = () => {
        const form = document.getElementById('formEdicao');
        form?.classList.remove('was-validated');
        setVisivel(false);
    };

    return (<>
        {visivel && <div className="modal-backdrop fade show"></div>}
        <div
            className={`modal fade ${visivel ? 'show' : ''}`}
            style={{ display: visivel ? 'block' : 'none' }}
            id="EditModal"
            role="dialog"
            aria-labelledby="EditModalTitle"
            aria-hidden={!visivel}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{postagem.id ? 'Edição de postagem' : 'Cadastro de postagem'}</h5>
                        <button type="button" className="btn-close" onClick={() => fecharFormEdicao()} aria-label="Close"></button>
                    </div>
                    <form id="formEdicao" noValidate onSubmit={(e) => { handleSubmit(e) }}>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <Button
                                tipo="button"
                                titulo="Clique para voltar"
                                desabilitado={carregando}
                                style={{ minWidth: '50px' }}
                                class="secondary"
                                onClick={(e: any) => { fecharFormEdicao(); }}>
                                Fechar
                            </Button>
                            <Button
                                tipo="submit"
                                titulo="Clique para confirmar a remoção"
                                carregando={carregando}
                                style={{ minWidth: '50px' }}
                                class="primary">
                                Gravar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>);
};

export default EditModal;