import { AES128Crypt } from './crypt';


describe('crypt', () => {
  test('should work', () => {
    const test = new AES128Crypt();
    const m = 'test';

    const t1: BufferEncoding = 'binary';
    const a = test.Encrypt(m, t1);
    console.log(a);
    const b = test.Decrypt(a.buffer, t1);
    console.log(b);

    expect(Buffer.from(b.data).toString('utf-8')).toEqual(m);
  });
});
