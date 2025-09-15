import { use, useContext, useState } from 'react';
import Header from '../components/Header.tsx';
import Input from '../components/Input.tsx';
import SearchFilter from '../components/SearchFilter.tsx';
import Select from '../components/Select.tsx';
import { PostagemService } from '../service/postagem.service.js';
import { TPostagem } from '../types/TPostagem.ts';
import { SessionContext } from '../sessionContext.ts';
import { TipoAlerta } from '../types/TAlert.ts';
import Card from '../components/Card.tsx';

const Home = () => {
	const [codigo, setCodigo] = useState('');
	const [titulo, setTitulo] = useState('');
	const [descricao, setDescricao] = useState('');
	const [usuarioId, setUsuarioId] = useState('');
	const [dataInclusaoInicio, setDataInclusaoInicio] = useState('');
	const [dataInclusaoFim, setDataInclusaoFim] = useState('');
	const [postagens, setPostagens] = useState([] as TPostagem[]);
	const postagemService = new PostagemService();
	const context = useContext(SessionContext);
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
		console.log(listaPostagens)
		setPostagens(listaPostagens);
		console.log(postagens)
	};

	return (
		<>
			<Header />
			<div id="pesquisa" className='d-flex'>
				<SearchFilter pesquisar={pesquisar}>
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
				<div className="container-fluid ps-5">
					<div className="row g-1">
						{postagens.map(postagem => (
							<div key={postagem.id} className="col-12 col-md-3 col-lg-3 p-2 d-flex align-items-center justify-content-center ">
								<Card titulo={postagem.titulo} descricao={postagem.descricao} />
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
};

export default Home;