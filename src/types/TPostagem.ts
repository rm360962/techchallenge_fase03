export type TPostagem =  {
    id: number,
    titulo: string,
    descricao: string,
    usuario: TUsuarioBasico,
    dataInclusao: string,
    usuarioInclusao: string,
};

export type TUsuarioBasico = {
    id: number,
    nome: string,
};

export type TBuscaPostagem = {
    id: string,
    titulo: string,
    descricao: string,
    usuarioId: string,
    dataInclusaoInicio: string,
    dataInclusaoFim: string
};

export type TEdicaoPostagem = {
    id?: number,
    titulo: string,
    descricao: string
};