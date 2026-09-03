import { URL_LOGIN, HEADERS } from "./service";

export const login = async (credentials) => {
    const response = await fetch(URL_LOGIN, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        throw new Error('Credenciales invalidas');
    }

    return response.json();
};