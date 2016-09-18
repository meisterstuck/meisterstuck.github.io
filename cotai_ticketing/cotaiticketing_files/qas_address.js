
var BUSINESS = "B";
var HOME = "H";
var OFFICE = "O";

var USER_INPUT_01 = "UserInput01";
var USER_INPUT_02 = "UserInput02";
var USER_INPUT_03 = "UserInput03";
var USER_INPUT_04 = "UserInput04";
var USER_INPUT_05 = "UserInput05";

var EMPTY_STR = "";

//Added by soemon 20160122
var SISTIC_API_ContextPath = '/VCLTicketing/';

/* Internet QAS Enhancement */
function getElementValue(elementId) {
    var elemRet = getElementItem(elementId);
    if(elemRet!=null) {
        return elemRet.value;
    } else {
        return "";
    }
}

function getElementItem(elementId) {
    return document.getElementById(elementId);
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
    loadXMLDoc(elementPos,SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showtable.jsp?addrType="+addrType);
}

function showAltTable(addrType,elementPos) {
    loadXMLDoc(elementPos,SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showtablePrompt.jsp?addrType="+addrType);
}

function changeEmpty(addrType,elementPos) {
    var confirmRe = window.confirm("Are you sure you want to change your address?");
    if(!confirmRe) {
        return false;
    } 
    removeAddr(addrType);
    blurFocus();
}

function loadXMLDoc(elementId,url) {
    var ajaxRequest;  // The variable that makes Ajax possible!
    try{
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    } catch (e){
        // Internet Explorer Browsers
        try{
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try{
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e){
                alert("Unsupported web browser! Please use another browser.");
                return false;
            }
        }
    }
    
    ajaxRequest.onreadystatechange=function() {
        if (ajaxRequest.readyState==4 && ajaxRequest.status==200) {
            getElementItem(elementId).innerHTML=ajaxRequest.responseText;
        }
    }
    ajaxRequest.open("GET",url,true);
    ajaxRequest.send(null);
}

function sendXMLDoc(params, url, elementId, url2) {
    
    var ajaxRequest;  // The variable that makes Ajax possible!
    try{
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    } catch (e){
        // Internet Explorer Browsers
        try{
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try{
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e){
                alert("Unsupported web browser! Please use another browser.");
                return false;
            }
        }
    }
    
    ajaxRequest.onreadystatechange=function() {
        if (ajaxRequest.readyState==4 && ajaxRequest.status==200) {
            loadXMLDoc(elementId, url2);
        }
    }
    
    ajaxRequest.open("POST",url,true);
    ajaxRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    ajaxRequest.setRequestHeader("Content-length", params.length);
    ajaxRequest.setRequestHeader("Connection", "close");
    ajaxRequest.send(params);
}

function removeAddr(addrType) {
    var params = "addrType="+addrType;
    return sendXMLDoc(params, SISTIC_API_ContextPath + "RemoveQasAddr.do",
        getAddrOpt(addrType),SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showtable.jsp?addrType="+addrType);
}

function checkItemNull(addrType,altType) {
    var input01=getElementValue("UserInput01"+addrType);
    var input02=getElementValue("UserInput02"+addrType);
    var input03=getElementValue("UserInput03"+addrType);
    var input04=getElementValue("UserInput04"+addrType);
    
    if(!altType && (input01=="e.g. 01-08" || input01=="" || input02=="e.g. 397691" || input02==EMPTY_STR)) {
        return false;
    } else if(altType && (input01=="e.g. 01-08" || input01==EMPTY_STR || input04==EMPTY_STR || input04=="e.g. Pasir Ris Drive 6" 
        || input03==EMPTY_STR || input03=="e.g. 2")) {
        return false;
    } else {
        return true;
    }
}

function checkOptSelWithAddr(addrType,selAddrType) {
    var addrVal = getElementValue(addrType+"Address0");
    if(selAddrType!=null) {
        if((addrVal==EMPTY_STR || addrVal==null) && selAddrType==addrType) {
            alert("Your address field is blank. Please select again or input a valid address.");
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function postQAS(addrType,altType,moniker) {
    if(moniker==EMPTY_STR && !checkItemNull(addrType,altType)) {
        alert("All fields are mandatory!");
        return false;
    }    
    
    var params = EMPTY_STR;
    if(altType) {
        params = "UserInput01="+getElementValue("UserInput01"+addrType)+"&UserInput03="+getElementValue("UserInput03"+addrType)
        +"&UserInput04="+getElementValue("UserInput04"+addrType)+"&Route="+getElementValue("Route")
        +"&PromptSet="+getElementValue("PromptSet")+"&Command="+getElementValue("Command")+"&addressType="+addrType+"&Moniker="+moniker;
    } else {
        params = "UserInput01="+getElementValue("UserInput01"+addrType)+"&UserInput02="+getElementValue("UserInput02"+addrType)+"&Route="+getElementValue("Route")
        +"&PromptSet="+getElementValue("PromptSet")+"&Command="+getElementValue("Command")+"&addressType="+addrType;
    }
    
    if(altType) {
        return sendXMLDoc(params, SISTIC_API_ContextPath + "QasController.do",
        getAddrOpt(addrType),SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showtablePrompt.jsp?addrType="+addrType+"&error=0");
    } else {
        return sendXMLDoc(params, SISTIC_API_ContextPath + "QasController.do",
        getAddrOpt(addrType),SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showdata.jsp?addrType="+addrType+"&error=0");
    }
}

function getAddrOpt(addrType) {
    var result;
    if(addrType==BUSINESS) {
        result = "radioAddrType2";
    } else if (addrType==OFFICE) {
        result = "radioAddrType3";
    } else {
        result = "radioAddrType1";
    }
    return result;
}

function saveNonSgToSession(addrType,bInput) {
    var params = EMPTY_STR;
    if(bInput) {
        params = dummyInit(addrType);
    } else {
        params = getAddrData(addrType);
    }
    
    sendXMLDoc(params, SISTIC_API_ContextPath + "SaveQasAddr.do",
        getAddrOpt(addrType), SISTIC_API_ContextPath + "jsp/ebooking/qas/ajax_showdata.jsp?addrType="+addrType+"&foreign=1");
}

function getAddrData(addrType) {
    var country = getElementItem(addrType+"Address4").value;
    if(country!="SINGAPORE") {
        return ("Address0="+getElementValue(addrType+"Address0")+"&Address1="+getElementValue(addrType+"Address1")+
                "&Address2="+getElementValue(addrType+"Address2")+"&Address3="+getElementValue(addrType+"Address3")+
                "&Address4="+getElementValue(addrType+"Address4")+"&addressType="+addrType+"&update=1");
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
    var params = getFullAddressData();
    sendXMLDoc(params, SISTIC_API_ContextPath + "SaveAllQasAddr.do", EMPTY_STR, SISTIC_API_ContextPath + "ViewShoppingCart.do");
}

function getIdentification() {
    var formObject = getFormObj("patronInputForm");
    var id = formObject.identificationNumber;
    if(id!=null && id!=undefined) {
        return ("&identificationNumber="+(id.value));
    } else {
        return EMPTY_STR;
    }
}

function getAddressType() {
    var formObject = getFormObj("patronInputForm");
    var addrT = formObject.addressType;
    if(addrT!=null) {
        return ("&addressType="+(getSelectedDropDownListValue(addrT)));
    } else {
        return EMPTY_STR;
    }
}

function getKeyword() {
    var formObject = getFormObj("patronInputForm");
    var keyword = formObject.txtKeyword;
    if(keyword!=null) {
        return ("&keyword="+(keyword.value));
    } else {
        return EMPTY_STR;
    }
}

function checkDataAvail(addrType) {
    if(addrType=="H") {
        return getElementValue("HAddress0");
    } else if(addrType=="B") {
        return getElementValue("BAddress0");
    } else {
        return getElementValue("OAddress0");
    }
}

function getAddrOnly() {
    var homeData = EMPTY_STR;
    if(getElementValue("HAddress0")!=EMPTY_STR) {
        homeData = ("HAddress0="+getElementValue("HAddress0")+"&HAddress1="+getElementValue("HAddress1")+
                    "&HAddress2="+getElementValue("HAddress2")+    
                    "&HAddress3="+getElementValue("HAddress3")+"&HAddress4="+getElementValue("HAddress4"));
    }
    
    var businessData = EMPTY_STR;
    if(getElementValue("BAddress0")!=EMPTY_STR) {
        businessData = ("&BAddress0="+getElementValue("BAddress0")+"&BAddress1="+getElementValue("BAddress1")+
                        "&BAddress2="+getElementValue("BAddress2")+
                        "&BAddress3="+getElementValue("BAddress3")+"&BAddress4="+getElementValue("BAddress4"));
    }
    
    var otherData = EMPTY_STR;
    if(getElementValue("OAddress0")!=EMPTY_STR) {
        otherData = ("&OAddress0="+getElementValue("OAddress0")+"&OAddress1="+getElementValue("OAddress1")+
                     "&OAddress2="+getElementValue("OAddress2")+
                     "&OAddress3="+getElementValue("OAddress3")+"&OAddress4="+getElementValue("OAddress4"));
    }
    return (homeData+businessData+otherData);
}

function saveMobile() {
    var formObject = getFormObj("patronInputForm");
    var mobile = EMPTY_STR;
    var ccDelivery = formObject.txtCountryCodeDelivery;
    var acDelivery = formObject.txtAreaCodeDelivery;
    var pDelivery = formObject.txtPhoneDelivery;
    
    if(ccDelivery!=null && ccDelivery.value!=EMPTY_STR) {mobile = "&phoneDC="+ccDelivery;}
    if(acDelivery!=null && acDelivery.value!=EMPTY_STR) {mobile = mobile + "&phoneDA="+acDelivery;}
    if(pDelivery!=null && pDelivery.value!=EMPTY_STR) {mobile = mobile + "&phoneD="+pDelivery;}
    return mobile;
}

function getSisOrg() {
    var formObject = getFormObj("patronInputForm");
    var org = formObject.txtSubscribeBuzz.value;
    if(org!=EMPTY_STR) {return ("&subscribeSistic="+org);}return EMPTY_STR;
}

function getSubOrg() {
    var formObject = getFormObj("patronInputForm");
    var org = formObject.txtSubscribeOrganiser.value;
    if(org!=EMPTY_STR) {return ("&subscribeOrgniser="+org);}return EMPTY_STR;
}

function getVenOrg() {
    var formObject = getFormObj("patronInputForm");
    var venue = formObject.txtSubscribeVenue.value;
    if(venue!=EMPTY_STR) {return ("&subscribeVenue="+venue);}return EMPTY_STR;
}

function getPhoneO() {
    var formObject = getFormObj("patronInputForm");
    var phoneO = EMPTY_STR;
    
    var ccHome = formObject.txtCountryCodeOffice.value;
    if(ccHome!=EMPTY_STR) {phoneO = "&phoneOC=" + ccHome;}
    
    var acHome = formObject.txtAreaCodeOffice.value;
    if(acHome!=EMPTY_STR) {phoneO = phoneO + "&phoneOA=" + acHome;}
    
    var pHome = formObject.txtPhoneOffice.value;
    if(pHome!=EMPTY_STR) {phoneO = phoneO + "&phoneO=" + pHome;}
    
    return phoneO;    
}

function getPhoneB() {
    var formObject = getFormObj("patronInputForm");
    var phoneB = EMPTY_STR;
    
    var ccHome = formObject.txtCountryCodeMobile.value;
    if(ccHome!=EMPTY_STR) {phoneB = "&phoneMC=" + ccHome;}
    
    var acHome = formObject.txtAreaCodeMobile.value;
    if(acHome!=EMPTY_STR) {phoneB = phoneB + "&phoneMA=" + acHome;}
    
    var pHome = formObject.txtPhoneMobile.value;
    if(pHome!=EMPTY_STR) {phoneB = phoneB + "&phoneM=" + pHome;}
    
    return phoneB;
}

function getPhoneH() {
    var formObject = getFormObj("patronInputForm");
    var phoneH = EMPTY_STR;
    
    var ccHome = formObject.txtCountryCodeHome.value;
    if(ccHome!=EMPTY_STR) {phoneH = "&phoneHC=" + ccHome;}
    
    var acHome = formObject.txtAreaCodeHome.value;
    if(acHome!=EMPTY_STR) {phoneH = phoneH + "&phoneHA=" + acHome;}
    
    var pHome = formObject.txtPhoneHome.value;
    if(pHome!=EMPTY_STR) {phoneH = phoneH + "&phoneH=" + pHome;}
    
    return phoneH;
}

function minOneAddr() {
    var homeAddr = getElementValue("HAddress0");
    var businessAddr = getElementValue("BAddress0");
    var otherAddr = getElementValue("OAddress0");
    
    var hCountry = getElementItem("HAddress4");
    var bCountry = getElementItem("BAddress4");
    var oCountry = getElementItem("OAddress4");
    
    var sgTxt = "SINGAPORE";
    
    if(hCountry==null && bCountry==null && oCountry==null) {
        return false;
    } else if(homeAddr==EMPTY_STR && businessAddr==EMPTY_STR && otherAddr==EMPTY_STR) {
        return false;
    } else if(hCountry!=null && hCountry.value!=sgTxt && homeAddr==EMPTY_STR) {
        return false;
    } else if(bCountry!=null && bCountry.value!=sgTxt && businessAddr==EMPTY_STR) {
        return false;
    } else if(oCountry!=null && oCountry.value!=sgTxt && otherAddr==EMPTY_STR) {
        return false;
    } else {
        return true;
    }
}

function getFullAddressData() {
    var formObject = getFormObj("patronInputForm");
    var orgName = EMPTY_STR;
    if(formObject.txtOrgName.value!=EMPTY_STR) {
        orgName = "&organizationName="+formObject.txtOrgName.value;
    }
    
    return (getAddrOnly()+getPhoneH()+getPhoneB()+getPhoneO()+getSubOrg()+getVenOrg()+getSisOrg()+saveMobile()+
        
     "&firstName="+(formObject.firstName.value)+"&lastName="+(formObject.lastName.value)+
     "&gender="+(getSelectedRadioButtonValue(formObject.radioGender))+getIdentification()+
     "&birthOfDay="+(getSelectedDropDownListValue(formObject.selectDay))+"&birthOfMonth="+(getSelectedDropDownListValue(formObject.selectMonth))+
     "&birthOfYear="+(getSelectedDropDownListValue(formObject.selectYear))+orgName+getKeyword()+getAddressType()+
     
     "&nationality="+(getSelectedDropDownListValue(formObject.selectNationality))+
     "&countryOfResidence="+(getSelectedDropDownListValue(formObject.selectCountryOfResidence)));
}

function submitCommand(addrType) {
    var selItem = getElementItem("Moniker");
    var value = selItem.options[selItem.selectedIndex].value;
    postQAS(addrType,true,value);
}

function initialAddrSelected(formName) {
    var formObj = document.forms[formName];
    var dropdownListName = "selectCountry";  

    // check that address don't exceed 25 characters.
    //   if it does, null it.
    var addrH1 = patronInfo.addr[0].addrLine1;
    var addrH2 = patronInfo.addr[0].addrLine2;
    var addrH3 = patronInfo.addr[0].addrLine3;
    if (addrH1.length > 25 || addrH2.length > 25 || addrH3.length > 25) {
        formObj.txtAddrLine1.value = ""; 
        formObj.txtAddrLine2.value = "";
        formObj.txtAddrLine3.value = "";
        formObj.txtPostal.value = "";
    }else{		 
        formObj.txtAddrLine1.value = patronInfo.addr[0].addrLine1; 
        formObj.txtAddrLine2.value = patronInfo.addr[0].addrLine2;
        formObj.txtAddrLine3.value = patronInfo.addr[0].addrLine3;
        formObj.txtPostal.value    = patronInfo.addr[0].postal;
    }
    setSelectedDropDownList(formName,dropdownListName,patronInfo.addr[0].country); 
    formObj.txtAddrLine1.value = toUpperTrim(formObj.txtAddrLine1.value);
    formObj.txtAddrLine2.value = toUpperTrim(formObj.txtAddrLine2.value);
    formObj.txtAddrLine3.value = toUpperTrim(formObj.txtAddrLine3.value);
    currSelectedAddrType = 'H';
}

function onClickAddrType(formName, addrTypeRadioObj) { 
    if(formName==null) {
        alert('formName is null');
            return;
    }
    var formObj = document.forms[formName];
    if(formObj==null) {
        alert('Invalid form name: '+formName);
            return;
    }

    if(addrTypeRadioObj==null) {
        alert('addrTypeRadioObj is null');
            return;
    }
    var dropdownListName = "selectCountry";   
    	
    // Capture the value before showing the next selected address type
    onBlurAddrType(formName,currSelectedAddrType);
    
    var valueBeforeClick = addrTypeRadioObj.value;   
    if(valueBeforeClick == "H") {         
         var addrH1 = patronInfo.addr[0].addrLine1;
         var addrH2 = patronInfo.addr[0].addrLine2;
         var addrH3 = patronInfo.addr[0].addrLine3;
         if (addrH1.length > 48 || addrH2.length > 48 || addrH3.length > 48) {
            formObj.txtAddrLine1.value = ""; 
            formObj.txtAddrLine2.value = "";
            formObj.txtAddrLine3.value = "";
            formObj.txtPostal.value = "";
         }else{		 
            formObj.txtAddrLine1.value = patronInfo.addr[0].addrLine1; 
            formObj.txtAddrLine2.value = patronInfo.addr[0].addrLine2;
            formObj.txtAddrLine3.value = patronInfo.addr[0].addrLine3;
            formObj.txtPostal.value    = patronInfo.addr[0].postal;
         }
         setSelectedDropDownList(formName,dropdownListName,patronInfo.addr[0].country);		 
         currSelectedAddrType = 'H';         
    } else if(valueBeforeClick == "B") {
         var addrB1 = patronInfo.addr[1].addrLine1;
         var addrB2 = patronInfo.addr[1].addrLine2;
         var addrB3 = patronInfo.addr[1].addrLine3;
         if (addrB1.length > 48 || addrB2.length > 48 || addrB3.length > 48) {
            formObj.txtAddrLine1.value = "";
            formObj.txtAddrLine2.value = "";
            formObj.txtAddrLine3.value = "";
            formObj.txtPostal.value    = "";
         }else{
            formObj.txtAddrLine1.value = patronInfo.addr[1].addrLine1; 
            formObj.txtAddrLine2.value = patronInfo.addr[1].addrLine2;
            formObj.txtAddrLine3.value = patronInfo.addr[1].addrLine3;
            formObj.txtPostal.value    = patronInfo.addr[1].postal;
         }
         setSelectedDropDownList(formName,dropdownListName,patronInfo.addr[1].country);
         currSelectedAddrType = 'B';    
    } else if(valueBeforeClick == "O") {
         var addrO1 = patronInfo.addr[2].addrLine1;
         var addrO2 = patronInfo.addr[2].addrLine2;
         var addrO3 = patronInfo.addr[2].addrLine3;
         if (addrO1.length > 48 || addrO2.length > 48 || addrO3.length > 48) {
            formObj.txtAddrLine1.value = ""; 
            formObj.txtAddrLine2.value = "";
            formObj.txtAddrLine3.value = "";
            formObj.txtPostal.value    = "";
         }else{
            formObj.txtAddrLine1.value = patronInfo.addr[2].addrLine1; 
            formObj.txtAddrLine2.value = patronInfo.addr[2].addrLine2;
            formObj.txtAddrLine3.value = patronInfo.addr[2].addrLine3;
            formObj.txtPostal.value    = patronInfo.addr[2].postal;
         }	 
         setSelectedDropDownList(formName,dropdownListName,patronInfo.addr[2].country);
         currSelectedAddrType = 'O';
    }
    
    formObj.txtAddrLine1.value = toUpperTrim(formObj.txtAddrLine1.value);
    formObj.txtAddrLine2.value = toUpperTrim(formObj.txtAddrLine2.value);
    formObj.txtAddrLine3.value = toUpperTrim(formObj.txtAddrLine3.value);
}

function onBlurAddrType(formName, valueBeforeClick) {
    if(formName==null) {
        alert('formName is null');
            return;
    }
    
    var formObj = document.forms[formName];
    if(formObj==null) {
        alert('Invalid form name: '+formName);
            return;
    }

    if(valueBeforeClick == "H") {
         // populate the existing home address with values in the text box
         patronInfo.addr[0].addrLine1 = formObj.txtAddrLine1.value;
         patronInfo.addr[0].addrLine2 = formObj.txtAddrLine2.value;
         patronInfo.addr[0].addrLine3 = formObj.txtAddrLine3.value;        
         patronInfo.addr[0].postal    = formObj.txtPostal.value;
         patronInfo.addr[0].country   = formObj.selectCountry.options[formObj.selectCountry.selectedIndex].value;
         
    } else if(valueBeforeClick == "B") {
         // populate the existing business address with values in the text box
         patronInfo.addr[1].addrLine1 = formObj.txtAddrLine1.value;
         patronInfo.addr[1].addrLine2 = formObj.txtAddrLine2.value;
         patronInfo.addr[1].addrLine3 = formObj.txtAddrLine3.value;           
         patronInfo.addr[1].postal    = formObj.txtPostal.value;
         patronInfo.addr[1].country   = formObj.selectCountry.options[formObj.selectCountry.selectedIndex].value;
                  
    } else if(valueBeforeClick == "O") {
         // populate the existing others address with values in the text box
         patronInfo.addr[2].addrLine1 = formObj.txtAddrLine1.value;
         patronInfo.addr[2].addrLine2 = formObj.txtAddrLine2.value;
         patronInfo.addr[2].addrLine3 = formObj.txtAddrLine3.value;       
         patronInfo.addr[2].postal    = formObj.txtPostal.value;       
         patronInfo.addr[2].country   = formObj.selectCountry.options[formObj.selectCountry.selectedIndex].value;  
    } 
}

function newAddrAssign(submitForm, patronInfo) {
    submitForm.addressLine1H.value = patronInfo.addr[0].addrLine1;
    submitForm.addressLine2H.value = patronInfo.addr[0].addrLine2;
    submitForm.addressLine3H.value = patronInfo.addr[0].addrLine3;
    submitForm.postalCodeH.value   = patronInfo.addr[0].postal;
    submitForm.countryH.value      = patronInfo.addr[0].country;

    submitForm.addressLine1B.value = patronInfo.addr[1].addrLine1;
    submitForm.addressLine2B.value = patronInfo.addr[1].addrLine2;
    submitForm.addressLine3B.value = patronInfo.addr[1].addrLine3;
    submitForm.postalCodeB.value   = patronInfo.addr[1].postal;
    submitForm.countryB.value      = patronInfo.addr[1].country;

    submitForm.addressLine1O.value = patronInfo.addr[2].addrLine1;
    submitForm.addressLine2O.value = patronInfo.addr[2].addrLine2;
    submitForm.addressLine3O.value = patronInfo.addr[2].addrLine3;
    submitForm.postalCodeO.value   = patronInfo.addr[2].postal;
    submitForm.countryO.value      = patronInfo.addr[2].country;
}



//05-08-2012 Added by Webster - newBookFlow, addon, Qas 
function postQAS2(addrType,altType,moniker) {
  if(moniker==EMPTY_STR && !checkItemNull(addrType,altType)) {
      alert("All fields are mandatory!");
      return false;
  }    
  
  var params = EMPTY_STR;
  if(altType) {
      params = "UserInput01="+getElementValue("UserInput01")+"&UserInput03="+getElementValue("UserInput03")
      +"&UserInput04="+getElementValue("UserInput04")+"&Route="+getElementValue("Route")
      +"&PromptSet="+getElementValue("PromptSet")+"&Command="+getElementValue("Command")+"&addressType="+addrType+"&Moniker="+moniker;
  } else {
      params = "UserInput01="+getElementValue("UserInput01")+"&UserInput02="+getElementValue("UserInput02")+"&Route="+getElementValue("Route")
      +"&PromptSet="+getElementValue("PromptSet")+"&Command="+getElementValue("Command")+"&addressType="+addrType;
  }
    
  //18-08-2012 Added by Webster - newBookFlow, addon, Qas 
  //updated by shenghou - add a cache buster to url to guaranty that it always hit the server
  return sendXMLDoc2(params, SISTIC_API_ContextPath + "Qas2Controller.do",
      	"addrHiddenFields",SISTIC_API_ContextPath + "jsp/login/qas/ajax_addrfields.jsp?addrType="+addrType + "&cache="+(Math.random()*100000), addrType, altType);

}


//05-08-2012 Added by Webster - newBookFlow, addon, Qas
function sendXMLDoc2(params, url, elementId, url2, addrType, altType) {
  
  var ajaxRequest;  // The variable that makes Ajax possible!
  try{
      // Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
  } catch (e){
      // Internet Explorer Browsers
      try{
          ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
          try{
              ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e){
              alert("Unsupported web browser! Please use another browser.");
              return false;
          }
      }
  }
   
  ajaxRequest.onreadystatechange=function() {
      if (ajaxRequest.readyState==4 && ajaxRequest.status==200) {
          loadXMLDoc2(elementId, url2, addrType, altType);
      }
  }
  
  ajaxRequest.open("POST",url,true);
  ajaxRequest.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  ajaxRequest.setRequestHeader("Content-length", params.length);
  ajaxRequest.setRequestHeader("Connection", "close");
  ajaxRequest.send(params);
}


//10-09-2012 Added by Webster - newBookFlow, addon, Qas
function loadXMLDoc2(elementId,url, addrType, altType) {
  var ajaxRequest;  // The variable that makes Ajax possible!
  try{
      // Opera 8.0+, Firefox, Safari
      ajaxRequest = new XMLHttpRequest();
  } catch (e){
      // Internet Explorer Browsers
      try{
          ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
          try{
              ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e){
              alert("Unsupported web browser! Please use another browser.");
              return false;
          }
      }
  }
  
  ajaxRequest.onreadystatechange=function() {
      if (ajaxRequest.readyState==4 && ajaxRequest.status==200) {
          getElementItem(elementId).innerHTML=ajaxRequest.responseText;
          setFullAddr(addrType, altType);
      }
  }
  ajaxRequest.open("GET",url,true);
  ajaxRequest.send(null);
}