import { conexaoApi } from "../axios";
import { TBuscaPostagem, TPostagem, TRespostaCadastroPostagem } from "../types/TPostagem";

export class PostagemService {
    buscarPostagens = async (token: string, dados: TBuscaPostagem) => {
        const params: { [key: string]: any } = {};
        for (const [chave, valor] of Object.entries(dados)) {
            if (valor !== null && valor !== undefined && valor !== '') {
                params[chave] = valor;
            }
        }

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

    cadastrarPostagem = async (token: string, postagem: TPostagem): Promise<TRespostaCadastroPostagem> => {
        try {
            const resposta = await conexaoApi({
                method: 'post',
                url: '/posts',
                data: postagem,
                headers: {
                    token: token
                },
                validateStatus: (status: number) => [201, 422].includes(status),
            });

            if (resposta.status === 201) {
                postagem.id = resposta.data.id;
                return {
                    postagem: postagem,
                    erros: null,
                };
            } else {
                return {
                    postagem: null,
                    erros: resposta.data.erros,
                };
            }
        } catch (erro) {
            console.log('Erro no cadastro da postagem', erro);
            return {
                postagem: null,
                erros: [
                    'Erro ao cadastrar a postagem'
                ]
            }
        }
    };

    editarPostagem = async (token: string, postagem: TPostagem) => {
        try {
            const resposta = await conexaoApi({
                method: 'put',
                url: `/posts/${postagem.id}`,
                data: postagem,
                headers: {
                    token: token
                },
                validateStatus: (status: number) => [200, 422].includes(status),
            });

            if (resposta.status === 200) {
                return null;
            } else {
                return resposta.data.erros;
            }
        } catch (erro) {
            console.log('Erro ao editar a postagem', erro);
            return {
                editado: false,
                erros: [
                    'Erro ao editar a postagem'
                ],
            };
        }
    };

    excluirPostagem = async (token: string, id: number) => {
        try {
            const resposta = await conexaoApi({
                method: 'delete',
                url: `/posts/${id}`,
                headers: {
                    token: token
                }
            });

            return resposta.status === 200;
        } catch (erro) {
            console.log('Erro na exclusao da postagem', erro);
            return false;
        }
    };

}