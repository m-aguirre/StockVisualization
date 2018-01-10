import * as d3 from "d3";

class DateScale {
  constructor(currentDate, daysToSubtract) {

    this.startDate = this.calculateStartDate(daysToSubtract);

    //creates linearly spaced scale for x-coordinate
    this.xScale = d3.scaleTime()
        .domain([
          new Date(Date.parse(this.startDate)),
          new Date(Date.parse(currentDate))
        ])
        .range([0, 600]);

    this.numTicks = this.findNumberOfTicks(daysToSubtract);
  }

  //NEW startDate calculator
  calculateStartDate(daysToSubtract) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysToSubtract);
    return new Date(currentDate);
  }

  // calculateStartDate(endDate, daysToSubtract) {
  //   var date = new Date(endDate);
  //   date.setDate(date.getDate() - daysToSubtract);
  //   return new Date(date);
  // }

  findNumberOfTicks(daysToSubtract) {
      switch(daysToSubtract) {
        case 30:
          return 6;
        case 60:
          return 8;
        case 180:
          return 10;
        default:
          return 14;
      }
  }
}

export default DateScale;
