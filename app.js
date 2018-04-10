var pbkdf2 = require('pbkdf2')
var sha256 = require ('sha256')
var scrypt = require('scryptsy')
var bitcoin = require('bitcoinjs-lib')
var bigi = require('bigi')
var readline = require('readline-sync')

var salt = readline.question('please enter your email: ');
var password = readline.question('please enter your password: ');


var s1 = scrypt(password+ "\x01", salt+ "\x01", 262144, 8, 1, 32);
var s2 = pbkdf2.pbkdf2Sync(password+"\x02", salt+"\x02", 65536, 32, 'sha256')
var s1bigi = bigi.fromHex(s1.toString('hex'));
var s2bigi = bigi.fromHex(s2.toString('hex'));

console.log("scrypt hash: " + s1.toString('hex'));
console.log("pbkdf2 hash: " + s2.toString('hex'));

var XORed = s1bigi.xor(s2bigi);

console.log("xor function (in hexadecimahl format): "+ XORed);


var keypair = new bitcoin.ECPair(XORed,null,{'compressed':false});


console.log("private:      "+ keypair.toWIF());
