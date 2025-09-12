const Input = (props) => {
	return (
		<input className='form-control' 
		type={props.tipo ?? 'text'}
		value={props.valor}
		onChange={props.onChange}
		placeholder={props.placeholder}
		title={props.titulo} 
		required={props.obrigatorio}
		/>

	);
};

export default Input;