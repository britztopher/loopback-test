
/*
 * GET home page.
 */

exports.layout = function(req, res){
  res.render('layout.html')
};

exports.partials = function (req, res) {
  var name = req.params.name;

  console.log("Inside partials, name["+name+"], session: " + req.session);
  res.render('partials/' + name);

};

exports.initpage = function (req, res) {
    res.render('init/login.html');
};



