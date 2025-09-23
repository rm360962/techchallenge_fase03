import { TTextArea } from "../types/TTextArea";

const TextArea = ({ valor, tamanhoMaximo, onChange, obrigatorio } : TTextArea) => {
    return (
        <textarea 
            value={valor} 
            onChange={(e) => onChange(e)}
            maxLength={tamanhoMaximo} 
            className="form-control"
            style={{ minHeight: '175px'}}
            required={obrigatorio}/>
    )
};

export default TextArea