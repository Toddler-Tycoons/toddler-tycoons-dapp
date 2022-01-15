import { createMessage, encrypt, readKey } from "openpgp";

const CardInfoUrl = "https://api-sandbox.circle.com/v1/cards";
const PaymentUrl = "https://api-sandbox.circle.com/v1/payments";
const options = {
	method: "POST",
	headers: { Accept: "application/json", "Content-Type": "application/json" },
};

const encryptCardDetails = async (cardDetails) => {
	const decodedPublicKey = await readKey({
		armoredKey: atob(process.env.CIRCLE_PUBLIC_KEY),
	});
	const message = await createMessage({ text: JSON.stringify(cardDetails) });
	return encrypt({
		message,
		encryptionKeys: decodedPublicKey,
	}).then((ciphertext) => {
		return {
			encryptedMessage: btoa(ciphertext),
			keyId,
		};
	});
};

const saveCardDetails = async (url, options) => {
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

const makePaymentRequest = async (url, options) => {};
