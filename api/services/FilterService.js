module.exports = {
  filterYears: function(options) {
    const courses = options.courses;
    let years = [];
    courses.forEach(function(element) {
      if ('year' in element && typeof(element.year) === 'number' && !isNaN(element.year)) {
        years.push(element.year);
      }
    }, this);
    uniqueYears = years.filter(function(item, pos) {
      return years.indexOf(item) == pos;
    });
    return uniqueYears;
  },
  filterPeriod: function(options) {
    const courses = options.courses;
    let periods = [];
    courses.forEach(function(element) {
      if ('period' in element && typeof(element.period) === 'number' && !isNaN(element.period)) {
        periods.push(element.period);
      }
    }, this);
    uniquePeriods = periods.filter(function(item, pos) {
      return periods.indexOf(item) == pos;
    });
    return uniquePeriods;
  }
}
