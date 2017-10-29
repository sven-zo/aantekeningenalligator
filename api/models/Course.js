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
      unique: true
    },
    code: {
      type: 'string',
      required: true,
      size: 25,
      unique: true
    },
    category: {
      model: 'category',
      required: true
    },
    notes: {
      collection: 'note',
      via: 'course',
    },
    period: {
      type: 'integer',
      required: true,
      size: 1,
    },
    year: {
      type: 'integer',
      required: true,
      size: 4,
      minLength: 4,
      min: 2010
    },
    sticky: {
      type: 'boolean',
      default: false
    }
  },
};

