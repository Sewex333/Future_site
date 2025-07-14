const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const serviceAccount = require('./react-native-dream-9213a-firebase-adminsdk-h9bc7-13c14882f8.json');

const app = initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = { db };
