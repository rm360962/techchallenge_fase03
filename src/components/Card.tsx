import { TCard } from "../types/TCard";

const Card = (props: TCard) => {
    return (
        <div className="card" style={{ width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{props.titulo}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{props.subTitulo}</h6>
                <p className="card-text">{props.descricao}</p>
                <a href="#" className="card-link">Card link</a>
                <a href="#" className="card-link">Another link</a>
            </div>
        </div>
    );
};

export default Card;
