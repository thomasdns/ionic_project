import {
	IonBackButton,
	IonButton,
	IonButtons,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardTitle,
	IonCol,
	IonContent,
	IonGrid,
	IonHeader,
	IonInput,
	IonPage,
	IonRow,
	IonTitle,
	IonToast,
	IonToolbar,
	useIonAlert,
	useIonRouter,
	useIonViewDidEnter,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import {
	setCapacitorCookie,
	setCookie,
} from '../utils/capacitor-plugins/cookies';

const Inscription: React.FC = () => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');

	const [presentAlert] = useIonAlert();

	const router = useIonRouter();

	const handleInscription = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const email = formData.get('email') as string;
		const name = formData.get('name') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirm-password') as string;

		if (password !== confirmPassword) {
			return;
		}

		const request = await fetch(
			'https://api.which-one-battle.julienpoirier-webdev.com/api/users',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					name,
					password,
				}),
			}
		);

		const response = await request.json();

		console.log(response);
		if (
			response ===
			'11000 duplicate key error collection: whichonebattle_db_production.users index: email already exists'
		) {
			presentAlert({
				header: "L'email est déja utilisé",
				message: 'Merci de choisir un autre email',
				buttons: [
					{
						text: "J'ai compris",
						role: 'cancel',
						handler: () => {
							setName('');
							setEmail('');
							setConfirmPassword('');
							setPassword('');
						},
					},
				],
			});
		}

		if (response === 'Password must be at least 6 characters.') {
			presentAlert({
				header: 'Mot de passe trop court',
				message: 'Le mot de passe doit contenir au moins 6 caractères',
				buttons: [
					{
						text: "J'ai compris",
						role: 'cancel',
						handler: () => {
							setConfirmPassword('');
							setPassword('');
						},
					},
				],
			});
		}

		if (response.token) {
			const cookieUser = {
				email: response.user.email,
				id: response.user._id,
				name: response.user.name,
			};
			setCookie('user', JSON.stringify(cookieUser));
			setCookie('token', response.token);

			router.push('/battles', 'forward');
		}
	};

	useEffect(() => {
		console.log('Inscription useEffect');
	}, []);

	useIonViewDidEnter(() => {
		console.log('Inscription useIonViewDidEnter');
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color='primary'>
					<IonButtons slot='start'>
						<IonBackButton defaultHref='/home' />
					</IonButtons>
					<IonTitle>Which One Battle</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className='ion-padding'>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonCard>
								<IonCardHeader>
									<IonCardTitle>Inscription</IonCardTitle>
								</IonCardHeader>
								<IonCardContent>
									<form
										action=''
										onSubmit={handleInscription}
									>
										<IonInput
											required
											name='email'
											label='Email'
											type='text'
											placeholder='Votre adresse mail'
											labelPlacement='floating'
											fill='outline'
											onIonChange={(e) => {
												setEmail(e.detail.value || '');
											}}
											value={email}
										/>
										<IonInput
											required
											className='ion-margin-top'
											name='name'
											label='Nom et prénom'
											type='text'
											placeholder='Jean DUPONT'
											labelPlacement='floating'
											value={name}
											onIonChange={(e) => {
												setName(e.detail.value || '');
											}}
											fill='outline'
										/>
										<IonInput
											required
											className='ion-margin-top'
											name='password'
											label='Mot de passe'
											type='password'
											placeholder='1234'
											labelPlacement='floating'
											fill='outline'
											onIonChange={(event) => {
												setPassword(
													event.detail.value || ''
												);
												if (!event.detail.value) {
													setConfirmPassword('');
												}
											}}
											value={password}
										/>
										<IonInput
											required
											className='ion-margin-top'
											name='confirm-password'
											label='Confirmation mot de passe'
											type='password'
											placeholder='1234'
											labelPlacement='floating'
											fill='outline'
											onIonChange={(e) => {
												setConfirmPassword(
													e.detail.value || ''
												);
											}}
											value={confirmPassword}
										/>

										<IonToast
											color={'danger'}
											isOpen={
												password !== confirmPassword &&
												confirmPassword.length > 0
											}
											message='Les mots de passe ne correspondent pas'
											duration={5000}
										></IonToast>
										<IonToast
											color={'primary'}
											isOpen={
												password === confirmPassword &&
												confirmPassword.length > 0
											}
											message='Les mots de passe correspondent, félicitations !'
											duration={5000}
										></IonToast>

										<IonButton
											type='submit'
											className='ion-margin-top'
											expand='block'
										>
											S'inscrire
										</IonButton>
									</form>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Inscription;
