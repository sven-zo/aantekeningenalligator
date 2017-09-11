/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  all: (req, res) => {
    Course.find({}).exec((err, courses) => {
      return res.view('courseList', { courses });
    });
  },
};
