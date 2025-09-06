import { FormEvent, useState } from 'react';
import Input from '../components/Input.tsx';
import Button from '../components/Button.tsx';
import { LoginService } from '../service/login.service.js';
import { TPageProps } from '../types/TPage.ts';
import { TipoAlerta } from '../types/TAlert.ts';
import { useNavigate } from "react-router-dom";

const Login = (props: TPageProps) => {
	const [usuario, setUsuario] = useState("");
	const [senha, setSenha] = useState("");
	const [carregando, setCarregando] = useState(false);
	const [service, setService] = useState(new LoginService());
	const navegador = useNavigate();
	
	const logarUsuario = async (event: FormEvent) => {
		event.preventDefault();

		const form = document.getElementById('formLogin') as HTMLFormElement;

		if (!form.checkValidity()) {
			form.classList.add('was-validated')
			return;
		}

		setCarregando(true);

		const { erro, usuarioLogado, tokenJwt } = await service.logarUsuario({
			usuario,
			senha
		});

		setCarregando(false);

		if (erro) {
			props.adcionarAlerta({
				tipo: TipoAlerta.Erro,
				mensagem: erro,
			});
			return;
		}

		localStorage.setItem('token', tokenJwt);
		props.setSessao?.({
			usuarioLogado: usuarioLogado,
			token: tokenJwt,
		});
		
		navegador('/');
	};

	return (
		<div className='conteiner d-flex justify-content-center align-items-center h-100'>
			<div className='row border rounded-3 p-4 bg-white'>
				<div className='d-flex justify-content-center mb-3' >
					<p className='h4 font-weight-bold'>Blog Educacional</p>
				</div>
				<form id="formLogin" noValidate onSubmit={(e) => logarUsuario(e)}>
					<div className='form-group mb-1'>
						<label>Usuário </label>
						<Input
							placeholder="Informe o usuário"
							title="Informe o usuário para acesso ao sistema"
							value={usuario}
							onChange={(e) => setUsuario(e.target.value)}
							required={true}
						/>
						<div className="invalid-feedback">
							O usuário é obrigatório.
						</div>
					</div>
					<div className='form-group mb-3'>
						<label>Senha </label>
						<Input
							placeholder="Informe a senha"
							title="Informe a senha"
							type="password"
							value={senha}
							onChange={(e) => setSenha(e.target.value)}
							required={true}
						/>
						<div className="invalid-feedback">
							A senha deve ser informada.
						</div>
					</div>
					<div className='d-flex justify-content-center'>
						<Button titulo="Precione para entrar no sistema (Atalho: ENTER)" carregando={carregando}>Entrar</Button>
					</div>
				</form>
			</div>
		</div>
	)
};

export default Login;