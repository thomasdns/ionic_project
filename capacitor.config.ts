import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
	appId: 'io.ionic.starter',
	appName: 'battle',
	webDir: 'dist',
	plugins: {
		CapacitorCookies: {
			enabled: true,
		},
	},
};

export default config;
