//------------------------------------------------------------------
// booking_common.js
//
// Commonly used javascript functions by the booking engine module.
//------------------------------------------------------------------

//-----------------------------------------------------------------
// The following functions will allow flashing of text in the jsp
// page.
//
//-----------------------------------------------------------------
// global variable - used by show() hide() and doBlick2() functions
var stat = 0;

//Added by soemon 20160122
var SISTIC_API_ContextPath = '/VCLTicketing/';

function show(loginWaitMsg) {
    if (document.layers && document.layers[loginWaitMsg]) {
        document.layers[loginWaitMsg].visibility = 'visible';
       }
    else if (document.all) {
        document.all[loginWaitMsg].style.visibility = 'visible';
        document.all[loginWaitMsg].style.zIndex = 100;
    } else {
    	document.getElementById(loginWaitMsg).style.visibility = 'visible';
    }
}

function hide(loginWaitMsg) {
    if (document.layers && document.layers[loginWaitMsg])
        document.layers[loginWaitMsg].visibility = 'hidden';
    else if (document.all)
        document.all[loginWaitMsg].style.visibility = 'hidden';
}

function doBlink2() {
    if (stat==0) {
        hide('loginWaitMsg'); stat=1;
    } else {
        show('loginWaitMsg'); stat=0;
    }
}


// This function will convert a text input into NCR value
// NCR value is of the form &#nnnn; where n is a decimal value from 0-9
function convertToNcr(inputValue) {
    var tstr = inputValue;
    var bstr = '';
    alert('Input string length = '+tstr.length);
    for(i=0; i<tstr.length; i++)
    {
        if(tstr.charCodeAt(i)>127) {
            bstr += '&#' + tstr.charCodeAt(i) + ';';
        } else {
            bstr += tstr.charAt(i);
        }
    }
    return bstr;
}

   
function getFormObj(formName) {
    if(formName==null) {
        alert('Formname is null!');
        return null;
    }
	  
    var formObj = document.forms[formName];
    if(formObj==null) {
        alert('Invalid form name : '+formName);
        return null;
    }
	  
    return formObj;
}

function submitForm(formName) {
    var formObj = getFormObj(formName);
    if(formObj==null) return;
	  
    formObj.submit();
}

function getFormElement(formName, objName) {
    var formObj = getFormObj(formName);
    if(formObj==null) return;
	  
    if(objName==null) {
        // alert('Object name is null');
        return null;
    }
	  
    return formObj.elements[objName];
}


//---------------------------------------------------------------------
// Retrieves value of the selected radio button.
//
// @param radiobuttonGroup A radio button group object containing 
//        one or more radio buttons
//
// @return Value associated with the selected radio button.
//---------------------------------------------------------------------
function getSelectedRadioButtonValue(radiobuttonGroup) {
    if(radiobuttonGroup==null) {
        alert('Radio button group is null.');
        return null;
    }
    
    var selectedValue = null;
    if(radiobuttonGroup.length==null) {
        // radio button group contains only one element ...
        if(radiobuttonGroup.checked) {
            selectedValue = radiobuttonGroup.value;
        }
    	   
    } else {
        // radio button group contains more than one element ...
        for(i=0; i<radiobuttonGroup.length; i++) {
            if(radiobuttonGroup[i].checked == true) {
                selectedValue = radiobuttonGroup[i].value;
                break;
            }
        } // for loop
    }
    return selectedValue;
}

function setSelectedRadioButtonValue(radiobuttonGroup, selectedValue) {
    if(radiobuttonGroup==null) {
        alert('Radio button group is null.');
        return;
    }
    
    if(selectedValue==null) {
        return;
    }
    
    for(i=0; i<radiobuttonGroup.length; i++) {
        if(radiobuttonGroup[i].value==selectedValue) {
            radiobuttonGroup[i].checked = true;
            radiobuttonGroup[i].click();
            break;
        }
    } // for loop
	
}


