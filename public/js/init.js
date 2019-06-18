function getCat() {
    fetch('/categories')
  .then(function(response) {
    return response.json();
  })
  .then(function(categories) {
    console.log(JSON.stringify(categories));
  });
}

function logOut(req, res, next ) {
  
  fetch('/admin/logoutAll', {
    method: 'post',
  }).then(function() {
    next()
  })
}