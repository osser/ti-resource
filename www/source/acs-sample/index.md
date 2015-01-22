title: acs-sample
date: 2015-01-22 09:35:50
---
Building Cross-Platform Apps using Titanium, Alloy, and Appcelerator Cloud Services

### ログイン

#### curl

curl -b cookies.txt -c cookies.txt -F "login=test@testcloud.com" -F "password=1234567890" https://api.cloud.appcelerator.com/v1/users/login.json?key=[appkey]&pretty_json=true

#### node.js

~~~
var util = require('util');
var request = require('request');

var url = 'https://api.cloud.appcelerator.com/v1/users/login.json?key=[appkey]';
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
        console.log(util.inspect(body, { showHidden: true, depth: null }));
    }
});
~~~
