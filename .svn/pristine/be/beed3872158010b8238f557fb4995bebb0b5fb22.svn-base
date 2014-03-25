$(window).on('load', function() {
    
    var container = $('<div/>');
    container.appendTo('body');
    
    //$.ajax();
    //$.get();
    //$.post();
    
    $.get('content.html', function(response) {
        container.html(response);
    });
    
    $.get('ajax.php', {params: 'Parameters send from browser'},function(res) {
        container.append(res);
    });
    
    $.get('ajax.php?params=Parameters send from browser',function(res) {
        container.append(res);
    });
    
    $.post('post.php', {params: 'POST'}, function(res) {
        container.append(res);
    });
    
    
    $.get('json.php', function(res) {
        console.log(typeof(res));
        console.log(res);
    });
    
    var response = null;
    $.ajax({
        type: 'post',
        url: 'json2.php',
        data: {post1: 1, post2: 2},
        async: false
    }).done(function(res) {
        response = res;
    }).error(function(xhr, textCode, errorThrow) {
        console.log(arguments);
    }).always(function() {
        if(response === null) {
            response = {
                'post1': 'not found'
            };
        }
    });
    
    alert(response.post1);
});