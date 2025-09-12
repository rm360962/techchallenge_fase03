import { useState } from 'react';
import Header from '../components/Header.tsx';
import Input from '../components/Input.tsx';
import SearchFilter from '../components/SearchFilter.tsx';
import Select from '../components/Select.tsx';

const Home = () => {
	const [codigo, setCodigo] = useState('');
	const [titulo, setTitulo] = useState('');
	const [descricao, setDescricao] = useState('');
	const [usuarioId, setUsuarioId] = useState('');
	const [dataInclusaoInicio, setDataInclusaoInicio] = useState('');
	const [dataInclusaoFim, setDataInclusaoFim] = useState('');
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
		console.log(codigo, titulo, descricao, usuarioId, dataInclusaoInicio, dataInclusaoFim);
	};

	return (
		<>
			<Header/>
			<SearchFilter pesquisar={pesquisar}>
				<div className='form-group mb-3'>
					<label className='fw-semibold'>Código</label>
					<Input 
						titulo="Preencha com código da postagem a ser buscada"
						placeholder="Código da postagem"
						valor={codigo}
						obrigatorio={false} 
						onChange={(e) => { setCodigo(e.target.value) }} />
				</div>
				<div className='form-group mb-3'>
					<label className='fw-semibold'>Título</label>
					<Input 
						titulo="Preencha com título a ser buscado"
						placeholder="Título da postagem"
						valor={titulo}
						obrigatorio={false} 
						onChange={(e) => { setTitulo(e.target.value) }} />
				</div>
				<div className='form-group mb-3'>
					<label className='fw-semibold'>Descrição</label>
					<Input 
						titulo="Preencha com a descrição da postagem"
						placeholder="Descrição da postagem"
						valor={descricao}
						obrigatorio={false} 
						onChange={(e) => { setDescricao(e.target.value) }} />
				</div>
				<div className='form-group mb-3'>
					<label className='fw-semibold'>Professor</label>
					<Select
						titulo="Selecione o professor a ser buscado"
						mensagemPadrao="Selecione o professor" 
						itens={teste} 
						onChange={(e) => { setUsuarioId(e.target.value)}}/>
				</div>
				<div className='form-group mb-4'>
					<label className='fw-semibold'>Período</label>
					<Input 
						titulo="Selecione a data inicial da criação postagem a ser buscada"
						tipo="date"
						valor={dataInclusaoInicio}
						obrigatorio={false} 
						onChange={(e) => { setDataInclusaoInicio(e.target.value) }} />
					<label className='fw-semibold' style={{ width: '100%', textAlign: 'center'}}>até</label>
					<Input 
						titulo="Selecione a data final da criação postagem a ser buscada"
						tipo="date"
						valor={dataInclusaoFim}
						obrigatorio={false} 
						onChange={(e) => { setDataInclusaoFim(e.target.value) }} />
				</div>
			</SearchFilter>

		</>
	)
};

export default Home;