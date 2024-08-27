import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	useIonRouter,
	useIonViewWillEnter,
} from '@ionic/react';
import React from 'react';
import useIsToken from '../hooks/useIsToken';

const Battles: React.FC = () => {
	const { checkIfTokenCookieExists } = useIsToken();

	checkIfTokenCookieExists();

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color='primary'>
					<IonTitle>Battles</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent className='ion-padding'>UI goes here...</IonContent>
		</IonPage>
	);
};

export default Battles;