//------------------------------------------------------------------------
// Get all selected values from a checkbox or checkbox group.
//
// @param checkboxGroup A checkbox or group of checkboxes to be evaluated.
//
// @return An array containing all the selected values from a 
//         check box group if available or null otherwise.
//------------------------------------------------------------------------
function getCheckboxValues(checkboxGroup) {
    if(checkboxGroup==null) {    	
        return null;
    }
    
    var chkboxValues = new Array();
    var chkboxLen = checkboxGroup.length;
    if(chkboxLen==null) {
        if(checkboxGroup.checked==true) {
            chkboxValues[0] = new Object();
            chkboxValues[0].value = checkboxGroup.value;
            return chkboxValues;
        } else {
            return null;
        }
    } else {
        var index = 0;
        for(i=0; i<chkboxLen; i++) {
            if(checkboxGroup[i].checked==true) {
                chkboxValues[index] = new Object();
                chkboxValues[index].value = checkboxGroup[i].value;
                index++;
            }
        } // for loop
    }    
    
    return chkboxValues;
}



//
// Retrieves the value of the selected dropdown list
//
function getSelectedDropDownListValue(dropdownList) {
    if(dropdownList==null) {
        alert('Dropdown list is null');
        return null;
    }
    return dropdownList.options[dropdownList.selectedIndex].value;
}


//----------------------------------------------------------------------------------
// Set to a particular value in the drop down list
// If the selected value is not found in the list, the first item will be selected.
//
// @param formName Name of the form containing the dropdown list.
// @param dropdownListName Name of the drop down list box
// @param selectedValue Value to select from the drop down list.
//
// @return nothing.
//----------------------------------------------------------------------------------
function setSelectedDropDownList(formName, dropdownListName, selectedValue) {
    var formObj = getFormObj(formName);
    if(formObj==null) {
        alert('Invalid form name : '+formName);
        return;
    }
    var dropdownList = getFormElement(formName,dropdownListName);
    if(dropdownList==null) {
        alert('Invalid dropdown list : '+dropdownListName);
        return;
    }
    if(dropdownList.length==0) {
        return;
    }
	  
    dropdownList.selectedIndex = 0;
    for(i=0; i<dropdownList.length; i++) {
        if(dropdownList[i].value==selectedValue) {
            dropdownList.selectedIndex = i;
            break;
        }
    } // for loop
}



//--------------------------------------------------------------------------------------
// Extract all digits from a text string.
// It will ignore all non-digits characters and return a string containing digits only.
//
// @param inputVal Input string
//
// @return String containing digits characters only.
//-------------------------------------------------------------------------------------
function extractDigitsOnly(inputVal) {
    if(inputVal==null) {
        return null;
    }
    
    var extractedValue = inputVal.split(/\D*/);
    var finalval = '';
    if(extractedValue.length>0) {
        for(i=0; i<extractedValue.length; i++) {
            finalval = finalval + extractedValue[i];
        } // for loop
    } else {
        finalval = extractedValue;
    }
    return finalval;    
}

