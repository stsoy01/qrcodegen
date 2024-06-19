import '../qrEncoder'
import './qrcode.css'
import Encoder from "../qrEncoder";

export default function QrCode() {

    const encoder = new Encoder();
    const binaryEncoding = encoder.alphanumericEncoding('alphaNumeric', 'Hello world');
    console.table(binaryEncoding);
    const errorCorrection = encoder.getErrorCorrectionVersion(encoder.errorCorrectionVersion, 'alphaNumeric', binaryEncoding.characterCount.decimal);
    console.log('errorCorrection',errorCorrection)


    return (
        <>
            <div className={'qr'}>
                <input type={"text"}/>
            </div>
        </>

    )
}
