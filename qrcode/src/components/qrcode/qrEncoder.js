import EncodeData from "./encodeData";

export default class Encoder extends EncodeData {

    errorCorrectionObject = {}

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


        for (const num in obj) {
            this.errorCorrectionObject.version = num;
            // console.log('version', num)
            for (const prop in obj[num]) {
                if (obj[num][prop][mode] === 77) {
                    this.errorCorrectionObject.letter = obj[num][prop][mode];
                    return this.errorCorrectionObject;
                }
                // console.log('value', obj[num][prop][mode])
            }


            // if (typeof obj[prop] === 'object') {
            //
            //
            //
            //     if (obj[prop][mode] === 157) {
            //
            //     }
            //
            //
            //     if (prop !== 'M' && prop !== 'L' && prop !== 'Q' && prop !== 'H') {
            //         this.errorCorrectionObject['label'] = prop
            //
            //     }
            //     if (typeof obj[prop][mode] === 'number') {
            //         this.errorCorrectionObject['value'] = obj[prop][mode]
            //     }
            //
            //
            //     this.getErrorCorrectionVersion(obj[prop], mode, stringLength)
            // } else {
            // }
        }
        // return this.errorCorrectionObject
    }


}
