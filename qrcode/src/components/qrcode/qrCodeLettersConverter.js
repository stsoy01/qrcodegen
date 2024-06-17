export default class Converter {
    decimalToBinary(number) {
        let binaryNumber = '';
        while (number / 2 !== 0) {
            binaryNumber += number % 2;
            number = Math.floor(number / 2);
        }
        binaryNumber = binaryNumber.split('').reverse().join('');
        if (binaryNumber.length === 11) return binaryNumber;


        while (binaryNumber.length !== 11) {
            binaryNumber = '0' + binaryNumber;
        }
        return binaryNumber
    }


}
