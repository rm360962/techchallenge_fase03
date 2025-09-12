import { FormEvent, useState } from "react";
import Button from "./Button";

const SearchFilter = (props) => {
	const [expandida, setExpandida] = useState(true);
	const [carregando, setCarregando] = useState(false);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		
		setCarregando(true);

		await props?.pesquisar();

		setCarregando(false);
		alterarBarraFiltros();
	}

	const alterarBarraFiltros = () => {
		setExpandida(!expandida);
	}
	
	const estiloBarraFiltros = {
		width: expandida ? '250px' : '0',
		overflow: 'hidden'
	};
	
	return (
		<>
			<div className="d-flex" style={{ height: '87%'}}>
				<div className={`d-flex flex-column flex-shrink-0 bg-light mt-2 border ${expandida ? 'p-3' : ''}`}
					style={estiloBarraFiltros}>
					<span className="fs-6 fw-semibold">
						Filtros de pesquisa
					</span>
					<hr />
					<div>
						<form noValidate onSubmit={(e) => handleSubmit(e)}>
							{props.children}
							<hr />
							<div className="d-flex align-items-center justify-content-center ">
								<Button tipo="submit" titulo="Clique para aplicar os filtros de pesquisa" carregando={carregando}>Aplicar filtros</Button>
							</div>
						</form>
					</div>
				</div>
				<button className="p-3 mt-2 d-flex align-items-center justify-content-center fw-bold" onClick={alterarBarraFiltros} style={{ width: '20px', backgroundColor: 'lightblue', border: 'none'}}>
					{expandida ? '>>' : '<<'}
				</button>
			</div>
		</>
	);

}

export default SearchFilter;