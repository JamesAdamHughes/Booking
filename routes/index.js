/*
 * GET home page.
 */

// TODO jsut show the rooms page
exports.index = function(req, res){
  res.render('rooms.html');
};

exports.book = function(req, res){
    res.render('peopleList.html');
}

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};