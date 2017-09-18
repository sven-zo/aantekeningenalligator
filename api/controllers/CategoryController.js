/**
 * CategoryController
 *
 * @description :: Server-side logic for managing categories
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res) => {
    Category.find()
      .exec((err, categories) => {
        return res.view('category/categoryList', { categories });
    });
  },
};

