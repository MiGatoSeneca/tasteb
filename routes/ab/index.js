var express = require('express');
var path = require('path');
var router = express.Router();

var test_precent = 0.5;
var test_a_count = 0;
var test_b_count = 0;

/* GET home page. */
router.get('/:username/img/:filename', function(req, res, next) {
  var username = req.params.username;
  var filename = req.params.filename;
  var img_path = 'tests/'+username+'/img/'+filename;
  console.log(username+'/img/'+filename);

  var cookie = req.cookies["cf_testab_img_"+username+"_"+filename];
  if (cookie === undefined){
    if (test_a_count==0){
      test_a_count++;
      cookie = 'a';
    }else{
      if((test_b_count/(test_a_count+test_b_count)) <= test_precent){
        test_b_count++;
        cookie = 'b';
      }else{
        test_a_count++;
        cookie = 'a';
      }
    }
    res.cookie("cf_testab_img_"+username+"_"+filename,cookie, { maxAge: 900000, httpOnly: true });
  }
  img_path+='/'+cookie;
  res.sendFile(path.resolve(img_path));
});

module.exports = router;
