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