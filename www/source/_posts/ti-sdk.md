title: Ti-SDK
tags:
---

#### appcelerator-modules

https://github.com/appcelerator-modules

#### titanium-google-analytics

https://github.com/Sitata/titanium-google-analytics

#### nend

http://www.nend.net/dl/mediapartner/

#### Create the Ultimate User Experience: Must-Have Appcelerator Modules

http://www.appcelerator.com/blog/2015/03/must-have-modules/

#### New Facebook Modules

http://www.tidev.io/2014/11/20/new-facebook-modules/

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

