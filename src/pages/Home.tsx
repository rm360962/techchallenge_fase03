import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header.tsx';
import Input from '../components/Input.tsx';
import SearchFilter from '../components/SearchFilter.tsx';
import Select from '../components/Select.tsx';
import { PostagemService } from '../service/postagem.service.js';
import { TBuscaPostagem, TPostagem } from '../types/TPostagem.ts';
import { SessionContext } from '../sessionContext.ts';
import { TipoAlerta } from '../types/TAlert.ts';
import Card from '../components/Card.tsx';
import ViewModal from '../components/ViewModal.tsx';
import ConfirmModal from '../components/ConfirmModal.tsx';
import Button from '../components/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { UsuarioService } from '../service/usuario.service.ts';
import { TSelectItem } from '../types/TSelect.ts';

const Home = () => {
	const buscaPostagemInicial : TBuscaPostagem = {
		id: '',
		titulo: '',
		descricao: '',
		usuarioId: '',
		dataInclusaoInicio: '',
		dataInclusaoFim: ''
	};
	
	const [buscaPostagem, setBuscaPostagem] = useState(buscaPostagemInicial);
	const [postagens, setPostagens] = useState([] as TPostagem[]);
	const [postagem, setPostagem] = useState({} as TPostagem);
	const [idRemocaoPostagem, setIdRemocaoPostagem] = useState<number | null>(null);
	const [professores, setProfessores] = useState([] as TSelectItem[]);

	const [visualizar, setVisualizar] = useState(false);
	const [remover, setRemover] = useState(false);

	const postagemService = new PostagemService();
	const usuarioService = new UsuarioService();
	const context = useContext(SessionContext);
	const navigator = useNavigate();

	useEffect(() => {
		pesquisar();
		buscarProfessores();
	}, []);
	
	const pesquisar = async () => {
		const { erro, postagens: listaPostagens } =
			await postagemService.buscarPostagens(buscaPostagem);

		if (erro) {
			context.adcionarAlerta({
				tipo: TipoAlerta.Erro,
				mensagem: erro
			});

			return;
		}
	
		if(listaPostagens.length === 0) {
			context.adcionarAlerta({
				tipo: TipoAlerta.Info,
				mensagem: 'Não encontrada postagem com os filtros selecionados'
			});
		}

		setPostagens(listaPostagens);
	};

	const buscarProfessores = async () => {
		const { erro, usuarios: professores } = await usuarioService.buscarProfessores();

		if (erro) {
			context.adcionarAlerta({
				tipo: TipoAlerta.Erro,
				mensagem: erro
			});

			return;
		}

		const professoresSelectItem : TSelectItem[] = [];
		professores.map((item) => {
			professoresSelectItem.push({
				label: item.nome,
				valor: item.id
			});
		});

		setProfessores(professoresSelectItem);
	};

	const limparFiltros = () => {
		setBuscaPostagem(buscaPostagemInicial);
	};

	const confirmarRemocaoPostagem = (id: number) => {
		setIdRemocaoPostagem(id);
		setRemover(true);
	};

	const excluirPostagem = async () => {
		if(!idRemocaoPostagem) return;

		const postagemExcluida = await postagemService.removerPostagem(idRemocaoPostagem);

		context.adcionarAlerta({
			tipo: postagemExcluida ? TipoAlerta.Sucesso : TipoAlerta.Erro,
			mensagem: postagemExcluida ? 'Postagem excluída com sucesso' : 'Erro excluir a postagem',
		});

		if (postagemExcluida) {
			await pesquisar();
		}
	};

	const visualizarPostagem = (postagem: TPostagem) => {
		navigator(`/postagens/visualizar/${postagem.id}`);
	};

	const editarPostagem = (postagem: TPostagem) => {
		navigator(`/postagens/editar/${postagem.id}`)
	};

	return (
		<>
			<Header />
			<div id="pesquisa" className='d-flex'>
				<SearchFilter pesquisar={pesquisar} limpar={limparFiltros}>
					<div className='form-group mb-3'>
						<label className='fw-semibold'>Código</label>
						<Input
							titulo="Preencha com código da postagem a ser buscada"
							placeholder="Código da postagem"
							tipo="number"
							valor={buscaPostagem.id}
							obrigatorio={false}
							onChange={(e: any) => { setBuscaPostagem({ ...buscaPostagem, id: e.target.value}); }} />
					</div>
					<div className='form-group mb-3'>
						<label className='fw-semibold'>Título</label>
						<Input
							titulo="Preencha com título a ser buscado"
							placeholder="Título da postagem"
							valor={buscaPostagem.titulo}
							obrigatorio={false}
							onChange={(e: any) => { setBuscaPostagem({ ...buscaPostagem, titulo: e.target.value}); }} />
					</div>
					<div className='form-group mb-3'>
						<label className='fw-semibold'>Descrição</label>
						<Input
							titulo="Preencha com a descrição da postagem"
							placeholder="Descrição da postagem"
							valor={buscaPostagem.descricao}
							obrigatorio={false}
							onChange={(e: any) => { setBuscaPostagem({ ...buscaPostagem, descricao: e.target.value}); }} />
					</div>
					<div className='form-group mb-3'>
						<label className='fw-semibold'>Professor</label>
						<Select
							valor={buscaPostagem.usuarioId}
							titulo="Selecione o professor a ser buscado"
							mensagemPadrao="Selecione o professor"
							itens={professores}
							onChange={(e: any) => { setBuscaPostagem({ ...buscaPostagem, usuarioId: e.target.value}); }} />
					</div>
					<div className='form-group mb-4'>
						<label className='fw-semibold'>Período</label>
						<Input
							titulo="Selecione a data inicial da criação postagem a ser buscada"
							tipo="date"
							valor={buscaPostagem.dataInclusaoInicio}
							obrigatorio={false}
							onChange={(e: any) => { setBuscaPostagem({ ...buscaPostagem, dataInclusaoInicio: e.target.value}); }} />
						<label className='fw-semibold' style={{ width: '100%', textAlign: 'center' }}>até</label>
						<Input
							titulo="Selecione a data final da criação postagem a ser buscada"
							tipo="date"
							valor={buscaPostagem.dataInclusaoFim}
							obrigatorio={false}
							onChange={(e: any) => { setBuscaPostagem({ ...buscaPostagem, dataInclusaoFim: e.target.value}); }} />
					</div>
				</SearchFilter>
				<div className="container-fluid" style={{ paddingLeft: '0' , height: '700px', overflowY: 'scroll'}}>
					<div className='d-flex align-items-center justify-content-between'>
						<p className="h5 ps-4 fw-semibold" style={{ letterSpacing: '1px' }}>&#128240; Postagens encontradas</p>
						{ context.usuarioPossuiPermissao('cadastrar_postagem') && (
							<Button tipo='button' class='primary' onClick={(e: any) => { navigator('/postagens/editar/null')}}>Nova postagem</Button>
						)}
					</div>
					<div className="row g-1">
						{postagens.map(postagem => (
							<div key={postagem.id} className="col-12 col-md-3 col-lg-4 p-2 d-flex align-items-center justify-content-center ">
								<Card
									postagem={postagem}
									visualizar={visualizarPostagem}
									remover={confirmarRemocaoPostagem}
									editar={editarPostagem}
								/>
							</div>
						))}
					</div>
				</div>
				<ViewModal
					titulo={postagem.titulo}
					descricao={postagem.descricao}
					visivel={visualizar}
					setVisivel={setVisualizar}
				/>
				<ConfirmModal
					titulo="Remover postagem"
					pergunta="Confirma a remoção da postagem?"
					visivel={remover}
					setVisivel={setRemover}
					acao={excluirPostagem}
				/>
			</div>
		</>
	)
};

export default Home;