//---------------------------------------------------------------------
// Trim a text value of all spaces on the left and right of the string
//
// @param value Input text value to be trimmed
//
// @return Trimmed value of the input text.
//---------------------------------------------------------------------
function trim(inputString) {
    // Removes leading and trailing spaces from the passed string. Also removes
    // consecutive spaces and replaces it with one space. If something besides
    // a string is passed in (null, custom object, etc.) then return the input.
    if (typeof inputString != "string") {
        return inputString;
    }
    var retValue = inputString;
    var ch = retValue.substring(0, 1);
    while (ch == " ") { // Check for spaces at the beginning of the string
        retValue = retValue.substring(1, retValue.length);
        ch = retValue.substring(0, 1);
    }
    ch = retValue.substring(retValue.length-1, retValue.length);
    while (ch == " ") { // Check for spaces at the end of the string
        retValue = retValue.substring(0, retValue.length-1);
        ch = retValue.substring(retValue.length-1, retValue.length);
    }
    while (retValue.indexOf("  ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
        retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
    }
    return retValue; // Return the trimmed string back to the user
} // Ends the "trim" function


function toUpperTrim(inputStr) {
    if(inputStr==null || typeof inputStr != "string") return "";
   
    var str = inputStr.toUpperCase();
    str = trim(str);
    return str;
}


function toLowerTrim(inputStr) {
    if(inputStr==null || typeof inputStr != "string") return "";
   
    var str = inputStr.toLowerCase();
    str = trim(str);
    return str;
}

//---------------------------------------------------------------------
// Check whether an input text is null or empty.
//
// @param inputString String to be checked.
// @return true if the input string is empty or null or false otherwise.
//---------------------------------------------------------------------
function isNullOrEmpty(inputString) {
    if(typeof(inputString) != "string") {
        return true;
    }
    var trimStr = trim(inputString);
    if(trimStr.length==0) {
        return true;
    } else {
        return false;
    }
}


//
// Perform opening of new window with a target URL
//
function openNewWindow(targetUrl, windowName, feature) {
    if(targetUrl==null || (typeof targetUrl != "string")) {
        // target url not specified
        return;
    }
	  
    if(windowName==null || (typeof windowName != "string")) {
        // target window name is not specified
        // default it to blank window
        windowName = "_blank";
    }
	  
    if(feature==null || (typeof feature != "string")) {
        // feature is not specifed
        // default it to the normal features
        feature = "toolbar=yes,location=yes,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=800,height=800";
    }
	  
    // The void is used here because for some of the browsers will display a blank page with
    // the word [object] after opening the window without using the void function.
    void(window.open(targetUrl,windowName,feature));
}


//------------------------------------------------------
// Check whether an input contains valid NRIC number.
// NRIC number are of the following format:
// <prefix>-<7-digits numeric>-<suffix>
// where:
//
// <prefix> := S | F
// <suffix> := A | B | C | D | E | F | G | H | Z
//
// @param inputNric NRIC number.
//
// @return true if the input is a valid NRIC number.
//         false otherwise.
//------------------------------------------------------
function isNric(inputNric) {
    if(typeof inputNric != "string") return false; 
    inputNric = inputNric.toUpperCase();   
    nricRE = /^[S|F]?\d{7}[A-Z]$/;
    return nricRE.test(inputNric);
}



//------------------------------------------------------
// This function performs a stricter check on the NRIC
// number by running an algorithm to check
// against the suffix with the list of digits in the
// NRIC number. 
//
// @see isNric(inputNric) function
//------------------------------------------------------
function isValidNric(inputNric) {
	
    // performs a syntactic check first before doing a checksum
    if(!isNric(inputNric)) {
        return false;
    }
    
    // take 7 digits from left to right and multiply
    // the following numbers respectively in that order: 2,7,6,5,4,3,2

    // add the products, and then divide the sum by 11, obtain the remainder.
    // subtract the remainder from 11, and match the code in this table:

    // 1 2 3 4 5 6 7 8 9 10 11
    // A B C D E F G H I  Z  J

    var multiplier = new Array();
    multiplier[0] = '2';
    multiplier[1] = '7';
    multiplier[2] = '6';
    multiplier[3] = '5';
    multiplier[4] = '4';
    multiplier[5] = '3';
    multiplier[6] = '2';
    
    var suffixArray = new Array();
    suffixArray[0] = 'A';
    suffixArray[1] = 'B';
    suffixArray[2] = 'C';
    suffixArray[3] = 'D';
    suffixArray[4] = 'E';
    suffixArray[5] = 'F';
    suffixArray[6] = 'G';
    suffixArray[7] = 'H';
    suffixArray[8] = 'I';
    suffixArray[9] = 'Z';
    suffixArray[10] = 'J';
    
    var prefix = inputNric.substring(0,1);
    var nric   = inputNric.substring(1,8);
    var suffix = inputNric.substring(8,9);
    prefix = prefix.toUpperCase();
    suffix = suffix.toUpperCase();
    
    var sum = 0;
    for(i=0; i<nric.length; i++) {
        sum = sum + (parseInt(multiplier[i]) * parseInt(nric.substring(i,i+1)));
    }
    
    var remain = 11 - (sum % 11) -1;
    return suffix==suffixArray[remain];
}


//---------------------------------------------------------------------
// Check whether an input text is a valid email address or not.
//
// A valid email address is of the following format:
//
// <userid>@<domain>
// 
// where
// <userid> := [a-z0-9]+
// <domain> := [a-z0-9]+[<domain>]
//
// eg a@abc.com or a@abc are valid addresses but not a@
//    a@123.456.789.012 is a valid address also but not a@123.abc.789.012
//---------------------------------------------------------------------
function validateEmail(email)
{
    var emailText;
    if(typeof email != "string") {
        return false;
    } else {
        emailText = email;
    }
    validEmailRE = /^([a-zA-Z0-9._][a-zA-Z0-9._\-]+@([a-zA-Z0-9]+(.[a-zA-Z0-9\-]+){0,4})|[a-zA-Z0-9_]+@([1-9][0-9]{0,2}(.[1-9][0-9]{0,2}){3}))$/;
    return validEmailRE.test(emailText);    
}


//-------------------------------------------------------------------------------------
// Test whether an input string is a credit card number
//
// It will only provide a syntactical check to ensure that:
//
// a) All characters in the input must contain only digits.
// b) The first digits must start with '3','4' or '5'. All other
//    digits are not acceptable.
// c) If the first digit starts with '3', the length should be between
//    14-16
// d) If the first digit starts with '4' or '5', the length should be
//    between 15 or 16 characters only.
//
//-------------------------------------------------------------------------------------
function isCreditCardNumber(inputDigits) {
    if(typeof inputDigits != "string") {
        return false;
    }
    creditCardRE = /^[2-5]\d{12,16}$/;
    if(!creditCardRE.test(inputDigits)) {
        return false;
    }
	  
    visaRE   = /^4\d{15}$/;
    masterRE = /^(5\d{15}|2(22[1-9]|2[3-9][0-9]|[3-6][0-9][0-9]|7[0-1][0-9]|720)\d{12})$/;
    diners   = /^3\d{12,14}$/;
    amex     = /^3\d{12,15}$/;
	  
    if(visaRE.test(inputDigits)) {
        //alert('VISA');
        return true;
    }
	  
    if(masterRE.test(inputDigits)) {
        //alert('MASTER');
        return true;
    }
	  
    if(diners.test(inputDigits)) {
        //alert('DINERS');
        return true;
    }
	  
    if(amex.test(inputDigits)) {
        //alert('AMEX');
        return true;
    }
	  
    return false;
}

//3DS enhancement
//this check if the credit card needs to enter the CSC
function needCardSecurityCode(creditCardType, includeCard) {
    if (includeCard.indexOf(","+creditCardType+",")!=-1) {
        return true;
    }
	  
    return false;
}

//3DS enhancement
//this check if user needs to enter the CSC which only for VISA and MASTER now!
function checkCardSecurityCode(creditCardType, cardSecurityCodeObj, includeCard) {
    if(needCardSecurityCode(creditCardType, includeCard)) {
        cardSecurityCodeObj.disabled="";
    } else {
        cardSecurityCodeObj.value="";
        cardSecurityCodeObj.disabled="disabled";
    }
}

//-------------------------------------------------------------------------------------
// To check the type of credit card 
//-------------------------------------------------------------------------------------
function creditCardDiners(inputDigits) {
    if(typeof inputDigits != "string") {
        return false;
    }
    creditCardRE = /^[3]\d{13,16}$/;
    if(!creditCardRE.test(inputDigits)) {
        return false;
    }
	  
    diners30   = /^30\d{12,14}$/;
    diners36   = /^36\d{12,14}$/;
    diners38   = /^38\d{12,14}$/;

    if(diners30.test(inputDigits) || diners36.test(inputDigits) || diners38.test(inputDigits)) {
        //alert('DINERS');
        return true;
    }

    return false;
}


//------------------------------
// Print the page
//------------------------------
function printDocument() {
    text=document;
    print(text);
}


//------------------------------------------------------------
// Check whether an input date is
// valid.
// For eg, 31 Feb 2001 is not valid
//
// @param Y Numerical year value 
// @param M Numerical month value (1-12)
// @param D Numerical day value (1-31)
//
// @return true if the input date is valid or false otherwise
//------------------------------------------------------------
function isDateOk(Y, M, D) {
    var ML = [,31,28,31,30,31,30,31,31,30,31,30,31];
    var L = ML[M]; // Improved after LRN
  
    // var msg = 'Day = '+D+', Month = '+M+', Year = '+Y;
    var valid =  D>0 && !!L && (D<=L || D==29 && Y%4==0 && (Y%100!=0 || Y%400==0) );
    // alert(msg+', Is valid = '+valid);
    return valid;
}

// Ticket Protector - Phase 2 - 12-Nov-2009
function tpPopup(formWin) {
    window.open(formWin,'tp','width=350,height=600').focus();
}

function cvvPopup(formWin) {
    window.open(formWin,'cvv','width=500,height=300').focus();
}

function stopRKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if ((evt.keyCode == 13) && (node.type=="text"))  {return false;}
}

