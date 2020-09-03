var _visitor_iso = "de", _iso_countries= {"UA":"+380","RU":"+7","BY":"+375","AM":"+374","AZ":"+994","BG":"+359","GE":"+995","CZ":"+420","EE":"+372","IL":"+972","KG":"+996","LV":"+371","LT":"+370","MD":"+373","PL":"+48","SI":"+386","TJ":"+992","TM":"+993","UZ":"+998","KZ":"+77"},_iso_countries_sm=['kz','uz','tm','tj','si','pl','md','lt','lv','kg','il','ee','cz','ge','bg','az','am','by','ru','ua'];

function removePhoneField(telInput) {

    if (telInput.attr('data-intlphone') == 'removed')
        return true;
    telInput.intlTelInput('destroy');

    telInput.attr('type','email');
    telInput.attr('data-intlphone', 'removed');
    telInput.attr('placeholder',telInput.attr('data-placeholder'));
    telInput.val('');
    telInput.focus();
    return true;
}
function initPhoneField(telInput, initCountry = 'ua') {

    if (telInput.attr('data-intlphone') == 'inited')
        return true;

    telInput.attr('data-intlphone', 'inited');


    telInput.attr('data-placeholder',telInput.attr('placeholder'));

    telInput.attr('placeholder', '');
    telInput.val('');
    telInput.attr('type','tel');

    var that = telInput.intlTelInput({
        onlyCountries: _iso_countries_sm,
        initialCountry: initCountry,//'auto',
        preferredCountries: ['ru', 'ua'],
        autoHideDialCode: false,
        separateDialCode: false,
        nationalMode: false,
        utilsScript: "/ljs/intelphone/js/utils.js",
      //  geoIpLookup: function (callback) {$.get('https://ipinfo.io', function () {}, "jsonp").always(function (resp) {var countryCode = (resp && resp.country) ? resp.country : "";callback(countryCode);});}
    });

    telInput.focus();

// 	telInput.on("keypress, keydown", function (event) {
// 		console.log(that);
// 		var selectedDailCode = "+" + that.selectedCountryData.dialCode + "- ";
// 		var readOnlyLength = selectedDailCode.length;
// 		if (that.telInput.val().charAt(0) == "+") {
// 			if ((event.which != 37 && (event.which != 39))
// 				&& ((this.selectionStart < readOnlyLength)
// 				|| ((this.selectionStart == readOnlyLength) && (event.which == 8)))) {
// 				this.selectionStart = readOnlyLength;
// 				return false;
// 			}
// 		}
// //that._updateFlagFromNumber(that.telInput.val());
// 	});

    telInput.on("keyup change", function (e) {

        // if (this.value.match(/[^0-9+#*]/g)) {
        //     this.value = this.value.replace(/[^0-9+#*]/g, '');
        // }

        if (telInput.attr('data-intlphone') !== 'inited')
            return;

        if (e.keyCode == 8)
            return true;

        formatedValue = telInput.intlTelInput("getNumber", intlTelInputUtils.numberFormat.INTERNATIONAL);


        if (formatedValue == '[object Object]') {
            return true;
        }

        formatedValue = formatedValue.replace(/-/g, " ");

        telInput.val(formatedValue);
    });






}

