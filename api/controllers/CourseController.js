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
      let courses;
      let stickyCourses;
      let search = false;
      if (req.session.searchResults) {
        courses = req.session.searchResults;
        req.session.searchResults = null;
        search = true;
      } else {
        courses = await Course.find().populate('category');
        stickyCourses = await Course.find({sticky: true}).populate('category');
      }

      let snackbar = false;
      if (req.session.snackbar) {
        snackbar = req.session.snackbar;
        req.session.snackbar = false;
      }
      // TODO: search
      const years = FilterService.filterYears({courses});
      const periods = FilterService.filterPeriod({courses});
      //sails.log(years);
      //const periods = ['debug1', 'debug2', 'debug3'];
      // Mods can use the sticky toggle
      // TODO: mods can only save sticky edit
      let printToggle = false;
      if (req.session.role === 'mod' || req.session.role === 'admin') {
        printToggle = true;
      }
      return res.view('course/courseList', { printToggle, stickyCourses, courses, snackbar, years, periods, search });
    } catch (err) {
      return res.serverError(err);
    }
  },
  add: async function(req, res) {
    if (req.method === 'POST') {
      try {
        const category = await Category.findOne({
          name: req.body.category
        });
        const d = new Date();
        const futureYear = (d.getFullYear() + 1);
        if (req.body.year > futureYear) {
          const validationError = true;
          const validationMessage = "Een vak kan niet te ver in de toekomst zijn.";
          const categories = await Category.find();
          return res.view('course/courseAdd', { categories, validationError, validationMessage });
        }
        const period = Number(req.body.period);
        const year = Number(req.body.year);
        await Course.create({
          name: req.body.name,
          code: req.body.code,
          category: category.id,
          period: period,
          year: year
        });
        req.session.snackbar = true;
        return res.redirect(sails.getUrlFor('Course.index'));
      } catch (err) {
        if (err.code === 'E_VALIDATION') {
          const categories = await Category.find();
          const validationError = true;
          const validationMessage = "Alle velden zijn verplicht.";
          return res.view('course/courseAdd', { categories, validationError, validationMessage });
        } else if (err.message === "Cannot read property 'id' of undefined") {
          const categories = await Category.find();
          const validationError = true;
          const validationMessage = "That category doesn't exist.";
          return res.view('course/courseAdd', { categories, validationError, validationMessage });
        }
        return res.negotiate(err);
      }
    } else {
      try {
        const categories = await Category.find();
        const validationError = false;
        return res.view('course/courseAdd', { categories, validationError });
      } catch (err) {
        return res.negotiate(err);
      }
    }
  },
  detail: async function(req, res) {
    try {
      const course = await Course.findOne({
        code: req.params.code,
      }).populate('notes');
      const editUrl = `/course/edit/${req.params.code}`;
      const addUrl = `/course/${req.params.code}/note/add`;
      const deleteUrl = `/course/delete/${req.params.code}`
      return res.view('course/courseDetail', { course, editUrl, addUrl, deleteUrl });
    } catch (err) {
      return res.serverError(err);
    }
  },
  edit: async function(req, res) {
    if (req.method === 'POST') {
      try {
        const d = new Date();
        const futureYear = (d.getFullYear() + 1);
        if (req.body.year > futureYear) {
          return res.send('Een vak kan niet te ver in de toekomst zijn!');
        }
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
        return res.send('Updated course!');
      } catch (err) {
        sails.log(err);
        if (err.code === 'E_VALIDATION') {
          return res.send('Alle velden zijn verplicht en/of er is een veld verkeerd ingevuld! Jaren moeten niet eerder zijn dan 2010.');
        }
        return res.negotiate(err);
      }
    } else {
      try {
        const categories = await Category.find();
        const course = await Course.findOne({
          code: req.params.code
        });
        return res.view('course/courseEdit', { course, categories });
      } catch (err) {
        return res.negotiate(err);
      }
    }
  },
  delete: async function(req, res) {
    try {
      await Course.destroy({ code: req.params.code });
      return res.send('Deleted course!');
    } catch(err) {
      return res.serverError();
    }
  },
  sticky: async function(req, res) {
    try {
      await Course.update({ code: req.params.code }, {
        sticky: true
      });
      sails.log(`Sticky ${req.params.code}`);
      return res.redirect('courses');
    } catch(err) {
      return res.negotiate(err);
    }
  },
  unsticky: async function(req, res) {
    try {
      await Course.update({ code: req.params.code }, {
        sticky: false
      });
      return res.redirect('courses');
    } catch(err) {
      return res.negotiate(err);
    }
  },
  search: async function(req, res) {
    try {
      let courses;
      if (req.param('year') === 'all' && req.param('period') === 'all') {
        courses = await Course.find({
          or: [
            { name: { 'contains': req.param('query') } },
            { code: { 'contains': req.param('query') } }
          ]
        }).populate('category');
      } else if (req.param('period') === 'all') {
        courses = await Course.find({
          or: [
            { name: { 'contains': req.param('query') } },
            { code: { 'contains': req.param('query') } }
          ],
          year: req.param('year')
        }).populate('category');
      } else if (req.param('year') === 'all') {
        courses = await Course.find({
          or: [
            { name: { 'contains': req.param('query') } },
            { code: { 'contains': req.param('query') } }
          ],
          period: req.param('period')
        }).populate('category');
      } else {
        courses = await Course.find({
          or: [
            { name: { 'contains': req.param('query') } },
            { code: { 'contains': req.param('query') } }
          ],
          period: req.param('period'),
          year: req.param('year')
        }).populate('category');
      }
      req.session.searchResults = courses;
      return res.redirect('courses');
    } catch (err) {
      return res.negotiate(err);
    }
  }
};
