/**
 * Category.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'db',
  attributes: {
    name: {
      type: 'String',
      required: true,
      size: 50
    },
    image: {
      type: 'string',
      enum: ['code', 'ontwerp', 'filo', 'unknown'],
      defaultsTo: 'unknown'
    },
    courses: {
      collection: 'course',
      via: 'category'
    }
  }
};

