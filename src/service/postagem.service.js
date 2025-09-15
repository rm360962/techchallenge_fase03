import { conexaoApi } from "../axios";

export class PostagemService {
    buscarPostagens = async (token, dados) => {
        const {
            codigo,
            titulo,
            descricao,
            usuarioId,
            dataInclusaoInicio,
            dataInclusaoFim
        } = dados;

        const params = {
            codigo,
            titulo,
            descricao,
            usuarioId,
            dataInclusaoInicio,
            dataInclusaoFim,
        };

        Object.keys(dados).map((chave) => {
            if(dados[chave] == null || dados[chave].length === 0) {
                delete params[chave];
            }
        });

        try {
            const resposta = await conexaoApi({
                method: 'get',
                url: '/posts',
                params: params,
                headers: {
                    token: token
                }
            });
            
            return {
                erro: resposta.status === 200 ? null : 'Erro ao buscar as postagens',
                postagens: resposta.status === 200 ? resposta?.data : [],
            };
        } catch (erro) {
            console.log('Erro na busca das postagens', erro);
            return {
                erro: 'Erro ao buscar as postagens',
                postagens: [],
            };
        }
    };

}