var BASE_URL = 'todos/'

// Example API calls
$(function() {
  $.ajax({
    url: BASE_URL,
    method: 'POST',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({
      text: 'Sample todo'
    })
  }).done(function (data) {
    console.log('Created todo item', data);

    var itemId = data._id;

    $.ajax({
      url: BASE_URL + itemId,
      method: 'PATCH',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        completed: true
      })
    }).done(function (data) {
      console.log('Updated todo item', data);

      $.ajax({
        cache: false,
        url: BASE_URL,
        method: 'DELETE'  
      }).done(function (data) {
        console.log('Deleted all items');
      }).fail(function (data) {
        console.log('Error deleting');
      });

    }).fail(function (data) {
      console.log('Failed to update todo item');
    });

  }).fail(function (data) {
    console.log('Failed to create todo item');
  });
});
