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
  // TODO: validate everything (kon via sails?)
  // TODO: make images uploadable
  edit: async function(req, res) {
    if (req.method === 'POST') {
      await Category.update({ name: req.params.category },
      {
        name: req.body.name,
        image: req.body.image,
      });
      return res.json({placeholder: 'Updated category!'});
    } else {
      try {
        const category = await Category.findOne({
          name: req.params.category
        });
        //TODO: make this page
        return res.view('category/categoryEdit', { category });
      } catch (err) {
        return res.negotiate(err);
      }
    }
  },
  delete: async function(req, res) {
    try {
      await Category.destroy({ name: req.params.category });
      return res.json({placeholder: 'Deleted category!'});
    } catch(err) {
      return res.negotiate(err);
    }
  }
};

