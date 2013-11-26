

exports.index = function(req, res) {

  return res.render( 'pages/index',{
      htmlMap: res.locals.htmlMap,
      layout: 'layout.html'
    }
  );

};