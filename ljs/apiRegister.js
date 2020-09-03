var _privateQueryData;
// возвращает массив из двух элементов
// 1 элемент - url ротатора зеркал (или из GET параметра или дефолтный из getDefaultMirrorUrl)
// 2 элемент - GET параметры без mirror_url
function getQueryData(appName) {
	console.log(_privateQueryData);
    if (typeof(_privateQueryData) !== 'undefined') {
        return _privateQueryData;
    }
    
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
            data.mirror = getDefaultMirrorUrl(appName);
        }

    }
    else {
        data.mirror = getDefaultMirrorUrl(appName);
        data.params = query;
    } 
    if (data.params.length > 0 && data.params[0] !== '?') {
        data.params = '?' + data.params;
    }

    _privateQueryData = data;

    return data;
}

// возвращает дефолтный url для ротатора зеркал, на случай, если его нет в GET параметрах
function getDefaultMirrorUrl(appName) {
    var mirrors = {
        'king': 'http://kg.searchmirrors.com',
        'netgame': 'http://ng.searchmirrors.com',
        'vulkan': 'http://vo.searchmirrors.com',
        'reel': 'http://reelem.blogostok.com'
    };

    return mirrors[appName];
}

function remoteAuthorization(event, appName, validationFields, route){
	// appName название приложения ('king', 'netgame' или 'vulkan')
	// event событие клика
	// массив названий полей для валидации. Доступные поля: ['Contact', 'Password', 'Currency', 'Agree']. Необходимо указать те поля, которые хотим валидировать.

	var url = '/proxy/index.php'; // url для ajax запроса
	var queryData = getQueryData(appName);
	var mirrorsUrl = queryData.mirror; // url ротатора зеркал
	var refcode = queryData.params; // рефкод и другие GET параметры для проброса на приложение
	var redirectRout = route; // роут для приложения. После проброса на приложение, юзер будет перенаправлен на указанный здесь путь
	if (redirectRout === undefined) {
		redirectRout = '/profile/dashboard/';
	}
	var eventType = event.target.id[0].toUpperCase() + event.target.id.substr(1);

	hideErrors(eventType);
	if (validateForm(validationFields, eventType)) {
		makeRequest(url, appName, refcode, eventType, mirrorsUrl, redirectRout);
	}

}

function remoteLoginSocial(event, appName) {
	var queryData = getQueryData(appName);
	var mirrorsUrl = queryData.mirror; // url ротатора зеркал
	var refcode = queryData.params; // рефкод и другие GET параметры для проброса на приложение
	var provider = event.target.id;
	console.log(queryData);
	$.when(getMirrorsList(mirrorsUrl)).then(function(list){
		mirrors = $.parseJSON(list);
		socialRequest(event, mirrors, refcode, provider);
	});
	
}

function makeRequest(url, appName, refcode, eventType, urlToMirrorsApp, redirectRout){
	showPopup(true);
	var typeOfForm = eventType;
	eventType = eventType.toLowerCase();
	$.ajax({
		    type: 'POST',
		    dataType: 'json',
		    url: createUrl(url, refcode, appName, eventType),
		    data: $('#'+ typeOfForm +'Form').serialize(),
		    success: function(data){
			    if (data.success == true) {
			    	showPopup(false);
			    	var token = '';
			    	if (data.message !== false) {
			    		var separator = redirectRout.indexOf('?') > -1 ? '&' : '?';
			    		token = separator + 'aa=' + data.message;
			    	}
			    	var utm = getUtmMetrics();
			    	//console.log('http://stage.slotoking.com' + redirectRout + token + utm);
			    	// document.location.replace('http://stage.slotoking.com' + redirectRout + token + utm);
		            document.location.replace(urlToMirrorsApp + redirectRout + token + utm);
		        }
		        else if (data.success == false) {
		    	    showPopup(false);
		    	    if (typeof(data.message) == 'object') {
		    	    	for (var i in data.message) {
		              		var selector = $('#' + eventType + '-' + i + '-error');
		              		var errorMessage;
		              		if (typeof(getTextForReplace) === "function") {
		              			errorMessage = getTextForReplace(data.message[i][0]);
		              		}
		              		else{
		              			errorMessage = data.message[i][0];
		              		}

		              		selector.html(errorMessage).show();
		            	}
		    	    }
		    	    else {
		    	    	console.log(data);
		    	    	showDomainError(eventType);
		    	    }
		        }
		    },
		    error: function(data){
		    	console.log(data.message);
		    	showPopup(false);
		    	showDomainError(eventType);
		    }
		});
}

function getMirrorsList(mirrorsUrl){
    return $.ajax({
      type: 'GET',
      url: mirrorsUrl +'/mirrors/',
  	});
}

