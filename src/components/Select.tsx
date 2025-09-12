import { TSelectProps } from "../types/TSelect";

const Select = (props : TSelectProps) => {
    return (
        <select className="form-select" onChange={(e) => props.onChange(e)} title={props.titulo}>
            <option>{props.mensagemPadrao}</option>
            {props.itens.map((item) => {
                return ( <option value={item.valor} key={item.valor}>{item.label}</option>)
            })}
        </select>
    )
};

export default Select;