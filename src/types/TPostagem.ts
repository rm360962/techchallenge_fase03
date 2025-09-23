export type TPostagem =  {
    id?: number,
    titulo: string,
    descricao: string,
    usuario?: TUsuarioBasico,
    dataInclusao?: string,
    usuarioInclusao?: string,
};

export type TUsuarioBasico = {
    id: number,
    nome: string,
};

export type TBuscaPostagem = {
    codigo?: string,
    titulo?: string,
    descricao?: string,
    usuarioId?: string,
    dataInclusaoInicio?: string,
    dataInclusaoFim?: string
};

export type TRespostaCadastroPostagem = {
    postagem: TPostagem | null,
    erros: any[] | null
};