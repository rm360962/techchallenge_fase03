import React from 'react';

const Button = (props) => {
	return (
		<div>
			<button 
				className='btn btn-primary'
				type={props.type ?? 'submit'}
				title={props.title}
				>
				{props.children}
			</button>
		</div>
	);
};

export default Button;