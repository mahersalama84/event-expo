export default abstract class SharedFunctions {
  static addZeroToNumber(number: number): string {
    if (number.toString().length < 2) return "0" + number;
    return number.toString();
  }
}
