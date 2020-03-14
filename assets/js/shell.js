var request = require('request');
var fs = require('fs');

function downloadFile(configuration){
    return new Promise(function(resolve, reject){
        // Save variable to know progress
        var received_bytes = 0;
        var total_bytes = 0;

        var req = request({
            method: 'GET',
            uri: configuration.remoteFile
        });

        var out = fs.createWriteStream(configuration.localFile);
        req.pipe(out);

        req.on('response', function ( data ) {
            // Change the total bytes value to get progress later.
            total_bytes = parseInt(data.headers['content-length' ]);
        });

        // Get progress if callback exists
        if(configuration.hasOwnProperty("onProgress")){
            req.on('data', function(chunk) {
                // Update the received bytes
                received_bytes += chunk.length;

                configuration.onProgress(received_bytes, total_bytes);
            });
        }else{
            req.on('data', function(chunk) {
                // Update the received bytes
                received_bytes += chunk.length;
            });
        }

        req.on('end', function() {
            resolve();
        });
    });
}


downloadFile({
    remoteFile: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F2.bp.blogspot.com%2F-UvaWIh2f9v8%2FT4-cRd_8SkI%2FAAAAAAAAAjs%2Fgi4v4NhCDTI%2Fs1600%2Fanimated-animated-nature-download-wallpapers.jpg&f=1&nofb=1",
    localFile: "/tmp/butterfly-wallpaper.jpeg",
    onProgress: function (received,total){
        var percentage = (received * 100) / total;
        console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");
    }
}).then(function(){
    alert("File succesfully downloaded");
});