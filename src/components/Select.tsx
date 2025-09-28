import { TSelectProps } from "../types/TSelect";

const Select = ({ onChange, titulo, obrigatorio, mensagemPadrao, itens } : TSelectProps) => {
    return (
        <select 
            className="form-select" 
            onChange={(e) => onChange(e)} 
            title={titulo} 
            required={obrigatorio}>
            <option value=''>{mensagemPadrao}</option>
            {itens.map((item) => {
                return ( <option value={item.valor} key={item.valor}>{item.label}</option>)
            })}
        </select>
    )
};

export default Select;