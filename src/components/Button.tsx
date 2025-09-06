import { TButtonProps } from "../types/TButton";

const Button = (props: TButtonProps) => {
	const estiloBotao = {
		minWidth: '90px',
		minHeight: '40px',
		...props.style
	};

	const estiloLoader = { 
		width: '20px', 
		height: '20px' 
	};

	return (
		<div>
			<button
				className='btn btn-primary'
				type={props.tipo ?? 'submit'}
				title={props.titulo}
				style={estiloBotao}
				disabled={props.carregando}
			>
				{props.carregando ?
					(<span className="spinner-border spinner-border-sm" style={estiloLoader} role="status" aria-hidden="true" />) :
					(props.children)}
			</button>
		</div>
	);
};

export default Button;