function mcPopup(formName,promptMsg,deliveryMtds) {
    var formObj = getFormObj(formName);
    if(formObj==null) {
        alert('Invalid form name : '+formName);
        return;
    }

    if(deliveryMtds=='MASTERCARD_PICKUP') {
        var promptMsg = window.confirm(promptMsg);
        if(promptMsg) {
            formObj.btnSubmit.disabled=true;
            formObj.submit();
        }else{
            location.href="#selDev";
        }
    }else{
        formObj.btnSubmit.disabled=true;
        formObj.submit();
    }
}

/* Internet QAS Enhancement */
function getElementValue(elementId) {
    var elemRet = getElementItem(elementId);
    if(elemRet==null) {
        return "";
    } else if(elemRet!=null) {
        return elemRet.value;
    }
}

function getElementItem(elementId) {
    return document.getElementById(elementId);
}

function blurFocus() {
    $(document).ready(function() {
        $(".defaultText").focus(function(srcc) {
            if ($(this).val() == $(this)[0].title) {
                $(this).removeClass("defaultTextActive");
                $(this).val("");
            }
        });
        $(".defaultText").blur(function() {
            if ($(this).val() == "") {
                $(this).addClass("defaultTextActive");
                $(this).val($(this)[0].title);
            }
        });
        $(".defaultText").blur();
    });
}

