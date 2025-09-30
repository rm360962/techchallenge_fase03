import { useContext, useEffect, useState } from 'react';
import Header from '../components/Header.tsx';
import Input from '../components/Input.tsx';
import SearchFilter from '../components/SearchFilter.tsx';
import Select from '../components/Select.tsx';
import { PostagemService } from '../service/postagem.service.js';
import { TPostagem } from '../types/TPostagem.ts';
import { SessionContext } from '../sessionContext.ts';
import { TipoAlerta } from '../types/TAlert.ts';
import Card from '../components/Card.tsx';
import ViewModal from '../components/ViewModal.tsx';
import ConfirmModal from '../components/ConfirmModal.tsx';
import Button from '../components/Button.tsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const [codigo, setCodigo] = useState('');
	const [titulo, setTitulo] = useState('');
	const [descricao, setDescricao] = useState('');
	const [usuarioId, setUsuarioId] = useState('');
	const [dataInclusaoInicio, setDataInclusaoInicio] = useState('');
	const [dataInclusaoFim, setDataInclusaoFim] = useState('');
	const [postagens, setPostagens] = useState([] as TPostagem[]);
	const [postagem, setPostagem] = useState({} as TPostagem);

	const [visualizar, setVisualizar] = useState(false);
	const [remover, setRemover] = useState(false);

	const postagemService = new PostagemService();
	const context = useContext(SessionContext);
	const navigator = useNavigate();

	const teste = [
		{
			valor: 1,
			label: "teste"
		},
		{
			valor: 2,
			label: "exemplo"
		}
	];

	useEffect(() => {
		pesquisar();
	}, []);

	const pesquisar = async () => {
		const dados = {
			codigo,
			titulo,
			descricao,
			usuarioId,
			dataInclusaoInicio,
			dataInclusaoFim
		};

		const { erro, postagens: listaPostagens } =
			await postagemService.buscarPostagens(context.sessao.token, dados);

		if (erro) {
			context.adcionarAlerta({
				tipo: TipoAlerta.Erro,
				mensagem: erro
			});

			return;
		}

		setPostagens(listaPostagens);
	};

	const limparFiltros = () => {

	};

	const confirmarRemocaoPostagem = (postagem: TPostagem) => {
		setPostagem(postagem);
		setRemover(true);
	};

	const excluirPostagem = async () => {
		if (!postagem.id) {
			return;
		}

		const postagemExcluida = await postagemService.excluirPostagem(context.sessao.token, postagem.id);

		context.adcionarAlerta({
			tipo: postagemExcluida ? TipoAlerta.Sucesso : TipoAlerta.Erro,
			mensagem: postagemExcluida ? 'Postagem excluída com sucesso' : 'Erro excluir a postagem',
		});

		if (postagemExcluida) {
			await pesquisar();
		}
	};

	const visualizarPostagem = (postagem: TPostagem) => {
		setPostagem(postagem);
		setVisualizar(true);
	};

	const editarPostagem = (postagem: TPostagem) => {
		navigator(`/postagens/editar/${postagem.id}`)
	};

	return (
		<>
			<Header />
			<div id="pesquisa" className='d-flex' style={{ overflowY: 'scroll' }}>
				<SearchFilter pesquisar={pesquisar} limpar={limparFiltros}>
					<div className='form-group mb-3'>
						<label className='fw-semibold'>Código</label>
						<Input
							titulo="Preencha com código da postagem a ser buscada"
							placeholder="Código da postagem"
							valor={codigo}
							obrigatorio={false}
							onChange={(e: any) => { setCodigo(e.target.value) }} />
					</div>
					<div className='form-group mb-3'>
						<label className='fw-semibold'>Título</label>
						<Input
							titulo="Preencha com título a ser buscado"
							placeholder="Título da postagem"
							valor={titulo}
							obrigatorio={false}
							onChange={(e: any) => { setTitulo(e.target.value) }} />
					</div>
					<div className='form-group mb-3'>
						<label className='fw-semibold'>Descrição</label>
						<Input
							titulo="Preencha com a descrição da postagem"
							placeholder="Descrição da postagem"
							valor={descricao}
							obrigatorio={false}
							onChange={(e: any) => { setDescricao(e.target.value) }} />
					</div>
					<div className='form-group mb-3'>
						<label className='fw-semibold'>Professor</label>
						<Select
							titulo="Selecione o professor a ser buscado"
							mensagemPadrao="Selecione o professor"
							itens={teste}
							onChange={(e: any) => { setUsuarioId(e.target.value) }} />
					</div>
					<div className='form-group mb-4'>
						<label className='fw-semibold'>Período</label>
						<Input
							titulo="Selecione a data inicial da criação postagem a ser buscada"
							tipo="date"
							valor={dataInclusaoInicio}
							obrigatorio={false}
							onChange={(e: any) => { setDataInclusaoInicio(e.target.value) }} />
						<label className='fw-semibold' style={{ width: '100%', textAlign: 'center' }}>até</label>
						<Input
							titulo="Selecione a data final da criação postagem a ser buscada"
							tipo="date"
							valor={dataInclusaoFim}
							obrigatorio={false}
							onChange={(e: any) => { setDataInclusaoFim(e.target.value) }} />
					</div>
				</SearchFilter>
				<div className="container-fluid">
					<div className='d-flex align-items-center justify-content-between'>
						<p className="h5 ps-4 fw-semibold" style={{ letterSpacing: '1px' }}>&#128240; Postagens encontradas</p>
						<Button tipo='button' class='primary' onClick={(e: any) => { navigator('/postagens/editar/null')}}>Nova postagem</Button>
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