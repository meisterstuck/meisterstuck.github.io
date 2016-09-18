/**
 * Pei Shan - 20111021
 * Update of Promotion Banner
 */
/*
var SISTIC_API_ContextPath = '/VCLTicketing/';
var js = document.createElement("jquery-latest.js");
js.type = "text/javascript";
js.src = SISTIC_API_ContextPath + "js/";
document.appendChild(js);
*/
function getElementId(elementId) {
    return document.getElementById(elementId);
}

// Step 3 - Small Icon update
function updatePaymentPageSmallIcon(elementId) {
    var element = getElementId(elementId);
    element.innerHTML="&nbsp;<a href=\"http://www.sistic.com.sg/promotions\" target=\"_blank\"><img src=\"/portal/images/sistic/mcImage.jpg\" border=\"0\"></a>";
}

// Step 2 - Big Banner update
function updateStep2BigBanner() {
    //var element = getElementId(elementId);
    $("#closeIcon")
        .css({"className":"body1","zIndex":"4000","position":"absolute","top":"155px","left":"665px","cursor":"hand",
            "cursor":"pointer","color":"#FFFFFF","fontWeight":"bold"})
        .html("Close");
    $("#advImg")
        .css({"zIndex":"3000","position":"absolute","top":"145px","left":"295px"})
        .html("<a href=\"http://www.sistic.com.sg/promotions\" target=\"_blank\"><img src=\"http://porbk01.sistic.com.sg:8080/portal/images/sistic/blankImg.jpg\" border=\"0\"></a>");
    
    $("#advImg").hide();
    $("#closeIcon").hide();    
    
    if ($("#advImg").is(":hidden")) {
        $("#advImg").slideDown(2000);
        $(document).ready(function(){
              $("#closeIcon").fadeIn();
        });
    };
    $("#closeIcon").click(function() {
        $("#advImg").stop(true,true).hide();
        $("#closeIcon").stop(true,true).hide();
    });
}