/* Internet QAS Enhancement */
function showTable(addrType,elementPos) {
    loadXMLDoc(elementPos, SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showtable.jsp?addrType="+addrType);
}

function showAltTable(addrType,elementPos) {
    loadXMLDoc(elementPos, SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showtablePrompt.jsp?addrType="+addrType);
}

function changeEmpty(addrType,elementPos) {
    var confirmRe = window.confirm("Are you sure you want to change address?");
    if(confirmRe) {
        removeAddr(addrType);
    } else {
        return false;
    }
    blurFocus();
}

function loadXMLDoc(elementId, url) {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            document.getElementById(elementId).innerHTML=xmlhttp.responseText;
            blurFocus();
        }
    }
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function removeAddr(addrType) {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            document.getElementById(getAddrOpt(addrType)).innerHTML=
                "<input type=\"button\" onClick=\"javascript:showTable('"+addrType+"','"+getAddrOpt(addrType)+"'); return false;\" name=\"Add Address\" value=\"Add Address\">";
        }
    }
    
    var params = "addrType="+addrType;
    xmlhttp.open("POST",SISTIC_API_ContextPath + "RemoveQasAddr.do",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Content-length", params.length);
    xmlhttp.setRequestHeader("Connection", "close");
    xmlhttp.send(params);
}

function checkItemNull(addrType,altType) {
    var input01=getElementValue("UserInput01"+addrType);
    var input02=getElementValue("UserInput02"+addrType);
    var input03=getElementValue("UserInput03"+addrType);
    var input04=getElementValue("UserInput04"+addrType);
    
    if(!altType && (input01=="e.g. 01-08" || input01=="" || input02=="e.g. 397691" || input02=="")) {
        return false;
    } else if(altType && (input01=="e.g. 01-08" || input01=="" || input04=="" || input04=="e.g. Pasir Ris Drive 6" || input03=="" || input03=="e.g. 2")) {
        return false;
    } else {
        return true;
    }
}

function checkOptSelWithAddr(addrType,selAddrType) {
    var addrVal = getElementValue(addrType+"Address0");
    if(selAddrType!=null) {
        if((addrVal=="" || addrVal==null) && selAddrType==addrType) {
            alert("No address data is available for the chosen delivery address type. Please select another address type or populate a new address.");
            return false;
        } else {
            return true;
        }
    }
}

function postQAS(addrType,altType) {
    if(!checkItemNull(addrType,altType)) {
        alert("All fields are mandatory!");
        return false;
    }    
    
    var xmlhttp;
    var params = "";
    var newAddr = "&newAddr=1&alt=";
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    if(altType) {
        params = "UserInput01="+getElementValue("UserInput01"+addrType)+"&UserInput03="+getElementValue("UserInput03"+addrType)
        +"&UserInput04="+getElementValue("UserInput04"+addrType)+"&Route="+getElementValue("Route")
        +"&PromptSet="+getElementValue("PromptSet")+"&Command="+getElementValue("Command")+"&DataId="+getElementValue("DataId")
        +"&addressType="+addrType;
    } else {
        params = "UserInput01="+getElementValue("UserInput01"+addrType)+"&UserInput02="+getElementValue("UserInput02"+addrType)+"&Route="+getElementValue("Route")
        +"&PromptSet="+getElementValue("PromptSet")+"&Command="+getElementValue("Command")+"&DataId="+getElementValue("DataId")
        +"&addressType="+addrType;
    }

    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            loadXMLDoc(getAddrOpt(addrType),SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showdata.jsp?addrType="+addrType+newAddr+altType);
        }
    }

    xmlhttp.open("POST",SISTIC_API_ContextPath + "QasController.do",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Content-length", params.length);
    xmlhttp.setRequestHeader("Connection", "close");
    xmlhttp.send(params);
}

