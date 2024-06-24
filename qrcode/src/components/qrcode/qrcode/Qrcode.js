import '../qrEncoder'
import './qrcode.css'
import Encoder from "../qrEncoder";
import {useState} from "react";

export default function QrCode() {

    const [qr, setQR] = useState('')
    const inputData = {}

    const encoder = new Encoder();
    const binaryEncoding = encoder.alphanumericEncoding('alphaNumeric', 'hello world');
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



    function ringing(e) {
        setQR(e.target.value)
    }


    return (
        <>
            <div className={'qr'}>
                <input onChange={ringing}  type={"text"}/>
                <button >{"Generate QR"}</button>
            </div>
        </>

    )
}
