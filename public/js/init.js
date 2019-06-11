function getCat() {
    fetch('/categories')
  .then(function(response) {
    return response.json();
  })
  .then(function(categories) {
    console.log(JSON.stringify(categories));
  });
}

function logOut() {
  
  fetch('/admin/logoutAll', {
    method: 'post',
    // body: JSON.stringify(opts)
  }).then(function(response) {
    return response.json();
  })
}