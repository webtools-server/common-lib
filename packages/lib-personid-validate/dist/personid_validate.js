!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?module.exports=r():"function"==typeof define&&define.amd?define(r):e.personidValidate=r()}(this,function(){"use strict";function e(e){var n=0,o=e.personId.substr(6,4),a=parseInt(e.personId.substr(10,2),10),s=parseInt(e.personId.substr(12,2),10);if(e.personId.substr(6,8)!==t(new Date(o+"/"+a+"/"+s)))return e.errMsg;if(e.minAge||e.maxAge){var i=new Date(1e3*e.timeStamp),g=i.getMonth()+1,u=i.getDate();if(n=i.getFullYear()-o,g<a?n-=1:g===a?u<s?n-=1:u>=s&&(n+=1):n+=1,e.minAge&&e.minAge>n)return e.ageMsg;if(e.maxAge&&e.maxAge<=n)return e.ageMsg}return r(e)}function r(e){for(var r=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2],t=e.personId.length-1,n=0,o=0;o<t;o++)n+=e.personId[o]*r[o];return e.personId[t].toUpperCase()==="10X98765432"[n%11]||e.errMsg}function t(e){if(e instanceof Date){var r=e.getFullYear(),t=e.getMonth()+1,n=e.getDate();return t=t<10?"0"+t:t,n=n<10?"0"+n:n,String(r)+String(t)+String(n)}return""}var n=Object.assign||function(e){for(var r=1;r<arguments.length;r++){var t=arguments[r];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},o={minAge:0,maxAge:0,ageMsg:"",timeStamp:Date.now()/1e3,personId:"0",errMsg:"身份证号格式错误"};return function(r){return e(n({},o,r))}});