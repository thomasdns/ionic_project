import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCol,
	IonContent,
	IonFooter,
	IonGrid,
	IonHeader,
	IonIcon,
	IonInput,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
	useIonViewDidEnter,
} from '@ionic/react';
import { logInOutline, personAddOutline, cafeOutline } from 'ionicons/icons';
import './Home.css';
import { useEffect } from 'react';

const Home: React.FC = () => {
	// La partie logique qui gère les features de l'app
	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Connexion');
	};

	useEffect(() => {
		console.log('Home useEffect');
	});

	useIonViewDidEnter(() => {
		console.log('Home useIonViewDidEnter');
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color='primary'>
					<IonTitle>Which One Battle</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				{/*
        <IonHeader collapse="condense">
          <IonToolbar >
            <IonTitle size="large">Which One Battle</IonTitle>
          </IonToolbar>
        </IonHeader>
        */}

				<IonGrid>
					<IonRow class='ion-justify-content-center'>
						<IonCol size='12' sizeMd='8' sizeLg='6' sizeXl='4'>
							<IonCard>
								<IonCardHeader>
									<IonTitle>Connexion</IonTitle>
								</IonCardHeader>
								<IonCardContent>
									<form
										action=''
										onSubmit={(e) => handleLogin(e)}
									>
										<IonInput
											name='email'
											color='secondary'
											label='Votre adresse mail'
											placeholder='toto@mail.com'
											type='text'
											labelPlacement='floating'
											fill='outline'
										/>
										<IonInput
											name='password'
											className='ion-margin-top'
											label='Votre mot de passe'
											placeholder='1234...'
											type='password'
											labelPlacement='floating'
											fill='outline'
										/>
										<IonButton
											type='submit'
											className='ion-margin-top'
											expand='block'
										>
											<IonIcon
												icon={logInOutline}
												slot='end'
											></IonIcon>
											Se connecter
										</IonButton>
									</form>
									<IonButton
										routerLink='/inscription'
										className='ion-margin-top'
										expand='block'
										fill='clear'
									>
										<IonIcon
											slot='end'
											icon={personAddOutline}
										></IonIcon>
										Créer un compte
									</IonButton>
								</IonCardContent>
							</IonCard>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
			<IonFooter>
				<IonToolbar color='primary'>
					<IonTitle>Footer</IonTitle>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default Home;
