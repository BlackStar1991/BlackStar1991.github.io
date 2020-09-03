function getQueryData() {
    var data = {};
    var mirrorParam = 'forward';
    var query = window.location.search;
    
    if (query.indexOf(mirrorParam) > -1) {
        var vars = query.split('&');
        
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0].indexOf(mirrorParam) > -1) {
                data.mirror = atob(decodeURIComponent(pair[1]));
                vars.splice(i, 1);
                continue;
            }
        }

        data.params = vars.join('&');
        if (data.mirror === undefined || data.mirror == '') {
            data.mirror = casino_url;
        }

    }
    else {
        data.mirror = casino_url;
        data.params = query;
    } 
    
    if (data.params != '' && data.params[0] !== '?') {
        data.params = '?' + data.params;
    }

    return data;
}


$(document).ready(function() {
sendVisit();
try {
	var data = getQueryData();
	var mirror = data.mirror;
	var getParams = data.params;

	$("form").each(function(id,form){

		var action = $(this).attr('action');
		var page = casino_pages[action];
		var url;

		if (page == undefined)
			url = mirror+"/";
		else
			url = mirror+page;

		$(form).attr('action',url+getParams);

	});

	$("a").each(function(id,obj){

		var _event = $._data(obj, 'events');
		if ($.type(_event) == "object" && _event.click) return;

		var href = $(this).attr('href');
		var page = casino_pages[href];
		var url;
console.log(page);
		if (page == undefined)
			url = mirror+"/";
		else
			url = mirror+page;
			
		$(this).attr('href',url+getParams)

	});

} catch (err) {
	console.log(err);
	$("body").fadeOut(1500,function(){alert(err.message)});
}
});


