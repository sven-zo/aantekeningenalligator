/**
 * Course.js
 *
 * @description :: Represents a course.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'db',
  attributes: {
    name: {
      type: 'string',
      required: true,
      size: 50,
    },
    code: {
      type: 'string',
      required: true,
      size: 25,
    },
    category: {
      model: 'category'
    }
  },
};

