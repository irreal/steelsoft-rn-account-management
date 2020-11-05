import firebase from 'firebase';
import { User } from '../interfaces';
export function login(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(() => true).catch(() => false);
}
export function logout(): Promise<boolean> {
    return firebase.auth().signOut().then(() => true).catch(() => false);
}

export function getUserDetails(): Promise<{ user: User | null }> {
    return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                resolve({ user: null });
                return;
            }
            resolve({ user: { uid: user!.uid, creationTime: user!.metadata.creationTime as string, disabled: false, email: user!.email as string, admin: true } });
        });
    });
}
export function getIdToken(): Promise<string> {
    return new Promise((resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                reject(new Error('user not logged in'));
                return;
            }
            user?.getIdToken().then(t => resolve(t));
        });
    });
}
