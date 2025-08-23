import React from 'react';

const Input = (props) => {
	return (
		<input className='form-control' 
		type={props.type ?? 'text'}
		value={props.value}
		onChange={props.onChange}
		placeholder={props.placeholder}
		title={props.title} 
		required={props.required}
		/>

	);
};

export default Input;