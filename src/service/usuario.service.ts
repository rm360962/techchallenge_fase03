import { conexaoApi } from "../axios";
import { TBuscaUsuario } from "../types/TUsuario";

export class UsuarioService {
    buscarUsuarios = async (token: string, filtros: TBuscaUsuario) => {
        const params: { [key: string]: any } = {};
        for (const [chave, valor] of Object.entries(filtros)) {
            if (valor !== null && valor !== undefined && valor !== '') {
                params[chave] = valor;
            }
        }

        try {
            const resposta = await conexaoApi({
                method: 'get',
                url: '/users',
                params: params,
                headers: {
                    token: token
                },
            });

            return {
                erro: resposta.status === 200 ? null : 'Erro ao buscar os usuários',
                usuarios: resposta.status === 200 ? resposta?.data : [],
            };
        } catch (erro) {
            console.log('Erro ao buscar o usuário', erro);
            return {
                erro: 'Erro ao buscar os usuários',
                usuarios: [],
            };
        }
    };
};