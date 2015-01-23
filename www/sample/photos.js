var util = require('util');
var fs = require('fs');
var async = require('async');
var request = require('request');
var ACS = require('acs-node');

var appkey = process.argv[3];

(function(){
    switch(process.argv[2]){
        case '--rest-test':
            rest_test();
            break;
        case '--create-photo':
            create_photo();
            break;
        default:
            console.log();
            console.log('Usage:');
            console.log('', 'node photos --rest-test    [appkey]');
            console.log('', 'node photos --create-photo [appkey]');
            console.log();
            break;
    }
})();

function getJSON(body){
    return util.inspect(body, { showHidden: true, depth: null });
}

function rest_test(){
    console.log('rest_test');
}

function create_photo(){
    ACS.initACS(appkey);
    var data = {
        login: 'test@testcloud.com',
        password: '1234567890'
    };
    ACS.Users.login(data, function(data){
        if(data.success) {
            console.log("Successful to login.");
            var photo_file = fs.createReadStream(__dirname + '/appcelerator.png');
            //console.log(__dirname);
            console.log(photo_file);
            ACS.Photos.create({
                photo: photo_file,
                title: 'test photo',
            }, function(body){
                console.log(body);
            });
        } else {
            console.log("Error to login: " + data.message);
        }
    });
}
