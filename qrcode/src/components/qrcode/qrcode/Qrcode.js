import '../qrEncoder'
import './qrcode.css'
import Encoder from "../qrEncoder";

export default function QrCode() {

    const encoder = new Encoder();
    const binaryEncoding = encoder.alphanumericEncoding('alphaNumeric', 'Hello world');
    // console.table( binaryEncoding)

    const errorCorrection = encoder.getErrorCorrectionVersion(
        encoder.errorCorrectionVersion,
        'alphaNumeric',
        binaryEncoding.characterCount.decimal);
    // console.log('errorCorrection', errorCorrection)
    const dataBitCapacity = encoder.setBitsNumber(errorCorrection.version);
    // console.log('dataBitCapacity', dataBitCapacity)
    const full8BitString = encoder.complete8BitCapacity(
        binaryEncoding.modeIndicator.data,
        binaryEncoding.characterCount.binary,
        binaryEncoding.encodedData,
        dataBitCapacity
    )
    encoder.setPolynomial8BitDataString(full8BitString)
    encoder.binaryToDecimal(full8BitString)


    return (
        <>
            <div className={'qr'}>
                <input type={"text"}/>
            </div>
        </>

    )
}
