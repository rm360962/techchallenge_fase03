import { TViewModalProps } from "../types/TViewModal";

const ViewModal = (props: TViewModalProps) => {
    return (<>
        {props.visivel && <div className="modal-backdrop fade show"></div>}
        <div
            className={`modal fade ${props.visivel ? 'show' : ''}`}
            style={{ display: props.visivel ? 'block' : 'none' }}
            id="viewModal"
            role="dialog"
            aria-labelledby="ViewModalTitle"
            aria-hidden={!props.visivel}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content" style={{ minHeight: '90vh'}}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{props.titulo}</h5>
                        <button type="button" className="btn-close" onClick={() => props.setVisivel(false)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-break">
                        {props.descricao}
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default ViewModal;