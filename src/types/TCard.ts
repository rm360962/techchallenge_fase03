import { TPostagem } from "./TPostagem";

export type TCard = {
    postagem: TPostagem,
    visualizar?: Function,
    remover?: Function,
    editar?: Function,
};