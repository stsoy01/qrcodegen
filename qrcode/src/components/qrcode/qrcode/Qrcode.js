import '../qrEncoder'
import './qrcode.css'
import Encoder from "../qrEncoder";

export default function QrCode() {

  const encoder = new Encoder();
  const binaryEncoding = encoder.alphanumericEncoding('alphaNumeric', 'Hello world');
  console.table(binaryEncoding);


  return (
    <>
      <div className={'qr'}>
        <input type={"text"} />
      </div>
    </>

  )
}
