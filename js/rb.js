(function($) {
  'use strict';

  var html,
    pageHtml,
    projects,
    aboutContent,
    socialHtml,
    socialMedia,
    query,
    isRetina,
    hash = window.location.hash.substr(1);

  // Checking for Retina Devices
  query = '(-webkit-min-device-pixel-ratio: 1.5),    (min--moz-device-pixel-ratio: 1.5),    (-o-min-device-pixel-ratio: 3/2),    (min-device-pixel-ratio: 1.5),    (min-resolution: 144dpi),    (min-resolution: 1.5dppx)';
  // If retina screen replace 
  if (window.devicePixelRatio > 1 || window.matchMedia && window.matchMedia(query).matches) {
    isRetina = true;
  }
  

  $.ajax({
    type: 'POST',
    url: 'content/content.min.json',
    dataType: 'json',
    cache: false,
    success: function(data){
      projects = data.projects;
      aboutContent = data.about;
      socialMedia = aboutContent.social;
      html = '';
      socialHtml = '';


      html += '<div id="about" class="content">';
      html += '<h2>'+aboutContent.title+'</h2>';

      html += '<ul class="social">';
      for(var s = 0; s < socialMedia.length; s++){
        html += '<li><a href="'+ socialMedia[s].url +'" class="'+ socialMedia[s].class +'">'+ socialMedia[s].title +'</a></li>';
      }
      html += '</ul>';
      //$('#about').append(socialHtml);

      for(var p = 0; p < aboutContent.description.length; p++){
        html += '<p>'+ aboutContent.description[p] +'</p>';
      }
      html += '</div>';
      html += '<h2>Portfolio</h2>';
      html += '<ul class="portfolio-list">';

      for (var i = 0; i < projects.length; i++){
          var title = projects[i].title,
            thumbnail = projects[i].thumbnail,
            link = title.toLowerCase().replace(' ', '-');

            //console.log(projects[i].title)

          // use retina version of image
          if (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches)) {
              var extThumb = thumbnail.split('.').pop();
              if(extThumb == 'png'){
                  thumbnail = thumbnail.replace('.png', "@2x.png");
              }else if(extThumb == 'jpg'){
                  thumbnail = thumbnail.replace('.jpg', "@2x.jpg");
              }else if(extThumb == 'jpeg'){
                  thumbnail = thumbnail.replace('.jpeg', "@2x.jpeg");
              }
          }

          html += '<li>';
          html += '<a href="#'+ link +'" class="thumbnail">';
          html += '<img src="img/projects/thumbnails/'+ thumbnail +'" alt="'+ title +'">';
          html += '<div class="caption">';
          html += '<h3>'+ title +'</h3>';
          html += '<span class="see-more">See more</span>';
          html += '</div>';
          html += '</a>';
          html += '</li>';
          
      }
      html += '</ul>'
      // add portfolio list and content for each portfolio item
      
      if(hash !== ''){
        hash = hash.replace('#', '');
        showProject(hash);
      }else{
        $('#home').html(html);
      }
    }
  });


  function toTitleCase(str){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }

  function showProject(name){
    var projectName = name,
      pageHtml = '';

    //create a virtual page view 
    _gaq.push(['_trackPageview', projectName]);

    //hide current content
    $('#home').fadeOut();

    //update project name
    projectName = projectName.replace('-', ' ');
    projectName = toTitleCase(projectName);

    if(projectName.indexOf('Cibc') >= 0){
      projectName = projectName.replace('Cibc', 'CIBC');
    }else if(projectName.indexOf('Telus') >= 0){
      projectName = projectName.replace('Telus', 'TELUS');
    }


    // display chosen project full content
    pageHtml += '<div class="project">';
    pageHtml += '<a href="#" class="js-show-all">Show all projects</a>';

    for (var i = 0; i < projects.length; i++){

        var title = projects[i].title,
          description = projects[i].description,
          images = projects[i].images,
          classSize = projects[i].classes;

        if(title === projectName){
          pageHtml += '<h2>' + title + '</h2>';
          
          // paragraphs in content
          for (var a = 0; a < description.length; a++){
            pageHtml += '<p>' + description[a] + '</p>';
          }

          for (var b = 0; b < images.length; b++){
            var image = images[b],
              classImage = classSize[b];
            if(isRetina){
              image = image.replace('.jpg', '@2x.jpg');
            }
            pageHtml += '<img src="img/projects/large/'+ image +'" class="'+ classImage +'" alt="'+ title +' screenshot '+ b +'">';
          }
        }
    }
    pageHtml += '</div>';
    $('.container').append(pageHtml);
  }

  $('body').on('click', '.portfolio-list a', function(){
      var name = $(this).attr('href');
      name = name.replace('#', '');
      showProject(name);
  });

  $('body').on('click', '.js-show-all', function(){
    parent.location.hash = '';

    //create a virtual page view 
    _gaq.push(['_trackPageview', '/']);

    if($('#projects').length <= 0){
      $('#home').html(html);
    }
    $('.project').hide().remove();
    $('#home').fadeIn();
    return false;
  });

}(jQuery));