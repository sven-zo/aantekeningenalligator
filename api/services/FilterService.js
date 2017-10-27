module.exports = {
  filterYears: function(options) {
    const courses = options.courses;
    let years = [];
    courses.forEach(function(element) {
      if ('year' in element && typeof(element.year) === 'string' && !isNaN(element.year)) {
        years.push(element.year);
      }
    }, this);
    uniqueYears = years.filter(function(item, pos) {
      return years.indexOf(item) == pos;
    });
    return uniqueYears;
  }
}
