import '../qrEncoder'
import './qrcode.css'
import Encoder from "../qrEncoder";

export default function QrCode() {

    const encoder = new Encoder();
    const binaryEncoding = encoder.alphanumericEncoding('alphaNumeric', '12314567891');
    console.table(binaryEncoding)

    const errorCorrection = encoder.getErrorCorrectionVersion(
        encoder.errorCorrectionVersion,
        'alphaNumeric',
        binaryEncoding.characterCount.decimal);
    console.log('errorCorrection', errorCorrection)
    console.log( encoder.setBitsNumber(errorCorrection.version))


    return (
        <>
            <div className={'qr'}>
                <input type={"text"}/>
            </div>
        </>

    )
}
