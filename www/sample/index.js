var util = require('util');
var request = require('request');

var appkey = process.argv[2];
var url = 'https://api.cloud.appcelerator.com/v1/users/login.json?key=' + appkey;
request.post(url, {
    form: {
        login: 'test@testcloud.com',
        password: '1234567890',
    },
    json: true,
}, function(err,res,body){
    if(err) console.error(err);
    else{
        console.log(url);
        //console.log(body);
        console.log(util.inspect(body, { showHidden: true, depth: null }));
        //console.log(body.meta);
        //console.log(body.response.users);
    }
});
