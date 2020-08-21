$('document').ready(function(){

  var songs = new Array();
  $('.songPlay').each(function(){
    $(this).parents('.collection-item');
    songs.push($(this));
  });


var song = new Audio();

  $('.songPlay').on("click",function(){
    $('.collection-item[status=playing]').attr('status','stopped')
    var _this = $(this);
    parent = _this.parents('.collection-item');
    parent.attr('status','playing');

    $('.collection-item').not(parent).css({
      "background-color":'#fff',
      'color':'#000',
    })
    parent.css({
      'background-color':'#82b1ff',
      'color':'#fff',
    })

    if(_this.attr('state') == 'stop' || typeof _this.attr('state') === 'undefined' ){

    $('#duration').val(0);

    $('.songPlay[state=playing]').text('play_arrow');
    $('.songPlay[state=playing]').attr('state','stop');

    _this.attr({'state':'playing'})
    _this.text("pause");

    var src = _this.attr('data-link');
    $('#image').css('background-image','url(images/cover/'+_this.attr('image')+')');

    $("#play").text('pause_circle_outline');

    song.src = 'music_list/'+src ;
    
    song.play();

    song.addEventListener('loadedmetadata',function(){

      var title = _this.attr('data-name');
      $('.title').text(title);

      $('#duration').attr('max',song.duration);

      var duration = song.duration;
      $('.duration').text(formatSecondsAsTime(duration));

      });

    }
    else if(_this.attr('state') == 'playing' )
    {
      $("#play").text('play_circle_outline');
      _this.text('play_arrow');
      song.pause();
      _this.attr({'state':'stop'});
    }

  });


  song.addEventListener('timeupdate',function (){
    $(".current").text(formatSecondsAsTime(song.currentTime))
      curtime = parseInt(song.currentTime, 10);
          $("#duration").val(curtime);
      });

  $('#play').on('click',function(){
    var _this = $(this);
    if(_this.text() == 'play_circle_outline')
    {
      song.play();
      _this.text('pause_circle_outline');
    }
    else if(_this.text() == 'pause_circle_outline')
    {
      song.pause();
      _this.text('play_circle_outline');

    }
  });
  // To shuffle the songs
  
  var shuffle=0;
  $('#shuffle').on('click',function(){
    if(shuffle==0){
      $(this).css({
        'color':'#ef5350',
      });
      shuffle=1;
    }
    else if(shuffle==1){
      $(this).css({
        'color':'#fff',
      });
      shuffle=0;
    }
  });
  
 //To play the next song

  $("#next").on('click',function(){
    var _this = $(this);
    if(shuffle==1){
      var random = songs[Math.floor(songs.length * Math.random())];
      random.trigger('click');
    }
    else if(shuffle==0){
      var item = $('.collection-item[status="playing"]').next('.collection-item');
      item.find('.songPlay').trigger('click');

    }
  });
  //To play the previous song

  $("#prev").on('click',function(){
    var _this = $(this);
    if(shuffle==1){
      var random = songs[Math.floor(songs.length * Math.random())];
      random.trigger('click');
    }
    else if(shuffle==0){
      var item = $('.collection-item[status="playing"]').prev('.collection-item');
      item.find('.songPlay').trigger('click');

    }
  });
  song.addEventListener("ended", function(){
    if(shuffle==1){
      var random = songs[Math.floor(songs.length * Math.random())];
      random.trigger('click');
    }
    else if(shuffle==0)
    {
      var item = $('.collection-item[status="playing"]').prev('.collection-item');
      item.find('.songPlay').trigger('click');
    }
  });
  
  //to check the duration of the song
  $("#duration").on("change", function() {
        song.currentTime = $(this).val();
        $("#duration").attr("max", song.duration);
    });

//function calculating the seconds

function formatSecondsAsTime(secs) {
  var hr  = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600))/60);
  var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

  if (min < 10){
    min = "0" + min;
  }
  if (sec < 10){
    sec  = "0" + sec;
  }

  return min + ':' + sec;
}

});
