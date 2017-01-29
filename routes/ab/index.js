var express = require('express');
var path = require('path');
var router = express.Router();

var test_precent = 0.5;
var test_a_count = 0;
var test_b_count = 0;

var tests = {};

/* GET home page. */
router.get('/:username/img/:filename', function(req, res, next) {
  var username = req.params.username;
  var filename = req.params.filename;
  var img_path = 'tests/'+username+'/img/'+filename;

  if (tests[username] === undefined){
    tests[username] = {};
    tests[username][filename] = {
      "variation" : ["a","b"],
      "count" : 0
    };
  }
  var cookie = req.cookies["cf_testab_img_"+username+"_"+filename];
  if (cookie === undefined){
    cookie = tests[username][filename].variation[(tests[username][filename]["count"] % tests[username][filename].variation.length)];
    tests[username][filename]["count"]++;
    res.cookie("cf_testab_img_"+username+"_"+filename,cookie, { maxAge: 900000, httpOnly: true });
  }
  img_path+='/'+cookie;
  res.sendFile(path.resolve(img_path));

});

module.exports = router;
