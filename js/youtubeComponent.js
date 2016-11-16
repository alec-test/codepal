function mvc() {
  var model = {
          localStorageReset: function() {
            localStorage.videos = JSON.stringify([]);
          },
          init: function() {

            if (!localStorage.videos)model.localStorageReset();

            if (!localStorage.selectedVideoNumber)localStorage.selectedVideoNumber = JSON.stringify({});
          },
          add: function(obj) {
            var data = JSON.parse(localStorage.videos);
            data.push(obj);
            localStorage.videos = JSON.stringify(data);
          },
          getAllVideos: function() {
            return JSON.parse(localStorage.videos);
          }
  };
  var controller = {
          setUpYoutubeAPI: function() {
            gapi.client.setApiKey("AIzaSyDGHTYd59vSj48MyKPr5WPR19A1KxNyO90");
            gapi.client.load("youtube", "v3", function() {
              // yt api is ready
              model.init();
              view.init();
            });
          },
          init: function() {
            controller.setUpYoutubeAPI();
          },
          addVideo: function(vTitle, vImage, vId) {
            model.add({
              title: vTitle,
              image: vImage,
              id: vId
            });
          },
          getVideos: function() {
            return model.getAllVideos();
          },
          clearLocalStorage: function() {
            model.localStorageReset();
          }
  };
  var view = {
          init: function() {
            $('#search-button').attr('disabled', false);
            $('form#searchForm').on("submit", function(e) {
              e.preventDefault();
              controller.clearLocalStorage();
              var q = $('#query').val();
              var request = gapi.client.youtube.search.list({
                q: q,
                part: 'snippet'
              });

              request.execute(function(response) {
                response.items.forEach(function(video) {
                  var videoTitle = video.snippet.title;
                  var videoImage = video.snippet.thumbnails.default.url;
                  var videoIdentity = video.id.videoId;
                  controller.addVideo(videoTitle, videoImage, videoIdentity);
                  view.render();
                });
              });
              $(".dropdown-toggle").trigger("click");
            });
          },
          render: function() {
            var htmlString = '';
            controller.getVideos().forEach(function(video) {
              htmlString +=
                '<li class="video">' +
                '<span class="video-title hideOverflow text-success">' +
                video.title +
                '</span><br>' +
                '<img id="' + video.id + '" class="video-image" src="' + video.image + '">' +
                '</img>' +
                '</li>' +
                '<li class="divider"></li>';
            });
            $('#videos').html(htmlString);
          }
  };
  controller.init();
}

function init() {
  mvc();
}
var iFrameReady = true;
var player;

function videoClick(videoID) {
  if (iFrameReady)player = new YT.Player('inside', {
    height: '85%',
    width: '100%',
    videoId: videoID,
    events: {
      'onReady': onPlayerReady
    }
  });

  function onPlayerReady(event) {
    event.target.playVideo();
  }

}
$(document).click(function(event) {
  if ($(event.target)[0].className == 'video-image') {
    $('#resultVideo').html('<div id="inside"></div>');
    videoClick($(event.target)[0].id);
  }
});
