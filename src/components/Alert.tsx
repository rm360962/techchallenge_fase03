import { useEffect, useState } from "react";
import { TAlertProps } from "../types/TAlert";

const Alert = (props: TAlertProps) => {
    const [visivel, setVisivel] = useState(true);
    const [opacidade, setOpacidade] = useState(1);
    const className = `alert alert-${props.tipo}`;
    const estiloAlerta = {
        minWidth: '200px',
        opacity: opacidade,
        transition: 'opacity 0.6s'
    };

    useEffect(() => {
        let alertaRemovido = false;

        const alterarOpacidadeTimeout = setTimeout(() => {
            setOpacidade(0);
        }, 9400);

        const removerAlertaTimeout = setTimeout(() => {
            if (!alertaRemovido) {
                setVisivel(false);
                props.removerAlerta?.(props);
                alertaRemovido = true;
            }
        }, 10000);

        return () => {
            clearTimeout(alterarOpacidadeTimeout);
            clearTimeout(removerAlertaTimeout);
        }
    }, []);

    return (
        <>
            {visivel && (
                <div className={className} style={estiloAlerta} role="alert">
                    {props.mensagem}
                </div>
            )}
        </>
    )
};

export default Alert;