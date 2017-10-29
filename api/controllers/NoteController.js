/**
 * NoteController
 *
 * @description :: Server-side logic for managing notes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const util = require('util');
const uuidv5 = require('uuid/v5');
const SkipperDisk = require('skipper-disk');
const NAMESPACE = 'ed17a201-aa1f-4dd6-894a-5494c01a58b4';

module.exports = {
	add: function(req,res) {
    if (req.method === 'POST') {
      try {
        req.file('note').upload({
          maxBytes: 10000000
        }, async function whenDone (err, uploadedFiles) {
          try {
            if (err) return res.negotiate(err);
            if (uploadedFiles.length === 0) return res.badRequest('No file was uploaded');
            const name = req.body.name;
            const uuid = uuidv5(uploadedFiles[0].fd, NAMESPACE);
            const uri = util.format('/course/%s/note/%s/file/%s', req.params.code, name, uuid);
            const description = req.body.description;
            const course = await Course.findOne({code: req.params.code})
            const owner = await User.findOne({name: req.session.username});
            console.log(uploadedFiles);
            await Note.create({
              name: name,
              course: course.id,
              fileUrl: uri,
              fileFd: uploadedFiles[0].fd,
              fileName: uploadedFiles[0].filename,
              description: description,
              owner: owner.id
            })
           return res.send('Note added!');
          } catch (err) {
            if (err.code === 'E_VALIDATION') {
              return res.send('Alle velden zijn verplicht en/of een veld is verkeerd ingevuld.');
            }
            return res.serverError(err);
          }
        });
      } catch (err) {
        if (err.code === 'E_VALIDATION') {
          return res.send('Alle velden zijn verplicht en/of een veld is verkeerd ingevuld.');
        }
        res.negotiate(err);
      }
    } else {
      return res.view('note/noteAdd');
    }
  },
  view: async function(req, res) {
    try {
      const note = await Note.findOne({fileUrl: `/course/${req.params.code}/note/${req.params.note}/file/${req.params.file}`});
      if (!note) return res.notFound();
      res.set("Content-disposition", `attachment; filename='${note.fileName}'`);
      const fileAdapter = SkipperDisk();
      fileAdapter.read(note.fileFd)
      .on('error', function (err){
        return res.serverError(err);
      })
      .pipe(res);
    } catch (err) {
      return res.negotiate(err);
    }
  },
  delete: async function(req, res) {
    try {
      const note = await Note.findOne({name: req.params.note}).populate('owner');
      sails.log(note);
      if (req.session.username === note.owner.name || req.session.role === 'mod' || req.session.role === 'admin') {
        await Note.destroy({ name: req.params.note });
        return res.send('Deleted note!');
      } else {
        return res.send("You're not the owner of this note, thus you cannot delete it.")
      }
    } catch(err) {
      return res.negotiate(err);
    }
  },
  detail: async function(req, res) {
    try {
      const note = await Note.findOne({name: req.params.note}).populate('owner');
      return res.view('note/noteDetail', {note});
    } catch (err) {
      return res.negotiate(err);
    }
  }
};

