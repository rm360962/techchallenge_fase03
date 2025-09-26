import { TCategoriaUsuario } from "./TSession";

export type TUsuario = {
    id?: number,
    nome: string,
    email: string,
    login: string,
    ativo: boolean,
    categoria: TCategoriaUsuario,
    dataInclusao: string,
    usuarioInclusao: string,
    dataAlteracao: string,
    usuarioAlteracao: string,
};

export type TBuscaUsuario = {
    id: string,
    nome: string,
    email: string,
    login: string,
    categoriaId: string,
    ativo: string | null,
};