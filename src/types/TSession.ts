export type TSession = {
    usuarioLogado?: TUsuarioLogado,
    token?: string,
};

export type TUsuarioLogado = {
    id: number,
    login: string,
    categorias: TCategoriaUsuario,
};

export type TCategoriaUsuario = {
    id: number,
    nome: string,
    permissoes: string[],
};
