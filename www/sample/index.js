var util = require('util');
var request = require('request');
var ACS = require('acs-node');

var appkey = process.argv[3];

(function(){
    switch(process.argv[2]){
        case '--rest-test':
            rest_test();
            break;
        case '--login-update':
            login_update();
            break;
        case '--create-user':
            create_user();
            break;
        case '--remove-user':
            remote_user();
            break;
        case '--count-user':
            count_user();
            break;
        default:
            console.log();
            console.log('Usage:');
            console.log('', 'node index --rest-test [appkey]');
            console.log('', 'node index --login-update [appkey]');
            console.log('', 'node index --create-user [appkey]');
            console.log('', 'node index --remove-user [appkey]');
            console.log('', 'node index --count-user [appkey]');
            console.log();
            break;
    }
})();

function getJSON(body){
    return util.inspect(body, { showHidden: true, depth: null });
}

function rest_test(){
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
}

function login_update(){
    ACS.initACS(appkey);
    var data = {
        login: 'test@testcloud.com',
        password: '1234567890'
    };
    ACS.Users.login(data, function(data){
        if(data.success) {
            console.log("Successful to login.");
            console.log(data);
            //console.log("UserInfo: " + JSON.stringify(data.users[0], null, 2))
            //console.log(ACS);
            //UPdate
            ACS.Users.update({
                first_name: 'test_first_name',
                last_name: 'test_last_name',
            }, function(data){
                console.log("Successful to update.");
                console.log(data);
            });
        } else {
            console.log("Error to login: " + data.message);
        }
    });
}

function create_user(){
    ACS.initACS(appkey);
    var userData = {
        email: 'test1@testcloud.com',
        first_name: 'test1_first',
        last_name: 'test1_last',
        password: '1234567890',
        password_confirmation: '1234567890',
    };
    ACS.Users.create(userData, function(body){
        console.log(getJSON(body));
    });
}

function remote_user(){
    ACS.initACS(appkey);
    var data = {
        login: 'test1@testcloud.com',
        password: '1234567890'
    };
    ACS.Users.login(data, function(data){
        if(data.success) {
            console.log("Successful to login.");
            //console.log(getJSON(data));
            ACS.Users.remove(function(data){
                console.log("Successful to remove.");
                console.log(data);
            });
        } else {
            console.log("Error to login: " + data.message);
        }
    });    
}

function count_user(){
    var url = 'https://api.cloud.appcelerator.com/v1/users/count.json?key=' + appkey;
    request.get(url, function(err,res,body){
        if(err) console.error(err);
        else{
            console.log(url);
            console.log(getJSON(body));
        }
    });
}
