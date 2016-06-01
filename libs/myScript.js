$(function(){
    var TokenFromServer, id_product;
    TokenFromServer = 0;
    
    /* registration*/
$('#RegButton').click(function(){
    var log, pass, jsonStr;
    var obj = {};
    log = $('#RegInputEmail').val();
    pass = $('#RegInputPassword').val();
    obj ={
        "username": log,
        "password": pass
    }
    jsonStr = JSON.stringify(obj);
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://smktesting.herokuapp.com/api/register/",
            data: jsonStr,            
            dataType: "json",
            success: function (data){
                //console.log(data);                           
            },
             error: function (jqXHR, status) {                 
                 console.log(jqXHR);
                 alert('fail' + status.code);
             }              
        });
   });   
   
   /* authorization:*/
$('#AuthorButton').click(function(){
        var log, pass, jsonStr;
        var obj = {};
        log = $('#RegInputEmail').val();
        pass = $('#RegInputPassword').val();        
        obj ={
            "username": log,
            "password": pass
        }
        jsonStr = JSON.stringify(obj);
      
        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://smktesting.herokuapp.com/api/login/",
            data: jsonStr,            
            dataType: "json",
            success: function (data){               
                console.log(data);               
               TokenFromServer = data.token; 
               console.log(TokenFromServer);              
            },
             error: function (jqXHR, status) {
                 console.log(jqXHR);
                 alert('fail' + status.code);
             }              
        });
});   
   
    /* reviews*/   
$('#SendReview').click(function(){
  if (TokenFromServer != 0){ 
    var obj = {};
    var rate, text, jsonStr, urlForReviews, textForHeaders;
    rate = $('#input-7-xs').val();
    text = $('#textArea').val();
    urlForReviews = 'http://smktesting.herokuapp.com/api/reviews/'+id_product; 
    textForHeaders = '"Authorization": "Token ' + TokenFromServer + '"';    
    var textToken = "Token " + TokenFromServer;  
    var obj ={
        "rate": rate,
        "text": text
    };
    jsonStr = JSON.stringify(obj);    
    $.ajax({
            type: "POST",
            contentType: "application/json",
            url: urlForReviews,             
            data: jsonStr,
            dataType: "json",
            headers: {"Authorization": textToken },
            success: function (data){
                console.log(data);
            }
        });    
  }
  else{
        alert('Что бы иметь возможность оставлять отзыв необходимо авторизироваться!');
    }    
  });

 /*Show products*/
show_products();
     
   
function show_products(){
    $.getJSON('http://smktesting.herokuapp.com/api/products', function(data) {
    console.log(data);
    for (var i in data){            
       $("<li></li>")                                                                                                                                  
        .addClass('thumbnail')               
        .attr('id', data[i].id)
        .appendTo($("#ListOfSafes"));
    
        $("<img />")
        .attr('src', 'images/' + data[i].img)
        .addClass('imageLi')
        .appendTo($(".thumbnail")[i])
        ;
        $("<p></p>")
        .text(data[i].title)
        .addClass('textInLi1')
        .appendTo($(".thumbnail")[i])
        ;
        
         $("<p></p>")
        .text(data[i].text)
        .addClass('textInLi')
        .appendTo($(".thumbnail")[i])
        ;
        }
    var IdOfLi;
    $('.thumbnail').click(function(){
        IdOfLi = this;
        $("#ListOfReviews li").detach();
        $("#Reviews").removeClass('shadow');
        id_product = IdOfLi.id;
        urlForRev = 'http://smktesting.herokuapp.com/api/reviews/' + id_product;
        show_reviews(urlForRev);        
    })
        
});
};

/*Show/hide registration*/
$('#show1').click(function(){    
    var tempWidth = $(window).width();
    var otstup = (tempWidth-400)/2;
    $('#forma_block').css('left',otstup);
    $('#shadow_block').removeClass('shadow');
    $('#forma_block').removeClass('shadow');
});

$('#shadow_block').click(function(){
    $('#shadow_block').addClass('shadow');
    $('#forma_block').addClass('shadow');
});


/*show reviews*/
function show_reviews(urlForReviews2){
    $.getJSON(urlForReviews2, function(data) {
        //console.log(data);
        for (var i in data){
           $("<li></li>")                                                                                                                                  
            .addClass('thumbnail')               
            .attr('id', data[i].id)
            .appendTo($("#ListOfReviews"));
        
            $("<p></p>")
            .text('Номер продукта ' + data[i].product)
            .addClass('textInLi1')
            .appendTo($("#ListOfReviews li")[i]);
            
            $("<p></p>")
            .text('Текст отзыва ' + data[i].text)
            .addClass('textInLi1')
            .appendTo($("#ListOfReviews li")[i]);
            
            $("<p></p>")
            .text('Оценка товара ' + data[i].rate)
            .addClass('textInLi1')
            .appendTo($("#ListOfReviews li")[i]);
        };
    });
} 



});// end;