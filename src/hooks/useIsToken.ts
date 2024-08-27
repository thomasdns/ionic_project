import { useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { getCookies } from '../utils/capacitor-plugins/cookies';

const useIsToken = () => {
	const router = useIonRouter();

	const checkIfTokenCookieExists = () => {
		useIonViewWillEnter(() => {
			try {
				const allCookies = getCookies().split(';');
				const cookiesObject = allCookies.map((cookie) => {
					const cookieArr = cookie.split('=');
					return {
						key: cookieArr[0].trim(),
						value: cookieArr[1].trim(),
					};
				});

				const tokenCookie = cookiesObject[1];

				if (tokenCookie.key === 'token') {
					console.log('Token cookie found');
				} else {
					throw new Error('Token cookie not found');
				}
			} catch (error) {
				router.push('/');
			}
		});
	};

	return { checkIfTokenCookieExists };
};

export default useIsToken;
