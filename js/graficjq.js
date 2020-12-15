$(function() {
    var stars = new Array();
    var sum = 0;
    var width = new Array();
     
    for ( var i = 1; i < 6; i++ ) {
      stars.push(parseInt($('.reviews_'+i+'star').val()));
    }     
     
    for ( var i = 0; i < stars.length; i++ ) {
      sum += stars[i];       
    }     
     
    for ( var i = 0; i < stars.length; i++ ) {
      w = ((stars[i]) / sum * 100).toFixed(0);
      width.push(w);
      $('.bar-container[data-id='+(i+1)+'] .bar').css('width', w+'%' ); 
    }
 
    if (sum > 0) {
      for ( var i = 0; i < stars.length; i++ ) {
        $('.bar-container[data-id='+(i+1)+'] .bar-number').html(width[i]+'%'); 
      }
    } else{
      $(".bar-container .bar-number").html('0%')
    }
  });