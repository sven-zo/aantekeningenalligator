module.exports = {
  login: async function (req, res) {
    try {
      const debug = await AuthService.checkPasswordOfUser({
        username: 'Sven',
        password: 'test'
      });
      return res.send(debug);
    } catch (err) {
      return res.send(err);
    }
  },
  token: async function (req, res) {
    try {
      const debug = await AuthService.signToken({
        username: 'Sven'
      });
      return res.send(debug);
    } catch (err) {
      return res.send(err);
    }
  },
  adminRole: function(req, res) {
    return res.send('This is a controller action only admins can access.');
  },
  modRole: function(req, res) {
    return res.send('This is a controller action only moderators or admins can access.');
  },
  userRole: function(req, res) {
    return res.send('This is a controller action only logged in users can access.');
  },
  returnYears: async function(req, res) {
    try {
      const courses = await Course.find({sort: 'name DESC'});
      console.log(courses);

      function filterYears(obj) {
        console.log('OBJ:', obj);
        if ('year' in obj && typeof(obj.year) === 'string' && !isNaN(obj.year)) {
          return true;
        } else {
          return false;
        }
      }

      const years_ = courses.filter(filterYears);

      let years = [];
      courses.forEach(function(element) {
        if ('year' in element && typeof(element.year) === 'string' && !isNaN(element.year)) {
          years.push(element.year);
        }
      }, this);
      uniqueYears = years.filter(function(item, pos) {
        return years.indexOf(item) == pos;
      });

      const service = FilterService.filterYears({courses});
      return res.json({service});
    } catch (err) {
      const error = new Error(err);
      console.log(error);
      return res.json({err: error});
    }
  }
}
