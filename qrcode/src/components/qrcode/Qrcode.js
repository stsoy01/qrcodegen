import {useState} from "react";
import './qrCodeLettersConverter'
import './qrcode.css'
import Converter from "./qrCodeLettersConverter";

export default function QrCode() {

    const [qrValue, setQrValue] = useState('')

    const converter = new Converter();
    console.log(converter.decimalToBinary(4))

    return (
        <>
            <div className={'qr'}>
                <input onChange={(e) => {
                    setQrValue(e.target.value)
                }} type={"text"}/>

                <span>{qrValue}</span>
            </div>
        </>

    )
}
