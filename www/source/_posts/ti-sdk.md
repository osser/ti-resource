title: Ti-SDK
date: 2015-01-23 12:48:35
tags:
---

#### Camera and Photo Gallery APIs

http://docs.appcelerator.com/titanium/latest/#!/guide/Camera_and_Photo_Gallery_APIs

~~~
var photoSource = Titanium.Media.getIsCameraSupported() ? Titanium.Media.showCamera : Titanium.Media.openPhotoGallery;


photoSource ({
    success : function(event) {
        processImage(event.media, function(_photoResp){
            photoObject = _photoResp;
        });
    },
    cancel : function() {
        // called when user cancels taking a picture
    },
    error : function(error) {
        // display alert on error
        if (error.code == Titanium.Media.NO_CAMERA) {
            alert('Please run this test on device');
        } else {
            alert('Unexpected error: ' + error.code);
        }
    },
    saveToPhotoGallery : false,
    allowEditing : true,
    // only allow for photos, no video
    mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
});

function processImage(_mediaObject, _callback) {
    // since there is no ACS integration yet, we will fake it
    var photoObject = {
        image : _mediaObject,
        title : "Sample Photo " + new Date()
    }
    // return the object to the caller
    _callback(photoObject);
}
~~~

#### Search and Query APIs

http://docs.appcelerator.com/cloud/latest/#!/guide/search_query
