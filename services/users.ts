import { User } from "../interfaces";
import { getIdToken } from "./auth"

const url = process.env.NEXT_PUBLIC_API_URL;

export async function usersFetcher(): Promise<User[]> {
    const token = await getIdToken();
    if (!token) {
        throw new Error('not logged in');
    }
    const response = await fetch(url + '/users', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });
    return response.json();
}