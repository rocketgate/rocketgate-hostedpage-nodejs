

////////////////////////////////////////////////////////////////////
//  
// trim() - function: This function returns a string with whitespace stripped
//          from the beginning and end of str.
// 
//////////////////////////////////////////////////////////////////// 
exports.trim = function (s) {
  var ws = ' \t\n\r\0\x0B';
  var p = 0, n = s.length;
  
  while ((p < n) && (ws.indexOf(s.charAt(p)) != -1)) {
    ++p;
  }
  
  while ((n > p) && (ws.indexOf(s.charAt(n - 1)) != -1)) {
    --n;
  }
  
  return s.substr(p, n);
};

////////////////////////////////////////////////////////////////////
//
// urlencode() - function: URL-encodes string
//
////////////////////////////////////////////////////////////////////
exports.urlencode = function (str) {
  return encodeURIComponent(str + '')
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');

};

////////////////////////////////////////////////////////////////////
//
// preg_match() - function: Perform a regular expression match
//
////////////////////////////////////////////////////////////////////
exports.preg_match = function (pattern, s, matches) {
  var mod = '';
  
  if ((pattern.charAt(0) == '/') || (pattern.charAt(0) == '@')) {
    var n = pattern.lastIndexOf(pattern.charAt(0));
    
    if (n != 0) {
      pattern = pattern.substring(1, n);
      mod = pattern.substring(n + 1);
    }
  }
  var rx = new RegExp(pattern, mod);
  
  if (!(matches instanceof Array)) {
    matches = [];
  }
  matches[0] = rx.exec(s);
  
  return (matches[0] === null) ? 0 : 1;
};

////////////////////////////////////////////////////////////////////
//
// array_key_exists() - function: Checks if the given key 
//                      or index exists in the array
//
////////////////////////////////////////////////////////////////////
exports.array_key_exists = function (key, search) {
  if (!search || (search.constructor !== Array && search.constructor !== Object)) {
    return false
  }

  return key in search
};

////////////////////////////////////////////////////////////////////
//
// strtolower() function: — Make a string lowercase
//
////////////////////////////////////////////////////////////////////
exports.strtolower = function (str) {
  return (str + '')
    .toLowerCase()
};

////////////////////////////////////////////////////////////////////
//
// print_r() - funcyion: Prints human-readable information about a variable
//
////////////////////////////////////////////////////////////////////
exports.print_r = function (obj) {

  console.log('Array\n{');
       for(var key in obj) {
               console.log('\t[' + key + '] => ' + obj[key]);
       }
       console.log('}');
};
