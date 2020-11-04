import firebase from 'firebase';
const config = {
    apiKey: 'AIzaSyCXRCim0cOyh9arqx2FKbUOwwJSGDples4',
    authDomain: 'steelsoft-servis.firebaseapp.com',
    databaseURL: 'https://steelsoft-servis.firebaseio.com',
    projectId: 'steelsoft-servis',
    storageBucket: 'steelsoft-servis.appspot.com',
    messagingSenderId: '963665673858',
    appId: '1:963665673858:web:d6cfa8750886551e49be9b',
    measurementId: 'G-1N2T5NCM8L',
}
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();