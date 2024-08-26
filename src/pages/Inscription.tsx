import { IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import React from 'react';

const Inscription: React.FC = () => {

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

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


        const request = await fetch("https://api.which-one-battle.julienpoirier-webdev.com/api/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'allow-origin': '*',
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                email,
                name,
                password
            })
        })

        const response = await request.json();

        console.log(response);
        

    }

    return (
        <IonPage>
            <IonHeader>                
                <IonToolbar color="primary" >
                    <IonButtons slot='start'>
                        <IonBackButton defaultHref="/home"/>
                    </IonButtons>
                    <IonTitle >Which One Battle</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>Inscription</IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <form action="" onSubmit={handleInscription}>
                                        <IonInput required name='email' label='Email' type='text' placeholder='Votre adresse mail' labelPlacement='floating' fill='outline' />
                                        <IonInput required className='ion-margin-top' name='name' label='Nom et prénom' type='text' placeholder='Jean DUPONT' labelPlacement='floating' fill='outline' />
                                        <IonInput required className='ion-margin-top' name='password' label='Mot de passe' type='password' placeholder='1234' labelPlacement='floating' fill='outline' onIonChange={(event) => {
                                            setPassword(event.detail.value || '');
                                            if (!event.detail.value) {
                                                setConfirmPassword('');
                                            }
                                        }} value={password} />
                                        <IonInput required className='ion-margin-top' name='confirm-password' label='Confirmation mot de passe' type='password' placeholder='1234' labelPlacement='floating' fill='outline' onIonChange={(e) => {
                                            setConfirmPassword(e.detail.value || '');
                                            
                                        }}
                                        value={confirmPassword}/>

                                        <IonToast
                                            color={'danger'}
                                            isOpen={password !== confirmPassword && confirmPassword.length > 0}
                                            message="Les mots de passe ne correspondent pas"
                                        duration={5000}>
                                        
                                        </IonToast>
                                           <IonToast
                                            color={'primary'}
                                            isOpen={password === confirmPassword && confirmPassword.length > 0} 
                                            message="Les mots de passe correspondent, félicitations !"
                                        duration={5000}>
                                        
                                        </IonToast>

                                        <IonButton type='submit' className='ion-margin-top' expand='block' >S'inscrire</IonButton>
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