import { useContext } from "react";
import { conexaoApi } from "../axios";
import { TBuscaPostagem, TEdicaoPostagem, TPostagem } from "../types/TPostagem";
import { SessionContext } from "../sessionContext";
import { TRespostaErroApi } from "../types/TRespostaErroApi";

export class PostagemService {
    private context = useContext(SessionContext);

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

    buscarPostagemPorId = async (id: number): Promise<{ erro: string | null, postagem: TPostagem }> => {
        try {
            const resposta = await conexaoApi({
                method: 'get',
                url: '/posts',
                headers: {
                    token: this.context.sessao.token,
                },
            });

            return {
                erro: resposta.status === 200 ? null : 'Erro ao buscar a postagem',
                postagem: resposta.status === 200 ? resposta.data[0] : {}
            };
        } catch (erro) {
            console.log('Erro buscar a postagem por id', erro);
            return {
                erro: 'Erro ao buscar a postagem',
                postagem: {} as TPostagem
            };
        }
    };

    cadastrarPostagem = async (postagem: TEdicaoPostagem): Promise<{ erros: TRespostaErroApi[] | null, postagem: TEdicaoPostagem }> => {
        try {
            const resposta = await conexaoApi({
                method: 'post',
                url: '/posts',
                data: postagem,
                headers: {
                    token: this.context.sessao.token,
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
                    postagem: {} as TEdicaoPostagem,
                    erros: resposta.data.erros,
                };
            }
        } catch (erro) {
            console.log('Erro no cadastro da postagem', erro);
            return {
                postagem: {} as TEdicaoPostagem,
                erros: [
                    {
                        mensagem: 'Erro ao cadastrar a postagem',
                    }
                ],
            }
        }
    };

    editarPostagem = async (postagem: TEdicaoPostagem): Promise<TRespostaErroApi[] | null> => {
        try {
            const resposta = await conexaoApi({
                method: 'put',
                url: `/posts/${postagem.id}`,
                data: postagem,
                headers: {
                    token: this.context.sessao.token,
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
            return [
                {
                    mensagem: 'Erro ao editar a postagem'
                }
            ];
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