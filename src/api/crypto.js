/* import Vue from 'vue' */
import CryptoJs from 'crypto-js'
const Crypto = {
  encrypt: (word, keyStr) => {
    keyStr = keyStr || ''
    const key = CryptoJs.enc.Utf8.parse(keyStr)
    const srcs = CryptoJs.enc.Utf8.parse(word)
    const encrypted = CryptoJs.AES.encrypt(srcs, key, {mode: CryptoJs.mode.ECB, padding: CryptoJs.pad.Pkcs7})
    return encrypted.toString()
  },
  decrypt: (word, keyStr) => {
    keyStr = keyStr || ''
    const key = CryptoJs.enc.Utf8.parse(keyStr)
    const decrypt = CryptoJs.AES.decrypt(word, key, {mode: CryptoJs.mode.ECB, padding: CryptoJs.pad.Pkcs7})
    // decrypt.toString(CryptoJS.enc.Utf8)
    // return decryptedStr.toString();
    return decrypt.toString()
  }
}
export default Crypto
