/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: async function (req, res) {
    try {
      const categories = await Category.find();
      return res.view('category/categoryList', { categories });
    } catch (err) {
      return res.negotiate(err);
    }
  },
  edit: async function(req, res) {
    if (req.method === 'POST') {
      try {
        await Category.update({ name: req.params.category },
          {
            name: req.body.name,
            image: req.body.image,
          });
          return res.send('Updated category!');
      } catch (err) {
        if (err.code === 'E_VALIDATION') {
          const category = await Category.findOne({
            name: req.params.category
          });
          const validationMsg = "Alle velden zijn verplicht";
          return res.view('category/categoryEdit', {category, validationMsg})
        }
        return res.negotiate(err);
      }
    } else {
      try {
        const category = await Category.findOne({
          name: req.params.category
        });
        return res.view('category/categoryEdit', { category });
      } catch (err) {
        return res.negotiate(err);
      }
    }
  },
  add: async function(req, res) {
    if (req.method === 'POST') {
      try {
        await Category.create({
            name: req.body.name,
            image: req.body.image,
          });
          return res.send('Created category!');
      } catch (err) {
        if (err.code === 'E_VALIDATION') {
          const validationMsg = "Alle velden zijn verplicht";
          return res.view('category/categoryAdd', {validationMsg})
        }
        return res.negotiate(err);
      }
    } else {
      try {
        return res.view('category/categoryAdd');
      } catch (err) {
        return res.negotiate(err);
      }
    }
  },
  delete: async function(req, res) {
    try {
      await Category.destroy({ name: req.params.category });
      return res.send('Deleted category!');
    } catch(err) {
      return res.negotiate(err);
    }
  }
};

