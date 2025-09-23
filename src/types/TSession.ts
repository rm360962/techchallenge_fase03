export type TSession = {
    usuarioLogado: TUsuarioLogado,
    expiracao: number,
    token: string,
};

export type TUsuarioLogado = {
    id: number,
    login: string,
    nome: string,
    categoria: TCategoriaUsuario,
};

export type TCategoriaUsuario = {
    id: number,
    nome: string,
    permissoes: string[],
};

export type TLoginUsuario = {
    usuario: string,
    senha: string,
};
