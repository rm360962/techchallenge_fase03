export type TSelectItem = {
    valor: number,
    label: string,
};

export type TSelectProps = {
    itens: TSelectItem[],
    onChange: Function,
    mensagemPadrao: string,
    titulo: string
};