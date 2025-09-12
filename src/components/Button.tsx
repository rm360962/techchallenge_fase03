import { TButtonProps } from "../types/TButton";

const Button = (props: TButtonProps) => {
	return (
		<div>
			<button
				className='btn btn-primary'
				type={props.tipo ?? 'submit'}
				title={props.titulo}
				style={{ minWidth: '90px', minHeight: '40px', ...props.style }}
				disabled={props.carregando}
			>
				{props.carregando ?
					(<span className="spinner-border spinner-border-sm" style={{ width: '20px', height: '20px' }} role="status" aria-hidden="true" />) :
					(props.children)}
			</button>
		</div>
	);
};

export default Button;