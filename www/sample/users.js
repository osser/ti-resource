var util = require('util');
var async = require('async');
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
            remove_user();
            break;
        case '--count-user':
            count_user();
            break;
        case '--login-logout':
            login_logout();
            break;
        case '--batch-create-user':
            batch_create_user();
            break;
        case '--batch-delete-user':
            batch_delete_user();
            break;
        case '--query-users':
            query_users();
            break;
        case '--show-user':
            show_user();
            break;
        case '--show-me':
            show_me();
            break;
        default:
            console.log();
            console.log('Usage:');
            console.log('', 'node users --rest-test    [appkey]');
            console.log('', 'node users --login-update [appkey]');
            console.log('', 'node users --create-user  [appkey]');
            console.log('', 'node users --remove-user  [appkey]');
            console.log('', 'node users --count-user   [appkey]');
            console.log('', 'node users --login-logout [appkey]');
            console.log('', 'node users --batch-create-user [appkey]');
            console.log('', 'node users --batch-delete-user [appkey]');
            console.log('', 'node users --query-users  [appkey]');
            console.log('', 'node users --show-user    [appkey]');
            console.log('', 'node users --show-me      [appkey]');
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
                admin: true
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
        admin:true,
    };
    ACS.Users.create(userData, function(body){
        console.log(getJSON(body));
    });
}

function remove_user(){
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

function login_logout(){
    ACS.initACS(appkey);
    var data = {
        login: 'test1@testcloud.com',
        password: '1234567890'
    };
    ACS.Users.login(data, function(data){
        if(data.success) {
            console.log("Successful to login.");
            console.log(data);
            ACS.Users.logout(function(body){
                if (body.success) {
                    console.log('Success: Logged out');
                    console.log(body);
                }else{
                    console.log("Error to login: " + body.message);
                }
            });
        }else{
            console.log("Error to login: " + data.message);
        }
    });
}

function batch_create_user(){
    ACS.initACS(appkey);
    var idList = [1,2,3,4,5];
    async.eachSeries(idList, function(item,cb){
        var userData = {
            email: 'test_' + item + '@testcloud.com',
            first_name: 'test_' + item + '_first',
            last_name: 'test_' + item + '_last',
            password: '1234567890',
            password_confirmation: '1234567890',
        };
        ACS.Users.create(userData, function(body){
            console.log(item, body);
            cb();
        });
    }, function(err){
    });
}

function batch_delete_user(){
    ACS.initACS(appkey);
    var data = {
        login: 'test@testcloud.com',
        password: '1234567890'
    };
    ACS.Users.login(data, function(data){
        var idList = [1,2,3,4,5];
        async.eachSeries(idList, function(item,cb){
            cb();
        }, function(err){
        });
    });
}

function query_users(){
    ACS.initACS(appkey);
    ACS.Users.query({
        where: {
            first_name: 'test2_first'
        }
    }, function(body){
        console.log(body);
    });
}

function show_user(){
    ACS.initACS(appkey);
    var data = {
        login: 'test@testcloud.com',
        password: '1234567890'
    };
    ACS.Users.login(data, function(data){
    
    ACS.Users.show({
        user_id: '54c1e06f08c91e09422b0c1b'
    }, function(body){
        console.log(body);
    });
    
    });
}

function show_me(){
    ACS.initACS(appkey);
}