function getAddrOpt(addrType) {
    var result;
    if(addrType=="B") {
        result = "radioAddrType2";
    } else if (addrType=="O") {
        result = "radioAddrType3";
    } else {
        result = "radioAddrType1";
    }
    return result;
}

function saveNonSgToSession(addrType,bInput) {
    var xmlhttp;
    var params = "";
    if(bInput) {
        params = dummyInit(addrType);
    } else {
        params = getAddrData(addrType);
    }
    
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    if(bInput) {
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState==4 && xmlhttp.status==200) {
                loadXMLDoc(getAddrOpt(addrType), SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showdata.jsp?addrType="+addrType+"&notSg=1");
            }
        }
    }
    
    xmlhttp.open("POST",SISTIC_API_ContextPath + "SaveQasAddr.do",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Content-length", params.length);
    xmlhttp.setRequestHeader("Connection", "close");
    xmlhttp.send(params);
}

function getAddrData(addrType) {
    var country = document.getElementById(addrType+"Address4").value;
    if(country!="SINGAPORE") {
        return ("Address0="+getElementValue(addrType+"Address0")+"&Address1="+getElementValue(addrType+"Address1")+
                "&Address2="+getElementValue(addrType+"Address2")+"&Address3="+getElementValue(addrType+"Address3")+
                "&Address4="+getElementValue(addrType+"Address4")+"&addressType="+addrType);
    } else {
        showTable(addrType,getAddrOpt(addrType));
    }
}

function loadNotSgForm(addrType) {
    saveNonSgToSession(addrType,true);
}

function dummyInit(addrType) {
    return ("Address0=&Address1=&Address2=&Address3=&Address4=AFGHANISTAN&addressType="+addrType);
}

