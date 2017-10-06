/**
 * NoteController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util');
const uuidv5 = require('uuid/v5');
// TODO: relocate this
const NAMESPACE = 'ed17a201-aa1f-4dd6-894a-5494c01a58b4';

module.exports = {
	// add: async function(req,res) {
  //   if (req.method === 'POST') {
  //     try {
  //       req.file('note').upload({
  //         maxBytes: 10000000
  //       }, function whenDone (err, uploadedFiles) {
  //         if (err) return res.negotiate(err);
  //         if (uploadedFiles.length === 0) return res.badRequest('No file was uploaded');
  //       });
  //       const uuid = uuidv5(uploadedFiles[0].fd, NAMESPACE);
  //       const uri = util.format('%s/course/%s/note/%s/file/%s', sails.config.appUrl, req.param('course'), req.param('note'), uuid);
  //       await Note.create({
  //         name: req.body.name,
  //         course: Course.findOne({name: req.param('course')}).exec().id,
  //         fileUrl: uri
  //       })
  //       return res.ok();
  //     } catch (err) {
  //       return res.serverError(err);
  //     }
  //   } else {
  //     return res.view('note/noteAdd');
  //   }
  // }
  // add: function(req,res) {
  //   if (req.method === 'POST') {
  //     req.file('note').upload(function (err, uploadedFiles) {
  //       if (err) return res.send(500, err);
  //       return res.json({
  //         message: uploadedFiles.length + ' file(s) uploaded successfully!',
  //         files: uploadedFiles
  //       });
  //     });
  //   } else {
  //     return res.view('note/noteAdd');
  //   }
  // }
	add: function(req,res) {
    if (req.method === 'POST') {
        req.file('note').upload({
          maxBytes: 10000000
        }, async function whenDone (err, uploadedFiles) {
          try {
            if (err) return res.negotiate(err);
            if (uploadedFiles.length === 0) return res.badRequest('No file was uploaded');
            const uuid = uuidv5(uploadedFiles[0].fd, NAMESPACE);
            const uri = util.format('/course/%s/note/%s/file/%s', req.params.code, req.params.note, uuid);
            const course = await Course.findOne({code: req.params.code})
            const name = req.body.name;
            await Note.create({
              name: name,
              course: course.id,
              fileUrl: uri
            })
           return res.ok();
          } catch (err) {
            return res.serverError(err);
          }
        });
    } else {
      return res.view('note/noteAdd');
    }
  }
};

