//
// MERCHANT TODO: Configure these key variables.
//

'use strict'

exports.RG_MERCHANT_URL = function () {
    return 'http://example.com/index.html';
};

exports.RG_MERCHANT_LOGIN_URL = function () {
    return 'http://example.com/login/';
}

exports.RG_MERCHANT_ID = function () {
    return '1';
}
exports.RG_GW_PASSWORD = function () {
    return 'testpassword';
}
exports.RG_HASH_SECRET = function () {
    return 'hashsecret';
}

// Salt used for protecting password, don't change after install or you will have different salts used on passwords in the database.
// Modify this to your own value
exports.RG_MERCHANT_PASSWORD_SALT = function () {
    return 'sdfj0j80hssflhjsfh8sfh8sgo2';
}

// Local Database Configs
exports.RG_DB_SERVER = function () {
    return 'localhost';
}
exports.RG_DB_NAME = function () {
    return 'demo';
}
exports.RG_DB_USERNAME = function () {
    return 'rg_demouser';
}

// Set to FALSE for production, TRUE for Testing/Dev.
exports.RG_TEST_MODE = function () {
    return 'TRUE';
}


if (this.RG_TEST_MODE()) {
    exports.RG_LINK = function () {
        return ('https://dev-secure.rocketgate.com/hostedpage/servlet/HostedPagePurchase?');
    }
}
else {
    exports.RG_LINK = function () {
        return ('https://secure.rocketgate.com/hostedpage/servlet/HostedPagePurchase?');

    }
}

//
//  RocketGate requires a response to this postback.
//  This function  provides a properly formatted response message.
//
//  results indicates success or failure. A value of 0 indicates the server has received, parsed and processed the postback.
//  A non-zero value indicates that an error occurred.
//  message is an optional value that could be used to pass an error description which can be used in debugging the error.
//

exports.postback_response = function (results, message) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.WriteHead(200, { 'Cache-Control': 'no-cache' });

    retStr = '<?xml version=\"1.0\" encoding=\"UTF-8\"?>';
    retStr += '<Response>';
    retStr += '<results>' + results + '</results>';
    if (message != '') retStr += '<message>' + message + "</message>";
    retStr += "</Response>\n";

    console.log(retStr); // Send to RocketGate
    process.exit(); // and quit program
} // end pb_response

//
// Use Timestamp for Customer ID Generators
//
exports.uniqueTimeStamp = function () {
    var milliseconds = (new Date).getTime();
    var timestamp = milliseconds;
    return timestamp.toString();
} // end uniqueTimeStamp

 
 
