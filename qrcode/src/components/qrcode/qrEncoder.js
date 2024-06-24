import EncodeData from "./encodeData";
import {errorCorrectionCodeWords} from "./errorCorrectionVersion";

export default class Encoder extends EncodeData {

    errorCorrectionObject = {}
    counter = 0;

    alphanumericEncoding(mode = 'alphaNumeric', str) {
        const string = str.toUpperCase().split('');
        let stringArray = [];
        let counter = 0;

        for (let i = 0; i < string.length; i++) {

            if (i % 2 === 0) {
                counter = this.alphanumericTable[string[i]] * 45;
                counter += this.alphanumericTable[string[i + 1]]

                if (counter) {
                    stringArray.push(this.decimalToBinary(counter))
                } else {
                    counter = this.alphanumericTable[string[i]];
                    stringArray.push(this.decimalToBinary(counter))
                }
            }

            counter = 0;
        }

        return {
            encodedData: stringArray,
            modeIndicator: {
                name: mode,
                data: this.modeIndicator[mode]
            },
            characterCount: {
                decimal: str.length,
                binary: this.decimalToBinary(str.length)
            }
        };
    }


    decimalToBinary(number) {
        let binaryNumber = '';
        while (number / 2 !== 0) {
            binaryNumber += number % 2;
            number = Math.floor(number / 2);
        }
        binaryNumber = binaryNumber.split('').reverse().join('');
        if (binaryNumber.length >= 11) return binaryNumber;


        while (binaryNumber.length !== 11) {
            binaryNumber = '0' + binaryNumber;
        }
        return binaryNumber
    }

    getErrorCorrectionVersion(obj, mode, stringLength) {
        for (const version in obj) {
            Object.entries(obj[version]).forEach((el) => {
                if (el[1][mode] >= stringLength && this.counter === 0) {
                    this.errorCorrectionObject.version = `${version}-${el[0]}`;
                    this.errorCorrectionObject.data = {
                        value: el[1][mode],
                        mode: mode
                    }
                    this.counter++;
                }
            })
        }
        return this.errorCorrectionObject
    }

    setBitsNumber(eCVersion) {
        return errorCorrectionCodeWords[eCVersion] * 8;
    }

    complete8BitCapacity(modeIndicator, characterCountIndicator, encodedData, dataBitCapacity, terminator = '0000') {
        let _8bitString = `${modeIndicator}${characterCountIndicator}${encodedData.join('')}${terminator}`
        _8bitString = _8bitString.match(/.{1,8}/g).map(el => el.length !== 8 ? el.padEnd(8, '0') : el)
        return _8bitString.join('').padEnd(dataBitCapacity, '1110110000010001')
    }
}