function socialRequest(data, mirrors, refcode, provider){
	showPopup(true);

	if (mirrors.length < 1) {
		showPopup(false);
		showDomainError('register');
		return;
	}

	var url = mirrors.shift();

	var pingUrl = createPingUrl(url);
		
	$.ajax({
		dataType: 'json',
		url: pingUrl,
		success: function(res){
			if (res.ping == 'ok') {
				document.location.href = url + '/remoteSocial/' + provider + '/' + refcode;
			} else {
				socialRequest(data, mirrors, refcode);
			}
		},
		error: function(){
			socialRequest(data, mirrors, refcode);
		}
		
	});
		
}

function createPingUrl(url){
	return url + '/ping/?' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)+'='+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 4);
}

function createUrl(url, refcode, appName, scenario) {
	if (refcode !== "") {
		return url + refcode + '&appName=' + appName + '&scenario=' + scenario;
	}
	return url + '?appName=' + appName + '&scenario=' + scenario;
}

function hideErrors(typeOfForm) {
	var errors = $('#'+typeOfForm+'Form *');
	errors.each(function(){
		$('.error').hide();
	})
} 

function showDomainError(eventType) {
	$('#'+ eventType +'-domain-error').text('Сервис временно не доступен. Попробуйте позже').show();
}

function showPopup(load) {
	var popup = $('.popup-loader');
	load ? popup.fadeIn(300) : popup.fadeOut(300);
}

// -------- client validation ------


function validateEmail(data, scenario, form){
		var email = data.val();
	    var re =/^[\w\.\d-_`]+@[\w\.\d-_]+\.\w{2,4}$/i;
	    var errorElement = $('#'+ scenario +'-'+ form +'-error')
	    if (email == '') {
	    	errorElement.text('Укажите Ваш email').show();
	    	return false;
	    }
	    else if (!re.test(email)) {
	    	errorElement.text('Email введен неверно').show();
	    	return false;
	    }
	    return true;
	}

function validatePhone(data, scenario, form){
		var errorElement = $('#'+ scenario +'-'+ form +'-error')
		if (data.val().length <= 4) {
	    	errorElement.text('Укажите Ваш телефон').show();
	    	return false;
	    }
	    else if (data.val().length < 15 || data.val().length > 18) {
	    	errorElement.text('Телефон введен неверно').show();
	    	return false;
	    }
	    return true;
	}

function validateContact(scenario){
		var contact;
		var scenar = scenario.toLowerCase();
		var formType;
		if (scenar == 'register') {
			contact = $('#RegisterForm_contact');
			formType = 'contact';
		}
		else if (scenar == 'login') {
			contact = $('#LoginForm_login');
			formType = 'login';
		}
		if (contact.attr('type') == 'email') {
			return this.validateEmail(contact, scenar, formType);
		}
		else if (contact.attr('type') == 'tel') {
			return this.validatePhone(contact, scenar, formType);
		}
		console.log('Can\'t validate contact/login field. See function "validateContact" in apiRegister.js');
		return false;
	}

function validatePassword(scenario){
		var pass = $('#'+ scenario +'Form_password').val();
		var formType = scenario.toLowerCase();
		var errorElement = $('#'+ formType +'-password-error');
		if (pass == '') {
			errorElement.text('Введите пароль').show();
			return false;
		}
		else if (pass.length < 6) {
			errorElement.text('Пароль слишком короткий (Минимум: 6 симв.).').show();
			return false;
		}
		return true;
	}

function validateCurrency(scenario){
		if ($('.checkboxes input:radio:checked').length > 0){
			return true;
		} else {
			$('#register-currency-error').show();
		 	return false;
		}
	}

function validateAgree(scenario){
		if(!$("#agree").is(":checked")) { 
			$('#register-agree-error').show();
			return false;
		}
		return true;
	}

function validateForm(params, eventType){
		for (var i = 0; i < params.length; i++) {
			var res = this['validate' + params[i]](eventType);
			if (res === false) {
				return false;
			}
		}
		return true;
	}

function getUtmMetrics(){
    var network = 'network_id';
    var partner = 'partner_id';
    var metrics = [];
    var query = window.location.search;
    if (query.indexOf(network) > -1 && query.indexOf(partner) > -1) {
        query.split('&').forEach(function(item, i, arr){
            var param = item.split('=');
            if (param[0].indexOf(network) > -1) {
                metrics.push('utm_source=' + param[1]);
            }
            else if (param[0].indexOf(partner) > -1) {
                metrics.push('utm_campaign=' + param[1]);
            }
        });

        metrics.push('utm_medium=cpc');
        metrics = '&' + metrics.join('&');
    }

    return metrics.length > 0 ? metrics : '';
}

function passwordGenerator(len){
   var ints =[0,1,2,3,4,5,6,7,8,9]; 
   var chars=['a','b','c','d','e','f','g','h','j','k','l','m','n','o','p','r','s','t','u','v','w','x','y','z'];
    var out='';
    for(var i=0;i<len;i++){
        var ch=Math.random(1,2);
        if(ch<0.5){
           var ch2=Math.floor(Math.random(1,ints.length)*10);
           out+=ints[ch2];
        }else{
           var ch2=Math.floor(Math.random(1,chars.length)*10);
           out+=chars[ch2];            
        }
    }
    return out;
}
