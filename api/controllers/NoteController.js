/**
 * NoteController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util');
const uuidv5 = require('uuid/v5');
const SkipperDisk = require('skipper-disk');
// TODO: relocate this
// TODO: replace res.serverError with res.negotiate
const NAMESPACE = 'ed17a201-aa1f-4dd6-894a-5494c01a58b4';

module.exports = {
	add: function(req,res) {
    if (req.method === 'POST') {
        req.file('note').upload({
          maxBytes: 10000000
        }, async function whenDone (err, uploadedFiles) {
          try {
            if (err) return res.negotiate(err);
            if (uploadedFiles.length === 0) return res.badRequest('No file was uploaded');
            const uuid = uuidv5(uploadedFiles[0].fd, NAMESPACE);
            const uri = util.format('/course/%s/note/%s/file/%s', sails.config.appUrl, req.params.code, req.params.note, uuid);
            const course = await Course.findOne({code: req.params.code})
            const name = req.body.name;
            console.log(uploadedFiles);
            await Note.create({
              name: name,
              course: course.id,
              fileUrl: uri,
              fileFd: uploadedFiles[0].fd,
              fileName: uploadedFiles[0].filename
            })
           return res.ok();
          } catch (err) {
            return res.serverError(err);
          }
        });
    } else {
      return res.view('note/noteAdd');
    }
  },
  view: async function(req, res) {
    try {
      const note = await Note.findOne({fileUrl: `/course/${req.params.code}/note/${req.params.note}/file/${req.params.file}`});
      console.log(`/course/${req.params.course}/note/${req.params.code}/file/${req.params.file}`);
      if (!note) return res.notFound();
      res.set("Content-disposition", "attachment; filename='" + note.fileName + "'");
      const fileAdapter = SkipperDisk();
      fileAdapter.read(note.fileFd)
      .on('error', function (err){
        return res.serverError(err);
      })
      .pipe(res);
    } catch (err) {
      return res.negotiate(err);
    }
  }
};

