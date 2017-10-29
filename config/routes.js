/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {
  '/': {
    view: 'homepage'
  },
  '/credits': {
    view: 'credits'
  },
  // COURSES
  'get /courses': 'Course.index',
  '/course/add': 'Course.add',
  '/course/:code': 'Course.detail',
  '/course/edit/:code': 'Course.edit',
  '/course/delete/:code': 'Course.delete',
  // CATEGORIES
  '/categories': 'Category.index',
  '/category/edit/:category': 'Category.edit',
  '/category/add': 'Category.add',
  '/category/delete/:category': 'Category.delete',
  '/category/add': 'Category.add',
  // SIGNUP
  'get /signup': {
    view: 'auth/register'
  },
  'post /signup': 'User.register',
  // LOGIN
  'get /login': {
    view: 'auth/login'
  },
  'post /login': 'Auth.authenticate',
  // NOTES
  '/course/:code/note/add': 'Note.add',
  '/course/:code/note/:note/file/:file': 'Note.view',
  '/course/:code/note/:note/delete': 'Note.delete',
  //'/course/:code/note/:note/edit': 'Note.edit',
  '/course/:code/note/:note': 'Note.detail',
  // DEBUG
  '/debug/login': 'Debug.login',
  '/debug/token': 'Debug.token',
  '/debug/admin': 'Debug.adminRole',
  '/debug/mod': 'Debug.modRole',
  '/debug/user': 'Debug.userRole',
  '/debug/years': 'Debug.returnYears',
  // LOGOUT
  '/logout': 'Auth.logout',
  // USER MOD OR ADMIN ACTIONS
  //'/user/:user/setrole/:role': 'User.setRole',
  //'/user/:user/delete': 'User.delete',
  //'/user/:user/edit': 'User.edit',
  // USER GENERAL
  '/user': 'User.userPage',
  // USER ADMIN
  '/admin': 'User.adminPage',
  // MAKE COURSES (UN)STICKY
  '/course/:code/sticky': 'Course.sticky',
  '/course/:code/unsticky': 'Course.unsticky',
  // SEARCH
  '/search': 'Course.search'
};
