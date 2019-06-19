//used to create admin departments
function createDepartment() {
  fetch('/admin/add_categories', {
    method: 'post'
  })
}

//Used ti logout admin users from authentication
function logOut(req, res, next ) {
  
  fetch('/admin/logoutAll', {
    method: 'post',
  }).then(function() {
    next()
  })
}