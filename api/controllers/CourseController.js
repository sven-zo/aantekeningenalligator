/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: async function(req, res) {
    try {
      const courses = await Course.find().populate('category');
      let snackbar = false;
      if (req.session.snackbar) {
        snackbar = req.session.snackbar;
        req.session.snackbar = false;
      }
      return res.view('course/courseList', { courses, snackbar });
    } catch (err) {
      return res.serverError(err);
    }
  },
  add: async function(req, res) {
    // TODO: split these in the route
    if (req.method === 'POST') {
      try {
        const category = await Category.findOne({
          name: req.body.category
        });
        await Course.create({
          name: req.body.name,
          code: req.body.code,
          category: category.id
        });
        req.session.snackbar = true;
        return res.redirect(sails.getUrlFor('Course.index'));
      } catch (err) {
        return res.serverError(err);
      }
    } else {
      try {
        const categories = await Category.find();
        return res.view('course/courseAdd', { categories });
      } catch (err) {
        return res.serverError(err);
      }
    }
  },
  detail: async function(req, res) {
    try {
      const course = await Course.findOne({
        code: req.params.code
      }).populate('notes');
      //return res.json({course})
      return res.view('course/courseDetail', { course });
    } catch (err) {
      return res.serverError(err);
    }
  }
};
