export default abstract class DateFunctions {
  static customerTimeZone() {
    return new Date()
      .toLocaleTimeString("en-us", { timeZoneName: "short" })
      .split(" ")[2];
  }

  static formatDate(date: Date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = yyyy + "-" + mm + "-" + dd;
    return formattedToday;
  }

  static formatTime(date: Date) {
    let hh = date.getHours();
    let mm = date.getMinutes();
    if (hh < 10) hh = "0" + hh;
    if (mm < 10) mm = "0" + mm;
    const formattedToday = hh + ":" + mm;
    return formattedToday;
  }

  static formatTimetoLacle(d) {
    return new Date(d).toLocaleTimeString("en-GB", {
      // hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  }
}
