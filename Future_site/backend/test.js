const axios = require('axios');

const posId = '159876';
const apiKey = '6d32391571fd06890fb4751450381990'; // klucz do raportów

const testAuth = async () => {
  const credentials = `${posId}:${apiKey}`;
  const base64 = Buffer.from(credentials).toString('base64');
  const auth = `Basic ${base64}`;

  console.log('🔑 Authorization header:', auth);

  try {
    const response = await axios.get('https://sandbox.przelewy24.pl/api/v1/testAccess', {
      headers: {
        'Authorization': auth,
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ SUKCES:', response.data);
  } catch (error) {
    console.error('❌ BŁĄD:', error.response?.status, error.response?.data || error.message);
  }
};

testAuth();