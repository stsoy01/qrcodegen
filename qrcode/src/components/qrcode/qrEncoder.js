/* eslint-disable no-unused-vars */
import EndcodeData from "./encodeData";

export default class Encoder extends EndcodeData {

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
        data: this.modeIdicator[mode]
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


}
