$(function() {
  // jQuery goes here...

  // Uncomment this line to fade out the red box on page load
  // $(".red-box").fadeOut(2000);
  // $(".green-box").fadeOut(2000);
  // $(".green-box").fadeTo(2000,0);
  // $(".red-box").fadeIn(1000);
  // $(".green-box").fadeIn(2000);

  // $(".green-box").fadeTo(1000, 0.5);

  // $(".red-box").fadeTo(1000,0.2);
  // $(".green-box").fadeTo(2000,0.5);
  // $(".blue-box").fadeTo(3000,0.8);

  // $(".blue-box").fadeToggle();
  // $(".blue-box").fadeToggle();


  // $(".blue-box").hide(1000);
  // $(".blue-box").show(1000);
  
  // $(".blue-box").slideUp(1000);
  // $(".blue-box").slideDown(1000);

  // $("p").hide();
  // $("p").slideDown(1000);



  // $(".blue-box").animate({
  //   "margin-left": "+=200px"
  // },1000,"linear");
  // $(".blue-box").animate({
  //   "margin-left": "-=200px"
  // },1000,"linear");


  // $(".blue-box").animate({
  //   "margin-left": "+=200px",
  //   "opacity": "0",
  //   "height": "25px",
  //   "width": "25px",
  //   "margin-top": "25px",

  // },1000,"linear");

  // $("p").animate({
  //   fontSize: "20px",
  // },1000);


  // $(".red-box").fadeTo(1000,0.2);
  // $(".green-box").delay(1000).fadeTo(1000,0.5);
  // $(".blue-box").delay(2000).fadeTo(1000,0.8);


  // $(".red-box").fadeTo(1000,0,function(){
  //   alert("welcome back!")
  // });

  // $(".lightbox").delay(500).fadeIn(1000);



  // var gallaryImage = $(".gallary").find("img").first();

  // var images = [
  //   'images/laptop-mobile_small.jpg',
  //   'images/laptop-on-table_small.jpg',
  //   'images/people-office-group-team_small.jpg',
  // ];

  // var i = 0;

  // setInterval(function(){
  //   i = (i + 1) % images.length;
  //   gallaryImage.fadeOut(function(){
  //     $(this).attr("src",images[i]);
  //     $(this).fadeIn();
  //   });
  //   console.log(gallaryImage.attr("src"));
  // },2000);



  // var blueBox = $(".blue-box");

  // blueBox.mouseenter(function(){
  //   $(this).stop().fadeTo(500,0.5);
  // });
  // blueBox.mouseleave(function(){
  //   $(this).stop().fadeTo(500,1);
  // });

  // var images = [
  //   'images/laptop-mobile_small.jpg',
  //   'images/laptop-on-table_small.jpg',
  //   'images/people-office-group-team_small.jpg',
  // ];

  // var i = 0;

  // $('.gallary').find("img").on('click',function(){
  //   i = (i+1) % images.length; 
  //   $(this).fadeOut(function(){
  //     $(this).attr("src",images[i]).fadeIn();
  //   });
  // });


  var flickrAPI = "https://www.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

  $.getJSON(flickrAPI,{
    tags: "sun, beach",
    tagmode: "any",
    format: "json"
  }).done(function(data){
    // console.log(data);
    $.each(data.items,function(index,item){
      $("<img>").attr("src",item.media.m).appendTo("#flickr");

      if (index == 4) {
          return false;
      }
    });
  }).fail(function(){
    alert("the ajax api is failer")
  });



  var pokeAPI = "https://pokeapi.co/api/v2/generation/1";
  var pokemonByName = "https://pokeapi.co/api/v2/pokemon/";

  $.getJSON(pokeAPI)
  .done(function(data){
    $.each(data.pokemon_species, function(index, pokemon) {
      var name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
      var link = $("<a>").attr("id",pokemon.name).attr("href","#").append($("<strong>").text(name));
      var per = $("<p>").html("Pokemon special no. " + (index + 1) + " is ").append(link);

      link.click(function(){
        $.getJSON(pokemonByName + pokemon.name).done(function(details){
          console.log(details);
          var pokemonDiv = $("#pokemon-details");
          pokemonDiv.empty();
          pokemonDiv.append("<h2>"+ name +"</h2>");
          pokemonDiv.append("<img src ='"+ details.sprites.front_default + "'>");
          pokemonDiv.append("<img src ='"+ details.sprites.back_default + "'>");
          pokemonDiv.append("<img src ='"+ details.sprites.front_shiny + "'>");
          pokemonDiv.append("<img src ='"+ details.sprites.back_shiny + "'>");
        });

        event.preventDefault();
      });
      per.appendTo("#pokemon");
    });
    }).fail(function(){
      alert("api not found...");
  }).always(function(){
    console.log("awsome request poki")
  });

});