function saveAddrToSession() {
    var xmlhttp;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    var params = getFullAddressData();
    xmlhttp.open("POST",SISTIC_API_ContextPath + "SaveAllQasAddr.do",true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Content-length", params.length);
    xmlhttp.setRequestHeader("Connection", "close");
    xmlhttp.send(params);
}

function getIdentification() {
    var id = document.patronInputForm.identificationNumber;
    if(id!=null && id!=undefined) {
        return ("&identificationNumber="+(id.value));
    } else {
        return "";
    }
}

function getAddressType() {
    var addrT = document.patronInputForm.addressType;
    if(addrT!=null) {
        return ("&addressType="+(getSelectedRadioButtonValue(addrT)));
    } else {
        return "";
    }
}

function getKeyword() {
    var keyword = document.patronInputForm.txtKeyword;
    if(keyword!=null) {
        return ("&keyword="+(keyword.value));
    } else {
        return "";
    }
}

function getFullAddressData() {
    return ("HAddress0="+getElementValue("HAddress0")+"&HAddress1="+getElementValue("HAddress1")+"&HAddress2="+getElementValue("HAddress2")+
     "&HAddress3="+getElementValue("HAddress3")+"&HAddress4="+getElementValue("HAddress4")+ 
     "&BAddress0="+getElementValue("BAddress0")+"&BAddress1="+getElementValue("BAddress1")+"&BAddress2="+getElementValue("BAddress2")+
     "&BAddress3="+getElementValue("BAddress3")+"&BAddress4="+getElementValue("BAddress4")+     
     "&OAddress0="+getElementValue("OAddress0")+"&OAddress1="+getElementValue("OAddress1")+"&OAddress2="+getElementValue("OAddress2")+
     "&OAddress3="+getElementValue("OAddress3")+"&OAddress4="+getElementValue("OAddress4")+
     
     "&firstName="+(document.patronInputForm.firstName.value)+"&lastName="+(document.patronInputForm.lastName.value)+
     "&gender="+(getSelectedRadioButtonValue(document.patronInputForm.radioGender))+getIdentification()+
     "&birthOfDay="+(getSelectedDropDownListValue(document.patronInputForm.selectDay))+
     "&birthOfMonth="+(getSelectedDropDownListValue(document.patronInputForm.selectMonth))+
     "&birthOfYear="+(getSelectedDropDownListValue(document.patronInputForm.selectYear))+
     "&organizationName="+(document.patronInputForm.txtOrgName.value)+getAddressType()+getKeyword()+
     
     "&nationality="+(getSelectedDropDownListValue(document.patronInputForm.selectNationality))+
     "&countryOfResidence="+(getSelectedDropDownListValue(document.patronInputForm.selectCountryOfResidence))+
     
     "&phoneHC="+(document.patronInputForm.txtCountryCodeHome.value)+"&phoneHA="+(document.patronInputForm.txtAreaCodeHome.value)+
     "&phoneH="+(document.patronInputForm.txtPhoneHome.value)+"&phoneMC="+(document.patronInputForm.txtCountryCodeMobile.value)+
     "&phoneMA="+(document.patronInputForm.txtAreaCodeMobile.value)+"&phoneM="+(document.patronInputForm.txtPhoneMobile.value)+
     "&phoneOC="+(document.patronInputForm.txtCountryCodeOffice.value)+"&phoneOA="+(document.patronInputForm.txtAreaCodeOffice.value)+
     
     "&phoneO="+(document.patronInputForm.txtPhoneOffice.value)+"&subscribeOrgniser="+(document.patronInputForm.txtSubscribeOrganiser.value)+
     "&subscribeVenue="+(document.patronInputForm.txtSubscribeVenue.value)+"&subscribeSistic="+(document.patronInputForm.txtSubscribeBuzz.value));
}

function minOneAddr() {
    var homeAddr = getElementValue("HAddress0");
    var businessAddr = getElementValue("BAddress0");
    var otherAddr = getElementValue("OAddress0");
    
    var hCountry = getElementItem("HAddress4");
    var bCountry = getElementItem("BAddress4");
    var oCountry = getElementItem("OAddress4");
    
    if(homeAddr=="" && businessAddr=="" && otherAddr=="") {
        return false;
    } else if(hCountry!=null && hCountry.value!="SINGAPORE" && homeAddr=="") {
        return false;
    } else if(bCountry!=null && bCountry.value!="SINGAPORE" && businessAddr=="") {
        return false;
    } else if(oCountry!=null && oCountry.value!="SINGAPORE" && otherAddr=="") {
        return false;
    } else {
        return true;
    }
}

function verifyAddr(addr1,addr2,addr3) {
    var xmlhttp;
    var params = "";
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            setTimeout(document.innerHTML=xmlhttp.responseText,"1000");
        }
    }
    
    params = "Command=Verify&DataId=SGF";
    params = params + addr1 + addr2 + addr3;
    xmlhttp.open("POST",SISTIC_API_ContextPath + "QasController.do",false);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Content-length", params.length);
    xmlhttp.setRequestHeader("Connection", "close");
    xmlhttp.send(params);
}

function getAddr2Verify(addrType,addr1,addr2,addr3,addr4,addr5) {
    return ("&UserInput01"+addrType+"="+addr1+"&UserInput02"+addrType+"="+addr2+
        "&UserInput03"+addrType+"="+addr3+"&UserInput04"+addrType+"="+addr4+
        "&UserInput05"+addrType+"="+addr5);
}


// friendssignup
function createCookie(name, value, days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function setNextURL(fullPath) {
	createCookie("nextURL", encodeURI(fullPath), 0);
}

function getNextURL() {
	if (readCookie("nextURL")==null || readCookie("nextURL")=="") resetNextURL();
	return readCookie("nextURL");
}

function resetNextURL() {
	createCookie("nextURL", encodeURI("http://www.sistic.com.sg"), 0);
}

function deleteNextURL() {
	eraseCookie("nextURL");
}

//Hari, 10 Feb 2015, Mantis 9426 merge from old BE === START ===
//lh added to check digits in name field
function containFourOrMoreDigits(inputString) {
    if(typeof(inputString) != "string") {
        return false;
    }

    ptn = /\w*\d{3}\w*/;

    if(ptn.test(inputString)) {
        return true;
    }else if(!isValid(inputString)) {
        return true;
    }else {
        return false;
    }
}

function isValid(str){
    return !/[~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str);
}

//Hari, 10 Feb 2015, Mantis 9426 merge from old BE === END ===