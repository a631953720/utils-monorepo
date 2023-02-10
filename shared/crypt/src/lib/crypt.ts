import * as forge from 'node-forge';
import { Loggers } from "@myorg/winston-logger";

const cryptLogger = new Loggers({ type: 'crypt' });

export class AES128Crypt {
  private AESKey: string;
  private AESIV?: string;
  private cipher: forge.cipher.BlockCipher;

  constructor(options?: { AESKey?: string, AESIV?: string }) {
    this.AESKey = options?.AESKey || "ABCDEFGIJKLMNOPR";
    this.AESIV = options?.AESIV || "0000000000000000";
    this.cipher = forge.cipher.createCipher('AES-CBC', this.AESKey);
  }

  Encrypt(message: string, type: BufferEncoding) {
    // The Secret Message
    const secretMsg = Buffer.from(message, type);

    // reference: https://github.com/digitalbazaar/forge#pkcs7
    // AES 128 192 256 的選擇取決於 Key 的長度
    // Note: CBC and ECB modes use PKCS#7 padding as default
    if (this.AESIV) this.cipher.start({ iv: this.AESIV });
    this.cipher.update(forge.util.createBuffer(secretMsg));
    this.cipher.finish();

    const encrypted = this.cipher.output;

    const result = {
      encrypted,
      data: Buffer.from(encrypted.data, type).toString(type),
      hexData: Buffer.from(encrypted.data, type).toString('hex'),
      binaryData: Buffer.from(encrypted.data, type).toString('binary'),
      buffer: Buffer.from(encrypted.data, type),
    };
    return result;
  }

  Decrypt(encryptedData: Buffer, type: BufferEncoding) {
    // 解密後會將原本加密產出的物件清空
    // Decrypt
    const decipher = forge.cipher.createDecipher('AES-CBC', this.AESKey);
    if (this.AESIV) decipher.start({ iv: this.AESIV || undefined });

    // 這段成是在測試程式裡面只能轉出空字串
    // const newData = new forge.util.ByteStringBuffer(encryptedData);
    const newData = forge.util.createBuffer(encryptedData.toString(type));
    decipher.update(newData);
    const result = decipher.finish();
    if (!result) cryptLogger.error(decipher.output, 'decrypt error');
    console.log(encryptedData, encryptedData.toString(type), newData);
    
    return decipher.output;
  }
}
