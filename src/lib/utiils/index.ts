import CryptoJS from 'crypto-js';

// Format play count
export function formatPlays(plays: number) {
	if (plays >= 1000) {
		return (plays / 1000).toFixed(1) + 'k';
	}
	return plays;
}

/**
 * Decrypts API responses that have been encrypted by the Django backend
 * @param {Object} response - The encrypted response from the API
 * @returns {Object} The decrypted data
 */
export function decryptApiResponse(response) {
	// Check if the response is encrypted
	if (!response.encrypted) {
		return response;
	}

	// Get encryption key
	const keyString = 'fewfew!@#!@#FSFDSFDS#EWEWQ';

	// Create a SHA-256 hash of the key string to get a 32-byte key
	const key = CryptoJS.SHA256(keyString);

	// Get the IV and encrypted data from the response
	const iv = CryptoJS.enc.Base64.parse(response.iv);
	const encryptedData = CryptoJS.enc.Base64.parse(response.data);

	// Decrypt the data
	const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedData }, key, {
		iv: iv,
		padding: CryptoJS.pad.Pkcs7,
		mode: CryptoJS.mode.CBC
	});

	// Convert the decrypted data to a string and parse it as JSON
	const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

	try {
		return JSON.parse(decryptedString);
	} catch (e) {
		console.error('Error parsing decrypted data:', e);
		throw new Error('Failed to decrypt API response');
	}
}
