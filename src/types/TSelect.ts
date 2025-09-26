export type TSelectItem = {
    valor: any,
    label: string,
};

export type TSelectProps = {
    itens: TSelectItem[],
    onChange: Function,
    mensagemPadrao: string,
    titulo: string
};