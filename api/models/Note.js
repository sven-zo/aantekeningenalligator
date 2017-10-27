/**
 * Note.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
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
    course: {
      model: 'course'
    },
    fileUrl: {
      type: 'string'
    },
    fileFd: {
      type: 'string'
    },
    fileName: {
      type: 'string'
    },
    description: {
      type: 'string'
    }
  }
};

