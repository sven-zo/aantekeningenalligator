/**
 * CourseController
 *
 * @description :: Server-side logic for managing courses
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: async function(req, res) {
    req.session.redirect = sails.getUrlFor('Course.index');
    try {
      const courses = await Course.find().populate('category');
      let snackbar = false;
      if (req.session.snackbar) {
        snackbar = req.session.snackbar;
        req.session.snackbar = false;
      }
      const years = FilterService.filterYears({courses});
      const periods = ['debug1', 'debug2', 'debug3'];
      return res.view('course/courseList', { courses, snackbar, years, periods });
    } catch (err) {
      return res.serverError(err);
    }
  },
  add: async function(req, res) {
    // TODO: split these in the route if possible
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
      const editUrl = `/course/edit/${course.code}`;
      const addUrl = `/course/${course.code}/note/add`;
      return res.view('course/courseDetail', { course, editUrl, addUrl });
    } catch (err) {
      return res.serverError(err);
    }
  },
  // TODO: validate everything (kon via sails?)
  edit: async function(req, res) {
    if (req.method === 'POST') {
      const category = await Category.findOne({
        name: req.body.category
      });
      await Course.update({ code: req.params.code },
      {
        name: req.body.name,
        code: req.body.code,
        category: category.id,
        period: req.body.period,
        year: req.body.year
      });
      return res.json({placeholder: 'Updated course!'});
    } else {
      try {
        const categories = await Category.find();
        const course = await Course.findOne({
          code: req.params.code
        });
        //TODO: make this page
        return res.view('course/courseEdit', { course, categories });
      } catch (err) {
        return res.negotiate(err);
      }
    }
  },
  delete: async function(req, res) {
    try {
      await Course.destroy({ code: req.params.code });
      return res.json({placeholder: 'Deleted course!'});
    } catch(err) {
      return res.negotiate(err);
    }
  }
};
