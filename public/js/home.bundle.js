!function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,t),i.l=!0,i.exports}var o={};t.m=e,t.c=o,t.i=function(e){return e},t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=19)}({11:function(e,t,o){e.exports=o.p+"assets/svgs/logo_with_circle.685dacc.svg"},12:function(e,t,o){e.exports=o.p+"assets/videos/video0001_loop.28a0e75.mp4"},13:function(e,t,o){e.exports=o.p+"assets/videos/video0001_loop.c1a4f32.webm"},19:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(){var e=this;this.currentPath=window.location.pathname,this.bgVideo=document.querySelector(".bg-video"),this.logoEl=document.querySelector(".logo"),this.videos=[{file:c.default,type:"video/mp4"},{file:s.default,type:"video/webm"}],this.createVideoSource=function(t,o){var n=document.createElement("source");n.src=t,n.type=o,e.bgVideo.appendChild(n)},this.initialize=function(){e.videos.forEach(function(t){return e.createVideoSource(t.file,t.type)}),e.logoEl.src=l.default}}var r=o(12),c=n(r),u=o(13),s=n(u),a=o(11),l=n(a);(new i).initialize()}});