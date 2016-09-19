//---------------------------------------------------------------------
// eportal_common.js
// Utilities javascript used by the eportal application
//
// @author Leong Kong Chung, Alfred
//---------------------------------------------------------------------



//-----------------------------------------------------------------

// The following functions will allow flashing of text in the jsp

// page.

//

// Refer to internet_checkout_page.jsp on how to use these

// functions

//-----------------------------------------------------------------

// global variable - used by show() hide() and doBlick2() functions

   var stat = 0;



   function show(loginWaitMsg) {

      if (document.layers && document.layers[loginWaitMsg])

        document.layers[loginWaitMsg].visibility = 'visible';

      else if (document.all) {

        document.all[loginWaitMsg].style.visibility = 'visible';

        document.all[loginWaitMsg].style.zIndex = 100;

      }

   }



   function hide(loginWaitMsg) {

      if (document.layers && document.layers[loginWaitMsg])

        document.layers[loginWaitMsg].visibility = 'hidden';

      else if (document.all)

        document.all[loginWaitMsg].style.visibility = 'hidden';

   }



   function doBlink2(flashMsgName) {

         if (stat==0) {

            hide(flashMsgName); stat=1;

         } else {

            show(flashMsgName); stat=0;

         }

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




//---------------------------------------------------------------------
// Retrieve selected value from the dropdown list.
//
// @param dropDownListObj A drop down list in the form.
//
// @return Value associated with the selected item in the drop down list.
//---------------------------------------------------------------------
function getSelectedDropDownListValue(dropDownListObj) {
    if(dropDownListObj==null) {
        alert('Drop down list object is null');
        return null;
    }
    return dropDownListObj.options[dropDownListObj.selectedIndex].value;
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
   if (typeof inputString != "string") { return inputString; }
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


//---------------------------------------------------------------------
// Check whether an input text is null or empty.
//
// @param inputString String to be checked.
//
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



//-----------------------------------------------------------------------------------
// Performs a validation of input date
// 
// @param dateStr Input date string
// 
// @return true if the input string is a valid date format or false otherwise.
//-----------------------------------------------------------------------------------
function isValidDateDDMMYY(dateStr) {
	 if(dateStr==null || typeof dateStr != "string" || dateStr.length!=6) {
	    return false;	
	 }
	 
	 // Syntax checking ...
	 var regex = /^[0-9]{6}$/;
	 if(!regex.test(dateStr)) {
	 	   return false;
	 }
	 
	 var dd = dateStr.substring(0,2);
	 var mm = dateStr.substring(2,4);
	 var yy = dateStr.substring(4,6);
	 	 
	 var regexMM = /^0[1-9]|1[0-2]$/;
	 var regexDD = /^[0-2][1-9]|3[0-1]$/;
	 
	 if(!regexMM.test(mm)) {
	 	   return false;
	 }
	 
	 if(!regexDD.test(dd)) {
	 	   return false;
	 }
	 
	 // Semantics checking 
	 var iDD = parseInt(dd);
	 var iMM = parseInt(mm);
	 var iYY = parseInt(yy);
	 
	 if(iMM==2) {
	 	   if(iDD>29) {
	 	   	   return false;
	 	   }
	 	   
	 	   if((iYY%2)!=0 && iDD>28) {
	 	   	   // not an even year, impossible to be leap year also.
	 	   	   return false;
	 	   }
	 	   
	 	   // check for leap year here
	 } else if(iMM==4 || iMM==6 || iMM==7 || iMM==9 || iMM==11) {
	 	   if(iDD>30) {
	 	   	    return false;
	 	   }
	 } else {
	     // iMM==1 || iMM==3 || iMM==5 || iMM==8 || iMM==10 || iMM==12)
	 	   // these are the months with up to 31 days
	 	   // no further checking is required here.
	 }
	 return true;
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
	  
    validEmailRE = /^([a-zA-Z0-9._][a-zA-Z0-9._\-]+@([a-zA-Z]+(.[a-zA-Z0-9\-]+){0,4})|[a-zA-Z0-9_]+@([1-9][0-9]{0,2}(.[1-9][0-9]{0,2}){3}))$/;
    return validEmailRE.test(emailText);    
}


//------------------------------------------------------------------------------------
// This function check whether an input object contains numeric digits only
// and it's length has to match the totalDigits input field.
//
// @param inputDigits Input containing the digits
// @param totalDigits Total number of digits that should be in inputDigits
//
// @return true if the total number of digits in inputDigits matches totalDigits field
//         false otherwise.
//-------------------------------------------------------------------------------------
function containsNDigits(inputDigits, totalDigits) {
	  if(inputDigits==null || totalDigits==null) {
	       return false;	
	  }
	  
	  if(typeof inputDigits != "string" || typeof totalDigits != "string") {
	  	   return false;
	  }
	  
	  numericRE = /^[0-9]+$/;
	  
	  if(!numericRE.test(inputDigits)) {
	  	  return false;
	  }
	  
	  if(!numericRE.test(totalDigits)) {
	  	  return false;
	  }
	  return (inputDigits.length == parseInt(totalDigits));
}


//------------------------------------------------------------------------------------
// This function check whether an input object contains numeric digits only
//
// @param inputDigits Input containing the digits
//
// @return true if the field contains only numeric digits
//-------------------------------------------------------------------------------------
function containsDigitsOnly(inputDigits) {
	  if(inputDigits==null) {
	       return false;	
	  }
	  
	  if(typeof inputDigits != "string") {
               return false;
	  }
	  
	  numericRE = /^[0-9]+$/;
	  
	  if(!numericRE.test(inputDigits)) {
	  	  return false;
	  }
          
          return true;
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
    
    // alert('Sum = '+sum+', Remainder = '+remain+', Suffix = '+suffix+', Actual Suffix = '+suffixArray[remain]);
    
    return suffix==suffixArray[remain];
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