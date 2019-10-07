// 
//  Copyright notice:
//  (c) Copyright 2018 RocketGate
//  All rights reserved.
//  
//  The copyright notice must not be removed without specific, prior
//  written permission from RocketGate.
//  
//  This software is protected as an unpublished work under the U.S. copyright
//  laws. The above copyright notice is not intended to effect a publication of
//  this work.
//  This software is the confidential and proprietary information of RocketGate.
//  Neither the binaries nor the source code may be redistributed without prior
//  written permission from RocketGate.
//  
//  The software is provided "as-is" and without warranty of any kind, express, implied
//  or otherwise, including without limitation, any warranty of merchantability or fitness
//  for a particular purpose.  In no event shall RocketGate be liable for any direct,
//  special, incidental, indirect, consequential or other damages of any kind, or any damages
//  whatsoever arising out of or in connection with the use or performance of this software,
//  including, without limitation, damages resulting from loss of use, data or profits, and
//  whether or not advised of the possibility of damage, regardless of the theory of liability.
//  
//  File name: LinkBuilder.js
//  Purpose: The purpose of this nodejs file is to be an Object that can
//               build a link for passing a charge request to the
//               RocketGate system.  This is meant to be used in production
//               or as an example of how to accomplish encoded link
//               building.
//  
//

const utils = require('./rg_util');
var crypto = require('crypto');
////////////////////////////////////////////////////////////////////
//
// LinkBuilder() - constructor for the class
//
////////////////////////////////////////////////////////////////////
//
var LinkBuilder = function (keyString) {
    //
    // set the key for seeding the hash
    //
    this.hashkey = keyString;  

    //
    // prepare the parameter array
    //
    this.params = [];   

} // end constructor

////////////////////////////////////////////////////////////////////
//
// Set() - set a key value pair
// input: key and value to be stored as strings
// return : nothing returned
//
////////////////////////////////////////////////////////////////////
//
LinkBuilder.prototype.Set = function (key, value) {
    //
    // remove white space from begining and end of incoming value.
    // 
    var valueTrim = utils.trim(value);

    //
    // unset the array value if it exists already
    //
    this.Clear(key);

    //
    // do some checking on the 'amount' variable if it is set
    // remove the '$' if it exists
    //
    if (key.toLowerCase() === 'amount') {
        var pattern = '\\$';

        while (valueTrim.match(pattern)) {
            valueTrim = valueTrim.substr(1);
        }
    }
    //
    // store the key value pair
    //
    this.params[key] = valueTrim;
} // end set

////////////////////////////////////////////////////////////////////
//
// Clear() - used for clearing values for the array of perameters
// input : name of key to be cleared
// return : nothing returned
//
////////////////////////////////////////////////////////////////////
// 
LinkBuilder.prototype.Clear = function (key) {
    //
    // check if there is a preexisting key in the parameters array
    //
    if (utils.array_key_exists(key, this.params)) {
        //
        // remove the key value pair from the parameters
        //
        delete this.params[key];
    }
} // end Clear

////////////////////////////////////////////////////////////////////
//
// Encode() - this is the function that will produce the correct link portion
//            for connecting to the Rocket Gate system
// return: string
//
////////////////////////////////////////////////////////////////////
//
LinkBuilder.prototype.Encode = function () {
    var unencodedRetStr = '';    // this string will be hashed
    var encodedRetStr = '';      // this string is returned
    var sha1Hash = '';           // this string will hold the hash output
    var b64 = '';                // this string will hold the base64 encoding of the hash

    //
    // loop through all the keys and values
    //
    for (var key in this.params) {
        //
        // check if an '&' is needed
        //
        if (unencodedRetStr.length > 0) {
            unencodedRetStr += '&';
        }
        //
        // add values to the encoded string
        //
        unencodedRetStr += key + '=' + this.params[key];

        //
        // check if an '&' is needed
        //
        if (encodedRetStr.length > 0) {
            encodedRetStr += '&';
        }
        
        //
        // add values to the encoded string
        //
        encodedRetStr += key + '=' + utils.urlencode(this.params[key]);
    } // end looping

    //    
    // get the unencoded string ready to hash by adding the shared secret key
    //
    unencodedRetStr += '&secret=' + this.hashkey;

    //   
    // hash the encoded string and return the raw output
    //

    sha1Hash = crypto.createHash('sha1').update(unencodedRetStr).digest();

    //   
    // base64 encode the hash output
    // 
    b64 = Buffer.from(sha1Hash).toString('base64');

    // 
    // prepare the encoded string to return
    //
    encodedRetStr += '&hash=' + utils.urlencode(b64);

    //
    // return the encoded final string
    //
    return encodedRetStr;
} // end Encode

////////////////////////////////////////////////////////////////////
//
// the functions below are for debugging purposes
// they are meant to be helpful routines
//
////////////////////////////////////////////////////////////////////
//
LinkBuilder.prototype.getKeys = function () {
    retStr = '';
    for (var key in this.params) {
        retStr += '' + key + ' = ' + '' + this.params[key] + '';
    }
    return retStr;
} // end getKeys

////////////////////////////////////////////////////////////////////
//
// getValues() - this function produces a string of all the values
// return : string
//
////////////////////////////////////////////////////////////////////
//
LinkBuilder.prototype.geValues = function () {
    retStr = '';
    for (var key in this.params) {
        retStr += '' + value + "";
    }
    return retStr;
} // end getValues

////////////////////////////////////////////////////////////////////
//
// getEncodedKeys() - this function produces a string of all the
//                    keys encoded
// return : string
//
////////////////////////////////////////////////////////////////////
//
LinkBuilder.prototype.getEncodedKeys = function () {
    retStr = '';
    for (var key in this.params) {
        retStr += "" + utils.urlencode(this.params[key]) + "";
    }
    return retStr;
} // end getEncodedKeys

////////////////////////////////////////////////////////////////////
//
// getEncodedValues() - this function produces a string of all the
//                      values encoded
// return : string
//
////////////////////////////////////////////////////////////////////
//
LinkBuilder.prototype.getEncodedValues = function () {
    for (var key in this.params) {
        retStr += "" + utils.urlencode(this.params[key]) + "";
    }
    return retStr;
} // getEncodedValues

////////////////////////////////////////////////////////////////////
//
// debugPrint() - this function prints all the key value pairs from
//                the perameter array
// return : string
//
////////////////////////////////////////////////////////////////////
//
LinkBuilder.prototype.debugPrint = function () {
    utils.print_r(this.params);
} // end debugPrint
// end LinkBuilder
module.exports = LinkBuilder;
