var express = require('express');
var path = require('path');
var router = express.Router();

var test_precent = 0.5;
var test_a_count = 0;
var test_b_count = 0;

var tests = {};

tests["admin"] = {};
tests["admin"]["img"]["test.jpg"] = {
  "variation" : ["a","b"],
  "count" : 0
};


router.get('/:username/:type/:filename', function(req, res, next) {
  var username = req.params.username;
  var filename = req.params.filename;
  var type = req.params.type;

  var cookie = req.cookies["cf_test_"+username+"_"+type+"_"+filename];
  if (cookie === undefined){
    cookie = tests[username][type][filename].variation[(tests[username][type][filename]["count"] % tests[username][type][filename].variation.length)];
    tests[username][type][filename]["count"]++;
    res.cookie("cf_test_"+username+"_"+type+"_"+filename, cookie, { maxAge: 900000, httpOnly: true });
  }
  var path = 'tests/'+username+'/'+type+'/'+filename+'/'+cookie;
  res.sendFile(path.resolve(path));

  //Actualizar Base de datos

});


router.get('/:username/:type/:filename/pixel.pxl', function(req, res, next) {
  var username = req.params.username;
  var filename = req.params.filename;
  var type = req.params.type;

  var cookie = req.cookies["cf_test_"+username+"_"+type+"_"+filename];
  if (cookie !== undefined){
    var cookie_conversion = req.cookies["cf_test_"+username+"_"+type+"_"+filename+"_conversion"];
    if (cookie_conversion === undefined){
      res.cookie("cf_test_"+username+"_"+type+"_"+filename+"_conversion", "true", { maxAge: 900000, httpOnly: true });
      //Actualizar Base de datos
    }
  }
  //img_path = enviar pixel 1x1 transparente
  res.sendFile(path.resolve(img_path));
});


module.exports = router;
