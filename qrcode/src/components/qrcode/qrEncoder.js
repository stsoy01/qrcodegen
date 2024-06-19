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



            for (const prop in obj[num]) {
                if (obj[num][prop][mode] === 734) {
                    return this.errorCorrectionObject;
                }
                Object.entries(obj[num]).forEach(el => {
                    if (el[1][mode] === 734) {
                        this.errorCorrectionObject.letter = el[0];
                        this.errorCorrectionObject.value = el[1];

                    }
                    return this.errorCorrectionObject;
                })
            }
        }
    }
}
