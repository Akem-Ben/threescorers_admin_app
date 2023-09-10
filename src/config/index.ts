interface Secrets {
	apiHost: string;
}

interface Config {
	secrets: Secrets;
}

let cache: Config | null = null;

const environment = import.meta.env.VITE_APP_ENVIRONMENT || "development";

const config = (): Config => {
	if (!cache) {
		cache = Object.freeze({
			secrets: {
				apiHost:
					environment === "development"
						? " https://test.3scorers.com/api/v1/admin"
						: " https://test.3scorers.com/api/v1/admin",
			},
		});
	}
	return cache;
};

export default config;
