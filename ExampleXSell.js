//
// Copyright notice:
// (c) Copyright 2019 RocketGate
// All rights reserved.
//
// The copyright notice must not be removed without specific, prior
// written permission from RocketGate.
//
// This software is protected as an unpublished work under the U.S. copyright
// laws. The above copyright notice is not intended to effect a publication of
// this work.
// This software is the confidential and proprietary information of RocketGate.
// Neither the binaries nor the source code may be redistributed without prior
// written permission from RocketGate.
//
// The software is provided "as-is" and without warranty of any kind, express, implied
// or otherwise, including without limitation, any warranty of merchantability or fitness
// for a particular purpose.  In no event shall RocketGate be liable for any direct,
// special, incidental, indirect, consequential or other damages of any kind, or any damages
// whatsoever arising out of or in connection with the use or performance of this software,
// including, without limitation, damages resulting from loss of use, data or profits, and
// whether or not advised of the possibility of damage, regardless of the theory of liability.
//
// Purpose: This page uses the LinkBuilder util to build links to RG join pages
//             
//

////////////////////////////////////////////////////////////////////////////////////
// 
//  Purpose: This page uses the LinkBuilder util to build links to RG join pages
// 
////////////////////////////////////////////////////////////////////////////////////

// 
// Include requited Classes
//
'use strict';
const utils = require('./rg_util');
const config = require('./rg_config');
var LinkBuilder = require('./LinkBuilder');

//
// These values must always be set.
//
var urlStuff = new LinkBuilder('hashsecret');

if(urlStuff === null){
    process.exit('object is null');
}

// 
// Set Test parameters to creat link
//
var time = config.uniqueTimeStamp();

urlStuff.Set('time', time);
urlStuff.Set('id', 'Customer-012345');
urlStuff.Set('merch', '1');
urlStuff.Set('amount', '1.99');
urlStuff.Set('invoice', '012345');
urlStuff.Set('fname', 'John');
urlStuff.Set('lname', 'Doe');
urlStuff.Set('address', '123 Main St.');
urlStuff.Set('city', 'Woodridge');
urlStuff.Set('state', 'IL');
urlStuff.Set('zip', '60517');
urlStuff.Set('country', 'US');

urlStuff.Set("xsell1", "1:4b3cadb121bd77c6642910d7ff929d79:411:0:4b3cadb121bd77c6642910d7ff929d79:1:USD:14.99:30:2::add US$ 1.00 for a 2 day membership to xy.com recurring at US$ 34.95 every 1 month:X_30_2");

//
// this is required for a credit card transaction
//
urlStuff.Set('method','CC');
urlStuff.Set('purchase', 'true');

//
// Get the encoded portion of the link
//
var str = urlStuff.Encode();

var link = config.RG_LINK() + str;
console.log('link: ' + link);

urlStuff.debugPrint()
