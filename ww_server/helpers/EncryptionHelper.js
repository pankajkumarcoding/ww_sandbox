const CryptoJS = require("crypto-js");

class EncryptionHelper {

    encrypt (plaintext) {
        return CryptoJS.AES.encrypt('my message', 'secret key 123').toString();
    }

    decrypt (ciphertext) {
        let bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
        return  originalText = bytes.toString(CryptoJS.enc.Utf8);
    }

}

export default EncryptionHelper;