export default abstract class GlobalFunctions {
  static randomColor(full_name: string) {
    const hue =
      full_name.split("").reduce((acc, cur) => {
        return acc + cur.charCodeAt(0);
      }, 0) % 360;
    return `hsla(${hue}, 60%, 50%, 1)`;
  }

  static getDummyArray = (length: number) => {
    return length > 0
      ? [...Array(length)].map((_, idx) => ({
          id: idx + 1,
          orderNumber: idx + 1,
        }))
      : [];
  };

  static debounce = (func, delay) => {
    let timeoutId: string | number | NodeJS.Timeout | undefined;

    return (...args) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  static throttle = (func, delay) => {
    let throttling = false;

    return (...args) => {
      if (!throttling) {
        throttling = true;
        func(...args);
        setTimeout(() => {
          throttling = false;
        }, delay);
      }
    };
  };
}
