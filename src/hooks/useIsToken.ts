import { useIonRouter, useIonViewWillEnter } from '@ionic/react';
import { getCookies } from '../utils/capacitor-plugins/cookies';

const useIsToken = () => {
	const router = useIonRouter();

	const checkIfTokenCookieExistsAndRedirectIfNot = () => {
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

	const checkIfTokenCookieExistsAndRedirectIf = () => {
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
					router.push('/battles');
				} else {
					throw new Error('Token cookie not found');
				}
			} catch (error) {}
		});
	};

	return {
		checkIfTokenCookieExistsAndRedirectIfNot,
		checkIfTokenCookieExistsAndRedirectIf,
	};
};

export default useIsToken;