//-------------

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars  = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == variable) {return pair[1];}
	}
	return (false);
}
var Hashids = function () {
	"use strict";
	function Hashids(salt, minHashLength, alphabet) {
		var uniqueAlphabet, i, j, len, sepsLength, diff, guardCount;
		this.version             = "1.0.2";
		this.minAlphabetLength   = 16;
		this.sepDiv              = 3.5;
		this.guardDiv            = 12;
		this.errorAlphabetLength = "error: alphabet must contain at least X unique characters";
		this.errorAlphabetSpace  = "error: alphabet cannot contain spaces";
		this.alphabet            = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		this.seps                = "cfhistuCFHISTU";
		this.minHashLength       = parseInt(minHashLength, 10) > 0 ? minHashLength : 0;
		this.salt                = typeof salt === "string" ? salt : "";
		if (typeof alphabet === "string") {this.alphabet = alphabet}
		for (uniqueAlphabet = "", i = 0, len = this.alphabet.length; i !== len; i++) {if (uniqueAlphabet.indexOf(this.alphabet.charAt(i)) === -1) {uniqueAlphabet += this.alphabet.charAt(i)}}
		this.alphabet = uniqueAlphabet;
		if (this.alphabet.length < this.minAlphabetLength) {throw this.errorAlphabetLength.replace("X", this.minAlphabetLength)}
		if (this.alphabet.search(" ") !== -1) {throw this.errorAlphabetSpace}
		for (i = 0, len = this.seps.length; i !== len; i++) {
			j = this.alphabet.indexOf(this.seps.charAt(i));
			if (j === -1) {this.seps = this.seps.substr(0, i) + " " + this.seps.substr(i + 1)} else {this.alphabet = this.alphabet.substr(0, j) + " " + this.alphabet.substr(j + 1)}
		}
		this.alphabet = this.alphabet.replace(/ /g, "");
		this.seps     = this.seps.replace(/ /g, "");
		this.seps     = this.consistentShuffle(this.seps, this.salt);
		if (!this.seps.length || this.alphabet.length / this.seps.length > this.sepDiv) {
			sepsLength = Math.ceil(this.alphabet.length / this.sepDiv);
			if (sepsLength === 1) {sepsLength++}
			if (sepsLength > this.seps.length) {
				diff          = sepsLength - this.seps.length;
				this.seps += this.alphabet.substr(0, diff);
				this.alphabet = this.alphabet.substr(diff)
			} else {this.seps = this.seps.substr(0, sepsLength)}
		}
		this.alphabet = this.consistentShuffle(this.alphabet, this.salt);
		guardCount    = Math.ceil(this.alphabet.length / this.guardDiv);
		if (this.alphabet.length < 3) {
			this.guards = this.seps.substr(0, guardCount);
			this.seps   = this.seps.substr(guardCount)
		} else {
			this.guards   = this.alphabet.substr(0, guardCount);
			this.alphabet = this.alphabet.substr(guardCount)
		}
	}

	Hashids.prototype.encode            = function () {
		var ret = "", i, len, numbers = Array.prototype.slice.call(arguments);
		if (!numbers.length) {return ret}
		if (numbers[0] instanceof Array) {numbers = numbers[0]}
		for (i = 0, len = numbers.length; i !== len; i++) {if (typeof numbers[i] !== "number" || numbers[i] % 1 !== 0 || numbers[i] < 0) {return ret}}
		return this._encode(numbers)
	};
	Hashids.prototype.decode            = function (hash) {
		var ret = [];
		if (!hash.length || typeof hash !== "string") {return ret}
		return this._decode(hash, this.alphabet)
	};
	Hashids.prototype.encodeHex         = function (str) {
		var i, len, numbers;
		str = str.toString();
		if (!/^[0-9a-fA-F]+$/.test(str)) {return ""}
		numbers = str.match(/[\w\W]{1,12}/g);
		for (i = 0, len = numbers.length; i !== len; i++) {numbers[i] = parseInt("1" + numbers[i], 16)}
		return this.encode.apply(this, numbers)
	};
	Hashids.prototype.decodeHex         = function (hash) {
		var ret = [], i, len, numbers = this.decode(hash);
		for (i = 0, len = numbers.length; i !== len; i++) {ret += numbers[i].toString(16).substr(1)}
		return ret
	};
	Hashids.prototype._encode           = function (numbers) {
		var ret, lottery, i, len, number, buffer, last, sepsIndex, guardIndex, guard, halfLength, excess, alphabet = this.alphabet, numbersSize = numbers.length, numbersHashInt = 0;
		for (i = 0, len = numbers.length; i !== len; i++) {numbersHashInt += numbers[i] % (i + 100)}
		lottery = ret = alphabet.charAt(numbersHashInt % alphabet.length);
		for (i = 0, len = numbers.length; i !== len; i++) {
			number   = numbers[i];
			buffer   = lottery + this.salt + alphabet;
			alphabet = this.consistentShuffle(alphabet, buffer.substr(0, alphabet.length));
			last     = this.hash(number, alphabet);
			ret += last;
			if (i + 1 < numbersSize) {
				number %= last.charCodeAt(0) + i;
				sepsIndex = number % this.seps.length;
				ret += this.seps.charAt(sepsIndex)
			}
		}
		if (ret.length < this.minHashLength) {
			guardIndex = (numbersHashInt + ret[0].charCodeAt(0)) % this.guards.length;
			guard      = this.guards[guardIndex];
			ret        = guard + ret;
			if (ret.length < this.minHashLength) {
				guardIndex = (numbersHashInt + ret[2].charCodeAt(0)) % this.guards.length;
				guard      = this.guards[guardIndex];
				ret += guard
			}
		}
		halfLength = parseInt(alphabet.length / 2, 10);
		while (ret.length < this.minHashLength) {
			alphabet = this.consistentShuffle(alphabet, alphabet);
			ret      = alphabet.substr(halfLength) + ret + alphabet.substr(0, halfLength);
			excess   = ret.length - this.minHashLength;
			if (excess > 0) {ret = ret.substr(excess / 2, this.minHashLength)}
		}
		return ret
	};
	Hashids.prototype._decode           = function (hash, alphabet) {
		var ret = [], i = 0, lottery, len, subHash, buffer, r = new RegExp("[" + this.guards + "]", "g"), hashBreakdown = hash.replace(r, " "), hashArray = hashBreakdown.split(" ");
		if (hashArray.length === 3 || hashArray.length === 2) {i = 1}
		hashBreakdown = hashArray[i];
		if (typeof hashBreakdown[0] !== "undefined") {
			lottery       = hashBreakdown[0];
			hashBreakdown = hashBreakdown.substr(1);
			r             = new RegExp("[" + this.seps + "]", "g");
			hashBreakdown = hashBreakdown.replace(r, " ");
			hashArray     = hashBreakdown.split(" ");
			for (i = 0, len = hashArray.length; i !== len; i++) {
				subHash  = hashArray[i];
				buffer   = lottery + this.salt + alphabet;
				alphabet = this.consistentShuffle(alphabet, buffer.substr(0, alphabet.length));
				ret.push(this.unhash(subHash, alphabet))
			}
			if (this._encode(ret) !== hash) {ret = []}
		}
		return ret
	};
	Hashids.prototype.consistentShuffle = function (alphabet, salt) {
		var integer, j, temp, i, v, p;
		if (!salt.length) {return alphabet}
		for (i = alphabet.length - 1, v = 0, p = 0; i > 0; i--, v++) {
			v %= salt.length;
			p += integer = salt.charAt(v).charCodeAt(0);
			j        = (integer + v + p) % i;
			temp     = alphabet.charAt(j);
			alphabet = alphabet.substr(0, j) + alphabet.charAt(i) + alphabet.substr(j + 1);
			alphabet = alphabet.substr(0, i) + temp + alphabet.substr(i + 1)
		}
		return alphabet
	};
	Hashids.prototype.hash              = function (input, alphabet) {
		var hash = "", alphabetLength = alphabet.length;
		do {
			hash  = alphabet.charAt(input % alphabetLength) + hash;
			input = parseInt(input / alphabetLength, 10)
		} while (input);
		return hash
	};
	Hashids.prototype.unhash            = function (input, alphabet) {
		var number = 0, pos, i;
		for (i = 0; i < input.length; i++) {
			pos = alphabet.indexOf(input[i]);
			number += pos * Math.pow(alphabet.length, input.length - i - 1)
		}
		return number
	};
	if (typeof define === "function" && typeof define.amd === "object" && define.amd) {define(function () {return Hashids})}
	return Hashids
}();

function sendVisit() {

	var apiUrl = '/proxy/visit.php';

	var hashids = new Hashids();
	var refcode = getQueryVariable('refcode');
	var numbers = hashids.decode(refcode);

	if (Array.isArray(numbers) == false || numbers[0] == undefined || numbers[1] == undefined) {
		console.log("Refcode not decoded");
		return (false);
	}

	$.ajax({
		url: apiUrl + '?refcode=' + numbers[1],
	});
	
};





