import { ReactNode } from "react";

export type TButtonProps = {
    tipo?: 'submit' | 'reset' | 'button',
    titulo?: string,
    carregando?: boolean,
    children: ReactNode,
    onClick?: Function,
    style?: object
};