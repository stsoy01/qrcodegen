import {errorCorrectionCodeWords} from "./errorCorrectionVersion";

export default class Encoder  {

  errorCorrectionObject = {};
  counter = 0;
  stringArray = [];

  alphanumericEncoding(mode = 'alphaNumeric', str) {
    const string = str.toUpperCase().split('');
    let counter = 0;

    for (let i = 0; i < string.length; i++) {
      if (i % 2 === 0) {
        counter = this.alphanumericTable[string[i]] * 45;
        counter += this.alphanumericTable[string[i + 1]]

        if (counter) {
          this.stringArray.push(this.decimalToBinary(counter))
        } else {
          counter = this.alphanumericTable[string[i]];
          this.stringArray.push(this.decimalToBinary(counter))
        }
      }
      
      counter = 0;
    }

    return {
      encodedData: this.stringArray,
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

    setPolynomial8BitDataString(_8bitString) {
        // console.log('string', _8bitString.match(/.{1,8}/g))
    }

    binaryToDecimal(num) {
        let numArray = num.match(/.{1,8}/g);
        let index = 7;
        let counter = 0
        let arr = []
        for (let number of numArray) {
            for (let letter of number) {
                if (letter === '1') {
                    counter += (2 ** index);
                }
                index--;
                if (index < 0) {
                    index = 7
                    arr.push(counter);
                    counter = 0;
                }
            }
        }
        return arr;
    }
}
