$(document).ready(function(){
	$.okvideo({  playlist: {
                	list: 'https://www.youtube.com/playlist?list=PLbngbkcCcQnP5TFKxViUh-rUr7iQbOunt', // a YT playlist id
                	suggestedQuality: 'hd720'
              		},
          		volume: 0,
      			adproof: true,
      			hd: true });
});
