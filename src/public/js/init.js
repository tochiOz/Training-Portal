
//Used ti logout admin users from authentication
function logOut(req, res, next ) {
  
  fetch('/admin/logoutAll', {
    method: 'post',
  }).then(function() {
    next()
  })
}