/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: (req, res) => {
    Course.find()
      .populate('category')
      .exec((err, courses) => {
        return res.view('course/courseList', { courses });
    });
  },
};
