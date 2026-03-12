function sendSupportMessage(){
const msg=document.getElementById("supportMessage").value;
if(msg.trim()===""){
alert("Please enter a message.");
return
}
alert("Thank you! Support will contact you soon.\nMessage: "+msg);
document.getElementById("supportMessage").value="";
closeSupportBox()
}

// Load products when page opens
window.onload=function(){
selectCategory("netflix")
}
