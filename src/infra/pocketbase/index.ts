import PocketBase from 'pocketbase';

const pocketbaseUrl = import.meta.env.VITE_POCKETBASE_URL;

export const usePocketbase = () => {

    const pocketbase = new PocketBase(pocketbaseUrl);
    
    return {
        authStore: pocketbase.authStore,
        auth: async ({username, password} : {username: string, password: string}) => {
            return await pocketbase.collection('users').authWithPassword(username, password);
        }
    }

};