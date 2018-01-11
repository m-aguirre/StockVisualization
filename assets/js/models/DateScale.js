import * as d3 from "d3";

class DateScale {
  constructor(daysToSubtract) {

    this.startDate = this.calculateStartDate(daysToSubtract);

    //creates linearly spaced scale for x-coordinate
    this.xScale = d3.scaleTime()
        .domain([
          new Date(this.startDate),
          new Date()
        ])
        .range([0, 600]);

    this.numTicks = this.findNumberOfTicks(daysToSubtract);
  }

  //NEW startDate calculator
  // calculateStartDate(daysToSubtract) {
  //   var currentDate = new Date();
  //   currentDate.setDate(currentDate.getDate() - daysToSubtract);
  //   return new Date(currentDate);
  // }

  //returns numeric
  calculateStartDate(daysToSubtract) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - daysToSubtract);
    return Date.parse(currentDate);
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
