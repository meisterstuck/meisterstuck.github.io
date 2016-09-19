var $r = jQuery.noConflict();

//AJAX Start
//Added by soemon 20160122
var SISTIC_API_ContextPath = '/VCLTicketing/';

function act_resetLogin() {
	$r("#email").val("");
	$r("#pw").val("");
}

function act_resetRetrievePW() {
	$r("#retrieve").val("");
	$r("#secretAnswer1").val("");
	$r("#secretAnswer2").val("");
}

function act_resetRegistration() {
	$r("#newemail").val("");
}


function invokeApplication() {
    $r("input:submit,input:checkbox,select.date,select.nat,select.question").uniform();    
	
	$r("a#loginLink").click(function(){
		showLightBox();
		$r("#modallogincontainer").slideDown('fast');
	});

    $r("a.closebox").click(function(){
		//updated by shenghou 20130514
		if(fromAddToCart == 1) {
			fromAddToCart = 0;
		}
        $r("#modallogincontainer").hide();
        hideLightBox();
		
		//13-09-2012 Added by webster - newbookflow, addon
		cleanApplicationFields();
        return false;
    });

    $r("a.retrieve").click(function(){
        $r("div.retrieveblock").slideToggle("fast");
        return false;
    });  

    $r("#div_id_passwordsent_close").live('click', function() { 
        try
        {
          $r("#div_id_passwordsent_container").hide();
          hideLightBox();
        }
        catch(e)
        {}
        
        return false;
    });
	
	$r("a#updatesubcribe").click(function(){
	  var result = false;
	  
	  result = updateSubcribe();
      return result;
    });

    $r("form#createaccount").submit(function(){
    	$r(".errormsg").text('');
		$r("li.error").removeClass("error");
		act_resetLogin();
		act_resetRetrievePW();
		
        var nemail = $r("input[name=newemail]").val();
        if (nemail != "") {
          $r(this).find(".loader").show();
		  isEmailRegister();			
		  $r(this).find(".loader").hide();
        }else{
		  mandatoryFieldValidation("newemail", document.getElementById("ml_email").value, "err_newemail")
		}
        return false;
    });	
	
	$r("form#loginform").submit(function(){
		$r(".errormsg").text('');
		$r("li.error").removeClass("error");
		act_resetRegistration();
		act_resetRetrievePW();
		
		var result = true;
		result = patronAuthenticateSubmit();
        if (result) {
          $r(this).find(".loader").show();		  
		  userAuthenticate();			
		  //$r(this).find(".loader").hide();
        }
        return false;
    });	
	/*
	$r("form#forgotPwForm").submit(function(){
		$r(".errormsg").text('');
		$r("li.error").removeClass("error");
		act_resetLogin();
		act_resetRegistration();
		
		var result = true;		
		result = patronForgotPasswordSubmit();
				
        if (result) {
          $r(this).find(".loader").show();	
       
		  retrievePassword();			
		  $r(this).find(".loader").hide();
        }
        return false;
    });	
    */
	$r(".continue").click(function(){
			$r(".errormsg").text('');
			$r("li.error").removeClass("error");
			act_resetLogin();
			act_resetRegistration();
			
			var result = true;		
			result = patronForgotPasswordSubmit();
					
	        if (result) {
	        
			  retrievePassword();	
			 
			 
	        }
	       // $r(".loaderForget").hide();
	        return false;
	});	

    $r("a#closeapp").click(function(){
    	$r(".errormsg").text('');
		$r("li.error").removeClass("error");
		
        $r("#contentwrapper").hide();
        hideLightBox();
        return false;
    });

}

