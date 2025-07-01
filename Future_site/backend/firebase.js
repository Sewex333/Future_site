// backend/firebase.js
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const account = require('./react-native-dream-9213a-firebase-adminsdk-h9bc7-13c14882f8.json')

const app = initializeApp({
  credential: cert(account),
});

const db = getFirestore();

module.exports = { db };