var fromAddToCart = 0;
var fromBooking = 0;
function logincomplete(fullName, logOutUrl) {
  //Login success hide all div
  $r("#modallogincontainer").hide();
  //$r("#contentwrapper").hide();
  hideLightBox();
  var loginHtml = "<form method='POST' action='"+logOutUrl+"'>\n" + 
                  "Hi "+fullName+", <input type='submit' class='hButton' value='Sign Out'>\n" +
				  "</form>" +
				  "&nbsp;&nbsp;&nbsp;<a href=\""+SISTIC_API_ContextPath+"manageUser.do\">Manage Account</a>";
  $r("span#patronProfileMenu").html(loginHtml);

  var currentpath = window.location.pathname;
  if (currentpath != null) {
	  if (currentpath.indexOf("Registration.do") !== -1) {
		  //VCLTicketing	  	window.location.href = SISTIC_API_ContextPath + "manageUser.do";
		return;
  	  }
  }
  updateLoginBar('true',fullName);
  
  if (fromBooking == 1) {
  	$r("#loginBar").hide();
  }else if(fromAddToCart ==1) {
	checkCart("");
	//window.location.href = SISTIC_API_ContextPath + "shoppingCart.do";
  } else {
  	document.location.reload();
  }
}

function retrievepwdcomplete(retrieveemail){

	$r("#modallogincontainer").hide("fast", function(){
		$r("a#success_retrievepwd").html(retrieveemail);
		
		if($r("div#div_id_passwordsent_container").css('display') == 'none'){
			$r("div#div_id_passwordsent_container").slideToggle("fast");
		}
		$r("div#div_id_passwordsent_container").css("display","block");

		var scrolltoph3 = $r(window).scrollTop();
  		//$r('div#div_id_passwordsent_container').css('top', scrolltoph3-100+'px');
		$r('div#div_id_passwordsent_container').css('top', scrolltoph3+'px');
		
		/*
		$r("input[name=retrieve]").val("");
		$r("input[name=secretQuestion1]").val("");
		$r("#label_secretQuestion1").html("");	
		$r("input[name=secretQuestion2]").val("");
		$r("#label_secretQuestion2").html("");
		$r("input[name=secretAnswer1]").val("");
		$r("input[name=secretAnswer2]").val("");
		$r("span#secretQuestionSection").hide();	
		$r("input[name=retrieve]").removeAttr("readonly");  	
		*/
	});	
}

function fillupSecretQnA(retrieveemail, sq1, sq2){
	$r("input[name=retrieve]").val(retrieveemail);
	$r("input[name=retrieve]").attr("readonly","readonly"); 
	$r("input[name=secretQuestion1]").val(sq1);
	$r("#label_secretQuestion1").html(sq1);
	$r("input[name=secretQuestion2]").val(sq2);
	$r("#label_secretQuestion2").html(sq2);
	$r("span#secretQuestionSection").slideDown('slow');
}

function displaysecreterror(){
	$r("#err_secret1").html("");
	$r("#err_secret").parents().addClass("error");
}

//Function to show lightbox
function showLightBox(){
  var lightboxContainer = $r('<div id="modallightbox"></div>');
  $r('#content').append(lightboxContainer);
  $r('#contentwrapper').css('z-index','202');
  $r('#content').css('z-index','201');
  $r('body').css('z-index','200');
  
  var bodyheight = $r(window).height();
  var scrolltoph = $r('body').outerHeight();
  lightboxContainer.css('height', bodyheight + scrolltoph);
  lightboxContainer.css('opacity', 0.7);
} 

//Function for activating hidingLightbox
function hideLightBox() {
  $r('#modallightbox').remove();
} 


String.prototype.trim = function () {
	return this.replace(/(^[\s]+|[\s]+$r)/g, '');
}

function checkPwdStrength(pwdFieldId, pwdMeter) {
	var pwdElement = document.getElementById(pwdFieldId);
	var pwdMeterTable = document.getElementById(pwdMeter);
	var result = false;
	
	var password = pwdElement.value;			
	
	var score   = -1;	 
	//if password has both lower and uppercase characters 
	if( ( password.match(/[a-z]/) ) || ( password.match(/[A-Z]/) ) ) score++;
	 
	//if password has at least one number
	if(password.match(/\d+/)) score++;

	//if password has at least one special caracther
	if( password.match(/.[!,@,#,$r,%,^,&,*,?,_,~,-,<,>,;,:,\/,\",\',\{,\},\[,\],\-,+,=,`,.,(,)]/) ) score++;			
	
	if(score>-1) {
		result = true;
		populatePwdMeter(pwdMeter, score);
	}else{
		populatePwdMeter(pwdMeter, -1);
	}
	
	return result;
}

function populatePwdMeter(pwdMeter, score){
	var pwdMeterTable = document.getElementById(pwdMeter);
	var pwdMeterScore = document.getElementById('pwdMeterScore');
	var desc = new Array();
	desc[0] = "Weak";
	desc[1] = "Fair";
	desc[2] = "Strong";

	pwdMeterScore.value = desc[score];
	for(i=0;i<4;i++){				
		if(score == i)
			pwdMeterTable.rows[0].cells[i].innerHTML = desc[score];
		else
			pwdMeterTable.rows[0].cells[i].innerHTML = "";
		
		if(i<=score)
			pwdMeterTable.rows[0].cells[i].className = desc[score];
		else
			pwdMeterTable.rows[0].cells[i].className = "";
	}
}

function reloadCaptcha(id) {
	var obj = document.getElementById(id);
	var src = obj.src;
	var pos = src.indexOf('?');
				
	if (pos >= 0) {
		src = src.substr(0, pos);
	}
	
	var date = new Date();
	obj.src = src + '?v=' + date.getTime();
	return false;
}


function mandatoryFieldValidation(mandatoryFieldId, mandatoryFieldName, errorEle){

	if(errorEle !=null){
		var element = document.getElementById(mandatoryFieldId);
										
		if(element!=null && element.value.length == ""){
			var element2 = document.getElementById(errorEle);	
			//14-09-2012 Updated by webster - newbookflow, addon
			element2.innerHTML = document.getElementById("ml_valid_1").value + mandatoryFieldName;
			return false;
		}
	}
	return true;			
}

function mandatoryDropDownValidation(mandatoryFieldId, mandatoryFieldName, errorEle){
	if(errorEle !=null){
		var element = document.getElementById(mandatoryFieldId);
							
		if(element.options!=null && element.options.length > 0 &&
			element.options[element.selectedIndex].value == ""){
								
			var element2 = document.getElementById(errorEle);			
			//14-09-2012 Updated by webster - newbookflow, addon
			element2.innerHTML = "Please enter a valid "+mandatoryFieldName;
								
			return false;
		}
	}
	return true;			
}

function errorValidation(errorEle){ 
	if(errorEle !=null){
		var element = document.getElementById(errorEle);
		
		if(element != null && element.innerHTML.length > 0) {
			element.parentNode.className = "error";
		}else{
			if(element.parentNode.className == "error") {
				element.parentNode.className = "";
			}
		}
		
	}		
}

function patronAuthenticateSubmit(){    		
	var result = true; 
	
	if(mandatoryFieldValidation("email", document.getElementById("ml_email").value, "err_email") == false){
		document.getElementById("email").parentNode.className = "error";
		result = false;
	}else{
		document.getElementById("email").parentNode.className = "";
	}
	
	if(mandatoryFieldValidation("pw", document.getElementById("ml_password").value, "err_pw") == false){
		document.getElementById("pw").parentNode.className = "error";
		result = false;
	}else{
		document.getElementById("pw").parentNode.className = "";
	}      	
	return result;
} 



function patronForgotPasswordSubmit(){
	var result = true; 
	
	if(mandatoryFieldValidation("retrieve", document.getElementById("ml_email").value, "err_retrieve") == false){
		document.getElementById("retrieve").parentNode.className = "error";
		result = false;
	}else{
		document.getElementById("retrieve").parentNode.className = "";
	}
	
	var element1 = document.getElementById("label_secretQuestion1").innerHTML;
	var element2 = document.getElementById("label_secretQuestion2").innerHTML;
				
	if(element1!=null && element1.length > 0 ){
		if(mandatoryFieldValidation("secretAnswer1", "Secret Answer 1", "err_secret1") == false){
			document.getElementById("secretAnswer1").parentNode.className = "error";
			result = false;
		}else{
			document.getElementById("secretAnswer1").parentNode.className = "";
		}
	}
	
	if(element2!=null && element2.length > 0 ){
		if(mandatoryFieldValidation("secretAnswer2", "Secret Answer 2", "err_secret") == false){
			document.getElementById("secretAnswer2").parentNode.className = "error";
			result = false;
		}else{
			document.getElementById("secretAnswer2").parentNode.className = "";
		}
	}
	return result;
}

//Ajax Verify user email is register by SISTIC 
function isEmailRegister(emailAddr) {
	var result = true;
	var emailVal = document.getElementById("newemail").value;
	var sourceVal = document.getElementById("source").value; //updated by shenghou 20130508
	$r.ajax({
		url: SISTIC_API_ContextPath + 'newPatron.do',
		type: 'post',
		data: {create: 'Create', newemail: emailVal, source: sourceVal},
		cache: 'false',
		dataType: 'json',
		success: function(data) {
			result = showAjaxReturnErrMsg(data);
			if(result) {
				//updated by shenghou 20130516
				if(sourceVal != null && sourceVal == "fromaddtocart") {
					checkCart(emailVal);
				}else {
				window.location.href = SISTIC_API_ContextPath+"Registration.do?applyemail="+emailVal;
			}
			}
		 },
		error: function (request, textStatus, errorThrown) {
			alert('Connection error. Please try again.');
			//alert(request.statusText);
			//alert(request.status);
			//alert(errorThrown);     
			//alert(SISTIC_API_DomainName + 'newPatron.do');
		},
		complete: function (xhr, status) {
			if (status == 'error' || !xhr.responseText) {
				//alert('complete error');
			}
			else {
				var data = xhr.responseText;
				$r(".loaderForget").hide();
			}
		}
	});
}

//Ajax User Authentication
function userAuthenticate(emailAddr, password) {
	var result = true;
	var emailVal = document.getElementById("email").value;
	var pwdVal = document.getElementById("pw").value;
		 
	$r.ajax({
		url: SISTIC_API_ContextPath + 'patronAuthenticate.do',
		type: 'post',
		data: {login: 'Login', email: emailVal, password: pwdVal},
		cache: 'false',
		dataType: 'json',
		success: function(data) {
			
			result = showAjaxReturnErrMsg(data);
			var patronName = getAjaxReturnMsg(data, 'patronFullName');
			var logOutUrl = '<%=JspUtil.getWebAppUrl("sg.com.sistic.portal.forward.url", "SignOut.do") %>'
			if(result)
				setTimeout(function() { logincomplete(patronName, logOutUrl); $r(".loader").hide();},1000);
			else
				$r(".loader").hide();
			
		 },
		error: function (request, textStatus, errorThrown) {
			$r(".loader").hide();
			alert('Connection error. Please try again.');
//			alert(request.statusText);
//			alert(request.status);
//			alert(errorThrown);     
//			alert(SISTIC_API_DomainName + 'patronAuthenticate.do');
		},
		complete: function (xhr, status) {
			if (status == 'error' || !xhr.responseText) {
				//alert('complete error');
			}
			else {
				var data = xhr.responseText;
			}
		}
	});
}

//Ajax Retrieve Password
function retrievePassword(emailAddr, password) {
	var result = true;
	var retrieveVal   = document.getElementById("retrieve").value;
	var secretQuestion1Val = document.getElementById("label_secretQuestion2").innerHTML;
	var secretAnswer1Val   = document.getElementById("secretAnswer1").value;
	var secretQuestion2Val = document.getElementById("label_secretQuestion2").innerHTML;
	var secretAnswer2Val   = document.getElementById("secretAnswer2").value;
	$r(".loaderForget").show();
	
	$r.ajax({
		url: SISTIC_API_ContextPath + 'patronForgotPassword.do',
		type: 'post',
		data: {	continueBtn: 'Continue', 
				retrieve: retrieveVal, 
				secretQuestion1: secretQuestion1Val, 
				secretAnswer1: secretAnswer1Val,
				secretQuestion2: secretQuestion2Val,
				secretAnswer2: secretAnswer2Val 
				},
		cache: 'false',
		dataType: 'json',
		success: function(data) {
			result = showAjaxReturnErrMsg(data);
			var status = getAjaxReturnMsg(data, 'status');
			var retrieveemail = getAjaxReturnMsg(data, 'retrieveemail');
								
			if(status == '1') {
				setTimeout(function() { retrievepwdcomplete(retrieveemail); },1000);
				
			}else if(status == '0') {
				var sq1 = getAjaxReturnMsg(data, 'sq1');
				var sq2 = getAjaxReturnMsg(data, 'sq2');
				
				fillupSecretQnA(retrieveemail, sq1, sq2);
				
			}else if(status == '-1') {
				displaysecreterror();
			}else if(status == '-2') {
				//do nothing	
			}
				
		 },
		error: function (request, textStatus, errorThrown) {
			alert('Connection error. Please try again.');
			//alert(request.statusText);
			//alert(request.status);
			//alert(errorThrown);     
			//alert(SISTIC_API_DomainName + 'patronForgotPassword.do');
		},
		complete: function (xhr, status) {
			if (status == 'error' || !xhr.responseText) {
			//	alert('complete error');
			}
			else {
				var data = xhr.responseText;
			}
		}
	});
}

function showAjaxReturnErrMsg(data){
	var result = true;
	for(key in data){
		var element = document.getElementById(key);

		if(element!=null){
			element.innerHTML = data[key];
			if(element.innerHTML.length > 0){
				errorValidation(key);
				result = false;
			}
		}
	}        	
	return result;
}          

function getAjaxReturnMsg(data, key){
	var msg = data[key];
	if(msg!=null)
		return msg;
	else
		return "";
}

//13-09-2012 Added by webster - newbookflow, addon
function cleanApplicationFields(){
	var errKeys = ["err_email","err_pw", "err_retrieve", "err_secret1", "err_secret", "err_newemail"];
	for (var i = 0; i < errKeys.length; i++) {
		var element = document.getElementById(errKeys[i]);
		if(element!=null){
			element.innerHTML = "";		
			if(element.parentNode.className == "error") {
				element.parentNode.className = "";
			}
		}    
	}	
	
	$r("span#secretQuestionSection").hide();
	$r("div.retrieveblock").hide();
	$r("input[name=retrieve]").removeAttr("readonly");  
	
	var appFields = ["email", "pw", "retrieve", "secretAnswer1", "secretAnswer2", "newemail"];
	for (var i = 0; i < appFields.length; i++) {

		var element = document.getElementById(appFields[i]);
		if(element!=null){
			element.value = "";				
		}
	}
	
	var labelFields = ["label_secretQuestion1", "label_secretQuestion2"];
	for (var i = 0; i < labelFields.length; i++) {

		var element = document.getElementById(labelFields[i]);
		if(element!=null){
			element.innerHTML = "";				
		}
	}
}

//3DS enhancement
//this check if user needs to enter the CSC which only for VISA and MASTER now!
function checkCardSecurityCodeNew(creditCardType, cardSecurityCodeTr, includeCard) {
    if(needCardSecurityCode(creditCardType, includeCard)) {
        cardSecurityCodeTr.style.display = "";
      //  $r(cardSecurityCodeTr).show();
    } else {
        cardSecurityCodeTr.style.display = "none";
      //  $r(cardSecurityCodeTr).hide();
    }
}

function printDocument() {
    text=document;
    print(text);
}
