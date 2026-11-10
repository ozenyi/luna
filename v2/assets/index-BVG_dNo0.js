(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();var Iu={exports:{}},wr={},Pu={exports:{}},R={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ds=Symbol.for("react.element"),sd=Symbol.for("react.portal"),rd=Symbol.for("react.fragment"),id=Symbol.for("react.strict_mode"),od=Symbol.for("react.profiler"),ad=Symbol.for("react.provider"),ud=Symbol.for("react.context"),ld=Symbol.for("react.forward_ref"),cd=Symbol.for("react.suspense"),dd=Symbol.for("react.memo"),pd=Symbol.for("react.lazy"),ga=Symbol.iterator;function md(e){return e===null||typeof e!="object"?null:(e=ga&&e[ga]||e["@@iterator"],typeof e=="function"?e:null)}var Du={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},zu=Object.assign,Tu={};function Ct(e,n,t){this.props=e,this.context=n,this.refs=Tu,this.updater=t||Du}Ct.prototype.isReactComponent={};Ct.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Ct.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Au(){}Au.prototype=Ct.prototype;function ho(e,n,t){this.props=e,this.context=n,this.refs=Tu,this.updater=t||Du}var yo=ho.prototype=new Au;yo.constructor=ho;zu(yo,Ct.prototype);yo.isPureReactComponent=!0;var ha=Array.isArray,Mu=Object.prototype.hasOwnProperty,xo={current:null},Ru={key:!0,ref:!0,__self:!0,__source:!0};function _u(e,n,t){var s,r={},i=null,a=null;if(n!=null)for(s in n.ref!==void 0&&(a=n.ref),n.key!==void 0&&(i=""+n.key),n)Mu.call(n,s)&&!Ru.hasOwnProperty(s)&&(r[s]=n[s]);var u=arguments.length-2;if(u===1)r.children=t;else if(1<u){for(var l=Array(u),c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}if(e&&e.defaultProps)for(s in u=e.defaultProps,u)r[s]===void 0&&(r[s]=u[s]);return{$$typeof:ds,type:e,key:i,ref:a,props:r,_owner:xo.current}}function fd(e,n){return{$$typeof:ds,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function qo(e){return typeof e=="object"&&e!==null&&e.$$typeof===ds}function vd(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var ya=/\/+/g;function Br(e,n){return typeof e=="object"&&e!==null&&e.key!=null?vd(""+e.key):n.toString(36)}function Os(e,n,t,s,r){var i=typeof e;(i==="undefined"||i==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(i){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case ds:case sd:a=!0}}if(a)return a=e,r=r(a),e=s===""?"."+Br(a,0):s,ha(r)?(t="",e!=null&&(t=e.replace(ya,"$&/")+"/"),Os(r,n,t,"",function(c){return c})):r!=null&&(qo(r)&&(r=fd(r,t+(!r.key||a&&a.key===r.key?"":(""+r.key).replace(ya,"$&/")+"/")+e)),n.push(r)),1;if(a=0,s=s===""?".":s+":",ha(e))for(var u=0;u<e.length;u++){i=e[u];var l=s+Br(i,u);a+=Os(i,n,t,l,r)}else if(l=md(e),typeof l=="function")for(e=l.call(e),u=0;!(i=e.next()).done;)i=i.value,l=s+Br(i,u++),a+=Os(i,n,t,l,r);else if(i==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return a}function ys(e,n,t){if(e==null)return e;var s=[],r=0;return Os(e,s,"","",function(i){return n.call(t,i,r++)}),s}function gd(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ge={current:null},Vs={transition:null},hd={ReactCurrentDispatcher:ge,ReactCurrentBatchConfig:Vs,ReactCurrentOwner:xo};function Uu(){throw Error("act(...) is not supported in production builds of React.")}R.Children={map:ys,forEach:function(e,n,t){ys(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return ys(e,function(){n++}),n},toArray:function(e){return ys(e,function(n){return n})||[]},only:function(e){if(!qo(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};R.Component=Ct;R.Fragment=rd;R.Profiler=od;R.PureComponent=ho;R.StrictMode=id;R.Suspense=cd;R.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=hd;R.act=Uu;R.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=zu({},e.props),r=e.key,i=e.ref,a=e._owner;if(n!=null){if(n.ref!==void 0&&(i=n.ref,a=xo.current),n.key!==void 0&&(r=""+n.key),e.type&&e.type.defaultProps)var u=e.type.defaultProps;for(l in n)Mu.call(n,l)&&!Ru.hasOwnProperty(l)&&(s[l]=n[l]===void 0&&u!==void 0?u[l]:n[l])}var l=arguments.length-2;if(l===1)s.children=t;else if(1<l){u=Array(l);for(var c=0;c<l;c++)u[c]=arguments[c+2];s.children=u}return{$$typeof:ds,type:e.type,key:r,ref:i,props:s,_owner:a}};R.createContext=function(e){return e={$$typeof:ud,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:ad,_context:e},e.Consumer=e};R.createElement=_u;R.createFactory=function(e){var n=_u.bind(null,e);return n.type=e,n};R.createRef=function(){return{current:null}};R.forwardRef=function(e){return{$$typeof:ld,render:e}};R.isValidElement=qo;R.lazy=function(e){return{$$typeof:pd,_payload:{_status:-1,_result:e},_init:gd}};R.memo=function(e,n){return{$$typeof:dd,type:e,compare:n===void 0?null:n}};R.startTransition=function(e){var n=Vs.transition;Vs.transition={};try{e()}finally{Vs.transition=n}};R.unstable_act=Uu;R.useCallback=function(e,n){return ge.current.useCallback(e,n)};R.useContext=function(e){return ge.current.useContext(e)};R.useDebugValue=function(){};R.useDeferredValue=function(e){return ge.current.useDeferredValue(e)};R.useEffect=function(e,n){return ge.current.useEffect(e,n)};R.useId=function(){return ge.current.useId()};R.useImperativeHandle=function(e,n,t){return ge.current.useImperativeHandle(e,n,t)};R.useInsertionEffect=function(e,n){return ge.current.useInsertionEffect(e,n)};R.useLayoutEffect=function(e,n){return ge.current.useLayoutEffect(e,n)};R.useMemo=function(e,n){return ge.current.useMemo(e,n)};R.useReducer=function(e,n,t){return ge.current.useReducer(e,n,t)};R.useRef=function(e){return ge.current.useRef(e)};R.useState=function(e){return ge.current.useState(e)};R.useSyncExternalStore=function(e,n,t){return ge.current.useSyncExternalStore(e,n,t)};R.useTransition=function(){return ge.current.useTransition()};R.version="18.3.1";Pu.exports=R;var P=Pu.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yd=P,xd=Symbol.for("react.element"),qd=Symbol.for("react.fragment"),Cd=Object.prototype.hasOwnProperty,Sd=yd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Ld={key:!0,ref:!0,__self:!0,__source:!0};function Ou(e,n,t){var s,r={},i=null,a=null;t!==void 0&&(i=""+t),n.key!==void 0&&(i=""+n.key),n.ref!==void 0&&(a=n.ref);for(s in n)Cd.call(n,s)&&!Ld.hasOwnProperty(s)&&(r[s]=n[s]);if(e&&e.defaultProps)for(s in n=e.defaultProps,n)r[s]===void 0&&(r[s]=n[s]);return{$$typeof:xd,type:e,key:i,ref:a,props:r,_owner:Sd.current}}wr.Fragment=qd;wr.jsx=Ou;wr.jsxs=Ou;Iu.exports=wr;var o=Iu.exports,Vu={exports:{}},Ee={},Fu={exports:{}},$u={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(w,T){var M=w.length;w.push(T);e:for(;0<M;){var X=M-1>>>1,se=w[X];if(0<r(se,T))w[X]=T,w[M]=se,M=X;else break e}}function t(w){return w.length===0?null:w[0]}function s(w){if(w.length===0)return null;var T=w[0],M=w.pop();if(M!==T){w[0]=M;e:for(var X=0,se=w.length,gs=se>>>1;X<gs;){var In=2*(X+1)-1,Qr=w[In],Pn=In+1,hs=w[Pn];if(0>r(Qr,M))Pn<se&&0>r(hs,Qr)?(w[X]=hs,w[Pn]=M,X=Pn):(w[X]=Qr,w[In]=M,X=In);else if(Pn<se&&0>r(hs,M))w[X]=hs,w[Pn]=M,X=Pn;else break e}}return T}function r(w,T){var M=w.sortIndex-T.sortIndex;return M!==0?M:w.id-T.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;e.unstable_now=function(){return i.now()}}else{var a=Date,u=a.now();e.unstable_now=function(){return a.now()-u}}var l=[],c=[],f=1,g=null,v=3,y=!1,C=!1,L=!1,D=typeof setTimeout=="function"?setTimeout:null,p=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(w){for(var T=t(c);T!==null;){if(T.callback===null)s(c);else if(T.startTime<=w)s(c),T.sortIndex=T.expirationTime,n(l,T);else break;T=t(c)}}function h(w){if(L=!1,m(w),!C)if(t(l)!==null)C=!0,$r(j);else{var T=t(c);T!==null&&Gr(h,T.startTime-w)}}function j(w,T){C=!1,L&&(L=!1,p(I),I=-1),y=!0;var M=v;try{for(m(T),g=t(l);g!==null&&(!(g.expirationTime>T)||w&&!Me());){var X=g.callback;if(typeof X=="function"){g.callback=null,v=g.priorityLevel;var se=X(g.expirationTime<=T);T=e.unstable_now(),typeof se=="function"?g.callback=se:g===t(l)&&s(l),m(T)}else s(l);g=t(l)}if(g!==null)var gs=!0;else{var In=t(c);In!==null&&Gr(h,In.startTime-T),gs=!1}return gs}finally{g=null,v=M,y=!1}}var N=!1,k=null,I=-1,J=5,_=-1;function Me(){return!(e.unstable_now()-_<J)}function jt(){if(k!==null){var w=e.unstable_now();_=w;var T=!0;try{T=k(!0,w)}finally{T?bt():(N=!1,k=null)}}else N=!1}var bt;if(typeof d=="function")bt=function(){d(jt)};else if(typeof MessageChannel<"u"){var va=new MessageChannel,td=va.port2;va.port1.onmessage=jt,bt=function(){td.postMessage(null)}}else bt=function(){D(jt,0)};function $r(w){k=w,N||(N=!0,bt())}function Gr(w,T){I=D(function(){w(e.unstable_now())},T)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(w){w.callback=null},e.unstable_continueExecution=function(){C||y||(C=!0,$r(j))},e.unstable_forceFrameRate=function(w){0>w||125<w?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):J=0<w?Math.floor(1e3/w):5},e.unstable_getCurrentPriorityLevel=function(){return v},e.unstable_getFirstCallbackNode=function(){return t(l)},e.unstable_next=function(w){switch(v){case 1:case 2:case 3:var T=3;break;default:T=v}var M=v;v=T;try{return w()}finally{v=M}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(w,T){switch(w){case 1:case 2:case 3:case 4:case 5:break;default:w=3}var M=v;v=w;try{return T()}finally{v=M}},e.unstable_scheduleCallback=function(w,T,M){var X=e.unstable_now();switch(typeof M=="object"&&M!==null?(M=M.delay,M=typeof M=="number"&&0<M?X+M:X):M=X,w){case 1:var se=-1;break;case 2:se=250;break;case 5:se=1073741823;break;case 4:se=1e4;break;default:se=5e3}return se=M+se,w={id:f++,callback:T,priorityLevel:w,startTime:M,expirationTime:se,sortIndex:-1},M>X?(w.sortIndex=M,n(c,w),t(l)===null&&w===t(c)&&(L?(p(I),I=-1):L=!0,Gr(h,M-X))):(w.sortIndex=se,n(l,w),C||y||(C=!0,$r(j))),w},e.unstable_shouldYield=Me,e.unstable_wrapCallback=function(w){var T=v;return function(){var M=v;v=T;try{return w.apply(this,arguments)}finally{v=M}}}})($u);Fu.exports=$u;var jd=Fu.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bd=P,we=jd;function q(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Gu=new Set,Wt={};function Bn(e,n){ft(e,n),ft(e+"Capture",n)}function ft(e,n){for(Wt[e]=n,e=0;e<n.length;e++)Gu.add(n[e])}var nn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Li=Object.prototype.hasOwnProperty,wd=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,xa={},qa={};function Ed(e){return Li.call(qa,e)?!0:Li.call(xa,e)?!1:wd.test(e)?qa[e]=!0:(xa[e]=!0,!1)}function Nd(e,n,t,s){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return s?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function kd(e,n,t,s){if(n===null||typeof n>"u"||Nd(e,n,t,s))return!0;if(s)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function he(e,n,t,s,r,i,a){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=s,this.attributeNamespace=r,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=i,this.removeEmptyString=a}var ue={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){ue[e]=new he(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];ue[n]=new he(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){ue[e]=new he(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){ue[e]=new he(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){ue[e]=new he(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){ue[e]=new he(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){ue[e]=new he(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){ue[e]=new he(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){ue[e]=new he(e,5,!1,e.toLowerCase(),null,!1,!1)});var Co=/[\-:]([a-z])/g;function So(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Co,So);ue[n]=new he(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Co,So);ue[n]=new he(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Co,So);ue[n]=new he(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){ue[e]=new he(e,1,!1,e.toLowerCase(),null,!1,!1)});ue.xlinkHref=new he("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){ue[e]=new he(e,1,!1,e.toLowerCase(),null,!0,!0)});function Lo(e,n,t,s){var r=ue.hasOwnProperty(n)?ue[n]:null;(r!==null?r.type!==0:s||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(kd(n,t,r,s)&&(t=null),s||r===null?Ed(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):r.mustUseProperty?e[r.propertyName]=t===null?r.type===3?!1:"":t:(n=r.attributeName,s=r.attributeNamespace,t===null?e.removeAttribute(n):(r=r.type,t=r===3||r===4&&t===!0?"":""+t,s?e.setAttributeNS(s,n,t):e.setAttribute(n,t))))}var on=bd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,xs=Symbol.for("react.element"),Yn=Symbol.for("react.portal"),Jn=Symbol.for("react.fragment"),jo=Symbol.for("react.strict_mode"),ji=Symbol.for("react.profiler"),Qu=Symbol.for("react.provider"),Bu=Symbol.for("react.context"),bo=Symbol.for("react.forward_ref"),bi=Symbol.for("react.suspense"),wi=Symbol.for("react.suspense_list"),wo=Symbol.for("react.memo"),dn=Symbol.for("react.lazy"),Hu=Symbol.for("react.offscreen"),Ca=Symbol.iterator;function wt(e){return e===null||typeof e!="object"?null:(e=Ca&&e[Ca]||e["@@iterator"],typeof e=="function"?e:null)}var K=Object.assign,Hr;function At(e){if(Hr===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);Hr=n&&n[1]||""}return`
`+Hr+e}var Wr=!1;function Kr(e,n){if(!e||Wr)return"";Wr=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(c){var s=c}Reflect.construct(e,[],n)}else{try{n.call()}catch(c){s=c}e.call(n.prototype)}else{try{throw Error()}catch(c){s=c}e()}}catch(c){if(c&&s&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),i=s.stack.split(`
`),a=r.length-1,u=i.length-1;1<=a&&0<=u&&r[a]!==i[u];)u--;for(;1<=a&&0<=u;a--,u--)if(r[a]!==i[u]){if(a!==1||u!==1)do if(a--,u--,0>u||r[a]!==i[u]){var l=`
`+r[a].replace(" at new "," at ");return e.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",e.displayName)),l}while(1<=a&&0<=u);break}}}finally{Wr=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?At(e):""}function Id(e){switch(e.tag){case 5:return At(e.type);case 16:return At("Lazy");case 13:return At("Suspense");case 19:return At("SuspenseList");case 0:case 2:case 15:return e=Kr(e.type,!1),e;case 11:return e=Kr(e.type.render,!1),e;case 1:return e=Kr(e.type,!0),e;default:return""}}function Ei(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Jn:return"Fragment";case Yn:return"Portal";case ji:return"Profiler";case jo:return"StrictMode";case bi:return"Suspense";case wi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Bu:return(e.displayName||"Context")+".Consumer";case Qu:return(e._context.displayName||"Context")+".Provider";case bo:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case wo:return n=e.displayName||null,n!==null?n:Ei(e.type)||"Memo";case dn:n=e._payload,e=e._init;try{return Ei(e(n))}catch{}}return null}function Pd(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Ei(n);case 8:return n===jo?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function bn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Wu(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Dd(e){var n=Wu(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),s=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var r=t.get,i=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return r.call(this)},set:function(a){s=""+a,i.call(this,a)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return s},setValue:function(a){s=""+a},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function qs(e){e._valueTracker||(e._valueTracker=Dd(e))}function Ku(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),s="";return e&&(s=Wu(e)?e.checked?"true":"false":e.value),e=s,e!==t?(n.setValue(e),!0):!1}function nr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Ni(e,n){var t=n.checked;return K({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function Sa(e,n){var t=n.defaultValue==null?"":n.defaultValue,s=n.checked!=null?n.checked:n.defaultChecked;t=bn(n.value!=null?n.value:t),e._wrapperState={initialChecked:s,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Yu(e,n){n=n.checked,n!=null&&Lo(e,"checked",n,!1)}function ki(e,n){Yu(e,n);var t=bn(n.value),s=n.type;if(t!=null)s==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Ii(e,n.type,t):n.hasOwnProperty("defaultValue")&&Ii(e,n.type,bn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function La(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var s=n.type;if(!(s!=="submit"&&s!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Ii(e,n,t){(n!=="number"||nr(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Mt=Array.isArray;function ut(e,n,t,s){if(e=e.options,n){n={};for(var r=0;r<t.length;r++)n["$"+t[r]]=!0;for(t=0;t<e.length;t++)r=n.hasOwnProperty("$"+e[t].value),e[t].selected!==r&&(e[t].selected=r),r&&s&&(e[t].defaultSelected=!0)}else{for(t=""+bn(t),n=null,r=0;r<e.length;r++){if(e[r].value===t){e[r].selected=!0,s&&(e[r].defaultSelected=!0);return}n!==null||e[r].disabled||(n=e[r])}n!==null&&(n.selected=!0)}}function Pi(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(q(91));return K({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function ja(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(q(92));if(Mt(t)){if(1<t.length)throw Error(q(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:bn(t)}}function Ju(e,n){var t=bn(n.value),s=bn(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),s!=null&&(e.defaultValue=""+s)}function ba(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Xu(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Di(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Xu(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Cs,Zu=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,s,r){MSApp.execUnsafeLocalFunction(function(){return e(n,t,s,r)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Cs=Cs||document.createElement("div"),Cs.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Cs.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function Kt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Ut={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},zd=["Webkit","ms","Moz","O"];Object.keys(Ut).forEach(function(e){zd.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Ut[n]=Ut[e]})});function el(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Ut.hasOwnProperty(e)&&Ut[e]?(""+n).trim():n+"px"}function nl(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var s=t.indexOf("--")===0,r=el(t,n[t],s);t==="float"&&(t="cssFloat"),s?e.setProperty(t,r):e[t]=r}}var Td=K({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function zi(e,n){if(n){if(Td[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(q(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(q(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(q(61))}if(n.style!=null&&typeof n.style!="object")throw Error(q(62))}}function Ti(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ai=null;function Eo(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Mi=null,lt=null,ct=null;function wa(e){if(e=fs(e)){if(typeof Mi!="function")throw Error(q(280));var n=e.stateNode;n&&(n=Pr(n),Mi(e.stateNode,e.type,n))}}function tl(e){lt?ct?ct.push(e):ct=[e]:lt=e}function sl(){if(lt){var e=lt,n=ct;if(ct=lt=null,wa(e),n)for(e=0;e<n.length;e++)wa(n[e])}}function rl(e,n){return e(n)}function il(){}var Yr=!1;function ol(e,n,t){if(Yr)return e(n,t);Yr=!0;try{return rl(e,n,t)}finally{Yr=!1,(lt!==null||ct!==null)&&(il(),sl())}}function Yt(e,n){var t=e.stateNode;if(t===null)return null;var s=Pr(t);if(s===null)return null;t=s[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(q(231,n,typeof t));return t}var Ri=!1;if(nn)try{var Et={};Object.defineProperty(Et,"passive",{get:function(){Ri=!0}}),window.addEventListener("test",Et,Et),window.removeEventListener("test",Et,Et)}catch{Ri=!1}function Ad(e,n,t,s,r,i,a,u,l){var c=Array.prototype.slice.call(arguments,3);try{n.apply(t,c)}catch(f){this.onError(f)}}var Ot=!1,tr=null,sr=!1,_i=null,Md={onError:function(e){Ot=!0,tr=e}};function Rd(e,n,t,s,r,i,a,u,l){Ot=!1,tr=null,Ad.apply(Md,arguments)}function _d(e,n,t,s,r,i,a,u,l){if(Rd.apply(this,arguments),Ot){if(Ot){var c=tr;Ot=!1,tr=null}else throw Error(q(198));sr||(sr=!0,_i=c)}}function Hn(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function al(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Ea(e){if(Hn(e)!==e)throw Error(q(188))}function Ud(e){var n=e.alternate;if(!n){if(n=Hn(e),n===null)throw Error(q(188));return n!==e?null:e}for(var t=e,s=n;;){var r=t.return;if(r===null)break;var i=r.alternate;if(i===null){if(s=r.return,s!==null){t=s;continue}break}if(r.child===i.child){for(i=r.child;i;){if(i===t)return Ea(r),e;if(i===s)return Ea(r),n;i=i.sibling}throw Error(q(188))}if(t.return!==s.return)t=r,s=i;else{for(var a=!1,u=r.child;u;){if(u===t){a=!0,t=r,s=i;break}if(u===s){a=!0,s=r,t=i;break}u=u.sibling}if(!a){for(u=i.child;u;){if(u===t){a=!0,t=i,s=r;break}if(u===s){a=!0,s=i,t=r;break}u=u.sibling}if(!a)throw Error(q(189))}}if(t.alternate!==s)throw Error(q(190))}if(t.tag!==3)throw Error(q(188));return t.stateNode.current===t?e:n}function ul(e){return e=Ud(e),e!==null?ll(e):null}function ll(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=ll(e);if(n!==null)return n;e=e.sibling}return null}var cl=we.unstable_scheduleCallback,Na=we.unstable_cancelCallback,Od=we.unstable_shouldYield,Vd=we.unstable_requestPaint,Z=we.unstable_now,Fd=we.unstable_getCurrentPriorityLevel,No=we.unstable_ImmediatePriority,dl=we.unstable_UserBlockingPriority,rr=we.unstable_NormalPriority,$d=we.unstable_LowPriority,pl=we.unstable_IdlePriority,Er=null,He=null;function Gd(e){if(He&&typeof He.onCommitFiberRoot=="function")try{He.onCommitFiberRoot(Er,e,void 0,(e.current.flags&128)===128)}catch{}}var Ve=Math.clz32?Math.clz32:Hd,Qd=Math.log,Bd=Math.LN2;function Hd(e){return e>>>=0,e===0?32:31-(Qd(e)/Bd|0)|0}var Ss=64,Ls=4194304;function Rt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ir(e,n){var t=e.pendingLanes;if(t===0)return 0;var s=0,r=e.suspendedLanes,i=e.pingedLanes,a=t&268435455;if(a!==0){var u=a&~r;u!==0?s=Rt(u):(i&=a,i!==0&&(s=Rt(i)))}else a=t&~r,a!==0?s=Rt(a):i!==0&&(s=Rt(i));if(s===0)return 0;if(n!==0&&n!==s&&!(n&r)&&(r=s&-s,i=n&-n,r>=i||r===16&&(i&4194240)!==0))return n;if(s&4&&(s|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=s;0<n;)t=31-Ve(n),r=1<<t,s|=e[t],n&=~r;return s}function Wd(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Kd(e,n){for(var t=e.suspendedLanes,s=e.pingedLanes,r=e.expirationTimes,i=e.pendingLanes;0<i;){var a=31-Ve(i),u=1<<a,l=r[a];l===-1?(!(u&t)||u&s)&&(r[a]=Wd(u,n)):l<=n&&(e.expiredLanes|=u),i&=~u}}function Ui(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ml(){var e=Ss;return Ss<<=1,!(Ss&4194240)&&(Ss=64),e}function Jr(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function ps(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Ve(n),e[n]=t}function Yd(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<t;){var r=31-Ve(t),i=1<<r;n[r]=0,s[r]=-1,e[r]=-1,t&=~i}}function ko(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var s=31-Ve(t),r=1<<s;r&n|e[s]&n&&(e[s]|=n),t&=~r}}var F=0;function fl(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var vl,Io,gl,hl,yl,Oi=!1,js=[],hn=null,yn=null,xn=null,Jt=new Map,Xt=new Map,mn=[],Jd="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ka(e,n){switch(e){case"focusin":case"focusout":hn=null;break;case"dragenter":case"dragleave":yn=null;break;case"mouseover":case"mouseout":xn=null;break;case"pointerover":case"pointerout":Jt.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":Xt.delete(n.pointerId)}}function Nt(e,n,t,s,r,i){return e===null||e.nativeEvent!==i?(e={blockedOn:n,domEventName:t,eventSystemFlags:s,nativeEvent:i,targetContainers:[r]},n!==null&&(n=fs(n),n!==null&&Io(n)),e):(e.eventSystemFlags|=s,n=e.targetContainers,r!==null&&n.indexOf(r)===-1&&n.push(r),e)}function Xd(e,n,t,s,r){switch(n){case"focusin":return hn=Nt(hn,e,n,t,s,r),!0;case"dragenter":return yn=Nt(yn,e,n,t,s,r),!0;case"mouseover":return xn=Nt(xn,e,n,t,s,r),!0;case"pointerover":var i=r.pointerId;return Jt.set(i,Nt(Jt.get(i)||null,e,n,t,s,r)),!0;case"gotpointercapture":return i=r.pointerId,Xt.set(i,Nt(Xt.get(i)||null,e,n,t,s,r)),!0}return!1}function xl(e){var n=Mn(e.target);if(n!==null){var t=Hn(n);if(t!==null){if(n=t.tag,n===13){if(n=al(t),n!==null){e.blockedOn=n,yl(e.priority,function(){gl(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Fs(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=Vi(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var s=new t.constructor(t.type,t);Ai=s,t.target.dispatchEvent(s),Ai=null}else return n=fs(t),n!==null&&Io(n),e.blockedOn=t,!1;n.shift()}return!0}function Ia(e,n,t){Fs(e)&&t.delete(n)}function Zd(){Oi=!1,hn!==null&&Fs(hn)&&(hn=null),yn!==null&&Fs(yn)&&(yn=null),xn!==null&&Fs(xn)&&(xn=null),Jt.forEach(Ia),Xt.forEach(Ia)}function kt(e,n){e.blockedOn===n&&(e.blockedOn=null,Oi||(Oi=!0,we.unstable_scheduleCallback(we.unstable_NormalPriority,Zd)))}function Zt(e){function n(r){return kt(r,e)}if(0<js.length){kt(js[0],e);for(var t=1;t<js.length;t++){var s=js[t];s.blockedOn===e&&(s.blockedOn=null)}}for(hn!==null&&kt(hn,e),yn!==null&&kt(yn,e),xn!==null&&kt(xn,e),Jt.forEach(n),Xt.forEach(n),t=0;t<mn.length;t++)s=mn[t],s.blockedOn===e&&(s.blockedOn=null);for(;0<mn.length&&(t=mn[0],t.blockedOn===null);)xl(t),t.blockedOn===null&&mn.shift()}var dt=on.ReactCurrentBatchConfig,or=!0;function ep(e,n,t,s){var r=F,i=dt.transition;dt.transition=null;try{F=1,Po(e,n,t,s)}finally{F=r,dt.transition=i}}function np(e,n,t,s){var r=F,i=dt.transition;dt.transition=null;try{F=4,Po(e,n,t,s)}finally{F=r,dt.transition=i}}function Po(e,n,t,s){if(or){var r=Vi(e,n,t,s);if(r===null)ai(e,n,s,ar,t),ka(e,s);else if(Xd(r,e,n,t,s))s.stopPropagation();else if(ka(e,s),n&4&&-1<Jd.indexOf(e)){for(;r!==null;){var i=fs(r);if(i!==null&&vl(i),i=Vi(e,n,t,s),i===null&&ai(e,n,s,ar,t),i===r)break;r=i}r!==null&&s.stopPropagation()}else ai(e,n,s,null,t)}}var ar=null;function Vi(e,n,t,s){if(ar=null,e=Eo(s),e=Mn(e),e!==null)if(n=Hn(e),n===null)e=null;else if(t=n.tag,t===13){if(e=al(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return ar=e,null}function ql(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Fd()){case No:return 1;case dl:return 4;case rr:case $d:return 16;case pl:return 536870912;default:return 16}default:return 16}}var vn=null,Do=null,$s=null;function Cl(){if($s)return $s;var e,n=Do,t=n.length,s,r="value"in vn?vn.value:vn.textContent,i=r.length;for(e=0;e<t&&n[e]===r[e];e++);var a=t-e;for(s=1;s<=a&&n[t-s]===r[i-s];s++);return $s=r.slice(e,1<s?1-s:void 0)}function Gs(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function bs(){return!0}function Pa(){return!1}function Ne(e){function n(t,s,r,i,a){this._reactName=t,this._targetInst=r,this.type=s,this.nativeEvent=i,this.target=a,this.currentTarget=null;for(var u in e)e.hasOwnProperty(u)&&(t=e[u],this[u]=t?t(i):i[u]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?bs:Pa,this.isPropagationStopped=Pa,this}return K(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=bs)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=bs)},persist:function(){},isPersistent:bs}),n}var St={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zo=Ne(St),ms=K({},St,{view:0,detail:0}),tp=Ne(ms),Xr,Zr,It,Nr=K({},ms,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:To,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==It&&(It&&e.type==="mousemove"?(Xr=e.screenX-It.screenX,Zr=e.screenY-It.screenY):Zr=Xr=0,It=e),Xr)},movementY:function(e){return"movementY"in e?e.movementY:Zr}}),Da=Ne(Nr),sp=K({},Nr,{dataTransfer:0}),rp=Ne(sp),ip=K({},ms,{relatedTarget:0}),ei=Ne(ip),op=K({},St,{animationName:0,elapsedTime:0,pseudoElement:0}),ap=Ne(op),up=K({},St,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),lp=Ne(up),cp=K({},St,{data:0}),za=Ne(cp),dp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},pp={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},mp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function fp(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=mp[e])?!!n[e]:!1}function To(){return fp}var vp=K({},ms,{key:function(e){if(e.key){var n=dp[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Gs(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?pp[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:To,charCode:function(e){return e.type==="keypress"?Gs(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Gs(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),gp=Ne(vp),hp=K({},Nr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ta=Ne(hp),yp=K({},ms,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:To}),xp=Ne(yp),qp=K({},St,{propertyName:0,elapsedTime:0,pseudoElement:0}),Cp=Ne(qp),Sp=K({},Nr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Lp=Ne(Sp),jp=[9,13,27,32],Ao=nn&&"CompositionEvent"in window,Vt=null;nn&&"documentMode"in document&&(Vt=document.documentMode);var bp=nn&&"TextEvent"in window&&!Vt,Sl=nn&&(!Ao||Vt&&8<Vt&&11>=Vt),Aa=" ",Ma=!1;function Ll(e,n){switch(e){case"keyup":return jp.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function jl(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Xn=!1;function wp(e,n){switch(e){case"compositionend":return jl(n);case"keypress":return n.which!==32?null:(Ma=!0,Aa);case"textInput":return e=n.data,e===Aa&&Ma?null:e;default:return null}}function Ep(e,n){if(Xn)return e==="compositionend"||!Ao&&Ll(e,n)?(e=Cl(),$s=Do=vn=null,Xn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Sl&&n.locale!=="ko"?null:n.data;default:return null}}var Np={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ra(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Np[e.type]:n==="textarea"}function bl(e,n,t,s){tl(s),n=ur(n,"onChange"),0<n.length&&(t=new zo("onChange","change",null,t,s),e.push({event:t,listeners:n}))}var Ft=null,es=null;function kp(e){Ml(e,0)}function kr(e){var n=nt(e);if(Ku(n))return e}function Ip(e,n){if(e==="change")return n}var wl=!1;if(nn){var ni;if(nn){var ti="oninput"in document;if(!ti){var _a=document.createElement("div");_a.setAttribute("oninput","return;"),ti=typeof _a.oninput=="function"}ni=ti}else ni=!1;wl=ni&&(!document.documentMode||9<document.documentMode)}function Ua(){Ft&&(Ft.detachEvent("onpropertychange",El),es=Ft=null)}function El(e){if(e.propertyName==="value"&&kr(es)){var n=[];bl(n,es,e,Eo(e)),ol(kp,n)}}function Pp(e,n,t){e==="focusin"?(Ua(),Ft=n,es=t,Ft.attachEvent("onpropertychange",El)):e==="focusout"&&Ua()}function Dp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return kr(es)}function zp(e,n){if(e==="click")return kr(n)}function Tp(e,n){if(e==="input"||e==="change")return kr(n)}function Ap(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var $e=typeof Object.is=="function"?Object.is:Ap;function ns(e,n){if($e(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),s=Object.keys(n);if(t.length!==s.length)return!1;for(s=0;s<t.length;s++){var r=t[s];if(!Li.call(n,r)||!$e(e[r],n[r]))return!1}return!0}function Oa(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Va(e,n){var t=Oa(e);e=0;for(var s;t;){if(t.nodeType===3){if(s=e+t.textContent.length,e<=n&&s>=n)return{node:t,offset:n-e};e=s}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=Oa(t)}}function Nl(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?Nl(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function kl(){for(var e=window,n=nr();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=nr(e.document)}return n}function Mo(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function Mp(e){var n=kl(),t=e.focusedElem,s=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&Nl(t.ownerDocument.documentElement,t)){if(s!==null&&Mo(t)){if(n=s.start,e=s.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var r=t.textContent.length,i=Math.min(s.start,r);s=s.end===void 0?i:Math.min(s.end,r),!e.extend&&i>s&&(r=s,s=i,i=r),r=Va(t,i);var a=Va(t,s);r&&a&&(e.rangeCount!==1||e.anchorNode!==r.node||e.anchorOffset!==r.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(n=n.createRange(),n.setStart(r.node,r.offset),e.removeAllRanges(),i>s?(e.addRange(n),e.extend(a.node,a.offset)):(n.setEnd(a.node,a.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var Rp=nn&&"documentMode"in document&&11>=document.documentMode,Zn=null,Fi=null,$t=null,$i=!1;function Fa(e,n,t){var s=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;$i||Zn==null||Zn!==nr(s)||(s=Zn,"selectionStart"in s&&Mo(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),$t&&ns($t,s)||($t=s,s=ur(Fi,"onSelect"),0<s.length&&(n=new zo("onSelect","select",null,n,t),e.push({event:n,listeners:s}),n.target=Zn)))}function ws(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var et={animationend:ws("Animation","AnimationEnd"),animationiteration:ws("Animation","AnimationIteration"),animationstart:ws("Animation","AnimationStart"),transitionend:ws("Transition","TransitionEnd")},si={},Il={};nn&&(Il=document.createElement("div").style,"AnimationEvent"in window||(delete et.animationend.animation,delete et.animationiteration.animation,delete et.animationstart.animation),"TransitionEvent"in window||delete et.transitionend.transition);function Ir(e){if(si[e])return si[e];if(!et[e])return e;var n=et[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in Il)return si[e]=n[t];return e}var Pl=Ir("animationend"),Dl=Ir("animationiteration"),zl=Ir("animationstart"),Tl=Ir("transitionend"),Al=new Map,$a="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function En(e,n){Al.set(e,n),Bn(n,[e])}for(var ri=0;ri<$a.length;ri++){var ii=$a[ri],_p=ii.toLowerCase(),Up=ii[0].toUpperCase()+ii.slice(1);En(_p,"on"+Up)}En(Pl,"onAnimationEnd");En(Dl,"onAnimationIteration");En(zl,"onAnimationStart");En("dblclick","onDoubleClick");En("focusin","onFocus");En("focusout","onBlur");En(Tl,"onTransitionEnd");ft("onMouseEnter",["mouseout","mouseover"]);ft("onMouseLeave",["mouseout","mouseover"]);ft("onPointerEnter",["pointerout","pointerover"]);ft("onPointerLeave",["pointerout","pointerover"]);Bn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Bn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Bn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Bn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Bn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Bn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var _t="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Op=new Set("cancel close invalid load scroll toggle".split(" ").concat(_t));function Ga(e,n,t){var s=e.type||"unknown-event";e.currentTarget=t,_d(s,n,void 0,e),e.currentTarget=null}function Ml(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var s=e[t],r=s.event;s=s.listeners;e:{var i=void 0;if(n)for(var a=s.length-1;0<=a;a--){var u=s[a],l=u.instance,c=u.currentTarget;if(u=u.listener,l!==i&&r.isPropagationStopped())break e;Ga(r,u,c),i=l}else for(a=0;a<s.length;a++){if(u=s[a],l=u.instance,c=u.currentTarget,u=u.listener,l!==i&&r.isPropagationStopped())break e;Ga(r,u,c),i=l}}}if(sr)throw e=_i,sr=!1,_i=null,e}function G(e,n){var t=n[Wi];t===void 0&&(t=n[Wi]=new Set);var s=e+"__bubble";t.has(s)||(Rl(n,e,2,!1),t.add(s))}function oi(e,n,t){var s=0;n&&(s|=4),Rl(t,e,s,n)}var Es="_reactListening"+Math.random().toString(36).slice(2);function ts(e){if(!e[Es]){e[Es]=!0,Gu.forEach(function(t){t!=="selectionchange"&&(Op.has(t)||oi(t,!1,e),oi(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Es]||(n[Es]=!0,oi("selectionchange",!1,n))}}function Rl(e,n,t,s){switch(ql(n)){case 1:var r=ep;break;case 4:r=np;break;default:r=Po}t=r.bind(null,n,t,e),r=void 0,!Ri||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(r=!0),s?r!==void 0?e.addEventListener(n,t,{capture:!0,passive:r}):e.addEventListener(n,t,!0):r!==void 0?e.addEventListener(n,t,{passive:r}):e.addEventListener(n,t,!1)}function ai(e,n,t,s,r){var i=s;if(!(n&1)&&!(n&2)&&s!==null)e:for(;;){if(s===null)return;var a=s.tag;if(a===3||a===4){var u=s.stateNode.containerInfo;if(u===r||u.nodeType===8&&u.parentNode===r)break;if(a===4)for(a=s.return;a!==null;){var l=a.tag;if((l===3||l===4)&&(l=a.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;a=a.return}for(;u!==null;){if(a=Mn(u),a===null)return;if(l=a.tag,l===5||l===6){s=i=a;continue e}u=u.parentNode}}s=s.return}ol(function(){var c=i,f=Eo(t),g=[];e:{var v=Al.get(e);if(v!==void 0){var y=zo,C=e;switch(e){case"keypress":if(Gs(t)===0)break e;case"keydown":case"keyup":y=gp;break;case"focusin":C="focus",y=ei;break;case"focusout":C="blur",y=ei;break;case"beforeblur":case"afterblur":y=ei;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Da;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=rp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=xp;break;case Pl:case Dl:case zl:y=ap;break;case Tl:y=Cp;break;case"scroll":y=tp;break;case"wheel":y=Lp;break;case"copy":case"cut":case"paste":y=lp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Ta}var L=(n&4)!==0,D=!L&&e==="scroll",p=L?v!==null?v+"Capture":null:v;L=[];for(var d=c,m;d!==null;){m=d;var h=m.stateNode;if(m.tag===5&&h!==null&&(m=h,p!==null&&(h=Yt(d,p),h!=null&&L.push(ss(d,h,m)))),D)break;d=d.return}0<L.length&&(v=new y(v,C,null,t,f),g.push({event:v,listeners:L}))}}if(!(n&7)){e:{if(v=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",v&&t!==Ai&&(C=t.relatedTarget||t.fromElement)&&(Mn(C)||C[tn]))break e;if((y||v)&&(v=f.window===f?f:(v=f.ownerDocument)?v.defaultView||v.parentWindow:window,y?(C=t.relatedTarget||t.toElement,y=c,C=C?Mn(C):null,C!==null&&(D=Hn(C),C!==D||C.tag!==5&&C.tag!==6)&&(C=null)):(y=null,C=c),y!==C)){if(L=Da,h="onMouseLeave",p="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(L=Ta,h="onPointerLeave",p="onPointerEnter",d="pointer"),D=y==null?v:nt(y),m=C==null?v:nt(C),v=new L(h,d+"leave",y,t,f),v.target=D,v.relatedTarget=m,h=null,Mn(f)===c&&(L=new L(p,d+"enter",C,t,f),L.target=m,L.relatedTarget=D,h=L),D=h,y&&C)n:{for(L=y,p=C,d=0,m=L;m;m=Wn(m))d++;for(m=0,h=p;h;h=Wn(h))m++;for(;0<d-m;)L=Wn(L),d--;for(;0<m-d;)p=Wn(p),m--;for(;d--;){if(L===p||p!==null&&L===p.alternate)break n;L=Wn(L),p=Wn(p)}L=null}else L=null;y!==null&&Qa(g,v,y,L,!1),C!==null&&D!==null&&Qa(g,D,C,L,!0)}}e:{if(v=c?nt(c):window,y=v.nodeName&&v.nodeName.toLowerCase(),y==="select"||y==="input"&&v.type==="file")var j=Ip;else if(Ra(v))if(wl)j=Tp;else{j=Dp;var N=Pp}else(y=v.nodeName)&&y.toLowerCase()==="input"&&(v.type==="checkbox"||v.type==="radio")&&(j=zp);if(j&&(j=j(e,c))){bl(g,j,t,f);break e}N&&N(e,v,c),e==="focusout"&&(N=v._wrapperState)&&N.controlled&&v.type==="number"&&Ii(v,"number",v.value)}switch(N=c?nt(c):window,e){case"focusin":(Ra(N)||N.contentEditable==="true")&&(Zn=N,Fi=c,$t=null);break;case"focusout":$t=Fi=Zn=null;break;case"mousedown":$i=!0;break;case"contextmenu":case"mouseup":case"dragend":$i=!1,Fa(g,t,f);break;case"selectionchange":if(Rp)break;case"keydown":case"keyup":Fa(g,t,f)}var k;if(Ao)e:{switch(e){case"compositionstart":var I="onCompositionStart";break e;case"compositionend":I="onCompositionEnd";break e;case"compositionupdate":I="onCompositionUpdate";break e}I=void 0}else Xn?Ll(e,t)&&(I="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(I="onCompositionStart");I&&(Sl&&t.locale!=="ko"&&(Xn||I!=="onCompositionStart"?I==="onCompositionEnd"&&Xn&&(k=Cl()):(vn=f,Do="value"in vn?vn.value:vn.textContent,Xn=!0)),N=ur(c,I),0<N.length&&(I=new za(I,e,null,t,f),g.push({event:I,listeners:N}),k?I.data=k:(k=jl(t),k!==null&&(I.data=k)))),(k=bp?wp(e,t):Ep(e,t))&&(c=ur(c,"onBeforeInput"),0<c.length&&(f=new za("onBeforeInput","beforeinput",null,t,f),g.push({event:f,listeners:c}),f.data=k))}Ml(g,n)})}function ss(e,n,t){return{instance:e,listener:n,currentTarget:t}}function ur(e,n){for(var t=n+"Capture",s=[];e!==null;){var r=e,i=r.stateNode;r.tag===5&&i!==null&&(r=i,i=Yt(e,t),i!=null&&s.unshift(ss(e,i,r)),i=Yt(e,n),i!=null&&s.push(ss(e,i,r))),e=e.return}return s}function Wn(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Qa(e,n,t,s,r){for(var i=n._reactName,a=[];t!==null&&t!==s;){var u=t,l=u.alternate,c=u.stateNode;if(l!==null&&l===s)break;u.tag===5&&c!==null&&(u=c,r?(l=Yt(t,i),l!=null&&a.unshift(ss(t,l,u))):r||(l=Yt(t,i),l!=null&&a.push(ss(t,l,u)))),t=t.return}a.length!==0&&e.push({event:n,listeners:a})}var Vp=/\r\n?/g,Fp=/\u0000|\uFFFD/g;function Ba(e){return(typeof e=="string"?e:""+e).replace(Vp,`
`).replace(Fp,"")}function Ns(e,n,t){if(n=Ba(n),Ba(e)!==n&&t)throw Error(q(425))}function lr(){}var Gi=null,Qi=null;function Bi(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Hi=typeof setTimeout=="function"?setTimeout:void 0,$p=typeof clearTimeout=="function"?clearTimeout:void 0,Ha=typeof Promise=="function"?Promise:void 0,Gp=typeof queueMicrotask=="function"?queueMicrotask:typeof Ha<"u"?function(e){return Ha.resolve(null).then(e).catch(Qp)}:Hi;function Qp(e){setTimeout(function(){throw e})}function ui(e,n){var t=n,s=0;do{var r=t.nextSibling;if(e.removeChild(t),r&&r.nodeType===8)if(t=r.data,t==="/$"){if(s===0){e.removeChild(r),Zt(n);return}s--}else t!=="$"&&t!=="$?"&&t!=="$!"||s++;t=r}while(t);Zt(n)}function qn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function Wa(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var Lt=Math.random().toString(36).slice(2),Be="__reactFiber$"+Lt,rs="__reactProps$"+Lt,tn="__reactContainer$"+Lt,Wi="__reactEvents$"+Lt,Bp="__reactListeners$"+Lt,Hp="__reactHandles$"+Lt;function Mn(e){var n=e[Be];if(n)return n;for(var t=e.parentNode;t;){if(n=t[tn]||t[Be]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=Wa(e);e!==null;){if(t=e[Be])return t;e=Wa(e)}return n}e=t,t=e.parentNode}return null}function fs(e){return e=e[Be]||e[tn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function nt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(q(33))}function Pr(e){return e[rs]||null}var Ki=[],tt=-1;function Nn(e){return{current:e}}function Q(e){0>tt||(e.current=Ki[tt],Ki[tt]=null,tt--)}function $(e,n){tt++,Ki[tt]=e.current,e.current=n}var wn={},me=Nn(wn),qe=Nn(!1),Vn=wn;function vt(e,n){var t=e.type.contextTypes;if(!t)return wn;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===n)return s.__reactInternalMemoizedMaskedChildContext;var r={},i;for(i in t)r[i]=n[i];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=r),r}function Ce(e){return e=e.childContextTypes,e!=null}function cr(){Q(qe),Q(me)}function Ka(e,n,t){if(me.current!==wn)throw Error(q(168));$(me,n),$(qe,t)}function _l(e,n,t){var s=e.stateNode;if(n=n.childContextTypes,typeof s.getChildContext!="function")return t;s=s.getChildContext();for(var r in s)if(!(r in n))throw Error(q(108,Pd(e)||"Unknown",r));return K({},t,s)}function dr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||wn,Vn=me.current,$(me,e),$(qe,qe.current),!0}function Ya(e,n,t){var s=e.stateNode;if(!s)throw Error(q(169));t?(e=_l(e,n,Vn),s.__reactInternalMemoizedMergedChildContext=e,Q(qe),Q(me),$(me,e)):Q(qe),$(qe,t)}var Ye=null,Dr=!1,li=!1;function Ul(e){Ye===null?Ye=[e]:Ye.push(e)}function Wp(e){Dr=!0,Ul(e)}function kn(){if(!li&&Ye!==null){li=!0;var e=0,n=F;try{var t=Ye;for(F=1;e<t.length;e++){var s=t[e];do s=s(!0);while(s!==null)}Ye=null,Dr=!1}catch(r){throw Ye!==null&&(Ye=Ye.slice(e+1)),cl(No,kn),r}finally{F=n,li=!1}}return null}var st=[],rt=0,pr=null,mr=0,Ie=[],Pe=0,Fn=null,Je=1,Xe="";function Tn(e,n){st[rt++]=mr,st[rt++]=pr,pr=e,mr=n}function Ol(e,n,t){Ie[Pe++]=Je,Ie[Pe++]=Xe,Ie[Pe++]=Fn,Fn=e;var s=Je;e=Xe;var r=32-Ve(s)-1;s&=~(1<<r),t+=1;var i=32-Ve(n)+r;if(30<i){var a=r-r%5;i=(s&(1<<a)-1).toString(32),s>>=a,r-=a,Je=1<<32-Ve(n)+r|t<<r|s,Xe=i+e}else Je=1<<i|t<<r|s,Xe=e}function Ro(e){e.return!==null&&(Tn(e,1),Ol(e,1,0))}function _o(e){for(;e===pr;)pr=st[--rt],st[rt]=null,mr=st[--rt],st[rt]=null;for(;e===Fn;)Fn=Ie[--Pe],Ie[Pe]=null,Xe=Ie[--Pe],Ie[Pe]=null,Je=Ie[--Pe],Ie[Pe]=null}var be=null,je=null,B=!1,Oe=null;function Vl(e,n){var t=De(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function Ja(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,be=e,je=qn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,be=e,je=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Fn!==null?{id:Je,overflow:Xe}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=De(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,be=e,je=null,!0):!1;default:return!1}}function Yi(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Ji(e){if(B){var n=je;if(n){var t=n;if(!Ja(e,n)){if(Yi(e))throw Error(q(418));n=qn(t.nextSibling);var s=be;n&&Ja(e,n)?Vl(s,t):(e.flags=e.flags&-4097|2,B=!1,be=e)}}else{if(Yi(e))throw Error(q(418));e.flags=e.flags&-4097|2,B=!1,be=e}}}function Xa(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;be=e}function ks(e){if(e!==be)return!1;if(!B)return Xa(e),B=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!Bi(e.type,e.memoizedProps)),n&&(n=je)){if(Yi(e))throw Fl(),Error(q(418));for(;n;)Vl(e,n),n=qn(n.nextSibling)}if(Xa(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(q(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){je=qn(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}je=null}}else je=be?qn(e.stateNode.nextSibling):null;return!0}function Fl(){for(var e=je;e;)e=qn(e.nextSibling)}function gt(){je=be=null,B=!1}function Uo(e){Oe===null?Oe=[e]:Oe.push(e)}var Kp=on.ReactCurrentBatchConfig;function Pt(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(q(309));var s=t.stateNode}if(!s)throw Error(q(147,e));var r=s,i=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===i?n.ref:(n=function(a){var u=r.refs;a===null?delete u[i]:u[i]=a},n._stringRef=i,n)}if(typeof e!="string")throw Error(q(284));if(!t._owner)throw Error(q(290,e))}return e}function Is(e,n){throw e=Object.prototype.toString.call(n),Error(q(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function Za(e){var n=e._init;return n(e._payload)}function $l(e){function n(p,d){if(e){var m=p.deletions;m===null?(p.deletions=[d],p.flags|=16):m.push(d)}}function t(p,d){if(!e)return null;for(;d!==null;)n(p,d),d=d.sibling;return null}function s(p,d){for(p=new Map;d!==null;)d.key!==null?p.set(d.key,d):p.set(d.index,d),d=d.sibling;return p}function r(p,d){return p=jn(p,d),p.index=0,p.sibling=null,p}function i(p,d,m){return p.index=m,e?(m=p.alternate,m!==null?(m=m.index,m<d?(p.flags|=2,d):m):(p.flags|=2,d)):(p.flags|=1048576,d)}function a(p){return e&&p.alternate===null&&(p.flags|=2),p}function u(p,d,m,h){return d===null||d.tag!==6?(d=gi(m,p.mode,h),d.return=p,d):(d=r(d,m),d.return=p,d)}function l(p,d,m,h){var j=m.type;return j===Jn?f(p,d,m.props.children,h,m.key):d!==null&&(d.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===dn&&Za(j)===d.type)?(h=r(d,m.props),h.ref=Pt(p,d,m),h.return=p,h):(h=Js(m.type,m.key,m.props,null,p.mode,h),h.ref=Pt(p,d,m),h.return=p,h)}function c(p,d,m,h){return d===null||d.tag!==4||d.stateNode.containerInfo!==m.containerInfo||d.stateNode.implementation!==m.implementation?(d=hi(m,p.mode,h),d.return=p,d):(d=r(d,m.children||[]),d.return=p,d)}function f(p,d,m,h,j){return d===null||d.tag!==7?(d=On(m,p.mode,h,j),d.return=p,d):(d=r(d,m),d.return=p,d)}function g(p,d,m){if(typeof d=="string"&&d!==""||typeof d=="number")return d=gi(""+d,p.mode,m),d.return=p,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case xs:return m=Js(d.type,d.key,d.props,null,p.mode,m),m.ref=Pt(p,null,d),m.return=p,m;case Yn:return d=hi(d,p.mode,m),d.return=p,d;case dn:var h=d._init;return g(p,h(d._payload),m)}if(Mt(d)||wt(d))return d=On(d,p.mode,m,null),d.return=p,d;Is(p,d)}return null}function v(p,d,m,h){var j=d!==null?d.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return j!==null?null:u(p,d,""+m,h);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case xs:return m.key===j?l(p,d,m,h):null;case Yn:return m.key===j?c(p,d,m,h):null;case dn:return j=m._init,v(p,d,j(m._payload),h)}if(Mt(m)||wt(m))return j!==null?null:f(p,d,m,h,null);Is(p,m)}return null}function y(p,d,m,h,j){if(typeof h=="string"&&h!==""||typeof h=="number")return p=p.get(m)||null,u(d,p,""+h,j);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case xs:return p=p.get(h.key===null?m:h.key)||null,l(d,p,h,j);case Yn:return p=p.get(h.key===null?m:h.key)||null,c(d,p,h,j);case dn:var N=h._init;return y(p,d,m,N(h._payload),j)}if(Mt(h)||wt(h))return p=p.get(m)||null,f(d,p,h,j,null);Is(d,h)}return null}function C(p,d,m,h){for(var j=null,N=null,k=d,I=d=0,J=null;k!==null&&I<m.length;I++){k.index>I?(J=k,k=null):J=k.sibling;var _=v(p,k,m[I],h);if(_===null){k===null&&(k=J);break}e&&k&&_.alternate===null&&n(p,k),d=i(_,d,I),N===null?j=_:N.sibling=_,N=_,k=J}if(I===m.length)return t(p,k),B&&Tn(p,I),j;if(k===null){for(;I<m.length;I++)k=g(p,m[I],h),k!==null&&(d=i(k,d,I),N===null?j=k:N.sibling=k,N=k);return B&&Tn(p,I),j}for(k=s(p,k);I<m.length;I++)J=y(k,p,I,m[I],h),J!==null&&(e&&J.alternate!==null&&k.delete(J.key===null?I:J.key),d=i(J,d,I),N===null?j=J:N.sibling=J,N=J);return e&&k.forEach(function(Me){return n(p,Me)}),B&&Tn(p,I),j}function L(p,d,m,h){var j=wt(m);if(typeof j!="function")throw Error(q(150));if(m=j.call(m),m==null)throw Error(q(151));for(var N=j=null,k=d,I=d=0,J=null,_=m.next();k!==null&&!_.done;I++,_=m.next()){k.index>I?(J=k,k=null):J=k.sibling;var Me=v(p,k,_.value,h);if(Me===null){k===null&&(k=J);break}e&&k&&Me.alternate===null&&n(p,k),d=i(Me,d,I),N===null?j=Me:N.sibling=Me,N=Me,k=J}if(_.done)return t(p,k),B&&Tn(p,I),j;if(k===null){for(;!_.done;I++,_=m.next())_=g(p,_.value,h),_!==null&&(d=i(_,d,I),N===null?j=_:N.sibling=_,N=_);return B&&Tn(p,I),j}for(k=s(p,k);!_.done;I++,_=m.next())_=y(k,p,I,_.value,h),_!==null&&(e&&_.alternate!==null&&k.delete(_.key===null?I:_.key),d=i(_,d,I),N===null?j=_:N.sibling=_,N=_);return e&&k.forEach(function(jt){return n(p,jt)}),B&&Tn(p,I),j}function D(p,d,m,h){if(typeof m=="object"&&m!==null&&m.type===Jn&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case xs:e:{for(var j=m.key,N=d;N!==null;){if(N.key===j){if(j=m.type,j===Jn){if(N.tag===7){t(p,N.sibling),d=r(N,m.props.children),d.return=p,p=d;break e}}else if(N.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===dn&&Za(j)===N.type){t(p,N.sibling),d=r(N,m.props),d.ref=Pt(p,N,m),d.return=p,p=d;break e}t(p,N);break}else n(p,N);N=N.sibling}m.type===Jn?(d=On(m.props.children,p.mode,h,m.key),d.return=p,p=d):(h=Js(m.type,m.key,m.props,null,p.mode,h),h.ref=Pt(p,d,m),h.return=p,p=h)}return a(p);case Yn:e:{for(N=m.key;d!==null;){if(d.key===N)if(d.tag===4&&d.stateNode.containerInfo===m.containerInfo&&d.stateNode.implementation===m.implementation){t(p,d.sibling),d=r(d,m.children||[]),d.return=p,p=d;break e}else{t(p,d);break}else n(p,d);d=d.sibling}d=hi(m,p.mode,h),d.return=p,p=d}return a(p);case dn:return N=m._init,D(p,d,N(m._payload),h)}if(Mt(m))return C(p,d,m,h);if(wt(m))return L(p,d,m,h);Is(p,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,d!==null&&d.tag===6?(t(p,d.sibling),d=r(d,m),d.return=p,p=d):(t(p,d),d=gi(m,p.mode,h),d.return=p,p=d),a(p)):t(p,d)}return D}var ht=$l(!0),Gl=$l(!1),fr=Nn(null),vr=null,it=null,Oo=null;function Vo(){Oo=it=vr=null}function Fo(e){var n=fr.current;Q(fr),e._currentValue=n}function Xi(e,n,t){for(;e!==null;){var s=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,s!==null&&(s.childLanes|=n)):s!==null&&(s.childLanes&n)!==n&&(s.childLanes|=n),e===t)break;e=e.return}}function pt(e,n){vr=e,Oo=it=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(xe=!0),e.firstContext=null)}function Te(e){var n=e._currentValue;if(Oo!==e)if(e={context:e,memoizedValue:n,next:null},it===null){if(vr===null)throw Error(q(308));it=e,vr.dependencies={lanes:0,firstContext:e}}else it=it.next=e;return n}var Rn=null;function $o(e){Rn===null?Rn=[e]:Rn.push(e)}function Ql(e,n,t,s){var r=n.interleaved;return r===null?(t.next=t,$o(n)):(t.next=r.next,r.next=t),n.interleaved=t,sn(e,s)}function sn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var pn=!1;function Go(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Bl(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Ze(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function Cn(e,n,t){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,O&2){var r=s.pending;return r===null?n.next=n:(n.next=r.next,r.next=n),s.pending=n,sn(e,t)}return r=s.interleaved,r===null?(n.next=n,$o(s)):(n.next=r.next,r.next=n),s.interleaved=n,sn(e,t)}function Qs(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var s=n.lanes;s&=e.pendingLanes,t|=s,n.lanes=t,ko(e,t)}}function eu(e,n){var t=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,t===s)){var r=null,i=null;if(t=t.firstBaseUpdate,t!==null){do{var a={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};i===null?r=i=a:i=i.next=a,t=t.next}while(t!==null);i===null?r=i=n:i=i.next=n}else r=i=n;t={baseState:s.baseState,firstBaseUpdate:r,lastBaseUpdate:i,shared:s.shared,effects:s.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function gr(e,n,t,s){var r=e.updateQueue;pn=!1;var i=r.firstBaseUpdate,a=r.lastBaseUpdate,u=r.shared.pending;if(u!==null){r.shared.pending=null;var l=u,c=l.next;l.next=null,a===null?i=c:a.next=c,a=l;var f=e.alternate;f!==null&&(f=f.updateQueue,u=f.lastBaseUpdate,u!==a&&(u===null?f.firstBaseUpdate=c:u.next=c,f.lastBaseUpdate=l))}if(i!==null){var g=r.baseState;a=0,f=c=l=null,u=i;do{var v=u.lane,y=u.eventTime;if((s&v)===v){f!==null&&(f=f.next={eventTime:y,lane:0,tag:u.tag,payload:u.payload,callback:u.callback,next:null});e:{var C=e,L=u;switch(v=n,y=t,L.tag){case 1:if(C=L.payload,typeof C=="function"){g=C.call(y,g,v);break e}g=C;break e;case 3:C.flags=C.flags&-65537|128;case 0:if(C=L.payload,v=typeof C=="function"?C.call(y,g,v):C,v==null)break e;g=K({},g,v);break e;case 2:pn=!0}}u.callback!==null&&u.lane!==0&&(e.flags|=64,v=r.effects,v===null?r.effects=[u]:v.push(u))}else y={eventTime:y,lane:v,tag:u.tag,payload:u.payload,callback:u.callback,next:null},f===null?(c=f=y,l=g):f=f.next=y,a|=v;if(u=u.next,u===null){if(u=r.shared.pending,u===null)break;v=u,u=v.next,v.next=null,r.lastBaseUpdate=v,r.shared.pending=null}}while(!0);if(f===null&&(l=g),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=f,n=r.shared.interleaved,n!==null){r=n;do a|=r.lane,r=r.next;while(r!==n)}else i===null&&(r.shared.lanes=0);Gn|=a,e.lanes=a,e.memoizedState=g}}function nu(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var s=e[n],r=s.callback;if(r!==null){if(s.callback=null,s=t,typeof r!="function")throw Error(q(191,r));r.call(s)}}}var vs={},We=Nn(vs),is=Nn(vs),os=Nn(vs);function _n(e){if(e===vs)throw Error(q(174));return e}function Qo(e,n){switch($(os,n),$(is,e),$(We,vs),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Di(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Di(n,e)}Q(We),$(We,n)}function yt(){Q(We),Q(is),Q(os)}function Hl(e){_n(os.current);var n=_n(We.current),t=Di(n,e.type);n!==t&&($(is,e),$(We,t))}function Bo(e){is.current===e&&(Q(We),Q(is))}var H=Nn(0);function hr(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ci=[];function Ho(){for(var e=0;e<ci.length;e++)ci[e]._workInProgressVersionPrimary=null;ci.length=0}var Bs=on.ReactCurrentDispatcher,di=on.ReactCurrentBatchConfig,$n=0,W=null,ne=null,re=null,yr=!1,Gt=!1,as=0,Yp=0;function le(){throw Error(q(321))}function Wo(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!$e(e[t],n[t]))return!1;return!0}function Ko(e,n,t,s,r,i){if($n=i,W=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Bs.current=e===null||e.memoizedState===null?em:nm,e=t(s,r),Gt){i=0;do{if(Gt=!1,as=0,25<=i)throw Error(q(301));i+=1,re=ne=null,n.updateQueue=null,Bs.current=tm,e=t(s,r)}while(Gt)}if(Bs.current=xr,n=ne!==null&&ne.next!==null,$n=0,re=ne=W=null,yr=!1,n)throw Error(q(300));return e}function Yo(){var e=as!==0;return as=0,e}function Qe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return re===null?W.memoizedState=re=e:re=re.next=e,re}function Ae(){if(ne===null){var e=W.alternate;e=e!==null?e.memoizedState:null}else e=ne.next;var n=re===null?W.memoizedState:re.next;if(n!==null)re=n,ne=e;else{if(e===null)throw Error(q(310));ne=e,e={memoizedState:ne.memoizedState,baseState:ne.baseState,baseQueue:ne.baseQueue,queue:ne.queue,next:null},re===null?W.memoizedState=re=e:re=re.next=e}return re}function us(e,n){return typeof n=="function"?n(e):n}function pi(e){var n=Ae(),t=n.queue;if(t===null)throw Error(q(311));t.lastRenderedReducer=e;var s=ne,r=s.baseQueue,i=t.pending;if(i!==null){if(r!==null){var a=r.next;r.next=i.next,i.next=a}s.baseQueue=r=i,t.pending=null}if(r!==null){i=r.next,s=s.baseState;var u=a=null,l=null,c=i;do{var f=c.lane;if(($n&f)===f)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),s=c.hasEagerState?c.eagerState:e(s,c.action);else{var g={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(u=l=g,a=s):l=l.next=g,W.lanes|=f,Gn|=f}c=c.next}while(c!==null&&c!==i);l===null?a=s:l.next=u,$e(s,n.memoizedState)||(xe=!0),n.memoizedState=s,n.baseState=a,n.baseQueue=l,t.lastRenderedState=s}if(e=t.interleaved,e!==null){r=e;do i=r.lane,W.lanes|=i,Gn|=i,r=r.next;while(r!==e)}else r===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function mi(e){var n=Ae(),t=n.queue;if(t===null)throw Error(q(311));t.lastRenderedReducer=e;var s=t.dispatch,r=t.pending,i=n.memoizedState;if(r!==null){t.pending=null;var a=r=r.next;do i=e(i,a.action),a=a.next;while(a!==r);$e(i,n.memoizedState)||(xe=!0),n.memoizedState=i,n.baseQueue===null&&(n.baseState=i),t.lastRenderedState=i}return[i,s]}function Wl(){}function Kl(e,n){var t=W,s=Ae(),r=n(),i=!$e(s.memoizedState,r);if(i&&(s.memoizedState=r,xe=!0),s=s.queue,Jo(Xl.bind(null,t,s,e),[e]),s.getSnapshot!==n||i||re!==null&&re.memoizedState.tag&1){if(t.flags|=2048,ls(9,Jl.bind(null,t,s,r,n),void 0,null),ie===null)throw Error(q(349));$n&30||Yl(t,n,r)}return r}function Yl(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function Jl(e,n,t,s){n.value=t,n.getSnapshot=s,Zl(n)&&ec(e)}function Xl(e,n,t){return t(function(){Zl(n)&&ec(e)})}function Zl(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!$e(e,t)}catch{return!0}}function ec(e){var n=sn(e,1);n!==null&&Fe(n,e,1,-1)}function tu(e){var n=Qe();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:us,lastRenderedState:e},n.queue=e,e=e.dispatch=Zp.bind(null,W,e),[n.memoizedState,e]}function ls(e,n,t,s){return e={tag:e,create:n,destroy:t,deps:s,next:null},n=W.updateQueue,n===null?(n={lastEffect:null,stores:null},W.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(s=t.next,t.next=e,e.next=s,n.lastEffect=e)),e}function nc(){return Ae().memoizedState}function Hs(e,n,t,s){var r=Qe();W.flags|=e,r.memoizedState=ls(1|n,t,void 0,s===void 0?null:s)}function zr(e,n,t,s){var r=Ae();s=s===void 0?null:s;var i=void 0;if(ne!==null){var a=ne.memoizedState;if(i=a.destroy,s!==null&&Wo(s,a.deps)){r.memoizedState=ls(n,t,i,s);return}}W.flags|=e,r.memoizedState=ls(1|n,t,i,s)}function su(e,n){return Hs(8390656,8,e,n)}function Jo(e,n){return zr(2048,8,e,n)}function tc(e,n){return zr(4,2,e,n)}function sc(e,n){return zr(4,4,e,n)}function rc(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function ic(e,n,t){return t=t!=null?t.concat([e]):null,zr(4,4,rc.bind(null,n,e),t)}function Xo(){}function oc(e,n){var t=Ae();n=n===void 0?null:n;var s=t.memoizedState;return s!==null&&n!==null&&Wo(n,s[1])?s[0]:(t.memoizedState=[e,n],e)}function ac(e,n){var t=Ae();n=n===void 0?null:n;var s=t.memoizedState;return s!==null&&n!==null&&Wo(n,s[1])?s[0]:(e=e(),t.memoizedState=[e,n],e)}function uc(e,n,t){return $n&21?($e(t,n)||(t=ml(),W.lanes|=t,Gn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,xe=!0),e.memoizedState=t)}function Jp(e,n){var t=F;F=t!==0&&4>t?t:4,e(!0);var s=di.transition;di.transition={};try{e(!1),n()}finally{F=t,di.transition=s}}function lc(){return Ae().memoizedState}function Xp(e,n,t){var s=Ln(e);if(t={lane:s,action:t,hasEagerState:!1,eagerState:null,next:null},cc(e))dc(n,t);else if(t=Ql(e,n,t,s),t!==null){var r=ve();Fe(t,e,s,r),pc(t,n,s)}}function Zp(e,n,t){var s=Ln(e),r={lane:s,action:t,hasEagerState:!1,eagerState:null,next:null};if(cc(e))dc(n,r);else{var i=e.alternate;if(e.lanes===0&&(i===null||i.lanes===0)&&(i=n.lastRenderedReducer,i!==null))try{var a=n.lastRenderedState,u=i(a,t);if(r.hasEagerState=!0,r.eagerState=u,$e(u,a)){var l=n.interleaved;l===null?(r.next=r,$o(n)):(r.next=l.next,l.next=r),n.interleaved=r;return}}catch{}finally{}t=Ql(e,n,r,s),t!==null&&(r=ve(),Fe(t,e,s,r),pc(t,n,s))}}function cc(e){var n=e.alternate;return e===W||n!==null&&n===W}function dc(e,n){Gt=yr=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function pc(e,n,t){if(t&4194240){var s=n.lanes;s&=e.pendingLanes,t|=s,n.lanes=t,ko(e,t)}}var xr={readContext:Te,useCallback:le,useContext:le,useEffect:le,useImperativeHandle:le,useInsertionEffect:le,useLayoutEffect:le,useMemo:le,useReducer:le,useRef:le,useState:le,useDebugValue:le,useDeferredValue:le,useTransition:le,useMutableSource:le,useSyncExternalStore:le,useId:le,unstable_isNewReconciler:!1},em={readContext:Te,useCallback:function(e,n){return Qe().memoizedState=[e,n===void 0?null:n],e},useContext:Te,useEffect:su,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,Hs(4194308,4,rc.bind(null,n,e),t)},useLayoutEffect:function(e,n){return Hs(4194308,4,e,n)},useInsertionEffect:function(e,n){return Hs(4,2,e,n)},useMemo:function(e,n){var t=Qe();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var s=Qe();return n=t!==void 0?t(n):n,s.memoizedState=s.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},s.queue=e,e=e.dispatch=Xp.bind(null,W,e),[s.memoizedState,e]},useRef:function(e){var n=Qe();return e={current:e},n.memoizedState=e},useState:tu,useDebugValue:Xo,useDeferredValue:function(e){return Qe().memoizedState=e},useTransition:function(){var e=tu(!1),n=e[0];return e=Jp.bind(null,e[1]),Qe().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var s=W,r=Qe();if(B){if(t===void 0)throw Error(q(407));t=t()}else{if(t=n(),ie===null)throw Error(q(349));$n&30||Yl(s,n,t)}r.memoizedState=t;var i={value:t,getSnapshot:n};return r.queue=i,su(Xl.bind(null,s,i,e),[e]),s.flags|=2048,ls(9,Jl.bind(null,s,i,t,n),void 0,null),t},useId:function(){var e=Qe(),n=ie.identifierPrefix;if(B){var t=Xe,s=Je;t=(s&~(1<<32-Ve(s)-1)).toString(32)+t,n=":"+n+"R"+t,t=as++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Yp++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},nm={readContext:Te,useCallback:oc,useContext:Te,useEffect:Jo,useImperativeHandle:ic,useInsertionEffect:tc,useLayoutEffect:sc,useMemo:ac,useReducer:pi,useRef:nc,useState:function(){return pi(us)},useDebugValue:Xo,useDeferredValue:function(e){var n=Ae();return uc(n,ne.memoizedState,e)},useTransition:function(){var e=pi(us)[0],n=Ae().memoizedState;return[e,n]},useMutableSource:Wl,useSyncExternalStore:Kl,useId:lc,unstable_isNewReconciler:!1},tm={readContext:Te,useCallback:oc,useContext:Te,useEffect:Jo,useImperativeHandle:ic,useInsertionEffect:tc,useLayoutEffect:sc,useMemo:ac,useReducer:mi,useRef:nc,useState:function(){return mi(us)},useDebugValue:Xo,useDeferredValue:function(e){var n=Ae();return ne===null?n.memoizedState=e:uc(n,ne.memoizedState,e)},useTransition:function(){var e=mi(us)[0],n=Ae().memoizedState;return[e,n]},useMutableSource:Wl,useSyncExternalStore:Kl,useId:lc,unstable_isNewReconciler:!1};function _e(e,n){if(e&&e.defaultProps){n=K({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function Zi(e,n,t,s){n=e.memoizedState,t=t(s,n),t=t==null?n:K({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Tr={isMounted:function(e){return(e=e._reactInternals)?Hn(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var s=ve(),r=Ln(e),i=Ze(s,r);i.payload=n,t!=null&&(i.callback=t),n=Cn(e,i,r),n!==null&&(Fe(n,e,r,s),Qs(n,e,r))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var s=ve(),r=Ln(e),i=Ze(s,r);i.tag=1,i.payload=n,t!=null&&(i.callback=t),n=Cn(e,i,r),n!==null&&(Fe(n,e,r,s),Qs(n,e,r))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=ve(),s=Ln(e),r=Ze(t,s);r.tag=2,n!=null&&(r.callback=n),n=Cn(e,r,s),n!==null&&(Fe(n,e,s,t),Qs(n,e,s))}};function ru(e,n,t,s,r,i,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,i,a):n.prototype&&n.prototype.isPureReactComponent?!ns(t,s)||!ns(r,i):!0}function mc(e,n,t){var s=!1,r=wn,i=n.contextType;return typeof i=="object"&&i!==null?i=Te(i):(r=Ce(n)?Vn:me.current,s=n.contextTypes,i=(s=s!=null)?vt(e,r):wn),n=new n(t,i),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Tr,e.stateNode=n,n._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=r,e.__reactInternalMemoizedMaskedChildContext=i),n}function iu(e,n,t,s){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,s),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,s),n.state!==e&&Tr.enqueueReplaceState(n,n.state,null)}function eo(e,n,t,s){var r=e.stateNode;r.props=t,r.state=e.memoizedState,r.refs={},Go(e);var i=n.contextType;typeof i=="object"&&i!==null?r.context=Te(i):(i=Ce(n)?Vn:me.current,r.context=vt(e,i)),r.state=e.memoizedState,i=n.getDerivedStateFromProps,typeof i=="function"&&(Zi(e,n,i,t),r.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(n=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),n!==r.state&&Tr.enqueueReplaceState(r,r.state,null),gr(e,t,r,s),r.state=e.memoizedState),typeof r.componentDidMount=="function"&&(e.flags|=4194308)}function xt(e,n){try{var t="",s=n;do t+=Id(s),s=s.return;while(s);var r=t}catch(i){r=`
Error generating stack: `+i.message+`
`+i.stack}return{value:e,source:n,stack:r,digest:null}}function fi(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function no(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var sm=typeof WeakMap=="function"?WeakMap:Map;function fc(e,n,t){t=Ze(-1,t),t.tag=3,t.payload={element:null};var s=n.value;return t.callback=function(){Cr||(Cr=!0,po=s),no(e,n)},t}function vc(e,n,t){t=Ze(-1,t),t.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var r=n.value;t.payload=function(){return s(r)},t.callback=function(){no(e,n)}}var i=e.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(t.callback=function(){no(e,n),typeof s!="function"&&(Sn===null?Sn=new Set([this]):Sn.add(this));var a=n.stack;this.componentDidCatch(n.value,{componentStack:a!==null?a:""})}),t}function ou(e,n,t){var s=e.pingCache;if(s===null){s=e.pingCache=new sm;var r=new Set;s.set(n,r)}else r=s.get(n),r===void 0&&(r=new Set,s.set(n,r));r.has(t)||(r.add(t),e=hm.bind(null,e,n,t),n.then(e,e))}function au(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function uu(e,n,t,s,r){return e.mode&1?(e.flags|=65536,e.lanes=r,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=Ze(-1,1),n.tag=2,Cn(t,n,1))),t.lanes|=1),e)}var rm=on.ReactCurrentOwner,xe=!1;function fe(e,n,t,s){n.child=e===null?Gl(n,null,t,s):ht(n,e.child,t,s)}function lu(e,n,t,s,r){t=t.render;var i=n.ref;return pt(n,r),s=Ko(e,n,t,s,i,r),t=Yo(),e!==null&&!xe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~r,rn(e,n,r)):(B&&t&&Ro(n),n.flags|=1,fe(e,n,s,r),n.child)}function cu(e,n,t,s,r){if(e===null){var i=t.type;return typeof i=="function"&&!oa(i)&&i.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=i,gc(e,n,i,s,r)):(e=Js(t.type,null,s,n,n.mode,r),e.ref=n.ref,e.return=n,n.child=e)}if(i=e.child,!(e.lanes&r)){var a=i.memoizedProps;if(t=t.compare,t=t!==null?t:ns,t(a,s)&&e.ref===n.ref)return rn(e,n,r)}return n.flags|=1,e=jn(i,s),e.ref=n.ref,e.return=n,n.child=e}function gc(e,n,t,s,r){if(e!==null){var i=e.memoizedProps;if(ns(i,s)&&e.ref===n.ref)if(xe=!1,n.pendingProps=s=i,(e.lanes&r)!==0)e.flags&131072&&(xe=!0);else return n.lanes=e.lanes,rn(e,n,r)}return to(e,n,t,s,r)}function hc(e,n,t){var s=n.pendingProps,r=s.children,i=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},$(at,Le),Le|=t;else{if(!(t&1073741824))return e=i!==null?i.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,$(at,Le),Le|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=i!==null?i.baseLanes:t,$(at,Le),Le|=s}else i!==null?(s=i.baseLanes|t,n.memoizedState=null):s=t,$(at,Le),Le|=s;return fe(e,n,r,t),n.child}function yc(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function to(e,n,t,s,r){var i=Ce(t)?Vn:me.current;return i=vt(n,i),pt(n,r),t=Ko(e,n,t,s,i,r),s=Yo(),e!==null&&!xe?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~r,rn(e,n,r)):(B&&s&&Ro(n),n.flags|=1,fe(e,n,t,r),n.child)}function du(e,n,t,s,r){if(Ce(t)){var i=!0;dr(n)}else i=!1;if(pt(n,r),n.stateNode===null)Ws(e,n),mc(n,t,s),eo(n,t,s,r),s=!0;else if(e===null){var a=n.stateNode,u=n.memoizedProps;a.props=u;var l=a.context,c=t.contextType;typeof c=="object"&&c!==null?c=Te(c):(c=Ce(t)?Vn:me.current,c=vt(n,c));var f=t.getDerivedStateFromProps,g=typeof f=="function"||typeof a.getSnapshotBeforeUpdate=="function";g||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(u!==s||l!==c)&&iu(n,a,s,c),pn=!1;var v=n.memoizedState;a.state=v,gr(n,s,a,r),l=n.memoizedState,u!==s||v!==l||qe.current||pn?(typeof f=="function"&&(Zi(n,t,f,s),l=n.memoizedState),(u=pn||ru(n,t,u,s,v,l,c))?(g||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(n.flags|=4194308)):(typeof a.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=s,n.memoizedState=l),a.props=s,a.state=l,a.context=c,s=u):(typeof a.componentDidMount=="function"&&(n.flags|=4194308),s=!1)}else{a=n.stateNode,Bl(e,n),u=n.memoizedProps,c=n.type===n.elementType?u:_e(n.type,u),a.props=c,g=n.pendingProps,v=a.context,l=t.contextType,typeof l=="object"&&l!==null?l=Te(l):(l=Ce(t)?Vn:me.current,l=vt(n,l));var y=t.getDerivedStateFromProps;(f=typeof y=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(u!==g||v!==l)&&iu(n,a,s,l),pn=!1,v=n.memoizedState,a.state=v,gr(n,s,a,r);var C=n.memoizedState;u!==g||v!==C||qe.current||pn?(typeof y=="function"&&(Zi(n,t,y,s),C=n.memoizedState),(c=pn||ru(n,t,c,s,v,C,l)||!1)?(f||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(s,C,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(s,C,l)),typeof a.componentDidUpdate=="function"&&(n.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof a.componentDidUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(n.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(n.flags|=1024),n.memoizedProps=s,n.memoizedState=C),a.props=s,a.state=C,a.context=l,s=c):(typeof a.componentDidUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(n.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||u===e.memoizedProps&&v===e.memoizedState||(n.flags|=1024),s=!1)}return so(e,n,t,s,i,r)}function so(e,n,t,s,r,i){yc(e,n);var a=(n.flags&128)!==0;if(!s&&!a)return r&&Ya(n,t,!1),rn(e,n,i);s=n.stateNode,rm.current=n;var u=a&&typeof t.getDerivedStateFromError!="function"?null:s.render();return n.flags|=1,e!==null&&a?(n.child=ht(n,e.child,null,i),n.child=ht(n,null,u,i)):fe(e,n,u,i),n.memoizedState=s.state,r&&Ya(n,t,!0),n.child}function xc(e){var n=e.stateNode;n.pendingContext?Ka(e,n.pendingContext,n.pendingContext!==n.context):n.context&&Ka(e,n.context,!1),Qo(e,n.containerInfo)}function pu(e,n,t,s,r){return gt(),Uo(r),n.flags|=256,fe(e,n,t,s),n.child}var ro={dehydrated:null,treeContext:null,retryLane:0};function io(e){return{baseLanes:e,cachePool:null,transitions:null}}function qc(e,n,t){var s=n.pendingProps,r=H.current,i=!1,a=(n.flags&128)!==0,u;if((u=a)||(u=e!==null&&e.memoizedState===null?!1:(r&2)!==0),u?(i=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(r|=1),$(H,r&1),e===null)return Ji(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(a=s.children,e=s.fallback,i?(s=n.mode,i=n.child,a={mode:"hidden",children:a},!(s&1)&&i!==null?(i.childLanes=0,i.pendingProps=a):i=Rr(a,s,0,null),e=On(e,s,t,null),i.return=n,e.return=n,i.sibling=e,n.child=i,n.child.memoizedState=io(t),n.memoizedState=ro,e):Zo(n,a));if(r=e.memoizedState,r!==null&&(u=r.dehydrated,u!==null))return im(e,n,a,s,u,r,t);if(i){i=s.fallback,a=n.mode,r=e.child,u=r.sibling;var l={mode:"hidden",children:s.children};return!(a&1)&&n.child!==r?(s=n.child,s.childLanes=0,s.pendingProps=l,n.deletions=null):(s=jn(r,l),s.subtreeFlags=r.subtreeFlags&14680064),u!==null?i=jn(u,i):(i=On(i,a,t,null),i.flags|=2),i.return=n,s.return=n,s.sibling=i,n.child=s,s=i,i=n.child,a=e.child.memoizedState,a=a===null?io(t):{baseLanes:a.baseLanes|t,cachePool:null,transitions:a.transitions},i.memoizedState=a,i.childLanes=e.childLanes&~t,n.memoizedState=ro,s}return i=e.child,e=i.sibling,s=jn(i,{mode:"visible",children:s.children}),!(n.mode&1)&&(s.lanes=t),s.return=n,s.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=s,n.memoizedState=null,s}function Zo(e,n){return n=Rr({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function Ps(e,n,t,s){return s!==null&&Uo(s),ht(n,e.child,null,t),e=Zo(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function im(e,n,t,s,r,i,a){if(t)return n.flags&256?(n.flags&=-257,s=fi(Error(q(422))),Ps(e,n,a,s)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(i=s.fallback,r=n.mode,s=Rr({mode:"visible",children:s.children},r,0,null),i=On(i,r,a,null),i.flags|=2,s.return=n,i.return=n,s.sibling=i,n.child=s,n.mode&1&&ht(n,e.child,null,a),n.child.memoizedState=io(a),n.memoizedState=ro,i);if(!(n.mode&1))return Ps(e,n,a,null);if(r.data==="$!"){if(s=r.nextSibling&&r.nextSibling.dataset,s)var u=s.dgst;return s=u,i=Error(q(419)),s=fi(i,s,void 0),Ps(e,n,a,s)}if(u=(a&e.childLanes)!==0,xe||u){if(s=ie,s!==null){switch(a&-a){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(s.suspendedLanes|a)?0:r,r!==0&&r!==i.retryLane&&(i.retryLane=r,sn(e,r),Fe(s,e,r,-1))}return ia(),s=fi(Error(q(421))),Ps(e,n,a,s)}return r.data==="$?"?(n.flags|=128,n.child=e.child,n=ym.bind(null,e),r._reactRetry=n,null):(e=i.treeContext,je=qn(r.nextSibling),be=n,B=!0,Oe=null,e!==null&&(Ie[Pe++]=Je,Ie[Pe++]=Xe,Ie[Pe++]=Fn,Je=e.id,Xe=e.overflow,Fn=n),n=Zo(n,s.children),n.flags|=4096,n)}function mu(e,n,t){e.lanes|=n;var s=e.alternate;s!==null&&(s.lanes|=n),Xi(e.return,n,t)}function vi(e,n,t,s,r){var i=e.memoizedState;i===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:s,tail:t,tailMode:r}:(i.isBackwards=n,i.rendering=null,i.renderingStartTime=0,i.last=s,i.tail=t,i.tailMode=r)}function Cc(e,n,t){var s=n.pendingProps,r=s.revealOrder,i=s.tail;if(fe(e,n,s.children,t),s=H.current,s&2)s=s&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&mu(e,t,n);else if(e.tag===19)mu(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if($(H,s),!(n.mode&1))n.memoizedState=null;else switch(r){case"forwards":for(t=n.child,r=null;t!==null;)e=t.alternate,e!==null&&hr(e)===null&&(r=t),t=t.sibling;t=r,t===null?(r=n.child,n.child=null):(r=t.sibling,t.sibling=null),vi(n,!1,r,t,i);break;case"backwards":for(t=null,r=n.child,n.child=null;r!==null;){if(e=r.alternate,e!==null&&hr(e)===null){n.child=r;break}e=r.sibling,r.sibling=t,t=r,r=e}vi(n,!0,t,null,i);break;case"together":vi(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function Ws(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function rn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Gn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(q(153));if(n.child!==null){for(e=n.child,t=jn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=jn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function om(e,n,t){switch(n.tag){case 3:xc(n),gt();break;case 5:Hl(n);break;case 1:Ce(n.type)&&dr(n);break;case 4:Qo(n,n.stateNode.containerInfo);break;case 10:var s=n.type._context,r=n.memoizedProps.value;$(fr,s._currentValue),s._currentValue=r;break;case 13:if(s=n.memoizedState,s!==null)return s.dehydrated!==null?($(H,H.current&1),n.flags|=128,null):t&n.child.childLanes?qc(e,n,t):($(H,H.current&1),e=rn(e,n,t),e!==null?e.sibling:null);$(H,H.current&1);break;case 19:if(s=(t&n.childLanes)!==0,e.flags&128){if(s)return Cc(e,n,t);n.flags|=128}if(r=n.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),$(H,H.current),s)break;return null;case 22:case 23:return n.lanes=0,hc(e,n,t)}return rn(e,n,t)}var Sc,oo,Lc,jc;Sc=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};oo=function(){};Lc=function(e,n,t,s){var r=e.memoizedProps;if(r!==s){e=n.stateNode,_n(We.current);var i=null;switch(t){case"input":r=Ni(e,r),s=Ni(e,s),i=[];break;case"select":r=K({},r,{value:void 0}),s=K({},s,{value:void 0}),i=[];break;case"textarea":r=Pi(e,r),s=Pi(e,s),i=[];break;default:typeof r.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=lr)}zi(t,s);var a;t=null;for(c in r)if(!s.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var u=r[c];for(a in u)u.hasOwnProperty(a)&&(t||(t={}),t[a]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Wt.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in s){var l=s[c];if(u=r!=null?r[c]:void 0,s.hasOwnProperty(c)&&l!==u&&(l!=null||u!=null))if(c==="style")if(u){for(a in u)!u.hasOwnProperty(a)||l&&l.hasOwnProperty(a)||(t||(t={}),t[a]="");for(a in l)l.hasOwnProperty(a)&&u[a]!==l[a]&&(t||(t={}),t[a]=l[a])}else t||(i||(i=[]),i.push(c,t)),t=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,u=u?u.__html:void 0,l!=null&&u!==l&&(i=i||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(i=i||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Wt.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&G("scroll",e),i||u===l||(i=[])):(i=i||[]).push(c,l))}t&&(i=i||[]).push("style",t);var c=i;(n.updateQueue=c)&&(n.flags|=4)}};jc=function(e,n,t,s){t!==s&&(n.flags|=4)};function Dt(e,n){if(!B)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var s=null;t!==null;)t.alternate!==null&&(s=t),t=t.sibling;s===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function ce(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,s=0;if(n)for(var r=e.child;r!==null;)t|=r.lanes|r.childLanes,s|=r.subtreeFlags&14680064,s|=r.flags&14680064,r.return=e,r=r.sibling;else for(r=e.child;r!==null;)t|=r.lanes|r.childLanes,s|=r.subtreeFlags,s|=r.flags,r.return=e,r=r.sibling;return e.subtreeFlags|=s,e.childLanes=t,n}function am(e,n,t){var s=n.pendingProps;switch(_o(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ce(n),null;case 1:return Ce(n.type)&&cr(),ce(n),null;case 3:return s=n.stateNode,yt(),Q(qe),Q(me),Ho(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(ks(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Oe!==null&&(vo(Oe),Oe=null))),oo(e,n),ce(n),null;case 5:Bo(n);var r=_n(os.current);if(t=n.type,e!==null&&n.stateNode!=null)Lc(e,n,t,s,r),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!s){if(n.stateNode===null)throw Error(q(166));return ce(n),null}if(e=_n(We.current),ks(n)){s=n.stateNode,t=n.type;var i=n.memoizedProps;switch(s[Be]=n,s[rs]=i,e=(n.mode&1)!==0,t){case"dialog":G("cancel",s),G("close",s);break;case"iframe":case"object":case"embed":G("load",s);break;case"video":case"audio":for(r=0;r<_t.length;r++)G(_t[r],s);break;case"source":G("error",s);break;case"img":case"image":case"link":G("error",s),G("load",s);break;case"details":G("toggle",s);break;case"input":Sa(s,i),G("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!i.multiple},G("invalid",s);break;case"textarea":ja(s,i),G("invalid",s)}zi(t,i),r=null;for(var a in i)if(i.hasOwnProperty(a)){var u=i[a];a==="children"?typeof u=="string"?s.textContent!==u&&(i.suppressHydrationWarning!==!0&&Ns(s.textContent,u,e),r=["children",u]):typeof u=="number"&&s.textContent!==""+u&&(i.suppressHydrationWarning!==!0&&Ns(s.textContent,u,e),r=["children",""+u]):Wt.hasOwnProperty(a)&&u!=null&&a==="onScroll"&&G("scroll",s)}switch(t){case"input":qs(s),La(s,i,!0);break;case"textarea":qs(s),ba(s);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(s.onclick=lr)}s=r,n.updateQueue=s,s!==null&&(n.flags|=4)}else{a=r.nodeType===9?r:r.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Xu(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=a.createElement(t,{is:s.is}):(e=a.createElement(t),t==="select"&&(a=e,s.multiple?a.multiple=!0:s.size&&(a.size=s.size))):e=a.createElementNS(e,t),e[Be]=n,e[rs]=s,Sc(e,n,!1,!1),n.stateNode=e;e:{switch(a=Ti(t,s),t){case"dialog":G("cancel",e),G("close",e),r=s;break;case"iframe":case"object":case"embed":G("load",e),r=s;break;case"video":case"audio":for(r=0;r<_t.length;r++)G(_t[r],e);r=s;break;case"source":G("error",e),r=s;break;case"img":case"image":case"link":G("error",e),G("load",e),r=s;break;case"details":G("toggle",e),r=s;break;case"input":Sa(e,s),r=Ni(e,s),G("invalid",e);break;case"option":r=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},r=K({},s,{value:void 0}),G("invalid",e);break;case"textarea":ja(e,s),r=Pi(e,s),G("invalid",e);break;default:r=s}zi(t,r),u=r;for(i in u)if(u.hasOwnProperty(i)){var l=u[i];i==="style"?nl(e,l):i==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Zu(e,l)):i==="children"?typeof l=="string"?(t!=="textarea"||l!=="")&&Kt(e,l):typeof l=="number"&&Kt(e,""+l):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Wt.hasOwnProperty(i)?l!=null&&i==="onScroll"&&G("scroll",e):l!=null&&Lo(e,i,l,a))}switch(t){case"input":qs(e),La(e,s,!1);break;case"textarea":qs(e),ba(e);break;case"option":s.value!=null&&e.setAttribute("value",""+bn(s.value));break;case"select":e.multiple=!!s.multiple,i=s.value,i!=null?ut(e,!!s.multiple,i,!1):s.defaultValue!=null&&ut(e,!!s.multiple,s.defaultValue,!0);break;default:typeof r.onClick=="function"&&(e.onclick=lr)}switch(t){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return ce(n),null;case 6:if(e&&n.stateNode!=null)jc(e,n,e.memoizedProps,s);else{if(typeof s!="string"&&n.stateNode===null)throw Error(q(166));if(t=_n(os.current),_n(We.current),ks(n)){if(s=n.stateNode,t=n.memoizedProps,s[Be]=n,(i=s.nodeValue!==t)&&(e=be,e!==null))switch(e.tag){case 3:Ns(s.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Ns(s.nodeValue,t,(e.mode&1)!==0)}i&&(n.flags|=4)}else s=(t.nodeType===9?t:t.ownerDocument).createTextNode(s),s[Be]=n,n.stateNode=s}return ce(n),null;case 13:if(Q(H),s=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(B&&je!==null&&n.mode&1&&!(n.flags&128))Fl(),gt(),n.flags|=98560,i=!1;else if(i=ks(n),s!==null&&s.dehydrated!==null){if(e===null){if(!i)throw Error(q(318));if(i=n.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(q(317));i[Be]=n}else gt(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;ce(n),i=!1}else Oe!==null&&(vo(Oe),Oe=null),i=!0;if(!i)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(n.child.flags|=8192,n.mode&1&&(e===null||H.current&1?te===0&&(te=3):ia())),n.updateQueue!==null&&(n.flags|=4),ce(n),null);case 4:return yt(),oo(e,n),e===null&&ts(n.stateNode.containerInfo),ce(n),null;case 10:return Fo(n.type._context),ce(n),null;case 17:return Ce(n.type)&&cr(),ce(n),null;case 19:if(Q(H),i=n.memoizedState,i===null)return ce(n),null;if(s=(n.flags&128)!==0,a=i.rendering,a===null)if(s)Dt(i,!1);else{if(te!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(a=hr(e),a!==null){for(n.flags|=128,Dt(i,!1),s=a.updateQueue,s!==null&&(n.updateQueue=s,n.flags|=4),n.subtreeFlags=0,s=t,t=n.child;t!==null;)i=t,e=s,i.flags&=14680066,a=i.alternate,a===null?(i.childLanes=0,i.lanes=e,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=a.childLanes,i.lanes=a.lanes,i.child=a.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=a.memoizedProps,i.memoizedState=a.memoizedState,i.updateQueue=a.updateQueue,i.type=a.type,e=a.dependencies,i.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return $(H,H.current&1|2),n.child}e=e.sibling}i.tail!==null&&Z()>qt&&(n.flags|=128,s=!0,Dt(i,!1),n.lanes=4194304)}else{if(!s)if(e=hr(a),e!==null){if(n.flags|=128,s=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Dt(i,!0),i.tail===null&&i.tailMode==="hidden"&&!a.alternate&&!B)return ce(n),null}else 2*Z()-i.renderingStartTime>qt&&t!==1073741824&&(n.flags|=128,s=!0,Dt(i,!1),n.lanes=4194304);i.isBackwards?(a.sibling=n.child,n.child=a):(t=i.last,t!==null?t.sibling=a:n.child=a,i.last=a)}return i.tail!==null?(n=i.tail,i.rendering=n,i.tail=n.sibling,i.renderingStartTime=Z(),n.sibling=null,t=H.current,$(H,s?t&1|2:t&1),n):(ce(n),null);case 22:case 23:return ra(),s=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(n.flags|=8192),s&&n.mode&1?Le&1073741824&&(ce(n),n.subtreeFlags&6&&(n.flags|=8192)):ce(n),null;case 24:return null;case 25:return null}throw Error(q(156,n.tag))}function um(e,n){switch(_o(n),n.tag){case 1:return Ce(n.type)&&cr(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return yt(),Q(qe),Q(me),Ho(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return Bo(n),null;case 13:if(Q(H),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(q(340));gt()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return Q(H),null;case 4:return yt(),null;case 10:return Fo(n.type._context),null;case 22:case 23:return ra(),null;case 24:return null;default:return null}}var Ds=!1,de=!1,lm=typeof WeakSet=="function"?WeakSet:Set,b=null;function ot(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(s){Y(e,n,s)}else t.current=null}function ao(e,n,t){try{t()}catch(s){Y(e,n,s)}}var fu=!1;function cm(e,n){if(Gi=or,e=kl(),Mo(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var s=t.getSelection&&t.getSelection();if(s&&s.rangeCount!==0){t=s.anchorNode;var r=s.anchorOffset,i=s.focusNode;s=s.focusOffset;try{t.nodeType,i.nodeType}catch{t=null;break e}var a=0,u=-1,l=-1,c=0,f=0,g=e,v=null;n:for(;;){for(var y;g!==t||r!==0&&g.nodeType!==3||(u=a+r),g!==i||s!==0&&g.nodeType!==3||(l=a+s),g.nodeType===3&&(a+=g.nodeValue.length),(y=g.firstChild)!==null;)v=g,g=y;for(;;){if(g===e)break n;if(v===t&&++c===r&&(u=a),v===i&&++f===s&&(l=a),(y=g.nextSibling)!==null)break;g=v,v=g.parentNode}g=y}t=u===-1||l===-1?null:{start:u,end:l}}else t=null}t=t||{start:0,end:0}}else t=null;for(Qi={focusedElem:e,selectionRange:t},or=!1,b=n;b!==null;)if(n=b,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,b=e;else for(;b!==null;){n=b;try{var C=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(C!==null){var L=C.memoizedProps,D=C.memoizedState,p=n.stateNode,d=p.getSnapshotBeforeUpdate(n.elementType===n.type?L:_e(n.type,L),D);p.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var m=n.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(q(163))}}catch(h){Y(n,n.return,h)}if(e=n.sibling,e!==null){e.return=n.return,b=e;break}b=n.return}return C=fu,fu=!1,C}function Qt(e,n,t){var s=n.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var r=s=s.next;do{if((r.tag&e)===e){var i=r.destroy;r.destroy=void 0,i!==void 0&&ao(n,t,i)}r=r.next}while(r!==s)}}function Ar(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var s=t.create;t.destroy=s()}t=t.next}while(t!==n)}}function uo(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function bc(e){var n=e.alternate;n!==null&&(e.alternate=null,bc(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Be],delete n[rs],delete n[Wi],delete n[Bp],delete n[Hp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function wc(e){return e.tag===5||e.tag===3||e.tag===4}function vu(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||wc(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function lo(e,n,t){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=lr));else if(s!==4&&(e=e.child,e!==null))for(lo(e,n,t),e=e.sibling;e!==null;)lo(e,n,t),e=e.sibling}function co(e,n,t){var s=e.tag;if(s===5||s===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(co(e,n,t),e=e.sibling;e!==null;)co(e,n,t),e=e.sibling}var oe=null,Ue=!1;function an(e,n,t){for(t=t.child;t!==null;)Ec(e,n,t),t=t.sibling}function Ec(e,n,t){if(He&&typeof He.onCommitFiberUnmount=="function")try{He.onCommitFiberUnmount(Er,t)}catch{}switch(t.tag){case 5:de||ot(t,n);case 6:var s=oe,r=Ue;oe=null,an(e,n,t),oe=s,Ue=r,oe!==null&&(Ue?(e=oe,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):oe.removeChild(t.stateNode));break;case 18:oe!==null&&(Ue?(e=oe,t=t.stateNode,e.nodeType===8?ui(e.parentNode,t):e.nodeType===1&&ui(e,t),Zt(e)):ui(oe,t.stateNode));break;case 4:s=oe,r=Ue,oe=t.stateNode.containerInfo,Ue=!0,an(e,n,t),oe=s,Ue=r;break;case 0:case 11:case 14:case 15:if(!de&&(s=t.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){r=s=s.next;do{var i=r,a=i.destroy;i=i.tag,a!==void 0&&(i&2||i&4)&&ao(t,n,a),r=r.next}while(r!==s)}an(e,n,t);break;case 1:if(!de&&(ot(t,n),s=t.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=t.memoizedProps,s.state=t.memoizedState,s.componentWillUnmount()}catch(u){Y(t,n,u)}an(e,n,t);break;case 21:an(e,n,t);break;case 22:t.mode&1?(de=(s=de)||t.memoizedState!==null,an(e,n,t),de=s):an(e,n,t);break;default:an(e,n,t)}}function gu(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new lm),n.forEach(function(s){var r=xm.bind(null,e,s);t.has(s)||(t.add(s),s.then(r,r))})}}function Re(e,n){var t=n.deletions;if(t!==null)for(var s=0;s<t.length;s++){var r=t[s];try{var i=e,a=n,u=a;e:for(;u!==null;){switch(u.tag){case 5:oe=u.stateNode,Ue=!1;break e;case 3:oe=u.stateNode.containerInfo,Ue=!0;break e;case 4:oe=u.stateNode.containerInfo,Ue=!0;break e}u=u.return}if(oe===null)throw Error(q(160));Ec(i,a,r),oe=null,Ue=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Y(r,n,c)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)Nc(n,e),n=n.sibling}function Nc(e,n){var t=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Re(n,e),Ge(e),s&4){try{Qt(3,e,e.return),Ar(3,e)}catch(L){Y(e,e.return,L)}try{Qt(5,e,e.return)}catch(L){Y(e,e.return,L)}}break;case 1:Re(n,e),Ge(e),s&512&&t!==null&&ot(t,t.return);break;case 5:if(Re(n,e),Ge(e),s&512&&t!==null&&ot(t,t.return),e.flags&32){var r=e.stateNode;try{Kt(r,"")}catch(L){Y(e,e.return,L)}}if(s&4&&(r=e.stateNode,r!=null)){var i=e.memoizedProps,a=t!==null?t.memoizedProps:i,u=e.type,l=e.updateQueue;if(e.updateQueue=null,l!==null)try{u==="input"&&i.type==="radio"&&i.name!=null&&Yu(r,i),Ti(u,a);var c=Ti(u,i);for(a=0;a<l.length;a+=2){var f=l[a],g=l[a+1];f==="style"?nl(r,g):f==="dangerouslySetInnerHTML"?Zu(r,g):f==="children"?Kt(r,g):Lo(r,f,g,c)}switch(u){case"input":ki(r,i);break;case"textarea":Ju(r,i);break;case"select":var v=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!i.multiple;var y=i.value;y!=null?ut(r,!!i.multiple,y,!1):v!==!!i.multiple&&(i.defaultValue!=null?ut(r,!!i.multiple,i.defaultValue,!0):ut(r,!!i.multiple,i.multiple?[]:"",!1))}r[rs]=i}catch(L){Y(e,e.return,L)}}break;case 6:if(Re(n,e),Ge(e),s&4){if(e.stateNode===null)throw Error(q(162));r=e.stateNode,i=e.memoizedProps;try{r.nodeValue=i}catch(L){Y(e,e.return,L)}}break;case 3:if(Re(n,e),Ge(e),s&4&&t!==null&&t.memoizedState.isDehydrated)try{Zt(n.containerInfo)}catch(L){Y(e,e.return,L)}break;case 4:Re(n,e),Ge(e);break;case 13:Re(n,e),Ge(e),r=e.child,r.flags&8192&&(i=r.memoizedState!==null,r.stateNode.isHidden=i,!i||r.alternate!==null&&r.alternate.memoizedState!==null||(ta=Z())),s&4&&gu(e);break;case 22:if(f=t!==null&&t.memoizedState!==null,e.mode&1?(de=(c=de)||f,Re(n,e),de=c):Re(n,e),Ge(e),s&8192){if(c=e.memoizedState!==null,(e.stateNode.isHidden=c)&&!f&&e.mode&1)for(b=e,f=e.child;f!==null;){for(g=b=f;b!==null;){switch(v=b,y=v.child,v.tag){case 0:case 11:case 14:case 15:Qt(4,v,v.return);break;case 1:ot(v,v.return);var C=v.stateNode;if(typeof C.componentWillUnmount=="function"){s=v,t=v.return;try{n=s,C.props=n.memoizedProps,C.state=n.memoizedState,C.componentWillUnmount()}catch(L){Y(s,t,L)}}break;case 5:ot(v,v.return);break;case 22:if(v.memoizedState!==null){yu(g);continue}}y!==null?(y.return=v,b=y):yu(g)}f=f.sibling}e:for(f=null,g=e;;){if(g.tag===5){if(f===null){f=g;try{r=g.stateNode,c?(i=r.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(u=g.stateNode,l=g.memoizedProps.style,a=l!=null&&l.hasOwnProperty("display")?l.display:null,u.style.display=el("display",a))}catch(L){Y(e,e.return,L)}}}else if(g.tag===6){if(f===null)try{g.stateNode.nodeValue=c?"":g.memoizedProps}catch(L){Y(e,e.return,L)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;f===g&&(f=null),g=g.return}f===g&&(f=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Re(n,e),Ge(e),s&4&&gu(e);break;case 21:break;default:Re(n,e),Ge(e)}}function Ge(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(wc(t)){var s=t;break e}t=t.return}throw Error(q(160))}switch(s.tag){case 5:var r=s.stateNode;s.flags&32&&(Kt(r,""),s.flags&=-33);var i=vu(e);co(e,i,r);break;case 3:case 4:var a=s.stateNode.containerInfo,u=vu(e);lo(e,u,a);break;default:throw Error(q(161))}}catch(l){Y(e,e.return,l)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function dm(e,n,t){b=e,kc(e)}function kc(e,n,t){for(var s=(e.mode&1)!==0;b!==null;){var r=b,i=r.child;if(r.tag===22&&s){var a=r.memoizedState!==null||Ds;if(!a){var u=r.alternate,l=u!==null&&u.memoizedState!==null||de;u=Ds;var c=de;if(Ds=a,(de=l)&&!c)for(b=r;b!==null;)a=b,l=a.child,a.tag===22&&a.memoizedState!==null?xu(r):l!==null?(l.return=a,b=l):xu(r);for(;i!==null;)b=i,kc(i),i=i.sibling;b=r,Ds=u,de=c}hu(e)}else r.subtreeFlags&8772&&i!==null?(i.return=r,b=i):hu(e)}}function hu(e){for(;b!==null;){var n=b;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:de||Ar(5,n);break;case 1:var s=n.stateNode;if(n.flags&4&&!de)if(t===null)s.componentDidMount();else{var r=n.elementType===n.type?t.memoizedProps:_e(n.type,t.memoizedProps);s.componentDidUpdate(r,t.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var i=n.updateQueue;i!==null&&nu(n,i,s);break;case 3:var a=n.updateQueue;if(a!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}nu(n,a,t)}break;case 5:var u=n.stateNode;if(t===null&&n.flags&4){t=u;var l=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&t.focus();break;case"img":l.src&&(t.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var c=n.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var g=f.dehydrated;g!==null&&Zt(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(q(163))}de||n.flags&512&&uo(n)}catch(v){Y(n,n.return,v)}}if(n===e){b=null;break}if(t=n.sibling,t!==null){t.return=n.return,b=t;break}b=n.return}}function yu(e){for(;b!==null;){var n=b;if(n===e){b=null;break}var t=n.sibling;if(t!==null){t.return=n.return,b=t;break}b=n.return}}function xu(e){for(;b!==null;){var n=b;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Ar(4,n)}catch(l){Y(n,t,l)}break;case 1:var s=n.stateNode;if(typeof s.componentDidMount=="function"){var r=n.return;try{s.componentDidMount()}catch(l){Y(n,r,l)}}var i=n.return;try{uo(n)}catch(l){Y(n,i,l)}break;case 5:var a=n.return;try{uo(n)}catch(l){Y(n,a,l)}}}catch(l){Y(n,n.return,l)}if(n===e){b=null;break}var u=n.sibling;if(u!==null){u.return=n.return,b=u;break}b=n.return}}var pm=Math.ceil,qr=on.ReactCurrentDispatcher,ea=on.ReactCurrentOwner,ze=on.ReactCurrentBatchConfig,O=0,ie=null,ee=null,ae=0,Le=0,at=Nn(0),te=0,cs=null,Gn=0,Mr=0,na=0,Bt=null,ye=null,ta=0,qt=1/0,Ke=null,Cr=!1,po=null,Sn=null,zs=!1,gn=null,Sr=0,Ht=0,mo=null,Ks=-1,Ys=0;function ve(){return O&6?Z():Ks!==-1?Ks:Ks=Z()}function Ln(e){return e.mode&1?O&2&&ae!==0?ae&-ae:Kp.transition!==null?(Ys===0&&(Ys=ml()),Ys):(e=F,e!==0||(e=window.event,e=e===void 0?16:ql(e.type)),e):1}function Fe(e,n,t,s){if(50<Ht)throw Ht=0,mo=null,Error(q(185));ps(e,t,s),(!(O&2)||e!==ie)&&(e===ie&&(!(O&2)&&(Mr|=t),te===4&&fn(e,ae)),Se(e,s),t===1&&O===0&&!(n.mode&1)&&(qt=Z()+500,Dr&&kn()))}function Se(e,n){var t=e.callbackNode;Kd(e,n);var s=ir(e,e===ie?ae:0);if(s===0)t!==null&&Na(t),e.callbackNode=null,e.callbackPriority=0;else if(n=s&-s,e.callbackPriority!==n){if(t!=null&&Na(t),n===1)e.tag===0?Wp(qu.bind(null,e)):Ul(qu.bind(null,e)),Gp(function(){!(O&6)&&kn()}),t=null;else{switch(fl(s)){case 1:t=No;break;case 4:t=dl;break;case 16:t=rr;break;case 536870912:t=pl;break;default:t=rr}t=Rc(t,Ic.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function Ic(e,n){if(Ks=-1,Ys=0,O&6)throw Error(q(327));var t=e.callbackNode;if(mt()&&e.callbackNode!==t)return null;var s=ir(e,e===ie?ae:0);if(s===0)return null;if(s&30||s&e.expiredLanes||n)n=Lr(e,s);else{n=s;var r=O;O|=2;var i=Dc();(ie!==e||ae!==n)&&(Ke=null,qt=Z()+500,Un(e,n));do try{vm();break}catch(u){Pc(e,u)}while(!0);Vo(),qr.current=i,O=r,ee!==null?n=0:(ie=null,ae=0,n=te)}if(n!==0){if(n===2&&(r=Ui(e),r!==0&&(s=r,n=fo(e,r))),n===1)throw t=cs,Un(e,0),fn(e,s),Se(e,Z()),t;if(n===6)fn(e,s);else{if(r=e.current.alternate,!(s&30)&&!mm(r)&&(n=Lr(e,s),n===2&&(i=Ui(e),i!==0&&(s=i,n=fo(e,i))),n===1))throw t=cs,Un(e,0),fn(e,s),Se(e,Z()),t;switch(e.finishedWork=r,e.finishedLanes=s,n){case 0:case 1:throw Error(q(345));case 2:An(e,ye,Ke);break;case 3:if(fn(e,s),(s&130023424)===s&&(n=ta+500-Z(),10<n)){if(ir(e,0)!==0)break;if(r=e.suspendedLanes,(r&s)!==s){ve(),e.pingedLanes|=e.suspendedLanes&r;break}e.timeoutHandle=Hi(An.bind(null,e,ye,Ke),n);break}An(e,ye,Ke);break;case 4:if(fn(e,s),(s&4194240)===s)break;for(n=e.eventTimes,r=-1;0<s;){var a=31-Ve(s);i=1<<a,a=n[a],a>r&&(r=a),s&=~i}if(s=r,s=Z()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*pm(s/1960))-s,10<s){e.timeoutHandle=Hi(An.bind(null,e,ye,Ke),s);break}An(e,ye,Ke);break;case 5:An(e,ye,Ke);break;default:throw Error(q(329))}}}return Se(e,Z()),e.callbackNode===t?Ic.bind(null,e):null}function fo(e,n){var t=Bt;return e.current.memoizedState.isDehydrated&&(Un(e,n).flags|=256),e=Lr(e,n),e!==2&&(n=ye,ye=t,n!==null&&vo(n)),e}function vo(e){ye===null?ye=e:ye.push.apply(ye,e)}function mm(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var s=0;s<t.length;s++){var r=t[s],i=r.getSnapshot;r=r.value;try{if(!$e(i(),r))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function fn(e,n){for(n&=~na,n&=~Mr,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Ve(n),s=1<<t;e[t]=-1,n&=~s}}function qu(e){if(O&6)throw Error(q(327));mt();var n=ir(e,0);if(!(n&1))return Se(e,Z()),null;var t=Lr(e,n);if(e.tag!==0&&t===2){var s=Ui(e);s!==0&&(n=s,t=fo(e,s))}if(t===1)throw t=cs,Un(e,0),fn(e,n),Se(e,Z()),t;if(t===6)throw Error(q(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,An(e,ye,Ke),Se(e,Z()),null}function sa(e,n){var t=O;O|=1;try{return e(n)}finally{O=t,O===0&&(qt=Z()+500,Dr&&kn())}}function Qn(e){gn!==null&&gn.tag===0&&!(O&6)&&mt();var n=O;O|=1;var t=ze.transition,s=F;try{if(ze.transition=null,F=1,e)return e()}finally{F=s,ze.transition=t,O=n,!(O&6)&&kn()}}function ra(){Le=at.current,Q(at)}function Un(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,$p(t)),ee!==null)for(t=ee.return;t!==null;){var s=t;switch(_o(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&cr();break;case 3:yt(),Q(qe),Q(me),Ho();break;case 5:Bo(s);break;case 4:yt();break;case 13:Q(H);break;case 19:Q(H);break;case 10:Fo(s.type._context);break;case 22:case 23:ra()}t=t.return}if(ie=e,ee=e=jn(e.current,null),ae=Le=n,te=0,cs=null,na=Mr=Gn=0,ye=Bt=null,Rn!==null){for(n=0;n<Rn.length;n++)if(t=Rn[n],s=t.interleaved,s!==null){t.interleaved=null;var r=s.next,i=t.pending;if(i!==null){var a=i.next;i.next=r,s.next=a}t.pending=s}Rn=null}return e}function Pc(e,n){do{var t=ee;try{if(Vo(),Bs.current=xr,yr){for(var s=W.memoizedState;s!==null;){var r=s.queue;r!==null&&(r.pending=null),s=s.next}yr=!1}if($n=0,re=ne=W=null,Gt=!1,as=0,ea.current=null,t===null||t.return===null){te=1,cs=n,ee=null;break}e:{var i=e,a=t.return,u=t,l=n;if(n=ae,u.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,f=u,g=f.tag;if(!(f.mode&1)&&(g===0||g===11||g===15)){var v=f.alternate;v?(f.updateQueue=v.updateQueue,f.memoizedState=v.memoizedState,f.lanes=v.lanes):(f.updateQueue=null,f.memoizedState=null)}var y=au(a);if(y!==null){y.flags&=-257,uu(y,a,u,i,n),y.mode&1&&ou(i,c,n),n=y,l=c;var C=n.updateQueue;if(C===null){var L=new Set;L.add(l),n.updateQueue=L}else C.add(l);break e}else{if(!(n&1)){ou(i,c,n),ia();break e}l=Error(q(426))}}else if(B&&u.mode&1){var D=au(a);if(D!==null){!(D.flags&65536)&&(D.flags|=256),uu(D,a,u,i,n),Uo(xt(l,u));break e}}i=l=xt(l,u),te!==4&&(te=2),Bt===null?Bt=[i]:Bt.push(i),i=a;do{switch(i.tag){case 3:i.flags|=65536,n&=-n,i.lanes|=n;var p=fc(i,l,n);eu(i,p);break e;case 1:u=l;var d=i.type,m=i.stateNode;if(!(i.flags&128)&&(typeof d.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(Sn===null||!Sn.has(m)))){i.flags|=65536,n&=-n,i.lanes|=n;var h=vc(i,u,n);eu(i,h);break e}}i=i.return}while(i!==null)}Tc(t)}catch(j){n=j,ee===t&&t!==null&&(ee=t=t.return);continue}break}while(!0)}function Dc(){var e=qr.current;return qr.current=xr,e===null?xr:e}function ia(){(te===0||te===3||te===2)&&(te=4),ie===null||!(Gn&268435455)&&!(Mr&268435455)||fn(ie,ae)}function Lr(e,n){var t=O;O|=2;var s=Dc();(ie!==e||ae!==n)&&(Ke=null,Un(e,n));do try{fm();break}catch(r){Pc(e,r)}while(!0);if(Vo(),O=t,qr.current=s,ee!==null)throw Error(q(261));return ie=null,ae=0,te}function fm(){for(;ee!==null;)zc(ee)}function vm(){for(;ee!==null&&!Od();)zc(ee)}function zc(e){var n=Mc(e.alternate,e,Le);e.memoizedProps=e.pendingProps,n===null?Tc(e):ee=n,ea.current=null}function Tc(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=um(t,n),t!==null){t.flags&=32767,ee=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{te=6,ee=null;return}}else if(t=am(t,n,Le),t!==null){ee=t;return}if(n=n.sibling,n!==null){ee=n;return}ee=n=e}while(n!==null);te===0&&(te=5)}function An(e,n,t){var s=F,r=ze.transition;try{ze.transition=null,F=1,gm(e,n,t,s)}finally{ze.transition=r,F=s}return null}function gm(e,n,t,s){do mt();while(gn!==null);if(O&6)throw Error(q(327));t=e.finishedWork;var r=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(q(177));e.callbackNode=null,e.callbackPriority=0;var i=t.lanes|t.childLanes;if(Yd(e,i),e===ie&&(ee=ie=null,ae=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||zs||(zs=!0,Rc(rr,function(){return mt(),null})),i=(t.flags&15990)!==0,t.subtreeFlags&15990||i){i=ze.transition,ze.transition=null;var a=F;F=1;var u=O;O|=4,ea.current=null,cm(e,t),Nc(t,e),Mp(Qi),or=!!Gi,Qi=Gi=null,e.current=t,dm(t),Vd(),O=u,F=a,ze.transition=i}else e.current=t;if(zs&&(zs=!1,gn=e,Sr=r),i=e.pendingLanes,i===0&&(Sn=null),Gd(t.stateNode),Se(e,Z()),n!==null)for(s=e.onRecoverableError,t=0;t<n.length;t++)r=n[t],s(r.value,{componentStack:r.stack,digest:r.digest});if(Cr)throw Cr=!1,e=po,po=null,e;return Sr&1&&e.tag!==0&&mt(),i=e.pendingLanes,i&1?e===mo?Ht++:(Ht=0,mo=e):Ht=0,kn(),null}function mt(){if(gn!==null){var e=fl(Sr),n=ze.transition,t=F;try{if(ze.transition=null,F=16>e?16:e,gn===null)var s=!1;else{if(e=gn,gn=null,Sr=0,O&6)throw Error(q(331));var r=O;for(O|=4,b=e.current;b!==null;){var i=b,a=i.child;if(b.flags&16){var u=i.deletions;if(u!==null){for(var l=0;l<u.length;l++){var c=u[l];for(b=c;b!==null;){var f=b;switch(f.tag){case 0:case 11:case 15:Qt(8,f,i)}var g=f.child;if(g!==null)g.return=f,b=g;else for(;b!==null;){f=b;var v=f.sibling,y=f.return;if(bc(f),f===c){b=null;break}if(v!==null){v.return=y,b=v;break}b=y}}}var C=i.alternate;if(C!==null){var L=C.child;if(L!==null){C.child=null;do{var D=L.sibling;L.sibling=null,L=D}while(L!==null)}}b=i}}if(i.subtreeFlags&2064&&a!==null)a.return=i,b=a;else e:for(;b!==null;){if(i=b,i.flags&2048)switch(i.tag){case 0:case 11:case 15:Qt(9,i,i.return)}var p=i.sibling;if(p!==null){p.return=i.return,b=p;break e}b=i.return}}var d=e.current;for(b=d;b!==null;){a=b;var m=a.child;if(a.subtreeFlags&2064&&m!==null)m.return=a,b=m;else e:for(a=d;b!==null;){if(u=b,u.flags&2048)try{switch(u.tag){case 0:case 11:case 15:Ar(9,u)}}catch(j){Y(u,u.return,j)}if(u===a){b=null;break e}var h=u.sibling;if(h!==null){h.return=u.return,b=h;break e}b=u.return}}if(O=r,kn(),He&&typeof He.onPostCommitFiberRoot=="function")try{He.onPostCommitFiberRoot(Er,e)}catch{}s=!0}return s}finally{F=t,ze.transition=n}}return!1}function Cu(e,n,t){n=xt(t,n),n=fc(e,n,1),e=Cn(e,n,1),n=ve(),e!==null&&(ps(e,1,n),Se(e,n))}function Y(e,n,t){if(e.tag===3)Cu(e,e,t);else for(;n!==null;){if(n.tag===3){Cu(n,e,t);break}else if(n.tag===1){var s=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Sn===null||!Sn.has(s))){e=xt(t,e),e=vc(n,e,1),n=Cn(n,e,1),e=ve(),n!==null&&(ps(n,1,e),Se(n,e));break}}n=n.return}}function hm(e,n,t){var s=e.pingCache;s!==null&&s.delete(n),n=ve(),e.pingedLanes|=e.suspendedLanes&t,ie===e&&(ae&t)===t&&(te===4||te===3&&(ae&130023424)===ae&&500>Z()-ta?Un(e,0):na|=t),Se(e,n)}function Ac(e,n){n===0&&(e.mode&1?(n=Ls,Ls<<=1,!(Ls&130023424)&&(Ls=4194304)):n=1);var t=ve();e=sn(e,n),e!==null&&(ps(e,n,t),Se(e,t))}function ym(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),Ac(e,t)}function xm(e,n){var t=0;switch(e.tag){case 13:var s=e.stateNode,r=e.memoizedState;r!==null&&(t=r.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(q(314))}s!==null&&s.delete(n),Ac(e,t)}var Mc;Mc=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||qe.current)xe=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return xe=!1,om(e,n,t);xe=!!(e.flags&131072)}else xe=!1,B&&n.flags&1048576&&Ol(n,mr,n.index);switch(n.lanes=0,n.tag){case 2:var s=n.type;Ws(e,n),e=n.pendingProps;var r=vt(n,me.current);pt(n,t),r=Ko(null,n,s,e,r,t);var i=Yo();return n.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Ce(s)?(i=!0,dr(n)):i=!1,n.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Go(n),r.updater=Tr,n.stateNode=r,r._reactInternals=n,eo(n,s,e,t),n=so(null,n,s,!0,i,t)):(n.tag=0,B&&i&&Ro(n),fe(null,n,r,t),n=n.child),n;case 16:s=n.elementType;e:{switch(Ws(e,n),e=n.pendingProps,r=s._init,s=r(s._payload),n.type=s,r=n.tag=Cm(s),e=_e(s,e),r){case 0:n=to(null,n,s,e,t);break e;case 1:n=du(null,n,s,e,t);break e;case 11:n=lu(null,n,s,e,t);break e;case 14:n=cu(null,n,s,_e(s.type,e),t);break e}throw Error(q(306,s,""))}return n;case 0:return s=n.type,r=n.pendingProps,r=n.elementType===s?r:_e(s,r),to(e,n,s,r,t);case 1:return s=n.type,r=n.pendingProps,r=n.elementType===s?r:_e(s,r),du(e,n,s,r,t);case 3:e:{if(xc(n),e===null)throw Error(q(387));s=n.pendingProps,i=n.memoizedState,r=i.element,Bl(e,n),gr(n,s,null,t);var a=n.memoizedState;if(s=a.element,i.isDehydrated)if(i={element:s,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},n.updateQueue.baseState=i,n.memoizedState=i,n.flags&256){r=xt(Error(q(423)),n),n=pu(e,n,s,t,r);break e}else if(s!==r){r=xt(Error(q(424)),n),n=pu(e,n,s,t,r);break e}else for(je=qn(n.stateNode.containerInfo.firstChild),be=n,B=!0,Oe=null,t=Gl(n,null,s,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(gt(),s===r){n=rn(e,n,t);break e}fe(e,n,s,t)}n=n.child}return n;case 5:return Hl(n),e===null&&Ji(n),s=n.type,r=n.pendingProps,i=e!==null?e.memoizedProps:null,a=r.children,Bi(s,r)?a=null:i!==null&&Bi(s,i)&&(n.flags|=32),yc(e,n),fe(e,n,a,t),n.child;case 6:return e===null&&Ji(n),null;case 13:return qc(e,n,t);case 4:return Qo(n,n.stateNode.containerInfo),s=n.pendingProps,e===null?n.child=ht(n,null,s,t):fe(e,n,s,t),n.child;case 11:return s=n.type,r=n.pendingProps,r=n.elementType===s?r:_e(s,r),lu(e,n,s,r,t);case 7:return fe(e,n,n.pendingProps,t),n.child;case 8:return fe(e,n,n.pendingProps.children,t),n.child;case 12:return fe(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(s=n.type._context,r=n.pendingProps,i=n.memoizedProps,a=r.value,$(fr,s._currentValue),s._currentValue=a,i!==null)if($e(i.value,a)){if(i.children===r.children&&!qe.current){n=rn(e,n,t);break e}}else for(i=n.child,i!==null&&(i.return=n);i!==null;){var u=i.dependencies;if(u!==null){a=i.child;for(var l=u.firstContext;l!==null;){if(l.context===s){if(i.tag===1){l=Ze(-1,t&-t),l.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?l.next=l:(l.next=f.next,f.next=l),c.pending=l}}i.lanes|=t,l=i.alternate,l!==null&&(l.lanes|=t),Xi(i.return,t,n),u.lanes|=t;break}l=l.next}}else if(i.tag===10)a=i.type===n.type?null:i.child;else if(i.tag===18){if(a=i.return,a===null)throw Error(q(341));a.lanes|=t,u=a.alternate,u!==null&&(u.lanes|=t),Xi(a,t,n),a=i.sibling}else a=i.child;if(a!==null)a.return=i;else for(a=i;a!==null;){if(a===n){a=null;break}if(i=a.sibling,i!==null){i.return=a.return,a=i;break}a=a.return}i=a}fe(e,n,r.children,t),n=n.child}return n;case 9:return r=n.type,s=n.pendingProps.children,pt(n,t),r=Te(r),s=s(r),n.flags|=1,fe(e,n,s,t),n.child;case 14:return s=n.type,r=_e(s,n.pendingProps),r=_e(s.type,r),cu(e,n,s,r,t);case 15:return gc(e,n,n.type,n.pendingProps,t);case 17:return s=n.type,r=n.pendingProps,r=n.elementType===s?r:_e(s,r),Ws(e,n),n.tag=1,Ce(s)?(e=!0,dr(n)):e=!1,pt(n,t),mc(n,s,r),eo(n,s,r,t),so(null,n,s,!0,e,t);case 19:return Cc(e,n,t);case 22:return hc(e,n,t)}throw Error(q(156,n.tag))};function Rc(e,n){return cl(e,n)}function qm(e,n,t,s){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function De(e,n,t,s){return new qm(e,n,t,s)}function oa(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Cm(e){if(typeof e=="function")return oa(e)?1:0;if(e!=null){if(e=e.$$typeof,e===bo)return 11;if(e===wo)return 14}return 2}function jn(e,n){var t=e.alternate;return t===null?(t=De(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function Js(e,n,t,s,r,i){var a=2;if(s=e,typeof e=="function")oa(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Jn:return On(t.children,r,i,n);case jo:a=8,r|=8;break;case ji:return e=De(12,t,n,r|2),e.elementType=ji,e.lanes=i,e;case bi:return e=De(13,t,n,r),e.elementType=bi,e.lanes=i,e;case wi:return e=De(19,t,n,r),e.elementType=wi,e.lanes=i,e;case Hu:return Rr(t,r,i,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Qu:a=10;break e;case Bu:a=9;break e;case bo:a=11;break e;case wo:a=14;break e;case dn:a=16,s=null;break e}throw Error(q(130,e==null?e:typeof e,""))}return n=De(a,t,n,r),n.elementType=e,n.type=s,n.lanes=i,n}function On(e,n,t,s){return e=De(7,e,s,n),e.lanes=t,e}function Rr(e,n,t,s){return e=De(22,e,s,n),e.elementType=Hu,e.lanes=t,e.stateNode={isHidden:!1},e}function gi(e,n,t){return e=De(6,e,null,n),e.lanes=t,e}function hi(e,n,t){return n=De(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Sm(e,n,t,s,r){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Jr(0),this.expirationTimes=Jr(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Jr(0),this.identifierPrefix=s,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function aa(e,n,t,s,r,i,a,u,l){return e=new Sm(e,n,t,u,l),n===1?(n=1,i===!0&&(n|=8)):n=0,i=De(3,null,null,n),e.current=i,i.stateNode=e,i.memoizedState={element:s,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},Go(i),e}function Lm(e,n,t){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Yn,key:s==null?null:""+s,children:e,containerInfo:n,implementation:t}}function _c(e){if(!e)return wn;e=e._reactInternals;e:{if(Hn(e)!==e||e.tag!==1)throw Error(q(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Ce(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(q(171))}if(e.tag===1){var t=e.type;if(Ce(t))return _l(e,t,n)}return n}function Uc(e,n,t,s,r,i,a,u,l){return e=aa(t,s,!0,e,r,i,a,u,l),e.context=_c(null),t=e.current,s=ve(),r=Ln(t),i=Ze(s,r),i.callback=n??null,Cn(t,i,r),e.current.lanes=r,ps(e,r,s),Se(e,s),e}function _r(e,n,t,s){var r=n.current,i=ve(),a=Ln(r);return t=_c(t),n.context===null?n.context=t:n.pendingContext=t,n=Ze(i,a),n.payload={element:e},s=s===void 0?null:s,s!==null&&(n.callback=s),e=Cn(r,n,a),e!==null&&(Fe(e,r,a,i),Qs(e,r,a)),a}function jr(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Su(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function ua(e,n){Su(e,n),(e=e.alternate)&&Su(e,n)}function jm(){return null}var Oc=typeof reportError=="function"?reportError:function(e){console.error(e)};function la(e){this._internalRoot=e}Ur.prototype.render=la.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(q(409));_r(e,n,null,null)};Ur.prototype.unmount=la.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Qn(function(){_r(null,e,null,null)}),n[tn]=null}};function Ur(e){this._internalRoot=e}Ur.prototype.unstable_scheduleHydration=function(e){if(e){var n=hl();e={blockedOn:null,target:e,priority:n};for(var t=0;t<mn.length&&n!==0&&n<mn[t].priority;t++);mn.splice(t,0,e),t===0&&xl(e)}};function ca(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Or(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Lu(){}function bm(e,n,t,s,r){if(r){if(typeof s=="function"){var i=s;s=function(){var c=jr(a);i.call(c)}}var a=Uc(n,s,e,0,null,!1,!1,"",Lu);return e._reactRootContainer=a,e[tn]=a.current,ts(e.nodeType===8?e.parentNode:e),Qn(),a}for(;r=e.lastChild;)e.removeChild(r);if(typeof s=="function"){var u=s;s=function(){var c=jr(l);u.call(c)}}var l=aa(e,0,!1,null,null,!1,!1,"",Lu);return e._reactRootContainer=l,e[tn]=l.current,ts(e.nodeType===8?e.parentNode:e),Qn(function(){_r(n,l,t,s)}),l}function Vr(e,n,t,s,r){var i=t._reactRootContainer;if(i){var a=i;if(typeof r=="function"){var u=r;r=function(){var l=jr(a);u.call(l)}}_r(n,a,e,r)}else a=bm(t,n,e,r,s);return jr(a)}vl=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Rt(n.pendingLanes);t!==0&&(ko(n,t|1),Se(n,Z()),!(O&6)&&(qt=Z()+500,kn()))}break;case 13:Qn(function(){var s=sn(e,1);if(s!==null){var r=ve();Fe(s,e,1,r)}}),ua(e,1)}};Io=function(e){if(e.tag===13){var n=sn(e,134217728);if(n!==null){var t=ve();Fe(n,e,134217728,t)}ua(e,134217728)}};gl=function(e){if(e.tag===13){var n=Ln(e),t=sn(e,n);if(t!==null){var s=ve();Fe(t,e,n,s)}ua(e,n)}};hl=function(){return F};yl=function(e,n){var t=F;try{return F=e,n()}finally{F=t}};Mi=function(e,n,t){switch(n){case"input":if(ki(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var s=t[n];if(s!==e&&s.form===e.form){var r=Pr(s);if(!r)throw Error(q(90));Ku(s),ki(s,r)}}}break;case"textarea":Ju(e,t);break;case"select":n=t.value,n!=null&&ut(e,!!t.multiple,n,!1)}};rl=sa;il=Qn;var wm={usingClientEntryPoint:!1,Events:[fs,nt,Pr,tl,sl,sa]},zt={findFiberByHostInstance:Mn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Em={bundleType:zt.bundleType,version:zt.version,rendererPackageName:zt.rendererPackageName,rendererConfig:zt.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:on.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ul(e),e===null?null:e.stateNode},findFiberByHostInstance:zt.findFiberByHostInstance||jm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ts=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ts.isDisabled&&Ts.supportsFiber)try{Er=Ts.inject(Em),He=Ts}catch{}}Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=wm;Ee.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!ca(n))throw Error(q(200));return Lm(e,n,null,t)};Ee.createRoot=function(e,n){if(!ca(e))throw Error(q(299));var t=!1,s="",r=Oc;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(r=n.onRecoverableError)),n=aa(e,1,!1,null,null,t,!1,s,r),e[tn]=n.current,ts(e.nodeType===8?e.parentNode:e),new la(n)};Ee.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(q(188)):(e=Object.keys(e).join(","),Error(q(268,e)));return e=ul(n),e=e===null?null:e.stateNode,e};Ee.flushSync=function(e){return Qn(e)};Ee.hydrate=function(e,n,t){if(!Or(n))throw Error(q(200));return Vr(null,e,n,!0,t)};Ee.hydrateRoot=function(e,n,t){if(!ca(e))throw Error(q(405));var s=t!=null&&t.hydratedSources||null,r=!1,i="",a=Oc;if(t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),n=Uc(n,null,e,1,t??null,r,!1,i,a),e[tn]=n.current,ts(e),s)for(e=0;e<s.length;e++)t=s[e],r=t._getVersion,r=r(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,r]:n.mutableSourceEagerHydrationData.push(t,r);return new Ur(n)};Ee.render=function(e,n,t){if(!Or(n))throw Error(q(200));return Vr(null,e,n,!1,t)};Ee.unmountComponentAtNode=function(e){if(!Or(e))throw Error(q(40));return e._reactRootContainer?(Qn(function(){Vr(null,null,e,!1,function(){e._reactRootContainer=null,e[tn]=null})}),!0):!1};Ee.unstable_batchedUpdates=sa;Ee.unstable_renderSubtreeIntoContainer=function(e,n,t,s){if(!Or(t))throw Error(q(200));if(e==null||e._reactInternals===void 0)throw Error(q(38));return Vr(e,n,t,!1,s)};Ee.version="18.3.1-next-f1338f8080-20240426";function Vc(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Vc)}catch(e){console.error(e)}}Vc(),Vu.exports=Ee;var Nm=Vu.exports,Fc,ju=Nm;Fc=ju.createRoot,ju.hydrateRoot;const $c="2026-11-10.1",km="Je déclare avoir 18 ans ou plus. Je comprends que Luna est réservé aux personnes majeures et que tout compte ouvert par un mineur sera fermé.",Im="J'ai lu et j'accepte les Conditions générales d'utilisation. J'ai pris connaissance de la Politique de confidentialité.",Pm="J'ai lu et j'accepte les Conditions générales de vente, notamment les tarifs à la minute, les règles du portefeuille et les conditions de remboursement.",Dm="Je demande à pouvoir utiliser mon crédit immédiatement, sans attendre la fin du délai de rétractation de 14 jours. Je reconnais que chaque consultation entièrement réalisée ne pourra plus faire l'objet d'une rétractation. Le crédit que je n'ai pas encore utilisé reste remboursable si je me rétracte dans les 14 jours, et ensuite dans les conditions des CGV.",zm=`Avant votre première consultation : vos confidences sont des données sensibles

Pendant une consultation, vous pouvez parler de votre santé (physique ou mentale), de votre vie amoureuse ou sexuelle, de votre orientation sexuelle, ou de vos convictions religieuses ou philosophiques. La loi les appelle des « données sensibles » (article 9 du RGPD) et nous ne pouvons les traiter qu'avec votre accord explicite.

Ce que nous en faisons : elles servent uniquement à réaliser votre consultation et à vous montrer votre historique. Le guide que vous consultez y a accès pendant la séance et retrouve ensuite l'historique de vos échanges avec lui. Si votre guide est une intelligence artificielle, vos messages sont transmis à notre prestataire d'IA ([NOM DU FOURNISSEUR D'IA]) pour générer les réponses. Il lui est interdit de les conserver ou de s'en servir pour entraîner ses modèles.

Ce que nous n'en faisons jamais : pas de publicité, pas de prospection ciblée, pas de revente, pas de profilage sur ces sujets. Les appels et les visios ne sont pas enregistrés par défaut.

Combien de temps : le contenu de vos échanges est effacé automatiquement au bout de [12] mois, ou plus tôt si vous le supprimez vous-même.

Vous pouvez retirer votre accord à tout moment dans Mon compte > Confidentialité. Vos consultations s'arrêtent alors, et vous pouvez demander l'effacement de vos échanges. Ce retrait ne remet pas en cause ce qui a été fait avant.`,da="J'accepte expressément que Luna traite les données sensibles (santé, vie ou orientation sexuelle, convictions religieuses ou philosophiques) que je pourrais partager pendant mes consultations, uniquement pour réaliser ces consultations et conserver mon historique, dans les conditions décrites ci-dessus.",bu="J'accepte que mes conversations avec les guides IA de Luna, après suppression de mon nom, de mon email, de mon téléphone et des autres éléments qui permettent de m'identifier directement, soient utilisées pour améliorer les guides IA de Luna. Ces données restent chez Luna et son prestataire [NOM], ne sont jamais utilisées pour entraîner les modèles généraux du prestataire, et sont supprimées au bout de [24] mois. Je peux retirer mon accord à tout moment ; les conversations futures ne seront plus utilisées et celles déjà extraites seront supprimées sous 30 jours.",Tm="Recevoir les offres de Luna (facultatif, vous pouvez changer d'avis à tout moment). Luna ne transmet jamais vos coordonnées à des partenaires. Désinscription en un clic dans chaque message ou dans Mon compte. Luna ne pratique pas le démarchage téléphonique.",Am={marketing_email:"Par email : offres, nouveautés et horoscopes de Luna ([RAISON SOCIALE]). Au maximum [2] emails par semaine.",marketing_sms:"Par SMS : offres de Luna. Au maximum [2] SMS par mois, jamais entre 20 h et 10 h ni le dimanche.",marketing_whatsapp:"Par WhatsApp : offres de Luna, envoyées via WhatsApp (service de Meta). Au maximum [2] messages par mois.",marketing_push:"Par notifications sur l'application : offres de Luna."},Mm="Bonjour, ici Luna. Pour améliorer la qualité de nos consultations, nous aimerions enregistrer cet appel. L'enregistrement sera écouté uniquement par notre équipe qualité et effacé au bout de 30 jours. Il peut contenir des informations personnelles et sensibles. Si vous êtes d'accord, tapez 1. Pour refuser, tapez 2 ou ne tapez rien : votre consultation se déroulera normalement, sans enregistrement.",Rm="Cette visio n'est pas enregistrée, ni par Luna ni par votre guide. Il est interdit à chacun d'enregistrer ou de filmer l'autre sans son accord.",Gc="La voyance et la guidance sont proposées à titre de divertissement et de réflexion personnelle. Elles ne prédisent pas l’avenir avec certitude et ne remplacent pas l’avis d’un médecin, d’un psychologue, d’un avocat ou d’un conseiller financier. Service réservé aux personnes majeures.",_m=[{path:"/",slug:"accueil",title:"Luna : guidance et voyance en ligne, en toute clarté",description:"Tarot, astrologie, numérologie : échangez par chat, téléphone ou message avec des guides IA et humains clairement identifiés. Réservé aux majeurs.",h1:"Une question vous occupe l’esprit ? Posez-la à Luna.",body:`# Une question vous occupe l’esprit ? Posez-la à Luna.

Luna est un espace de guidance en ligne. Tarot, astrologie, numérologie, oracle ou interprétation des rêves : chaque pratique sert ici à prendre du recul, à mettre des mots sur une situation et à repartir avec des pistes de réflexion. Par chat, par téléphone ou par message écrit, 24 h/24.

[Choisir un guide](/voyants) · [Essayer avec Séléné, guide IA](/voyants/selene)

## Une guidance, pas une promesse

Nous ne prédisons pas votre avenir et nous ne promettons aucun résultat. Une consultation éclaire une question sous un autre angle ; les décisions vous appartiennent. Les échanges n’ont pas de valeur scientifique et ne remplacent pas l’avis d’un médecin, d’un avocat ou d’un conseiller financier.

## Des guides clairement identifiés

Sur Luna, vous savez toujours avec qui vous échangez.

- **Guides IA** : des assistants conversationnels, disponibles à toute heure. Ils sont signalés « guide IA » sur leur profil, en tête de conversation et dans leur premier message.
- **Guides humains** : des praticiens et praticiennes, chacun avec sa pratique, sa voix et ses horaires.

[Découvrir les guides](/voyants)

## Trois façons d’échanger

### Le chat
Pour une question précise, à votre rythme. Vous écrivez, le guide répond, vous pouvez reprendre la conversation plus tard depuis votre historique.

### Le téléphone
Pour un échange de vive voix avec un guide humain. Le tarif par minute est affiché avant l’appel, jamais après.

### Le message écrit
Pour une réponse détaillée et réfléchie, à relire tranquillement. Le délai de réponse est indiqué sur le profil du guide.

[Voir comment ça marche](/comment-ca-marche)

## Les pratiques

Chaque pratique a son langage. Choisissez celle qui vous parle, ou laissez-vous orienter.

- [Tarot](/specialites/tarot) : des images pour ouvrir la réflexion
- [Astrologie](/specialites/astrologie) : les cycles et le thème natal
- [Numérologie](/specialites/numerologie) : la symbolique des nombres
- [Cartomancie](/specialites/cartomancie) : les jeux de cartes traditionnels
- [Oracle](/specialites/oracle) : des cartes illustrées, un message à interpréter
- [Runes](/specialites/runes) : un alphabet ancien comme support de questions
- [Pendule](/specialites/pendule) : une pratique d’écoute et de clarification
- [Rêves](/specialites/reves) : lire ses rêves comme un récit personnel
- [Médiumnité](/specialites/mediumnite) : une pratique intuitive, présentée avec prudence

## Les grandes questions

[Amour](/themes/amour) · [Couple](/themes/couple) · [Travail](/themes/travail) · [Argent](/themes/argent) · [Famille](/themes/famille) · [Avenir](/themes/avenir)

## Pour commencer

Votre première conversation peut commencer par une offre de bienvenue : [À DÉFINIR : contenu exact de l’offre de bienvenue]. Les conditions sont écrites en clair, sans engagement caché.

[Découvrir l’offre de bienvenue](/offre-bienvenue)

## Notre engagement

- Des prix affichés avant chaque échange, en euros TTC.
- Aucune relance insistante, aucun compte à rebours.
- Vos conversations restent privées. [Lire notre politique de confidentialité](/confidentialite)
- Si vous traversez une période difficile, une consultation ne suffit pas toujours. En cas de détresse, appelez le 3114 (numéro national de prévention du suicide, gratuit, 24 h/24) ou le 15 en cas d’urgence.

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel.*`,source:"content/editorial/accueil.md"},{path:"/blog/bien-formuler-sa-question/",slug:"blog/bien-formuler-sa-question",title:"Bien formuler sa question avant une consultation | Luna",description:"Une question claire donne un échange plus utile. Méthode simple en cinq étapes pour préparer votre question avant de consulter un guide.",h1:"Bien formuler sa question avant une consultation",body:`# Bien formuler sa question avant une consultation

*Temps de lecture : 5 minutes*

Vous avez décidé de consulter un guide. Le tarot est prêt, l’astrologue attend votre date de naissance, ou Séléné, notre guide IA, vous demande ce qui vous occupe. Et soudain, la question qui tournait dans votre tête depuis des jours vous semble floue, trop grande ou trop petite. C’est normal. Une bonne question se prépare, un peu comme on prépare un rendez-vous important. Voici une méthode simple pour y arriver.

## Pourquoi la formulation compte autant

Une consultation n’est pas un oracle qui délivre une vérité. C’est un échange qui vous aide à réfléchir. La qualité de cet échange dépend donc beaucoup du point de départ. Une question fermée sur l’avenir, du type « Est-ce qu’il va m’appeler ? », mène presque toujours à une impasse : personne ne peut y répondre honnêtement, et la réponse, quelle qu’elle soit, ne vous aidera pas à agir.

À l’inverse, une question ouverte et centrée sur vous ouvre plusieurs portes. « Qu’est-ce qui m’aiderait à vivre plus sereinement cette attente ? » permet au guide de parler de vos besoins, de vos ressources, de ce qui vous pèse. Vous repartez avec des pistes, pas avec une prédiction que vous attendrez de voir se réaliser.

## Étape 1 : écrire la question telle qu’elle vient

Commencez par noter votre question sans la filtrer, avec vos mots, même maladroits. « Je ne sais plus quoi faire avec mon travail. » « Pourquoi ça ne marche jamais en amour ? » « J’ai peur de déménager. » Cette première version a de la valeur : elle contient l’émotion qui vous pousse à consulter.

Ne cherchez pas encore à la rendre belle. L’objectif est simplement de sortir la question de votre tête pour pouvoir la regarder.

## Étape 2 : identifier ce qui vous préoccupe vraiment

Relisez votre phrase et demandez-vous : qu’est-ce qui m’inquiète, au fond ? Derrière « Je ne sais plus quoi faire avec mon travail », il peut y avoir de la fatigue, un sentiment d’injustice, une envie de changement que vous n’osez pas formuler, ou la peur de décevoir. Derrière « Pourquoi ça ne marche jamais en amour ? », il y a peut-être un schéma que vous avez remarqué, ou une solitude difficile à vivre.

Essayez de nommer une émotion principale : peur, tristesse, colère, impatience, doute. Cela suffit souvent à préciser la question.

## Étape 3 : ramener la question vers vous

Une consultation vous concerne, vous. Elle ne peut pas vous dire ce que pense ou fera une autre personne, et c’est une bonne nouvelle : c’est sur vos propres choix que vous avez prise. Transformez donc les questions tournées vers autrui en questions tournées vers vous.

- « Que ressent-elle pour moi ? » devient « Qu’est-ce que je ressens, moi, dans cette relation ? »
- « Mon chef va-t-il me promouvoir ? » devient « Qu’ai-je envie de montrer de mon travail ? »
- « Mes parents vont-ils accepter ma décision ? » devient « Comment leur présenter ma décision d’une façon qui me ressemble ? »

Ce déplacement change tout. Il vous redonne un rôle actif.

## Étape 4 : ouvrir plutôt que fermer

Les questions qui commencent par « est-ce que » appellent un oui ou un non. Celles qui commencent par « qu’est-ce qui », « comment », « de quoi » appellent une exploration. Comparez :

- « Est-ce que je dois partir ? »
- « Qu’est-ce qui me retient, et qu’est-ce qui m’attire ailleurs ? »

La seconde version ne vous donnera pas de réponse toute faite, mais elle vous permettra d’y voir plus clair. Le guide pourra s’appuyer sur ses cartes, sur votre thème ou sur votre récit pour explorer les deux côtés.

## Étape 5 : choisir une seule question

Il est tentant d’arriver avec cinq sujets à la fois. Mais une consultation est plus utile lorsqu’elle se concentre sur une question principale. Si plusieurs sujets vous occupent, demandez-vous lequel pèse le plus aujourd’hui. Les autres pourront attendre, et vous constaterez peut-être qu’ils s’éclairent d’eux-mêmes.

Si vous ne savez vraiment pas par où commencer, dites-le simplement au guide : « J’ai plusieurs choses en tête, pouvez-vous m’aider à faire le tri ? » C’est une demande tout à fait légitime.

## Ce que vous pouvez préparer en plus

Selon la pratique choisie, quelques informations aideront votre guide :

- **Astrologie** : votre date, votre heure et votre lieu de naissance. Sans l’heure, la lecture reste possible, mais plus générale.
- **Numérologie** : votre date de naissance et, si vous le souhaitez, votre prénom et votre nom.
- **Rêves** : le récit du rêve, noté le plus tôt possible après le réveil.
- **Tarot, oracle, runes** : rien de particulier, sinon votre question et un moment calme.

Vous n’êtes jamais obligé de partager une information qui vous met mal à l’aise. Un pseudonyme suffit pour consulter.

## Les questions à laisser à d’autres

Quelques questions ne relèvent pas de la guidance. Si votre préoccupation porte sur votre santé ou celle d’un proche, sur une démarche juridique, un contrat, un placement ou une dette, la bonne personne est un médecin, un avocat, un notaire ou un conseiller financier. Un guide pourra vous aider à exprimer ce que vous ressentez face à la situation, mais pas à décider à la place de ces professionnels.

Et si vous traversez une période de grande détresse, une consultation ne suffit pas. Le 3114, numéro national de prévention du suicide, est gratuit et joignable 24 h/24.

## Un exemple complet

Prenons la question de départ « Va-t-il revenir ? ».

1. Ce qui vous préoccupe : la tristesse de la rupture, et l’incertitude qui empêche d’avancer.
2. Ramenée vers vous : « Comment vivre cette période sans rester suspendu à son retour ? »
3. Ouverte : « Qu’est-ce qui m’aiderait à retrouver de l’apaisement en ce moment ? »

Avec cette question, la consultation peut parler de vos besoins, de ce que la relation vous a apporté, de ce que vous souhaitez pour la suite. Vous repartez avec quelque chose de concret.

## En résumé

Une bonne question est **personnelle**, **ouverte** et **unique**. Elle part de ce que vous ressentez et vous laisse la place d’agir. Prendre cinq minutes pour la préparer, c’est déjà commencer à réfléchir, et c’est souvent là que se trouve une partie de la réponse.

[Choisir un guide](/voyants) · [Comment fonctionne Luna](/comment-ca-marche)

---

*Les consultations sont proposées à des fins de réflexion personnelle et de divertissement. Elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Service réservé aux personnes majeures.*`,source:"content/editorial/blog/bien-formuler-sa-question.md"},{path:"/blog/comprendre-son-theme-natal/",slug:"blog/comprendre-son-theme-natal",title:"Comprendre son thème natal sans s’y enfermer | Luna",description:"Signes, planètes, maisons, aspects : les bases du thème natal expliquées simplement, et comment s’en servir pour réfléchir plutôt que comme un destin.",h1:"Comprendre son thème natal sans s’y enfermer",body:`# Comprendre son thème natal sans s’y enfermer

*Temps de lecture : 6 minutes*

« Je suis Scorpion, c’est pour ça que je suis jaloux. » « Avec mon ascendant Capricorne, je ne changerai jamais. » L’astrologie est souvent utilisée pour expliquer qui nous sommes, parfois pour nous excuser de ce que nous faisons. Pourtant, bien comprise, elle peut être tout le contraire d’une étiquette : un langage symbolique qui ouvre des questions. Voici les bases du thème natal, et quelques repères pour l’aborder avec recul.

## Ce qu’est un thème natal

Le thème natal, ou carte du ciel, représente la position du Soleil, de la Lune et des planètes au moment et au lieu exacts de votre naissance, vue depuis la Terre. Il se présente sous la forme d’un cercle divisé en douze parts, sur lequel sont placés des symboles.

Pour l’établir, il faut trois informations : la date, l’heure et le lieu de naissance. L’heure est importante, car le ciel tourne vite : l’ascendant change environ toutes les deux heures. Si vous ne la connaissez pas, votre acte de naissance l’indique souvent.

Précisons d’emblée que l’astrologie n’a pas de validité scientifique démontrée. Sur Luna, elle est proposée comme un langage pour se raconter et réfléchir, pas comme une explication de votre personnalité ou de votre avenir.

## Les quatre briques du thème

### Les signes
Les douze signes du zodiaque, du Bélier aux Poissons, correspondent à douze portions du ciel. Chacun est associé à un élément (Feu, Terre, Air, Eau) et à un mode (cardinal, fixe, mutable). Dans un thème, les signes colorent la façon dont s’exprime chaque planète.

### Les planètes
En astrologie, on parle de « planètes » pour désigner aussi le Soleil et la Lune. Chacune symbolise une dimension de la vie :

- le **Soleil** : l’identité, ce qui vous anime ;
- la **Lune** : les émotions, les besoins de sécurité ;
- **Mercure** : la pensée, la communication ;
- **Vénus** : l’affection, le goût, les valeurs ;
- **Mars** : l’action, le désir, la combativité ;
- **Jupiter** : l’expansion, la confiance ;
- **Saturne** : la structure, les limites, la maturité ;
- **Uranus**, **Neptune** et **Pluton**, plus lentes, sont associées à des thèmes collectifs ou à des transformations profondes.

### Les maisons
Les douze maisons découpent le thème en domaines de vie : la personnalité, les ressources, la communication, le foyer, la créativité, le quotidien, les relations, les transformations, les voyages et les idées, la vie publique, les amitiés et les projets, la vie intérieure. Leur position dépend de l’heure de naissance.

### Les aspects
Les aspects sont les angles formés entre les planètes. Les principaux sont la conjonction, le sextile, le carré, le trigone et l’opposition. On les lit traditionnellement comme des dialogues, fluides ou tendus, entre différentes parts de vous.

## Le trio de départ : Soleil, Lune, ascendant

Si vous découvrez votre thème, commencez par trois éléments.

- **Le signe solaire** est celui que l’on appelle couramment « mon signe ». Il est associé à votre élan principal.
- **Le signe lunaire** est associé à votre monde émotionnel : ce qui vous rassure, ce dont vous avez besoin dans l’intimité.
- **L’ascendant** est le signe qui se levait à l’horizon au moment de votre naissance. Il est associé à votre façon d’aborder le monde et à la première impression que vous donnez.

Une personne Lion, Lune en Cancer, ascendant Vierge, pourra ainsi se reconnaître dans le besoin de rayonner, la recherche d’un cocon affectif et une manière prudente, méthodique, d’entrer en relation. Ou pas du tout. C’est précisément ce dialogue entre le symbole et votre expérience qui est intéressant.

## Trois façons de s’enfermer, et comment les éviter

### Prendre le symbole pour une sentence
« J’ai Saturne en maison 7, je ne trouverai jamais l’amour. » Une telle lecture n’a aucun fondement, même dans la logique astrologique. Saturne y est plutôt associé à la recherche de relations durables, construites avec le temps. Plus largement, aucune configuration ne condamne ni ne promet quoi que ce soit.

### Se servir du thème comme d’une excuse
Votre signe n’explique pas un comportement qui blesse les autres et ne vous en dispense pas. Si un trait vous pose problème, le thème peut aider à le nommer ; le travail, lui, reste le vôtre.

### Lire l’autre à travers son signe
« Les Gémeaux sont infidèles », « les Taureaux sont têtus » : ces raccourcis réduisent les personnes à une étiquette. La compatibilité entre deux signes ne dit rien de la réalité d’une relation, qui se construit à deux.

## Utiliser son thème comme outil de réflexion

Bien utilisé, le thème natal est une liste de questions plutôt qu’une liste de réponses. Quelques exemples :

- Votre Lune est en Bélier ? Demandez-vous comment vous réagissez à la frustration, et ce qui vous apaise.
- Vous avez beaucoup de planètes en Terre ? Interrogez votre rapport à la sécurité et au concret.
- Un carré Vénus-Saturne apparaît dans votre thème ? Réfléchissez à la place de la confiance et de la patience dans vos relations.

Gardez ce qui vous parle, laissez le reste. Un astrologue sérieux ne vous imposera jamais une lecture qui ne résonne pas.

## Les cycles : regarder une période plutôt qu’une date

Les astrologues observent aussi les transits, c’est-à-dire la position actuelle des planètes par rapport à votre thème natal. Le retour de Saturne, autour de 29 ans, est par exemple souvent associé à une période de bilan. Ces cycles peuvent aider à donner du sens à une transition. Ils ne fixent en revanche ni date ni événement : ils proposent un thème de réflexion pour une période.

## Consulter un astrologue

Une consultation permet de relier ces éléments entre eux et à votre histoire, ce qu’un calcul automatique ne fait pas. Sur Luna, Marc vous propose une lecture de votre thème par téléphone ou par message, et Véga, notre guide IA, peut vous expliquer les notions de base à toute heure. Préparez simplement votre date, votre heure et votre lieu de naissance, et une question qui vous tient à cœur.

## En résumé

Le thème natal est une carte, pas un territoire. Il offre un vocabulaire riche pour parler de soi, à condition de ne pas le prendre pour une vérité. Le Soleil, la Lune et l’ascendant sont un bon point de départ. Pour le reste, gardez votre esprit critique, et votre liberté.

[Découvrir l’astrologie](/specialites/astrologie) · [Consulter Marc](/voyants/marc) · [Parcourir les signes](/horoscope/belier)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique et ne remplace pas un avis professionnel. Service réservé aux personnes majeures.*`,source:"content/editorial/blog/comprendre-son-theme-natal.md"},{path:"/blog/consulter-avec-mesure/",slug:"blog/consulter-avec-mesure",title:"Consulter avec mesure : savoir faire une pause | Luna",description:"Consulter peut aider à réfléchir, mais pas à remplacer ses propres décisions. Signaux à repérer, outils pour faire une pause et aides disponibles.",h1:"Consulter avec mesure : savoir faire une pause",body:`# Consulter avec mesure : savoir faire une pause

*Temps de lecture : 5 minutes*

Il peut sembler étrange qu’une plateforme de guidance publie un article pour vous inviter à consulter moins. C’est pourtant un sujet que nous prenons au sérieux. Une consultation peut aider à prendre du recul, à mettre des mots sur une situation, à repartir avec des pistes. Mais lorsqu’elle devient un réflexe, un besoin de réassurance permanent ou une dépense qui pèse, elle ne remplit plus ce rôle. Voici comment repérer ce glissement, et ce que vous pouvez faire.

## Pourquoi on peut avoir envie de consulter souvent

Les périodes d’incertitude sont difficiles à vivre. Une rupture, une attente, un conflit, un projet qui tarde : l’esprit cherche des réponses, et la consultation en promet une forme. Elle apporte un moment d’attention, une parole extérieure, parfois un soulagement.

Le problème, c’est que ce soulagement est souvent de courte durée. Si la consultation devient le moyen principal de calmer une inquiétude, l’inquiétude revient, et l’envie de consulter avec elle. C’est un mécanisme humain, qui n’a rien de honteux. Mais il mérite d’être reconnu.

## Les signaux à observer

Prenez un moment pour vous poser honnêtement ces questions. Il ne s’agit pas d’un test, seulement de repères.

- **Vous posez la même question encore et encore**, à un ou plusieurs guides, en espérant une réponse différente.
- **Vous consultez avant chaque petite décision**, même celles que vous preniez facilement auparavant.
- **Vous ressentez de l’anxiété si vous ne pouvez pas consulter**, ou un manque après la fin d’un échange.
- **Vos dépenses dépassent ce que vous aviez prévu**, ou vous cachez ces dépenses à vos proches.
- **Vous consultez surtout la nuit**, quand l’inquiétude est la plus forte et le sommeil le plus fragile.
- **Vous attendez qu’un guide vous dise quoi faire**, plutôt que de réfléchir avec lui.

Si vous vous reconnaissez dans plusieurs de ces situations, ce n’est pas un jugement sur vous. C’est un signal qu’il est peut-être temps de faire une pause, et de chercher un autre type de soutien.

## Ce qu’une consultation ne peut pas faire

Une consultation ne peut pas lever l’incertitude. Personne ne connaît l’avenir, et une réponse, même rassurante, ne change rien à ce qui va arriver. Elle ne peut pas non plus remplacer vos décisions : un guide peut éclairer une situation, mais c’est vous qui choisissez, et c’est vous qui vivez avec ce choix.

Reconnaître cette limite peut être libérateur. Cela vous rend la main.

## Les outils que Luna met à votre disposition

Nous avons conçu Luna pour que vous restiez maître de votre usage.

### Le plafond de dépense
Dans votre compte, vous pouvez fixer un montant maximal par mois. Une fois ce plafond atteint, aucun nouvel échange payant ne peut commencer avant le mois suivant. Pour le relever, il faut le faire vous-même, dans vos paramètres. [À DÉFINIR : fonctionnalité et délai éventuel avant relèvement, à confirmer par Tech Luna.]

### La pause du compte
Vous pouvez suspendre votre compte pour une durée choisie. Pendant cette période, aucun échange payant n’est possible. [À DÉFINIR : durées proposées.]

### La fermeture du compte
Vous pouvez aussi fermer votre compte à tout moment, sans justification.

### Des guides qui ne vous retiennent pas
Nos guides s’engagent à ne jamais vous inciter à revenir ou à prolonger un échange. Si un guide remarque que vous consultez très souvent sur la même question, il peut vous le dire avec tact, et même écourter l’échange. Nos guides IA suivent la même règle : ils ne vous relancent pas.

Si un guide vous pousse à consulter davantage, vous promet un résultat ou vous propose un service payant en dehors de la plateforme, signalez-le : c’est contraire à notre charte.

## Quelques pistes pour faire autrement

### Laisser passer une nuit
Si une question vous saisit le soir, notez-la et attendez le lendemain. Les inquiétudes nocturnes perdent souvent de leur intensité à la lumière du jour.

### Écrire plutôt que demander
Un carnet peut jouer le rôle d’un premier interlocuteur. Écrivez votre question, ce que vous ressentez, ce que vous feriez si vous n’aviez pas peur. Relisez quelques jours plus tard.

### Fixer un rythme
Si la consultation vous fait du bien, choisissez un rythme raisonnable et tenez-vous-y : une fois par mois, par exemple, ou seulement lors d’un moment de transition.

### Parler à un proche
Une amie, un frère, une collègue de confiance : une parole qui vous connaît vraiment a une valeur qu’aucune consultation ne remplace.

### Se faire accompagner
Si l’inquiétude est envahissante, si elle perturbe votre sommeil, votre travail ou vos relations, un médecin ou un psychologue peut vous aider. Ce n’est pas un échec : c’est prendre soin de vous.

## Les aides disponibles

- **3114** : numéro national de prévention du suicide, gratuit, 24 h/24.
- **15** ou **112** : en cas d’urgence.
- **Points conseil budget** : une aide gratuite et confidentielle si vos dépenses vous mettent en difficulté.
- **Votre médecin traitant** : un premier interlocuteur pour parler de l’anxiété ou du sommeil.

## Notre position

Nous préférons que vous consultiez moins souvent, et que chaque échange vous soit vraiment utile, plutôt que de vous voir revenir par réflexe. Une bonne consultation vous laisse plus autonome qu’avant, pas plus dépendant. Si vous sentez que ce n’est plus le cas, faire une pause est sans doute la meilleure décision que vous puissiez prendre, et nous la respecterons.

[Gérer mon plafond de dépense](/compte/plafond) · [Questions fréquentes](/faq)

---

*Les consultations sont proposées à des fins de réflexion personnelle et de divertissement. Elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Service réservé aux personnes majeures.*`,source:"content/editorial/blog/consulter-avec-mesure.md"},{path:"/blog/guide-ia-ou-guide-humain/",slug:"blog/guide-ia-ou-guide-humain",title:"Guide IA ou guide humain : comment choisir | Luna",description:"Disponibilité, écoute, confidentialité, limites : ce qui distingue un guide IA d’un guide humain sur Luna, pour choisir en connaissance de cause.",h1:"Guide IA ou guide humain : comment choisir",body:`# Guide IA ou guide humain : comment choisir

*Temps de lecture : 5 minutes*

Sur Luna, vous pouvez échanger avec deux types de guides : des guides IA, comme Séléné ou Véga, et des guides humains, comme Marc ou Claire. Les deux sont clairement identifiés, sur leur profil comme dans la conversation. Mais concrètement, qu’est-ce qui les distingue, et lequel choisir pour votre question ? Voici un tour d’horizon honnête.

## Ce qu’est un guide IA

Un guide IA est un assistant conversationnel. Ses réponses sont générées automatiquement par un modèle d’intelligence artificielle, à partir de consignes rédigées par l’équipe Luna : le ton à adopter, la façon de présenter un tirage, les limites à respecter.

Il est important de savoir ce qu’il n’est pas. Un guide IA :

- n’est pas une personne et ne ressent rien ;
- ne possède aucun don, aucune intuition, aucune perception particulière ;
- ne connaît de vous que ce que vous lui écrivez ;
- peut se tromper, mal comprendre une question ou produire une réponse maladroite.

C’est pour cela que Luna l’indique partout : sur le profil, dans l’en-tête de la conversation, dans le premier message et dans un bandeau visible pendant tout l’échange.

## Ce qu’est un guide humain

Un guide humain est un praticien ou une praticienne qui a sa propre formation, sa propre pratique et sa propre façon d’écouter. Sur Luna, chaque guide humain est sélectionné après un entretien et une consultation test, et signe une charte de déontologie : ne rien promettre, ne pas donner de conseil médical, juridique ou financier, ne jamais pousser à consulter davantage.

Un guide humain a aussi ses limites : des horaires, une disponibilité variable, et une sensibilité qui lui est propre. C’est ce qui fait la richesse de l’échange, et aussi ce qui peut faire qu’un guide vous convienne mieux qu’un autre.

## Comparer, critère par critère

### La disponibilité
Le guide IA répond à toute heure, sans attente. Le guide humain a des horaires et peut être occupé. Si vous avez besoin de poser une question à 3 h du matin, le guide IA sera là. Mais si votre question vous empêche de dormir, demandez-vous aussi si elle ne mérite pas d’attendre le lendemain, avec un esprit plus reposé.

### L’écoute
Un guide humain perçoit les nuances : une hésitation dans la voix, une contradiction dans un récit, une émotion qui affleure. Il peut adapter son ton, laisser un silence, revenir sur un point. Un guide IA traite le texte que vous lui envoyez ; il peut reformuler et poser des questions, mais il ne perçoit rien au-delà de vos mots.

### La pédagogie
Pour découvrir une pratique, le guide IA est souvent un bon point de départ. Il explique patiemment ce qu’est un arcane, un ascendant ou un chemin de vie, et vous pouvez lui reposer la même question autant de fois que nécessaire.

### Les questions sensibles
Pour un deuil, une rupture douloureuse, une période de grande fragilité, l’écoute humaine est plus adaptée. Et dans les situations de détresse, ni l’un ni l’autre ne remplace un professionnel de santé : nos guides, IA comme humains, vous orientent alors vers le 3114 ou le 15.

### Le prix
Les tarifs des deux types de guides sont affichés avant chaque échange. [À DÉFINIR : modèle tarifaire des guides IA, à l’acte ou inclus dans Luna+.]

### La confidentialité
Vos échanges avec un guide humain ne sont visibles que par vous et par lui. Vos échanges avec un guide IA sont traités par notre fournisseur d’intelligence artificielle, dans les conditions décrites dans notre politique de confidentialité. Dans les deux cas, vous pouvez supprimer votre historique à tout moment.

## Quel guide pour quelle situation

- **Vous découvrez une pratique** : commencez par un guide IA, puis approfondissez avec un guide humain si le sujet vous intéresse.
- **Vous voulez mettre des mots sur une situation rapidement** : le guide IA convient bien, à toute heure.
- **Votre question est chargée d’émotion** : préférez un guide humain, par téléphone ou par message.
- **Vous souhaitez une lecture approfondie de votre thème natal** : un astrologue humain relie les éléments entre eux et à votre histoire.
- **Vous voulez une réponse écrite et détaillée, à relire** : le message écrit à un guide humain est fait pour cela.

Vous pouvez aussi combiner les deux : préparer votre question avec Séléné, puis en parler avec Claire. Il n’y a pas de bon ou de mauvais choix, seulement des usages différents.

## Les engagements de Luna sur l’IA

Nous avons fait quelques choix que nous voulons rendre visibles :

1. **Aucun guide IA ne se fait passer pour une personne.** Il ne prétend pas avoir un corps, une histoire, des émotions ou un don.
2. **Les guides IA ne font pas de prédiction**, comme les guides humains.
3. **Les guides IA redirigent vers un professionnel** pour toute question médicale, juridique ou financière.
4. **Les guides IA ne vous incitent pas à revenir.** Ils ne vous relancent pas et ne prolongent pas artificiellement la conversation.
5. **Les visuels des guides IA sont des illustrations**, pas des photos de personnes réelles.

## En résumé

Le guide IA est disponible, patient et pédagogique, mais il ne ressent rien et peut se tromper. Le guide humain apporte une écoute, une sensibilité et une expérience, avec des horaires. Sur Luna, vous savez toujours avec qui vous échangez : c’est à vous de choisir ce qui vous convient, selon votre question et votre moment.

[Découvrir nos guides](/voyants) · [Questions fréquentes sur l’IA](/faq)

---

*Les consultations sont proposées à des fins de réflexion personnelle et de divertissement. Elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Service réservé aux personnes majeures.*`,source:"content/editorial/blog/guide-ia-ou-guide-humain.md"},{path:"/blog/lire-un-tirage-en-trois-cartes/",slug:"blog/lire-un-tirage-en-trois-cartes",title:"Lire un tirage de tarot en trois cartes | Luna",description:"Le tirage en trois cartes est simple et riche. Méthode pas à pas, exemple commenté et erreurs à éviter pour l’utiliser comme outil de réflexion.",h1:"Lire un tirage de tarot en trois cartes",body:`# Lire un tirage de tarot en trois cartes

*Temps de lecture : 5 minutes*

Parmi tous les tirages de tarot, celui en trois cartes est sans doute le plus utilisé. Il est assez simple pour être compris dès la première fois, et assez riche pour nourrir une vraie réflexion. C’est d’ailleurs celui que Séléné, notre guide IA, propose le plus souvent. Voici comment il fonctionne, comment le lire, et comment éviter les pièges les plus courants.

## Un peu de contexte sur le tarot

Le tarot de Marseille compte 78 cartes. Les 22 **arcanes majeurs** représentent de grandes figures : le Bateleur, la Papesse, l’Empereur, l’Amoureux, le Chariot, la Justice, l’Ermite, la Lune, le Soleil, le Monde, et d’autres encore. Les 56 **arcanes mineurs** se répartissent en quatre séries, les Bâtons, les Coupes, les Épées et les Deniers, chacune composée de cartes numérotées et de figures.

Pour un tirage en trois cartes, on peut utiliser le jeu complet ou seulement les arcanes majeurs. Les débutants préfèrent souvent les majeurs : leurs images sont plus parlantes et leur nombre plus facile à appréhender.

Rappelons un point essentiel : le tarot n’a pas de valeur prédictive démontrée. Sur Luna, nous l’utilisons comme un support d’images qui aide à regarder une situation autrement.

## Le principe du tirage

Après avoir formulé votre question, vous mélangez les cartes et en tirez trois, que vous disposez de gauche à droite. Chaque position a un rôle. Plusieurs variantes existent ; en voici trois parmi les plus utiles.

### Variante 1 : contexte, enjeu, piste
- **Première carte** : la situation telle qu’elle est.
- **Deuxième carte** : ce qui est en jeu, ce qui bloque ou ce qui demande votre attention.
- **Troisième carte** : une piste de réflexion ou une ressource sur laquelle vous appuyer.

### Variante 2 : moi, l’autre, la relation
Utile pour les questions relationnelles. Attention toutefois : la carte de « l’autre » ne révèle pas ce que pense cette personne. Elle représente plutôt la façon dont vous la percevez.

### Variante 3 : ce que je garde, ce que je laisse, ce que j’explore
Idéale pour une période de transition, un déménagement, un changement de travail ou une fin de relation.

Choisissez la variante avant de tirer. Changer de grille de lecture une fois les cartes posées revient à chercher la réponse qui vous arrange.

## Lire les cartes pas à pas

### 1. Décrire avant d’interpréter
Regardez chaque carte et décrivez ce que vous voyez, sans chercher le sens tout de suite. Qui est représenté ? Que fait le personnage ? Vers où regarde-t-il ? Quelles couleurs dominent ? Cette étape, souvent négligée, est la plus riche : elle fait émerger des détails qui parlent de votre situation.

### 2. Relier chaque carte à sa position
Ensuite, demandez-vous ce que la carte évoque à la place qu’elle occupe. L’Ermite en position de « piste » peut inviter à prendre du temps pour soi, à chercher conseil, à avancer lentement. Le même Ermite en position de « contexte » peut refléter un sentiment d’isolement.

### 3. Regarder le dialogue entre les cartes
Les cartes se répondent. Les personnages se regardent-ils ou se tournent-ils le dos ? Y a-t-il une progression, par exemple d’une carte sombre vers une carte lumineuse ? Une série domine-t-elle ? Beaucoup de Coupes peuvent orienter vers les émotions, beaucoup d’Épées vers les pensées et les décisions.

### 4. Revenir à vous
Enfin, posez-vous la question la plus importante : qu’est-ce que cela m’inspire, à moi ? Un bon guide vous la posera toujours. Si une carte ne vous parle pas du tout, ce n’est pas un échec : c’est une information.

## Un exemple commenté

Question : « Qu’est-ce qui m’aiderait à aborder sereinement ce nouveau poste ? » Variante : contexte, enjeu, piste.

- **Contexte : le Chariot.** Un personnage avance, droit, tiré par deux chevaux qui regardent dans des directions différentes. Il peut refléter l’élan du changement, mais aussi la sensation d’être tiraillé entre deux envies, ou entre l’enthousiasme et l’appréhension.
- **Enjeu : la Papesse.** Une femme assise, un livre ouvert sur les genoux. Elle évoque l’apprentissage, l’observation, la patience. L’enjeu serait peut-être de s’accorder le droit d’apprendre, plutôt que de vouloir tout maîtriser dès le premier jour.
- **Piste : le Soleil.** Deux personnages côte à côte sous un soleil rayonnant. Il peut suggérer de s’appuyer sur les liens, de chercher des alliés, de partager ses questions avec des collègues.

Ce tirage ne dit pas si le poste vous conviendra. Il propose une manière de l’aborder : accepter le tiraillement, prendre le temps d’apprendre, ne pas rester seul. À vous de voir ce qui résonne.

## Les erreurs à éviter

- **Tirer à nouveau jusqu’à obtenir la « bonne » réponse.** Si un tirage vous dérange, prenez le temps de comprendre pourquoi, plutôt que de recommencer.
- **Lire une carte comme une annonce.** La Mort, la Tour ou le Diable impressionnent, mais ils sont traditionnellement lus comme des changements, des remises en question ou des attachements à interroger, jamais comme des événements annoncés.
- **Poser des questions sur la santé, l’argent ou le droit.** Le tarot n’est pas un outil de décision pour ces sujets. Un professionnel compétent l’est.
- **Tirer trop souvent sur la même question.** Une question qui revient chaque jour mérite peut-être une pause plutôt qu’un nouveau tirage.

## Tirer seul ou avec un guide

Vous pouvez tout à fait pratiquer ce tirage chez vous, avec votre propre jeu. Un guide apporte autre chose : un regard extérieur, la connaissance des symboles et l’art de poser les bonnes questions. Avec un guide IA comme Séléné, vous profitez d’une disponibilité à toute heure et d’explications détaillées ; avec un guide humain comme Hugo ou Claire, d’une écoute et d’une sensibilité propres. Dans tous les cas, vous savez avec qui vous échangez.

## En résumé

Trois cartes, trois positions, une question claire. Décrivez avant d’interpréter, regardez comment les cartes dialoguent, et revenez toujours à ce que vous ressentez. Le tirage en trois cartes ne prédit rien ; il vous aide à penser autrement.

[Découvrir le tarot](/specialites/tarot) · [Échanger avec Séléné, guide IA](/voyants/selene)

---

*Le tarot est proposé comme un support de réflexion personnelle et de divertissement. Il n’a pas de valeur scientifique et ne remplace pas un avis professionnel. Service réservé aux personnes majeures.*`,source:"content/editorial/blog/lire-un-tirage-en-trois-cartes.md"},{path:"/blog/tenir-un-journal-de-reves/",slug:"blog/tenir-un-journal-de-reves",title:"Tenir un journal de rêves : méthode en 4 semaines | Luna",description:"Mieux se souvenir de ses rêves et repérer les thèmes qui reviennent : une méthode simple en quatre semaines pour tenir un journal de rêves.",h1:"Tenir un journal de rêves : une méthode en quatre semaines",body:`# Tenir un journal de rêves : une méthode en quatre semaines

*Temps de lecture : 6 minutes*

Nous rêvons toutes les nuits, mais nous oublions la plupart de nos rêves dans les minutes qui suivent le réveil. Tenir un journal de rêves est le moyen le plus simple de les retenir, et de commencer à les comprendre. Pas besoin de dictionnaire des symboles ni de connaissances particulières : un carnet, un stylo et un peu de régularité suffisent. Voici une méthode progressive, sur quatre semaines.

## Pourquoi tenir un journal de rêves

Les rêves ont longtemps été lus comme des messages venus d’ailleurs. Aujourd’hui, les chercheurs les associent plutôt au traitement des émotions et des souvenirs pendant le sommeil. Quelle que soit la façon dont on les comprend, ils parlent de nous : de nos préoccupations, de nos désirs, de nos peurs.

Un journal de rêves permet trois choses :

- **mieux se souvenir** de ses rêves, car l’habitude d’écrire entraîne la mémoire ;
- **repérer les thèmes récurrents**, qui n’apparaissent qu’avec le temps ;
- **relier les rêves à sa vie éveillée**, et parfois mettre des mots sur une émotion qu’on n’avait pas identifiée.

Précisons qu’un rêve n’annonce pas l’avenir. Il reflète votre présent, votre histoire et votre imaginaire.

## Le matériel

Un carnet dédié et un stylo, posés à portée de main près de votre lit. Le téléphone peut dépanner, mais l’écran et les notifications risquent de vous distraire au moment où le souvenir est le plus fragile. Si vous utilisez votre téléphone, activez le mode avion et une luminosité minimale.

## Semaine 1 : capter

L’objectif de cette première semaine est simplement de noter quelque chose chaque matin.

- **Avant de dormir**, dites-vous calmement que vous allez vous souvenir de vos rêves. Cela peut sembler naïf, mais cette intention aide de nombreuses personnes.
- **Au réveil**, ne bougez pas tout de suite. Restez quelques instants dans la même position et laissez revenir les images.
- **Notez tout**, même un fragment : une couleur, un lieu, une sensation, un visage. « Je ne me souviens de rien, mais je me suis réveillé inquiet » est déjà une note utile.
- **Datez chaque entrée.**

Ne cherchez pas à interpréter. Écrivez au présent, comme si vous racontiez le rêve en train de se dérouler : « Je marche dans une gare. Il fait nuit. »

## Semaine 2 : détailler

Vos souvenirs devraient commencer à s’enrichir. Cette semaine, ajoutez quelques rubriques à chaque récit :

- **Les lieux** : connus, inconnus, mélangés ?
- **Les personnes** : qui est là, quel rôle jouent-elles ?
- **Les émotions** : que ressentez-vous pendant le rêve, et au réveil ?
- **Un titre** : donnez un titre court à votre rêve, comme pour une nouvelle. Cet exercice aide à en saisir l’essentiel.

Ajoutez enfin une ligne sur la veille : un événement marquant, une conversation, une préoccupation. Vous verrez peut-être apparaître des liens.

## Semaine 3 : associer

C’est le moment de commencer à explorer le sens de vos rêves, en partant de vous plutôt que d’un dictionnaire.

Choisissez un rêve qui vous a marqué et, pour chaque élément important, demandez-vous : qu’est-ce que cela m’évoque, à moi ? Une maison peut évoquer l’enfance pour l’un, la sécurité pour l’autre, un déménagement récent pour un troisième. Notez vos associations spontanées, sans les censurer.

Posez-vous ensuite quelques questions :

- Si ce rêve parlait de ma vie actuelle, de quoi parlerait-il ?
- Quelle émotion domine, et où la retrouve-t-on dans mes journées ?
- Y a-t-il quelque chose que j’ai envie de faire, de dire ou d’éviter ?

Vous n’obtiendrez pas forcément une réponse claire, et c’est normal. L’intérêt est dans le chemin.

## Semaine 4 : relire

Après trois semaines, relisez l’ensemble de votre journal. Soulignez ce qui revient :

- des **lieux** (une école, une maison d’enfance, un moyen de transport) ;
- des **personnes** ;
- des **situations** (être en retard, chercher quelque chose, être poursuivi, voler) ;
- des **émotions**.

Les rêves récurrents sont souvent les plus intéressants. Ils signalent une préoccupation qui n’a pas encore trouvé sa place dans la vie éveillée. Notez vos observations sur une page à part, et gardez-la pour la suite.

## Quelques motifs fréquents, sans dictionnaire

Plusieurs scénarios reviennent chez beaucoup de personnes : perdre ses dents, être en retard à un examen, tomber, être poursuivi, se retrouver nu en public. On peut les relier à des thèmes généraux, comme l’inquiétude, le sentiment d’être évalué ou la peur de perdre le contrôle. Mais seule votre propre association donne un sens à votre rêve. Un même scénario peut signifier des choses très différentes selon la personne et le moment.

## Quand en parler à quelqu’un

Un journal de rêves est un outil personnel. Il peut aussi devenir le point de départ d’une conversation. Sur Luna, Théo Garnier vous aide à explorer un rêve à partir de vos associations. Partager un rêve à voix haute ou par écrit fait souvent apparaître des liens que l’on ne voyait pas seul.

Il existe aussi des situations où un rêve relève d’un médecin plutôt que d’une consultation :

- des **cauchemars fréquents** qui perturbent votre sommeil ;
- des rêves liés à un **événement traumatique** qui reviennent sans cesse ;
- une **fatigue persistante**, des insomnies ou un sommeil très agité.

Dans ces cas, votre médecin traitant est le bon premier interlocuteur.

## En résumé

Un carnet près du lit, quelques minutes chaque matin, et beaucoup de bienveillance envers vous-même. Captez, détaillez, associez, relisez. En quatre semaines, vous aurez appris à mieux vous souvenir de vos rêves, et peut-être à mieux vous comprendre. Le sens d’un rêve ne se trouve pas dans un livre : il se trouve dans votre histoire.

[Découvrir l’interprétation des rêves](/specialites/reves) · [Raconter un rêve à Théo](/voyants/theo-garnier)

---

*L’interprétation des rêves est proposée à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique et ne remplace pas un avis médical. Service réservé aux personnes majeures.*`,source:"content/editorial/blog/tenir-un-journal-de-reves.md"},{path:"/cgu/",slug:"cgu",title:"Conditions générales d’utilisation · Luna",description:"Texte juridique de travail, à faire valider par un avocat. Les [CROCHETS] restent à compléter.",h1:"Conditions générales d'utilisation (CGU)",body:`# Conditions générales d'utilisation (CGU)

Version [X] du [DATE]

## 1. Objet
Les présentes CGU régissent l'accès et l'utilisation de Luna, plateforme éditée par [RAISON SOCIALE] (« Luna », « nous »), qui met en relation des utilisateurs avec des guides de voyance et de guidance, humains indépendants ou intelligences artificielles, par chat, téléphone et visio. Les achats sont régis par les [Conditions générales de vente](/cgv).

## 2. Rôle de Luna (opérateur de plateforme)
Conformément à l'article L.111-7 du Code de la consommation :
- Luna est une plateforme en ligne. Les guides humains sont des professionnels indépendants : ils ne sont ni salariés ni mandataires de Luna. Ils exercent sous leur propre statut ([préciser si Luna est le vendeur des consultations ou un intermédiaire : à arbitrer avec l'avocat, car cela change les CGV]).
- Les guides IA sont fournis par Luna.
- **Classement des guides :** par défaut, les guides sont affichés selon [CRITÈRES : disponibilité, note moyenne, ancienneté, etc.]. [Aucune / Les] mises en avant rémunérées [n'existent pas / sont signalées par la mention « Sponsorisé »].
- Luna perçoit une commission sur chaque consultation d'un guide humain.
- Les avis sont publiés selon les règles de l'article 9.

## 3. Conditions d'accès
3.1 Luna est **réservé aux personnes majeures** (18 ans et plus). En créant un compte, vous déclarez être majeur(e). Tout compte ouvert par un mineur est fermé.
3.2 Un seul compte par personne. Vous êtes responsable de la confidentialité de vos identifiants.
3.3 Les informations fournies doivent être exactes.

## 4. Nature du service : à lire attentivement
4.1 Les consultations relèvent du **divertissement et de la réflexion personnelle**. Aucun guide, humain ou IA, ne peut prédire l'avenir avec certitude, et Luna ne garantit **aucun résultat** (retour d'une personne, guérison, réussite, gain).
4.2 Les consultations **ne remplacent pas** un médecin, un psychologue, un avocat, un notaire ou un conseiller financier. N'interrompez jamais un traitement et ne prenez aucune décision importante sur la seule base d'une consultation.
4.3 Luna **n'est pas un service d'urgence**. En cas de détresse ou de pensées suicidaires : **3114** (gratuit, 24 h/24). En cas de danger immédiat : **15** ou **112**.
4.4 **Guides IA.** Les guides marqués « IA » sont des programmes d'intelligence artificielle. Leurs réponses sont générées automatiquement, peuvent être inexactes et ne proviennent pas d'une personne.

## 5. Protection de l'utilisateur
5.1 Vous pouvez fixer des **plafonds de dépense** quotidiens et mensuels. Ils sont activés par défaut à [50] € par jour et [150] € par mois. Une baisse s'applique immédiatement ; une hausse ne prend effet qu'au bout de 72 heures.
5.2 Des alertes de durée s'affichent pendant les séances, et une confirmation vous est demandée après [30] minutes.
5.3 Vous pouvez à tout moment **faire une pause** (auto-exclusion) de 7 jours à définitivement.
5.4 Si des propos laissent penser que vous êtes en danger, la facturation de la séance est suspendue et des numéros d'aide vous sont proposés.

## 6. Règles de conduite
Il est interdit :
- de harceler, menacer ou insulter un guide ou un autre utilisateur ;
- d'échanger des coordonnées personnelles ou de proposer un paiement en dehors de Luna (les coordonnées sont masquées automatiquement) ;
- d'enregistrer ou de diffuser une séance sans l'accord de l'autre personne ;
- de publier de faux avis ;
- d'utiliser Luna à des fins illégales ou de tenter d'en compromettre la sécurité.

## 7. Signalements et modération
Vous pouvez signaler un contenu ou un comportement via le bouton « Signaler ». Luna examine les signalements et peut retirer un contenu, suspendre un guide ou un compte, en motivant sa décision et en indiquant les voies de contestation [à vérifier : obligations applicables au titre du règlement (UE) 2022/2065, dit DSA].

## 8. Données personnelles
Le traitement de vos données, y compris des **données sensibles** que vous pourriez confier pendant une consultation, est décrit dans la [Politique de confidentialité](/confidentialite). Aucune consultation ne démarre sans votre accord explicite pour ces données.

## 9. Avis
Seuls les utilisateurs ayant réalisé une consultation payante avec un guide peuvent publier un avis sur ce guide, dans les [30] jours qui suivent. Les avis sont datés. Ils sont [contrôlés a priori / a posteriori] par notre équipe de modération, selon la procédure suivante : [DESCRIPTION]. Un avis peut être refusé s'il est injurieux, hors sujet, contient des données personnelles ou n'est pas lié à une consultation réelle ; son auteur en est informé avec le motif. Les avis ne sont pas rémunérés. Les guides peuvent y répondre. (Art. L.111-7-2 et D.111-16 et suivants du Code de la consommation [à vérifier : références réglementaires].)

## 10. Responsabilité
Luna met en œuvre les moyens raisonnables pour assurer l'accès au service, sans garantir une disponibilité permanente. Luna ne saurait être tenue responsable des décisions que vous prendriez sur la base d'une consultation (art. 4). Rien dans les présentes CGU ne limite les droits que vous tenez du Code de la consommation.

## 11. Suspension et fermeture du compte
Vous pouvez fermer votre compte à tout moment depuis Mon compte. Le solde non utilisé de votre portefeuille vous est remboursé selon les CGV. Luna peut suspendre ou fermer un compte en cas de manquement grave aux CGU, après information motivée, sauf urgence.

## 12. Modification des CGU
Luna peut modifier les CGU. Toute modification substantielle vous est notifiée au moins [30] jours à l'avance, et vous pouvez fermer votre compte sans frais si vous la refusez.

## 13. Droit applicable et litiges
Les CGU sont soumises au droit français. En cas de litige, adressez d'abord une réclamation à [EMAIL SERVICE CLIENT]. À défaut de solution, vous pouvez saisir gratuitement le médiateur de la consommation : [NOM, ADRESSE, SITE]. Vous pouvez aussi saisir la juridiction compétente selon les règles de droit commun.`,source:"content/legal/spec-juridique.md",legal:!0},{path:"/cgv/",slug:"cgv",title:"Conditions générales de vente · Luna",description:"Texte juridique de travail, à faire valider par un avocat. Les [CROCHETS] restent à compléter.",h1:"Conditions générales de vente (CGV)",body:`# Conditions générales de vente (CGV)

Version [X] du [DATE]

## 1. Vendeur
[RAISON SOCIALE], [ADRESSE], [SIREN], [TVA], [EMAIL], [TÉLÉPHONE].
[À arbitrer avec l'avocat : Luna vend les consultations en son nom (y compris celles des guides humains), ou agit comme intermédiaire. Le présent modèle suppose que Luna vend en son nom, ce qui est plus simple pour le consommateur.]

## 2. Services et prix
2.1 Luna propose des consultations par chat, téléphone et visio, avec des guides humains ou IA, facturées **à la minute**, ainsi qu'un abonnement **Luna+**.
2.2 **Les prix sont indiqués en euros TTC** sur le profil de chaque guide et rappelés avant chaque séance :
- guides humains : de [X] € à [Y] € TTC par minute, selon le guide ;
- guides IA : [Z] € TTC par minute [ou forfait] ;
- Luna+ : [PRIX] € TTC par [mois], avec [AVANTAGES].
2.3 Offre de bienvenue : [N] minutes offertes lors de la première séance [conditions]. Aucune carte n'est débitée pendant les minutes offertes. À la fin de celles-ci, la séance s'arrête et ne devient payante que si vous le confirmez expressément.

## 3. Portefeuille prépayé (crédit Luna)
3.1 Les consultations sont payées à partir d'un **portefeuille prépayé** alimenté par carte bancaire via notre prestataire de paiement Stripe. Luna ne conserve aucune donnée de carte.
3.2 Recharges possibles : de [10] € à [100] € par opération, dans la limite de vos plafonds (art. 5 des CGU).
3.3 Le crédit est utilisable uniquement sur Luna. Il **n'expire pas** tant que votre compte est ouvert [ou : expire au bout de N mois, à valider avec l'avocat].
3.4 **Remboursement du solde :** vous pouvez à tout moment demander le remboursement du solde non utilisé issu de vos recharges, sans frais, depuis Mon compte > Portefeuille. Le remboursement est effectué sur le moyen de paiement d'origine sous [14] jours. Les crédits offerts (bienvenue, parrainage, geste commercial) ne sont pas remboursables en argent.
3.5 À la fermeture de votre compte, le solde issu de vos recharges vous est remboursé automatiquement.

## 4. Facturation à la minute
4.1 La séance démarre lorsque vous cliquez sur « Démarrer » et que le guide a rejoint la séance. Elle est décomptée **à la seconde** [ou par minute entamée : à préciser ; la seconde est plus loyale].
4.2 Le compteur de durée et de montant est affiché en permanence.
4.3 La séance s'arrête automatiquement lorsque votre crédit est épuisé ou que votre plafond est atteint, avec un préavis de 2 minutes.
4.4 Vous ne payez pas les interruptions techniques imputables à Luna, ni les minutes qui suivent un signalement de détresse (art. 5.4 des CGU).
4.5 Une facture récapitulative est disponible dans Mon compte après chaque séance.

## 5. Abonnement Luna+
5.1 Durée : [mensuelle], reconduite tacitement.
5.2 **Résiliation en trois clics :** vous pouvez résilier à tout moment depuis Mon compte > Abonnement > « Résilier mon abonnement », par une fonctionnalité gratuite, directe et accessible en permanence (art. L.215-1-1 C. conso). Vous recevez une confirmation de la résiliation, avec la date de fin et ses effets.
5.3 La résiliation prend effet à la fin de la période en cours [à valider].
5.4 Rappel de reconduction : [si l'abonnement est annuel, information au plus tôt 3 mois et au plus tard 1 mois avant la date limite de non-reconduction, conformément à l'art. L.215-1 C. conso].

## 6. Droit de rétractation
6.1 Vous disposez d'un délai de **14 jours** à compter de l'achat (recharge ou abonnement) pour vous rétracter sans donner de motif (art. L.221-18 C. conso), en utilisant le formulaire de Mon compte ou le modèle ci-dessous.
6.2 **Exécution immédiate :** si vous avez demandé expressément à utiliser votre crédit sans attendre la fin du délai, et reconnu perdre votre droit de rétractation pour les consultations entièrement réalisées, ces consultations ne peuvent plus faire l'objet d'une rétractation (art. L.221-28, 1° C. conso). Le **crédit non utilisé** reste remboursé en cas de rétractation dans le délai.
6.3 Pour l'abonnement commencé à votre demande pendant le délai, une rétractation donne lieu au paiement de la part correspondant au service fourni jusqu'à la rétractation (art. L.221-25 C. conso).
6.4 Remboursement sous 14 jours au plus, par le moyen de paiement d'origine.

Modèle de formulaire de rétractation :
« À l'attention de [RAISON SOCIALE], [ADRESSE], [EMAIL] : Je vous notifie par la présente ma rétractation du contrat portant sur [recharge / abonnement] commandé le [DATE]. Nom : … Email du compte : … Date : … »

## 7. Réclamations
Service client : [EMAIL], [FORMULAIRE], réponse sous [5] jours ouvrés. Une séance contestée (problème technique, comportement contraire à la charte) peut donner lieu à un recrédit, après examen.

## 8. Médiation
Après une réclamation écrite restée sans réponse satisfaisante, vous pouvez saisir gratuitement le médiateur de la consommation : [NOM], [ADRESSE], [SITE], dans un délai d'un an à compter de votre réclamation écrite (art. L.612-1 et suivants, et L.612-2 C. conso).

## 9. Garanties légales
Les services numériques fournis sont soumis à la garantie légale de conformité des articles L.224-25-1 et suivants du Code de la consommation [à vérifier : applicabilité aux consultations humaines].

## 10. Droit applicable
Droit français.`,source:"content/legal/spec-juridique.md",legal:!0},{path:"/comment-ca-marche/",slug:"comment-ca-marche",title:"Comment ça marche : consulter un guide sur Luna",description:"Choisir un guide, échanger par chat, téléphone ou message, connaître le prix avant de commencer : le fonctionnement de Luna, étape par étape.",h1:"Comment fonctionne Luna",body:`# Comment fonctionne Luna

Luna vous met en relation avec des guides IA et des guides humains pour réfléchir à une question personnelle. Voici le parcours, du premier clic à la fin de l’échange.

## 1. Créez votre compte

Une adresse e-mail et un mot de passe suffisent. À l’inscription, vous confirmez avoir 18 ans ou plus : Luna est réservé aux personnes majeures. Votre compte conserve l’historique de vos conversations, que vous pouvez supprimer à tout moment depuis vos paramètres.

## 2. Choisissez votre guide

Chaque profil indique :

- s’il s’agit d’un **guide IA** ou d’un **guide humain** ;
- sa pratique (tarot, astrologie, numérologie…) et sa façon de travailler ;
- les canaux proposés : chat, téléphone, message écrit ;
- le tarif, affiché en euros TTC ;
- sa disponibilité, mise à jour en temps réel.

Vous hésitez ? Les pages [Spécialités](/specialites/tarot) et [Thèmes](/themes/amour) vous aident à vous orienter.

[Parcourir les guides](/voyants)

## 3. Préparez votre question

Une question ouverte et précise donne un échange plus utile. Plutôt que « Va-t-il revenir ? », essayez « Qu’est-ce qui m’aiderait à y voir plus clair dans cette relation ? ». Notre article [Bien formuler sa question](/blog/bien-formuler-sa-question) vous donne quelques repères.

## 4. Échangez

### Par chat
Vous écrivez, le guide répond. Avec un guide IA, la réponse est générée automatiquement ; un bandeau le rappelle pendant toute la conversation.

### Par téléphone
Le tarif par minute s’affiche avant l’appel. Un compteur visible vous indique la durée et le montant en cours. Vous raccrochez quand vous le souhaitez.

### Par message écrit
Vous envoyez votre question, le guide vous répond par écrit dans le délai indiqué sur son profil. Le prix du message est fixé à l’avance.

## 5. Payez en toute clarté

- **À la minute** : à partir de 1,50 € par minute selon le guide (indicatif, à valider). [À DÉFINIR : nombre de minutes offertes à la première consultation.]
- **À l’unité** : des formules à prix fixe. [À DÉFINIR : contenu et durée de chaque formule.]
- **Abonnement Luna+** : [À DÉFINIR : prix, durée, avantages exacts, modalités de reconduction et de résiliation.]

Le paiement est traité par un prestataire spécialisé : vos données bancaires ne transitent pas par nos pages. Vous pouvez fixer un plafond de dépense mensuel dans votre compte.

## 6. Après l’échange

Votre conversation reste dans votre historique. Vous pouvez la relire, la supprimer, ou signaler un problème. Si un échange ne s’est pas déroulé comme prévu, notre service client étudie chaque demande : voir la [FAQ](/faq#reclamations).

## Ce que Luna ne fait pas

- Luna ne prédit pas l’avenir et ne promet aucun résultat.
- Luna ne donne pas de conseil médical, juridique ou financier : pour ces sujets, adressez-vous à un professionnel compétent.
- Luna ne vous incitera jamais à consulter davantage. Si vous sentez que vous consultez trop souvent, notre article [Consulter avec mesure](/blog/consulter-avec-mesure) peut vous aider.

[Commencer avec un guide](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel.*`,source:"content/editorial/comment-ca-marche.md"},{path:"/conditions-guides/",slug:"conditions-guides",title:"Conditions des guides · Luna",description:"Texte juridique de travail, à faire valider par un avocat. Les [CROCHETS] restent à compléter.",h1:"Conditions générales des guides Luna",body:`# Conditions générales des guides Luna

Version [X] du [DATE]

## 1. Objet et statut
1.1 Les présentes conditions régissent la collaboration entre [RAISON SOCIALE] (« Luna ») et toute personne proposant des consultations sur Luna (le « Guide »).
1.2 Le Guide exerce en **professionnel indépendant** ([micro-entrepreneur, société, etc.]). Il dispose d'un numéro SIRET valide (ou d'un équivalent dans un autre État de l'UE ou de l'EEE), et il est seul responsable de ses déclarations sociales et fiscales. Aucun lien de subordination n'existe : le Guide choisit librement ses horaires, ses disponibilités, son tarif (dans la fourchette [X]–[Y] € par minute) et ses méthodes, dans le respect de la charte.
1.3 Le Guide doit être établi dans l'Union européenne ou l'EEE [recommandé ; sinon, encadrement des transferts].

## 2. Inscription et vérification
Identité, majorité, statut professionnel et compte de versement sont vérifiés par Luna et par Stripe (Stripe Connect). Luna peut refuser une candidature sans avoir à se justifier, sans discrimination.

## 3. Rémunération et commission
3.1 Pour chaque minute facturée au client, le Guide perçoit **[PART GUIDE] %** du prix TTC [ou HT, à préciser], Luna conservant une **commission de [COMMISSION] %** au titre de la mise en relation, de la technologie, du paiement et du support.
3.2 Les versements sont effectués via **Stripe Connect** sur le compte bancaire du Guide, selon un rythme [hebdomadaire / mensuel], déduction faite des remboursements accordés aux clients pour des séances contestées à juste titre.
3.3 Le Guide accepte les conditions de Stripe Connect (accord de compte connecté Stripe). Stripe effectue les vérifications d'identité requises par la réglementation sur la lutte contre le blanchiment.
3.4 **Obligations fiscales :** conformément à l'article 242 bis du Code général des impôts, Luna adresse chaque année au Guide un récapitulatif des sommes perçues et les déclare à l'administration fiscale lorsque la loi l'exige [à vérifier par expert-comptable : obligations DAC7 et seuils].

## 4. Charte déontologique (obligatoire)
Le Guide s'engage à :
1. ne jamais promettre de résultat ni prédire un événement grave (maladie, décès, accident) ;
2. ne jamais donner de conseil médical, psychologique, juridique ou financier, ni déconseiller un traitement ;
3. ne jamais prolonger artificiellement une séance, ni inciter à recharger, revenir ou consulter plus souvent ;
4. ne jamais évoquer de malédiction, de mauvais sort ou de rituel payant ;
5. ne jamais solliciter de coordonnées, de paiement hors de Luna, de rencontre, de cadeau ou de photos ;
6. ne jamais enregistrer, copier, photographier ou réutiliser les échanges, et ne tenir aucun fichier sur les clients ;
7. en cas de détresse, d'idées suicidaires ou de danger : arrêter la consultation divinatoire, orienter vers le 3114, et appeler le 15 ou le 112 en cas de danger immédiat, en utilisant le bouton « Signaler une urgence » ;
8. mettre fin à la séance en cas de doute sur la majorité du client ou sur sa capacité à consentir ;
9. respecter la confidentialité absolue, y compris après la fin de la collaboration ;
10. respecter les règles de présentation : nom d'exercice, photo réelle, aucune fausse qualification.

## 5. Données personnelles
5.1 Le Guide accède aux données des clients **uniquement pour réaliser les consultations**, sous l'autorité de Luna et selon ses instructions (art. 29 RGPD). Il ne voit ni l'email ni le numéro de téléphone des clients. Il s'interdit toute autre utilisation, copie ou conservation.
5.2 Le Guide utilise un appareil sécurisé (verrouillage, mises à jour) et active la double authentification.
5.3 **Données du Guide :** Luna traite les données du Guide pour gérer la collaboration, les paiements, les obligations fiscales et la qualité du service. Voir la [Politique de confidentialité](/confidentialite), section « Guides ».
5.4 **Enregistrements :** les appels ne sont pas enregistrés par défaut. Un échantillon aléatoire limité peut l'être pour le contrôle qualité, après l'accord du client. Le Guide en est informé par un bandeau pendant l'appel. Les enregistrements sont effacés au bout de 30 jours. Le Guide peut accéder aux enregistrements le concernant et à leur évaluation.
5.5 Toute violation de données constatée par le Guide (perte d'appareil, accès suspect) est signalée à Luna **sans délai**.

## 6. Qualité, avis et sanctions
Luna peut suspendre ou désactiver un Guide en cas de manquement à la charte, après information motivée et possibilité de présenter ses observations, sauf urgence (danger pour un client, fraude). Les décisions sont journalisées.

## 7. Guides IA
Luna exploite également des guides IA, clairement identifiés comme tels. Le Guide humain s'interdit de faire rédiger ses réponses par une IA sans le signaler au client.

## 8. Durée et résiliation
Durée indéterminée. Chaque partie peut résilier avec un préavis de [15] jours, ou immédiatement en cas de manquement grave. Les sommes dues sont versées au plus tard [30] jours après la résiliation.

## 9. Droit applicable
Droit français. Tribunaux de [VILLE], sous réserve des règles impératives.`,source:"content/legal/spec-juridique.md",legal:!0},{path:"/confidentialite/",slug:"confidentialite",title:"Politique de confidentialité · Luna",description:"Texte juridique de travail, à faire valider par un avocat. Les [CROCHETS] restent à compléter.",h1:"Politique de confidentialité de Luna",body:`# Politique de confidentialité de Luna

Version [X] du [DATE]

Nous savons que vous confiez à Luna des choses intimes. Cette politique explique, simplement, ce que nous faisons de vos données et comment garder la main dessus.

## 1. Qui est responsable de vos données ?
[RAISON SOCIALE], [ADRESSE], [SIREN] (« Luna »).
Contact données personnelles / délégué à la protection des données : [NOM OU SERVICE], [EMAIL DPO], [ADRESSE POSTALE].

## 2. Quelles données, pourquoi, sur quelle base, et combien de temps ?

| Ce que nous faisons | Données | Base légale | Durée |
|---|---|---|---|
| Gérer votre compte | Email, pseudonyme, mot de passe (chiffré), date de naissance, téléphone si vous le donnez | Exécution du contrat | Tant que le compte est actif ; suppression 24 mois après votre dernière activité |
| Réaliser vos consultations (chat, téléphone, visio) et vous montrer votre historique | Contenu de vos messages, durée, guide consulté ; **données sensibles** que vous choisissez de partager | Contrat ; **votre consentement explicite** pour les données sensibles | Contenu des chats : 12 mois, ou moins si vous le supprimez ; appels et visios : non enregistrés |
| Mettre en relation par téléphone sans révéler votre numéro | Numéro masqué, horodatage et durée de l'appel | Contrat | 12 mois |
| Contrôler la qualité (seulement si vous acceptez en début d'appel) | Enregistrement de l'appel | Votre consentement | 30 jours |
| Encaisser vos paiements, gérer votre portefeuille, vous rembourser | Transactions, solde, factures (jamais votre numéro de carte, géré par Stripe) | Contrat ; obligation légale (comptabilité) | 10 ans pour les pièces comptables (art. L.123-22 du Code de commerce) |
| Vous protéger : plafonds, alertes de durée, détection de détresse | Montants, durées, signal de détresse (sans copie du message) | Obligation de loyauté et intérêt légitime ; votre consentement explicite ; vos intérêts vitaux en cas de danger | Signal de détresse : 30 jours |
| Répondre à vos demandes au support | Messages, pièces jointes | Contrat ; intérêt légitime | 24 mois après la clôture |
| Modérer les avis et lutter contre les abus | Avis, signalements | Obligation légale ; intérêt légitime | Avis : 3 ans au plus |
| Vous envoyer nos offres (email, SMS, WhatsApp, notifications, téléphone) | Coordonnées, historique d'envoi | **Votre consentement**, canal par canal | Jusqu'au retrait ; prospects : 3 ans après le dernier contact ; téléphone : 12 mois au plus |
| Parrainage | Lien entre parrain et filleul | Contrat | Durée du programme |
| Améliorer nos guides IA (seulement si vous l'acceptez) | Conversations avec les guides IA, après retrait des identifiants directs | **Votre consentement, refusé par défaut** | 24 mois |
| Mesurer l'audience et, si vous l'acceptez, la publicité | Cookies et traceurs | Consentement, sauf traceurs exemptés | Voir la [Politique cookies](/cookies) |
| Sécuriser le service | Journaux de connexion et d'accès | Intérêt légitime ; obligation de sécurité | 12 mois (jusqu'à 3 ans pour certains journaux d'accès sensibles) |
| Respecter vos droits | Votre demande et notre réponse | Obligation légale | 5 ans |

## 3. Vos données sensibles
Pendant une consultation, vous pouvez parler de votre santé, de votre vie ou orientation sexuelle, ou de vos convictions. Ce sont des données sensibles (art. 9 RGPD). Nous ne les traitons **qu'avec votre accord explicite**, donné avant votre première consultation, et **uniquement** pour réaliser vos consultations et conserver votre historique. Nous ne les utilisons **jamais** pour la publicité, la prospection ou le profilage, et nous ne les vendons jamais. Vous pouvez retirer votre accord à tout moment dans Mon compte > Confidentialité.

## 4. Guides IA et guides humains
- Les **guides IA** sont des programmes signalés par le badge « IA ». Vos messages sont envoyés à notre prestataire d'IA, [NOM, PAYS], uniquement pour générer les réponses. Il lui est contractuellement interdit de les conserver au-delà de [0 / X jours] et de les utiliser pour entraîner ses modèles.
- Les **guides humains** sont des indépendants. Ils voient vos messages avec eux et votre pseudonyme, **jamais** votre email ni votre numéro de téléphone. Ils n'ont pas le droit de conserver ni de réutiliser vos échanges.

## 5. Qui a accès à vos données ?
- Le guide que vous consultez, pour vos échanges avec lui.
- Notre équipe, selon ses missions, et uniquement pour ce qui est nécessaire. Notre support ne peut lire une conversation que pour traiter une demande que vous avez faite ou un signalement, et chaque accès est enregistré et vous est signalé.
- Nos sous-traitants : hébergement ([NOM, PAYS]), téléphonie et SMS (Twilio, États-Unis), paiement (Stripe), IA ([NOM, PAYS]), envoi d'emails ([NOM]), WhatsApp (Meta), notifications (Google, Apple), visio ([NOM]), support ([NOM]). Liste à jour : [/sous-traitants](/sous-traitants).
- Stripe traite aussi certaines données pour son propre compte (lutte contre la fraude et le blanchiment) : voir sa politique de confidentialité.
- Les autorités, uniquement sur demande légale.
Nous ne vendons ni ne louons vos données, et nous ne les partageons avec aucun « partenaire » commercial.

## 6. Transferts hors de l'Union européenne
Certains sous-traitants (Twilio, [fournisseur d'IA], Google, Apple, Meta) peuvent traiter des données aux États-Unis. Ces transferts sont encadrés par le Data Privacy Framework UE–États-Unis, lorsque l'entreprise est certifiée, ou par les clauses contractuelles types de la Commission européenne. Vous pouvez en obtenir une copie à [EMAIL DPO].

## 7. Vos droits
Vous pouvez à tout moment :
- **accéder** à vos données et les **télécharger** (Mon compte > Mes données > Télécharger) ;
- les **rectifier** ;
- les **effacer** (Mon compte > Supprimer mon compte), sauf ce que la loi nous oblige à garder, comme les factures ;
- vous **opposer** à la prospection (lien de désinscription dans chaque message) ou à certains traitements ;
- **limiter** un traitement ;
- **retirer** chaque consentement ;
- définir des **directives** sur le sort de vos données après votre décès.
Pour exercer vos droits : Mon compte, ou [EMAIL DPO]. Nous répondons sous un mois. Nous pouvons vous demander de confirmer votre identité en cas de doute.
Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la **CNIL** (www.cnil.fr).

## 8. Sécurité
Connexions chiffrées, chiffrement des conversations au repos, double authentification obligatoire pour notre équipe, accès limités et tracés, aucune donnée de carte bancaire chez nous (Stripe, certifié PCI DSS). En cas de violation de données présentant un risque, nous prévenons la CNIL sous 72 heures et, si le risque est élevé, nous vous prévenons.

## 9. Mineurs
Luna est réservé aux personnes majeures. Si nous apprenons qu'un compte appartient à un mineur, nous le fermons et supprimons ses données.

## 10. Guides : vos données
Si vous êtes guide, nous traitons votre identité, votre statut professionnel, vos disponibilités, vos gains, vos avis et votre activité, pour gérer notre collaboration (contrat), vous payer via Stripe Connect, respecter nos obligations comptables et fiscales (obligation légale) et contrôler la qualité (intérêt légitime ; enregistrements seulement par échantillon et avec l'accord du client). Durées : pendant la collaboration, puis 5 ans (10 ans pour les pièces comptables). Candidature non retenue : 2 ans, sauf opposition de votre part.

## 11. Modifications
Toute modification importante vous est notifiée. Les versions précédentes restent consultables : [/legal/archives](/legal/archives).`,source:"content/legal/spec-juridique.md",legal:!0},{path:"/cookies/",slug:"cookies",title:"Politique cookies · Luna",description:"Texte juridique de travail, à faire valider par un avocat. Les [CROCHETS] restent à compléter.",h1:"Politique cookies",body:`# Politique cookies

Un cookie est un petit fichier déposé sur votre appareil. Certains sont indispensables, d'autres ne sont déposés qu'avec votre accord.

## Cookies que nous utilisons
| Nom | Émetteur | Finalité | Durée | Consentement |
|---|---|---|---|---|
| luna_session | Luna | Maintenir votre connexion | Session | Non (nécessaire) |
| luna_csrf | Luna | Sécurité des formulaires | Session | Non (nécessaire) |
| luna_consent | Luna | Mémoriser votre choix de cookies | 6 mois | Non (nécessaire) |
| __stripe_mid, __stripe_sid | Stripe | Paiement sécurisé et prévention de la fraude | [à vérifier] | Non (nécessaire au paiement) |
| [audience] | [OUTIL] | Mesure d'audience exemptée | 13 mois au plus | Non (exemption CNIL), opposition possible |
| [audience avancée] | [OUTIL] | Statistiques détaillées | [DURÉE] | Oui |
| [publicité] | [OUTIL] | Mesure publicitaire | [DURÉE] | Oui |

## Gérer vos choix
Cliquez sur « Gérer mes cookies » en bas de chaque page. Votre choix est conservé 6 mois.
Vous pouvez aussi configurer votre navigateur pour bloquer les cookies.

## Notifications push de l'application
Les notifications commerciales ne sont envoyées qu'avec votre accord (Mon compte > Notifications) et l'autorisation de votre téléphone.`,source:"content/legal/spec-juridique.md",legal:!0},{path:"/devenir-voyant/",slug:"devenir-voyant",title:"Devenir voyant ou guide sur Luna : candidature",description:"Tarologue, astrologue, numérologue : rejoignez Luna. Critères, charte de déontologie et étapes de candidature, sans promesse de revenus.",h1:"Rejoindre Luna en tant que guide",body:`# Rejoindre Luna en tant que guide

Vous pratiquez le tarot, l’astrologie, la numérologie, la cartomancie ou une autre pratique de guidance, et vous souhaitez accompagner des personnes avec sérieux et retenue ? Luna recherche des guides qui partagent sa vision : éclairer sans promettre, écouter sans enfermer.

## Ce que nous recherchons

- **Une pratique maîtrisée** : vous connaissez vos supports et savez expliquer votre démarche simplement.
- **Une vraie qualité d’écoute** : vous laissez la personne s’exprimer et vous reformulez avant d’interpréter.
- **Une expression claire** : à l’oral comme à l’écrit, dans un français soigné, avec le vouvoiement.
- **Le sens des limites** : vous savez reconnaître une situation qui dépasse la guidance et orienter vers un professionnel.

## Les conditions

- Être majeur ou majeure.
- Exercer sous un statut professionnel déclaré. [À DÉFINIR : statut attendu (indépendant, micro-entreprise…) et justificatifs demandés.]
- Accepter la vérification de votre identité.
- Signer la charte de déontologie Luna.
- Disposer d’une connexion et d’un environnement calme pour les consultations.

## La charte de déontologie

Chaque guide Luna s’engage à :

1. **Ne jamais promettre de résultat**, ni présenter une interprétation comme une certitude sur l’avenir.
2. **Ne donner aucun conseil médical, juridique ou financier**, et orienter vers un professionnel compétent lorsque la question le demande.
3. **Ne jamais inciter une personne à consulter davantage**, à prolonger un appel ou à revenir. Si une personne semble consulter de façon excessive, le guide le lui dit avec tact et peut écourter l’échange.
4. **Respecter la confidentialité** de chaque échange.
5. **Repérer les signes de détresse** et communiquer les ressources adaptées (3114, 15, 112), en suivant la procédure Luna.
6. **Ne jamais demander de paiement en dehors de la plateforme**, ni proposer de rituels, objets ou prestations payantes annexes.
7. **Être transparent sur sa pratique** : vous présentez ce que vous faites tel que vous le faites, sans surenchère.
8. **Ne pas consulter une personne mineure** et interrompre l’échange en cas de doute.

## Comment se passe la candidature

1. **Formulaire** : votre nom ou pseudonyme, vos pratiques, une présentation de votre démarche.
2. **Premier échange** avec l’équipe Luna, en visioconférence, pour faire connaissance.
3. **Mise en situation** : une consultation test, sur une question fictive, avec un membre de l’équipe.
4. **Vérifications** : identité, statut, signature de la charte et du contrat guide. [À DÉFINIR : contenu du contrat guide, à rédiger par Juridique Luna.]
5. **Création de votre profil** : vous relisez et validez votre présentation avant sa mise en ligne.

[À DÉFINIR : délai indicatif de réponse.]

## Rémunération

La rémunération dépend de votre tarif, de votre disponibilité et de la demande. Nous ne promettons aucun niveau de revenus.

- Tarif : fixé avec vous, à partir de 1,50 € par minute (indicatif, à valider).
- Commission Luna : [À DÉFINIR : taux ou modèle de commission.]
- Paiement des guides : [À DÉFINIR : fréquence et modalités.]

## Une précision sur les mots

Sur Luna, nous parlons de « guides » plutôt que de « voyants ». Chaque guide propose un éclairage, pas une prédiction. Si vous vous présentez comme médium, vous vous engagez à le faire avec la prudence décrite sur notre page [Médiumnité](/specialites/mediumnite).

[Proposer ma candidature](/devenir-voyant/candidature)

---

*Les informations transmises dans le formulaire servent uniquement à étudier votre candidature. [À DÉFINIR : mention d’information RGPD, durée de conservation des candidatures.]*`,source:"content/editorial/devenir-voyant.md"},{path:"/faq/",slug:"faq",title:"FAQ Luna : paiement, confidentialité, guides IA",description:"Paiement, confidentialité, guides IA ou humains, majorité, réclamations, consultation raisonnée : toutes les réponses à vos questions sur Luna.",h1:"Questions fréquentes",body:`# Questions fréquentes

## Le service

### Qu’est-ce que Luna ?
Luna est une plateforme de guidance en ligne. Des guides IA et des guides humains vous proposent un éclairage sur vos questions personnelles à travers le tarot, l’astrologie, la numérologie et d’autres pratiques, par chat, téléphone ou message écrit.

### Luna peut-elle prédire mon avenir ?
Non. Les consultations proposent des pistes de réflexion, pas des prédictions. Personne sur Luna ne peut vous dire ce qui va arriver : les décisions et leurs conséquences vous appartiennent.

### Les consultations ont-elles une valeur scientifique ?
Non. Le tarot, l’astrologie ou la numérologie sont des pratiques symboliques. Elles peuvent aider à prendre du recul, mais elles n’ont pas de valeur scientifique et sont proposées à des fins de réflexion personnelle et de divertissement.

### Puis-je poser une question de santé, d’argent ou de droit ?
Vous pouvez en parler, mais aucun guide ne vous donnera de conseil médical, juridique ou financier. Pour ces sujets, un médecin, un avocat, un notaire ou un conseiller financier est la bonne personne. Un guide pourra vous aider à clarifier ce que vous ressentez, pas à décider à leur place.

## Guides IA et guides humains

### Comment savoir si je parle à une IA ou à une personne ?
Chaque guide IA est signalé « guide IA » sur son profil, dans l’en-tête de la conversation et dans son premier message. Un bandeau reste visible pendant tout l’échange. Les guides humains sont signalés « guide humain ».

### Comment fonctionne un guide IA ?
Un guide IA est un assistant conversationnel : ses réponses sont générées automatiquement par un modèle d’intelligence artificielle, à partir de consignes rédigées par l’équipe Luna. Il ne ressent rien, ne voit rien et ne connaît de vous que ce que vous lui écrivez. [À DÉFINIR : nom du fournisseur d’IA et lieu de traitement des données, à préciser dans la politique de confidentialité.]

### Mes conversations servent-elles à entraîner l’IA ?
[À DÉFINIR : réponse à valider par Juridique Luna selon le contrat avec le fournisseur d’IA.] Dans tous les cas, cette information figure dans notre politique de confidentialité et vous pouvez supprimer vos conversations à tout moment.

### Qui sont les guides humains ?
Ce sont des praticiens et praticiennes indépendants, sélectionnés par l’équipe Luna après un entretien et une consultation test. Chacun s’engage à respecter notre charte de déontologie. [À DÉFINIR : statut exact des guides et responsabilité de la prestation, à préciser par Juridique Luna.]

### Comment les guides sont-ils classés sur la page Guides ?
[À DÉFINIR : critères de classement (disponibilité, ordre alphabétique, aléatoire…). Aucun classement payant n’est prévu à ce stade.]

## Paiement et tarifs

### Combien coûte une consultation ?
Le tarif dépend du guide et du canal. Il est toujours affiché en euros TTC avant le début de l’échange. À titre indicatif, les consultations à la minute commencent à 1,50 € par minute (indicatif, à valider).

### Comment suis-je facturé au téléphone ?
Le tarif par minute est affiché avant l’appel. Pendant l’appel, un compteur indique la durée et le montant en cours. [À DÉFINIR : mode de décompte, à la seconde ou à la minute entamée.]

### Quels moyens de paiement acceptez-vous ?
[À DÉFINIR : moyens de paiement acceptés.] Le paiement est traité par un prestataire spécialisé : nous ne stockons pas vos données bancaires.

### Comment fonctionne l’abonnement Luna+ ?
[À DÉFINIR : prix, durée, avantages, reconduction.] Vous pouvez résilier en ligne depuis votre compte, en quelques clics, sans avoir à vous justifier.

### Puis-je limiter mes dépenses ?
Oui. Dans votre compte, vous pouvez définir un plafond mensuel. Une fois ce plafond atteint, aucun nouvel échange payant ne peut commencer avant le mois suivant, sauf si vous modifiez vous-même ce réglage. [À DÉFINIR : fonctionnalité à confirmer par Tech Luna.]

## Confidentialité

### Mes échanges sont-ils confidentiels ?
Oui. Vos conversations ne sont visibles que par vous et par le guide concerné. Les guides humains s’engagent à la confidentialité. Nos équipes n’y accèdent qu’en cas de réclamation ou de signalement, dans les conditions décrites dans notre politique de confidentialité.

### Puis-je supprimer mon historique ?
Oui, conversation par conversation ou en totalité, depuis vos paramètres. Vous pouvez aussi supprimer votre compte. [À DÉFINIR : durées de conservation légales, par exemple pour les factures.]

### Puis-je consulter sous un pseudonyme ?
Oui. Seul votre guide voit le prénom ou le pseudonyme que vous choisissez. Vos coordonnées ne lui sont jamais communiquées.

## Majorité et protection

### Pourquoi Luna est-elle réservée aux majeurs ?
Parce que la guidance touche des sujets intimes et implique des paiements. À l’inscription, vous déclarez avoir 18 ans ou plus. Un guide qui a un doute sur l’âge de son interlocuteur interrompt l’échange.

### Que faire si je traverse une période très difficile ?
Une consultation ne remplace pas une aide professionnelle. Si vous avez des pensées suicidaires, appelez le 3114, numéro national de prévention du suicide, gratuit et disponible 24 h/24. En cas d’urgence, composez le 15 ou le 112. Nos guides sont formés à vous orienter vers ces ressources.

### J’ai l’impression de consulter trop souvent. Que faire ?
C’est une question importante, et nous préférons que vous la posiez. Vous pouvez fixer un plafond de dépense, activer une pause de votre compte ou le fermer. Nos guides ne vous inciteront jamais à revenir. Notre article [Consulter avec mesure](/blog/consulter-avec-mesure) propose quelques repères, et un médecin ou un psychologue peut vous accompagner si cela devient difficile.

### Puis-je mettre mon compte en pause ?
Oui. La pause bloque tout nouvel échange payant pendant la durée que vous choisissez. [À DÉFINIR : durées proposées, fonctionnalité à confirmer par Tech Luna.]

## Réclamations {#reclamations}

### Un échange s’est mal passé. Que puis-je faire ?
Signalez-le depuis la conversation concernée ou écrivez à [À DÉFINIR : adresse du service client]. Nous étudions chaque demande et vous répondons sous [À DÉFINIR : délai].

### Puis-je être remboursé ?
Selon la situation (problème technique, échange interrompu, comportement contraire à notre charte), un remboursement ou un avoir peut être proposé. [À DÉFINIR : politique de remboursement et droit de rétractation, à rédiger par Juridique Luna.]

### Et si la réponse du service client ne me convient pas ?
Vous pouvez saisir gratuitement le médiateur de la consommation : [À DÉFINIR : nom et coordonnées du médiateur].

### Comment signaler un guide ?
Depuis la conversation ou le profil du guide, bouton « Signaler ». Un guide qui promet un résultat, demande un paiement hors plateforme ou vous pousse à consulter doit être signalé : ces comportements sont contraires à notre charte.

## Devenir guide

### Comment rejoindre Luna en tant que guide ?
Consultez notre page [Devenir guide](/devenir-voyant) : vous y trouverez nos critères, notre charte de déontologie et les étapes de candidature.

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel.*`,source:"content/editorial/faq.md"},{path:"/horoscope/balance/",slug:"horoscope/balance",title:"Balance : dates, élément et traits du signe | Luna",description:"Le signe de la Balance (23 septembre au 22 octobre) : élément Air, planète maîtresse Vénus, traits et symbolique. Une présentation intemporelle.",h1:"Le signe de la Balance",body:`# Le signe de la Balance

La Balance est associée à l’harmonie, à la justice et à la relation. On lui prête un tempérament diplomate, sensible à l’esthétique, qui cherche l’équilibre en toute chose.

## Repères

- **Dates** : du 23 septembre au 22 octobre environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Air. Les signes d’Air (Gémeaux, Balance, Verseau) sont associés aux idées et aux échanges.
- **Mode** : cardinal. Il ouvre une saison et est associé à l’initiative.
- **Planète maîtresse** : Vénus
- **Symbole** : une balance
- **Signe opposé** : Bélier

## Les traits associés

La tradition astrologique associe à ce signe :

- Le sens de la diplomatie
- Le goût de la beauté et de l’harmonie
- L’écoute des points de vue
- Une difficulté à trancher

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Signe de la relation par excellence, la Balance s’épanouit dans le partage. Elle peut avoir tendance à éviter les conflits au détriment de ses propres besoins.

## Une question à méditer

« Quelle décision est-ce que je repousse pour ne déplaire à personne ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/balance.md"},{path:"/horoscope/belier/",slug:"horoscope/belier",title:"Bélier : dates, élément et traits du signe | Luna",description:"Le signe du Bélier (21 mars au 19 avril) : élément Feu, planète maîtresse Mars, traits et symbolique. Une présentation intemporelle.",h1:"Le signe du Bélier",body:`# Le signe du Bélier

Premier signe du zodiaque, le Bélier est associé à l’élan, au commencement et à l’initiative. On lui prête un tempérament direct, spontané, qui préfère agir que tergiverser.

## Repères

- **Dates** : du 21 mars au 19 avril environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Feu. Les signes de Feu (Bélier, Lion, Sagittaire) sont associés à l’élan et à l’enthousiasme.
- **Mode** : cardinal. Il ouvre une saison et est associé à l’initiative.
- **Planète maîtresse** : Mars
- **Symbole** : le bélier
- **Signe opposé** : Balance

## Les traits associés

La tradition astrologique associe à ce signe :

- L’enthousiasme et le goût des premières fois
- Le courage de se lancer
- La franchise, parfois abrupte
- Une impatience qui peut bousculer l’entourage

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Dans les relations, le Bélier est traditionnellement décrit comme entier et passionné. Il apprécie la spontanéité et peut avoir besoin d’apprendre à écouter le rythme de l’autre.

## Une question à méditer

« Qu’est-ce qui, chez moi, a envie de commencer quelque chose de neuf ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/belier.md"},{path:"/horoscope/cancer/",slug:"horoscope/cancer",title:"Cancer : dates, élément et traits du signe | Luna",description:"Le signe du Cancer (21 juin au 22 juillet) : élément Eau, planète maîtresse la Lune, traits et symbolique. Une présentation intemporelle.",h1:"Le signe du Cancer",body:`# Le signe du Cancer

Le Cancer est associé au foyer, à la mémoire et à la sensibilité. On lui prête un tempérament protecteur, attentif aux autres, profondément attaché à ses proches.

## Repères

- **Dates** : du 21 juin au 22 juillet environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Eau. Les signes d’Eau (Cancer, Scorpion, Poissons) sont associés aux émotions et à l’intuition.
- **Mode** : cardinal. Il ouvre une saison et est associé à l’initiative.
- **Planète maîtresse** : La Lune
- **Symbole** : le crabe
- **Signe opposé** : Capricorne

## Les traits associés

La tradition astrologique associe à ce signe :

- L’intuition et l’empathie
- Le sens de la famille et du soin
- Une riche imagination
- Une sensibilité qui peut le rendre susceptible

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Le Cancer aime prendre soin et créer un cocon. Dans une relation, il a besoin de se sentir en confiance pour sortir de sa carapace.

## Une question à méditer

« Est-ce que je prends autant soin de moi que des autres ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/cancer.md"},{path:"/horoscope/capricorne/",slug:"horoscope/capricorne",title:"Capricorne : dates, élément et traits du signe | Luna",description:"Le signe du Capricorne (22 décembre au 19 janvier) : élément Terre, planète maîtresse Saturne, traits et symbolique. Une présentation intemporelle.",h1:"Le signe du Capricorne",body:`# Le signe du Capricorne

Le Capricorne est associé à l’ambition, à la persévérance et à la structure. On lui prête un tempérament sérieux, responsable, qui construit pas à pas.

## Repères

- **Dates** : du 22 décembre au 19 janvier environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Terre. Les signes de Terre (Taureau, Vierge, Capricorne) sont associés au concret et à la stabilité.
- **Mode** : cardinal. Il ouvre une saison et est associé à l’initiative.
- **Planète maîtresse** : Saturne
- **Symbole** : une chèvre à queue de poisson
- **Signe opposé** : Cancer

## Les traits associés

La tradition astrologique associe à ce signe :

- La persévérance et la discipline
- Le sens des responsabilités
- Un humour discret
- Une réserve qui peut paraître froide

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Dans les relations, le Capricorne est décrit comme fiable et engagé. Il montre ses sentiments par la constance plutôt que par l’effusion.

## Une question à méditer

« Qu’est-ce que je construis, et est-ce que cela me ressemble encore ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/capricorne.md"},{path:"/horoscope/gemeaux/",slug:"horoscope/gemeaux",title:"Gémeaux : dates, élément et traits du signe | Luna",description:"Le signe des Gémeaux (21 mai au 20 juin) : élément Air, planète maîtresse Mercure, traits et symbolique. Une présentation intemporelle.",h1:"Le signe des Gémeaux",body:`# Le signe des Gémeaux

Les Gémeaux sont associés à la curiosité, à la parole et aux échanges. On leur prête un esprit vif, adaptable, qui aime apprendre, comparer et relier les idées.

## Repères

- **Dates** : du 21 mai au 20 juin environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Air. Les signes d’Air (Gémeaux, Balance, Verseau) sont associés aux idées et aux échanges.
- **Mode** : mutable. Il clôt une saison et est associé à l’adaptation.
- **Planète maîtresse** : Mercure
- **Symbole** : des jumeaux
- **Signe opposé** : Sagittaire

## Les traits associés

La tradition astrologique associe à ce signe :

- La curiosité et l’humour
- Une grande aisance dans la communication
- La capacité d’adaptation
- Une tendance à se disperser

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Dans les relations, les Gémeaux recherchent la complicité intellectuelle et la légèreté. Ils ont besoin de conversation et de mouvement pour se sentir vivants.

## Une question à méditer

« Parmi toutes mes idées, laquelle mérite que je m’y consacre vraiment ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/gemeaux.md"},{path:"/horoscope/lion/",slug:"horoscope/lion",title:"Lion : dates, élément et traits du signe | Luna",description:"Le signe du Lion (23 juillet au 22 août) : élément Feu, planète maîtresse le Soleil, traits et symbolique. Une présentation intemporelle.",h1:"Le signe du Lion",body:`# Le signe du Lion

Le Lion est associé à la créativité, à la générosité et au rayonnement. On lui prête un tempérament chaleureux, fier, qui aime être reconnu pour ce qu’il apporte.

## Repères

- **Dates** : du 23 juillet au 22 août environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Feu. Les signes de Feu (Bélier, Lion, Sagittaire) sont associés à l’élan et à l’enthousiasme.
- **Mode** : fixe. Il occupe le cœur d’une saison et est associé à la constance.
- **Planète maîtresse** : Le Soleil
- **Symbole** : le lion
- **Signe opposé** : Verseau

## Les traits associés

La tradition astrologique associe à ce signe :

- La générosité et la chaleur
- La créativité et le sens de la mise en scène
- La loyauté
- Un besoin de reconnaissance parfois envahissant

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Dans les relations, le Lion est décrit comme généreux et protecteur. Il donne beaucoup et attend en retour de l’admiration et de la sincérité.

## Une question à méditer

« Qu’est-ce que j’aime créer, pour moi et pas seulement pour être vu ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/lion.md"},{path:"/horoscope/poissons/",slug:"horoscope/poissons",title:"Poissons : dates, élément et traits du signe | Luna",description:"Le signe des Poissons (19 février au 20 mars) : élément Eau, planète Jupiter et Neptune, traits et symbolique. Une présentation intemporelle.",h1:"Le signe des Poissons",body:`# Le signe des Poissons

Dernier signe du zodiaque, les Poissons sont associés à l’imaginaire, à la compassion et à l’intuition. On leur prête un tempérament sensible, rêveur, très perméable aux émotions.

## Repères

- **Dates** : du 19 février au 20 mars environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Eau. Les signes d’Eau (Cancer, Scorpion, Poissons) sont associés aux émotions et à l’intuition.
- **Mode** : mutable. Il clôt une saison et est associé à l’adaptation.
- **Planète maîtresse** : Jupiter (planète traditionnelle) et Neptune (planète moderne)
- **Symbole** : deux poissons
- **Signe opposé** : Vierge

## Les traits associés

La tradition astrologique associe à ce signe :

- L’empathie et la compassion
- La créativité et l’imagination
- L’intuition
- Une difficulté à poser des limites

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Dans les relations, les Poissons sont décrits comme dévoués et romantiques. Ils ont besoin de se sentir compris sans avoir à tout expliquer.

## Une question à méditer

« Où ai-je besoin de poser une limite pour me protéger ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/poissons.md"},{path:"/horoscope/sagittaire/",slug:"horoscope/sagittaire",title:"Sagittaire : dates, élément et traits du signe | Luna",description:"Le signe du Sagittaire (22 novembre au 21 décembre) : élément Feu, planète maîtresse Jupiter, traits et symbolique. Une présentation intemporelle.",h1:"Le signe du Sagittaire",body:`# Le signe du Sagittaire

Le Sagittaire est associé à l’exploration, au sens et à l’optimisme. On lui prête un tempérament enthousiaste, épris de liberté, de voyages et de grandes idées.

## Repères

- **Dates** : du 22 novembre au 21 décembre environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Feu. Les signes de Feu (Bélier, Lion, Sagittaire) sont associés à l’élan et à l’enthousiasme.
- **Mode** : mutable. Il clôt une saison et est associé à l’adaptation.
- **Planète maîtresse** : Jupiter
- **Symbole** : un archer, mi-homme mi-cheval
- **Signe opposé** : Gémeaux

## Les traits associés

La tradition astrologique associe à ce signe :

- L’optimisme et la générosité
- La soif d’apprendre et de découvrir
- La franchise
- Un goût de la liberté qui peut fuir l’engagement

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Le Sagittaire recherche des relations stimulantes, où chacun garde son espace. Il aime partager ses découvertes et ses convictions.

## Une question à méditer

« Quel horizon ai-je envie d’explorer, et qu’est-ce qui m’y attire vraiment ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/sagittaire.md"},{path:"/horoscope/scorpion/",slug:"horoscope/scorpion",title:"Scorpion : dates, élément et traits du signe | Luna",description:"Le signe du Scorpion (23 octobre au 21 novembre) : élément Eau, planète Mars et Pluton, traits et symbolique. Une présentation intemporelle.",h1:"Le signe du Scorpion",body:`# Le signe du Scorpion

Le Scorpion est associé à l’intensité, à la profondeur et à la transformation. On lui prête un tempérament passionné, secret, qui ne se contente pas des apparences.

## Repères

- **Dates** : du 23 octobre au 21 novembre environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Eau. Les signes d’Eau (Cancer, Scorpion, Poissons) sont associés aux émotions et à l’intuition.
- **Mode** : fixe. Il occupe le cœur d’une saison et est associé à la constance.
- **Planète maîtresse** : Mars (planète traditionnelle) et Pluton (planète moderne)
- **Symbole** : le scorpion
- **Signe opposé** : Taureau

## Les traits associés

La tradition astrologique associe à ce signe :

- La profondeur et la perspicacité
- La loyauté
- La capacité à se transformer
- Une intensité qui peut devenir possessive

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Dans les relations, le Scorpion cherche l’authenticité et l’engagement. Il se livre lentement, mais entièrement.

## Une question à méditer

« Qu’est-ce que je suis prêt ou prête à laisser derrière moi ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/scorpion.md"},{path:"/horoscope/taureau/",slug:"horoscope/taureau",title:"Taureau : dates, élément et traits du signe | Luna",description:"Le signe du Taureau (20 avril au 20 mai) : élément Terre, planète maîtresse Vénus, traits et symbolique. Une présentation intemporelle.",h1:"Le signe du Taureau",body:`# Le signe du Taureau

Le Taureau est associé à la stabilité, aux sens et au goût des choses durables. On lui prête un tempérament patient, fidèle, attaché à son confort et à ses repères.

## Repères

- **Dates** : du 20 avril au 20 mai environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Terre. Les signes de Terre (Taureau, Vierge, Capricorne) sont associés au concret et à la stabilité.
- **Mode** : fixe. Il occupe le cœur d’une saison et est associé à la constance.
- **Planète maîtresse** : Vénus
- **Symbole** : le taureau
- **Signe opposé** : Scorpion

## Les traits associés

La tradition astrologique associe à ce signe :

- La constance et la fiabilité
- Le sens du concret et de la beauté
- La patience
- Une résistance au changement

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

En amitié comme en amour, le Taureau est décrit comme loyal et protecteur. Il construit dans la durée et peut avoir besoin de temps pour accorder sa confiance.

## Une question à méditer

« De quoi ai-je besoin pour me sentir en sécurité, et est-ce encore vrai aujourd’hui ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/taureau.md"},{path:"/horoscope/verseau/",slug:"horoscope/verseau",title:"Verseau : dates, élément et traits du signe | Luna",description:"Le signe du Verseau (20 janvier au 18 février) : élément Air, planète Saturne et Uranus, traits et symbolique. Une présentation intemporelle.",h1:"Le signe du Verseau",body:`# Le signe du Verseau

Le Verseau est associé à l’indépendance, à l’innovation et au collectif. On lui prête un tempérament original, idéaliste, attaché à ses idées et à sa liberté.

## Repères

- **Dates** : du 20 janvier au 18 février environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Air. Les signes d’Air (Gémeaux, Balance, Verseau) sont associés aux idées et aux échanges.
- **Mode** : fixe. Il occupe le cœur d’une saison et est associé à la constance.
- **Planète maîtresse** : Saturne (planète traditionnelle) et Uranus (planète moderne)
- **Symbole** : un porteur d’eau
- **Signe opposé** : Lion

## Les traits associés

La tradition astrologique associe à ce signe :

- L’originalité et l’inventivité
- Le sens du collectif et de l’amitié
- L’ouverture d’esprit
- Une distance qui peut sembler détachée

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

Le Verseau tisse souvent des liens d’amitié forts. En amour, il a besoin d’une relation qui respecte son indépendance.

## Une question à méditer

« Quelle idée nouvelle aurais-je envie de défendre ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/verseau.md"},{path:"/horoscope/vierge/",slug:"horoscope/vierge",title:"Vierge : dates, élément et traits du signe | Luna",description:"Le signe de la Vierge (23 août au 22 septembre) : élément Terre, planète maîtresse Mercure, traits et symbolique. Une présentation intemporelle.",h1:"Le signe de la Vierge",body:`# Le signe de la Vierge

La Vierge est associée au sens du détail, à l’analyse et au service. On lui prête un tempérament méthodique, discret, soucieux de bien faire.

## Repères

- **Dates** : du 23 août au 22 septembre environ. La date exacte de passage du Soleil d’un signe à l’autre peut varier d’un jour selon l’année.
- **Élément** : Terre. Les signes de Terre (Taureau, Vierge, Capricorne) sont associés au concret et à la stabilité.
- **Mode** : mutable. Il clôt une saison et est associé à l’adaptation.
- **Planète maîtresse** : Mercure
- **Symbole** : une jeune fille tenant un épi
- **Signe opposé** : Poissons

## Les traits associés

La tradition astrologique associe à ce signe :

- La rigueur et l’efficacité
- Le sens pratique
- Une attention sincère aux autres
- Une exigence qui peut tourner au perfectionnisme

Ces traits sont des tendances symboliques, pas une description de votre personnalité. Votre thème natal complet (ascendant, Lune, planètes) nuance largement le portrait de votre signe solaire.

## Dans les relations

La Vierge montre son affection par des gestes concrets plutôt que par de grands discours. Elle a besoin de relations fiables et respectueuses.

## Une question à méditer

« Où pourrais-je m’autoriser à faire « assez bien » plutôt que parfaitement ? »

## Aller plus loin

Pour une lecture personnelle, un astrologue peut étudier votre thème natal complet à partir de votre date, de votre heure et de votre lieu de naissance.

[Consulter Marc, astrologue](/voyants/marc) · [Découvrir l’astrologie](/specialites/astrologie) · [Explorer avec Véga, guide IA](/voyants/vega)

---

*L’astrologie est proposée comme un langage symbolique, à des fins de réflexion personnelle et de divertissement. Elle n’a pas de valeur scientifique. Service réservé aux personnes majeures.*`,source:"content/editorial/horoscope/vierge.md"},{path:"/mentions-legales/",slug:"mentions-legales",title:"Mentions légales · Luna",description:"Texte juridique de travail, à faire valider par un avocat. Les [CROCHETS] restent à compléter.",h1:"Mentions légales",body:`# Mentions légales

Dernière mise à jour : [DATE] — version [X]

## Éditeur
Le site et l'application Luna (ci-après « Luna ») sont édités par :
[RAISON SOCIALE], [FORME JURIDIQUE] au capital de [MONTANT] €,
immatriculée au RCS de [VILLE] sous le numéro [SIREN],
dont le siège social est situé [ADRESSE COMPLÈTE].
N° de TVA intracommunautaire : [NUMÉRO TVA].
Téléphone : [NUMÉRO] — Email : [EMAIL DE CONTACT].

(Si l'éditeur est une personne physique : [Prénom NOM], entrepreneur individuel, [SIREN], [ADRESSE], [EMAIL].)

## Directeur de la publication
[Prénom NOM], en qualité de [FONCTION].

## Hébergement
[NOM DE L'HÉBERGEUR], [FORME], [ADRESSE], [TÉLÉPHONE].
(Prototype statique : GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis [adresse à vérifier].)

## Données personnelles
Responsable de traitement : [RAISON SOCIALE].
Délégué à la protection des données / contact : [NOM OU SERVICE], [EMAIL DPO], [ADRESSE POSTALE].
Voir notre [Politique de confidentialité](/confidentialite) et notre [Politique cookies](/cookies).

## Médiation de la consommation
Conformément aux articles L.612-1 et suivants du Code de la consommation, vous pouvez recourir gratuitement au médiateur de la consommation dont nous relevons : [NOM DU MÉDIATEUR], [ADRESSE], [SITE WEB], après avoir adressé une réclamation écrite à notre service client.
Plateforme européenne de règlement en ligne des litiges : [à vérifier : la plateforme RLL de la Commission a pu être supprimée ; ne pas mentionner si elle n'existe plus].

## Intelligence artificielle
Certains guides de Luna sont des intelligences artificielles. Ils sont signalés par le badge « IA ». Les autres sont des guides humains indépendants.

## Nature du service
Les consultations de voyance, d'astrologie, de numérologie et de tarot proposées sur Luna relèvent du divertissement et de la réflexion personnelle. Elles ne constituent ni une prédiction certaine de l'avenir, ni un conseil médical, psychologique, juridique ou financier. Service réservé aux personnes majeures.
En cas de détresse : 3114 (prévention du suicide, 24 h/24), 15 ou 112 en cas d'urgence.

## Propriété intellectuelle
L'ensemble des contenus de Luna (textes, illustrations, logos, logiciels) est protégé. Toute reproduction sans autorisation est interdite.`,source:"content/legal/spec-juridique.md",legal:!0},{path:"/offre-bienvenue/",slug:"offre-bienvenue",title:"Offre de bienvenue Luna : votre premier échange",description:"Découvrez Luna avec une offre de bienvenue pour votre premier échange. Conditions claires, sans engagement caché. Réservé aux nouveaux comptes majeurs.",h1:"Votre premier échange sur Luna",body:`# Votre premier échange sur Luna

Pour découvrir Luna, votre premier échange bénéficie d’une offre de bienvenue. L’idée est simple : vous laisser le temps de voir si notre façon de travailler vous convient, avant de payer quoi que ce soit.

## Ce que comprend l’offre

[À DÉFINIR : contenu exact de l’offre, par exemple nombre de minutes offertes, canal concerné (chat, téléphone, message) et guides éligibles.]

## Comment en profiter

1. Créez votre compte et confirmez que vous avez 18 ans ou plus.
2. Choisissez un guide éligible : la mention « offre de bienvenue » apparaît sur son profil.
3. Commencez l’échange. Le temps ou le contenu offert est décompté en premier, de façon visible.
4. À la fin de la partie offerte, l’échange s’arrête, sauf si vous choisissez vous-même de continuer au tarif affiché.

## Les conditions, en clair

- Une seule offre de bienvenue par personne. [À DÉFINIR : règle d’identification, par compte, moyen de paiement ou autre.]
- Aucun abonnement n’est souscrit automatiquement.
- [À DÉFINIR : un moyen de paiement est-il demandé à l’inscription ? Si oui, il n’est débité qu’avec votre accord explicite.]
- [À DÉFINIR : durée de validité de l’offre après la création du compte.]
- L’offre ne peut pas être convertie en argent.

## Pourquoi une offre plutôt qu’une promesse

Nous préférons vous laisser essayer plutôt que vous convaincre. Une consultation est un éclairage, pas une solution clé en main : à vous de juger si elle vous est utile.

[Choisir mon premier guide](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Conditions complètes dans nos [CGV](/cgv).*`,source:"content/editorial/offre-bienvenue.md"},{path:"/parrainage/",slug:"parrainage",title:"Parrainage Luna : recommander Luna à un proche",description:"Vous appréciez Luna ? Recommandez-la à un proche majeur. Fonctionnement du parrainage, avantages et règles, expliqués simplement.",h1:"Recommander Luna à un proche",body:`# Recommander Luna à un proche

Si Luna vous a été utile, vous pouvez la faire découvrir à une personne de votre entourage. Le parrainage est facultatif : il n’y a ni objectif, ni classement, ni relance.

## Comment ça fonctionne

1. Dans votre compte, rubrique « Parrainage », copiez votre lien personnel.
2. Partagez-le avec une personne majeure qui pourrait être intéressée.
3. Votre filleul ou votre filleule crée son compte avec ce lien.
4. Lorsque la condition prévue est remplie, chacun reçoit son avantage.

## Les avantages

- **Pour vous** : [À DÉFINIR : récompense du parrain ou de la marraine.]
- **Pour la personne parrainée** : [À DÉFINIR : avantage du filleul, cumulable ou non avec l’offre de bienvenue.]
- **Condition de déclenchement** : [À DÉFINIR : par exemple création du compte ou premier échange payant.]
- **Plafond** : [À DÉFINIR : nombre maximal de parrainages récompensés.]

## Les règles

- Le parrainage concerne uniquement des personnes majeures.
- Les avantages ne sont pas convertibles en argent.
- Partagez votre lien avec des proches, pas sur des sites d’annonces ou des forums publics. [À DÉFINIR : règle de diffusion à valider par Juridique Luna.]
- Ne présentez pas Luna comme un moyen d’obtenir un résultat : la guidance aide à réfléchir, elle ne promet rien.
- Toute utilisation abusive (faux comptes, auto-parrainage) entraîne l’annulation des avantages.

## Une recommandation sincère

Le meilleur parrainage est celui que vous feriez sans récompense. Si une personne de votre entourage traverse une période fragile, une écoute professionnelle (médecin, psychologue) sera souvent plus adaptée qu’une consultation.

[Obtenir mon lien de parrainage](/compte/parrainage)

---

*Service réservé aux personnes majeures. Conditions complètes dans nos [CGV](/cgv).*`,source:"content/editorial/parrainage.md"},{path:"/specialites/astrologie/",slug:"specialites/astrologie",title:"Astrologie : thème natal et cycles | Luna",description:"Thème natal, signes, planètes, maisons : l’astrologie comme langage symbolique pour mieux vous comprendre. Consultations avec des guides Luna.",h1:"L’astrologie, un langage des cycles",body:`# L’astrologie, un langage des cycles

L’astrologie relie la position des planètes, du Soleil et de la Lune à des thèmes de la vie humaine. Elle repose sur quatre grands repères : les douze signes du zodiaque, les planètes, les douze maisons et les aspects, c’est-à-dire les angles que forment les planètes entre elles.

## Le principe

Le thème natal est la carte du ciel au moment et au lieu de votre naissance. Un astrologue le lit comme un portrait symbolique : vos élans, vos besoins, vos contradictions. Il peut aussi observer les cycles en cours, appelés transits, pour réfléchir avec vous à une période de changement. L’astrologie n’a pas de valeur scientifique démontrée ; sur Luna, elle est proposée comme un langage pour se raconter autrement.

## Comment se déroule une consultation sur Luna

1. Vous indiquez votre date, votre heure et votre lieu de naissance. Sans l’heure, la lecture reste possible mais plus générale.
2. Le guide présente les grandes lignes de votre thème.
3. Il relie ensuite ces éléments à votre question ou à la période que vous traversez.

## Ce que cela peut vous apporter

- Mieux comprendre votre façon de réagir et de choisir.
- Donner un sens à une période de transition.
- Découvrir le vocabulaire de l’astrologie avec des explications claires.

## Ce que cela ne fait pas

- L’astrologie ne fixe pas de date pour un événement et ne décide pas d’une compatibilité amoureuse.
- Elle ne sert jamais à choisir un traitement, un placement ou une démarche juridique.

## Les guides

Guides proposant cette pratique : [Marc](/voyants/marc), [Véga](/voyants/vega) (guide IA).

*Profils de démonstration, à valider avant publication.*

## Questions fréquentes

### Mon signe suffit-il ?

Votre signe solaire n’est qu’un élément parmi d’autres. L’ascendant, la position de la Lune et des planètes complètent la lecture. Nos pages [Horoscope](/horoscope/belier) présentent chaque signe de façon générale.

### Pourquoi l’heure de naissance compte-t-elle ?

Elle détermine l’ascendant et la répartition des maisons, qui changent en quelques heures. Votre acte de naissance l’indique souvent.

[Consulter un astrologue](/voyants) · [Toutes les questions fréquentes](/faq)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis médical, juridique ou financier.*`,source:"content/editorial/specialites/astrologie.md"},{path:"/specialites/cartomancie/",slug:"specialites/cartomancie",title:"Cartomancie : jeu de 32 cartes et Lenormand | Luna",description:"La cartomancie utilise des jeux traditionnels, comme le jeu de 32 cartes ou les cartes Lenormand, pour éclairer vos questions du quotidien.",h1:"La cartomancie, des cartes du quotidien",body:`# La cartomancie, des cartes du quotidien

La cartomancie désigne l’interprétation de jeux de cartes. Le terme recouvre le tarot, mais on l’emploie surtout pour des jeux plus simples : le jeu classique de 32 cartes, et les cartes Lenormand, un jeu de 36 cartes illustrées d’objets et de scènes familières (une maison, un bateau, une lettre, un chemin).

## Le principe

Dans la cartomancie, les cartes se lisent souvent par paires ou par lignes, un peu comme des mots qui forment une phrase. Le « bateau » à côté de la « maison » évoquera un départ lié au foyer, une envie de changement d’environnement, ou simplement un voyage à préparer. C’est une pratique concrète, tournée vers le quotidien.

## Comment se déroule une consultation sur Luna

1. Vous posez votre question.
2. Le guide annonce le tirage choisi et dispose les cartes.
3. Il lit les associations, puis vous en propose un résumé.

## Ce que cela peut vous apporter

- Un éclairage concret sur vos priorités du moment.
- Une lecture rapide et lisible.

## Ce que cela ne fait pas

- Les cartes n’annoncent ni date ni événement.
- La cartomancie ne remplace aucun conseil professionnel.

## Les guides

Guides proposant cette pratique : [Nadia Kovač](/voyants/nadia-kovac).

*Profils de démonstration, à valider avant publication.*

## Questions fréquentes

### Quelle différence avec le tarot ?

Le tarot s’appuie sur des figures symboliques riches ; la cartomancie traditionnelle utilise des images plus simples et des combinaisons. Les deux sont des supports de réflexion.

### Combien de cartes sont tirées ?

Cela dépend du tirage : de trois cartes pour une question simple jusqu’au grand tableau de 36 cartes en Lenormand.

[Consulter une cartomancienne](/voyants) · [Toutes les questions fréquentes](/faq)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis médical, juridique ou financier.*`,source:"content/editorial/specialites/cartomancie.md"},{path:"/specialites/mediumnite/",slug:"specialites/mediumnite",title:"Médiumnité : une pratique présentée avec prudence | Luna",description:"Ce qu’est la médiumnité, ce que Luna propose et ce qu’elle ne prétend pas faire. Une approche prudente, sans promesse, attentive au deuil.",h1:"La médiumnité, une pratique intuitive",body:`# La médiumnité, une pratique intuitive

Le mot « médiumnité » désigne des pratiques où une personne dit percevoir des impressions, des images ou des messages qui ne passent pas par les sens ordinaires. Ces pratiques existent dans de nombreuses cultures. Elles ne reposent sur aucune preuve scientifique, et leur interprétation reste une affaire de croyance personnelle.

## Le principe

Sur Luna, nous présentons la médiumnité comme une **écoute intuitive** : le guide accueille votre récit et vous partage les impressions qui lui viennent, comme des pistes à examiner. Il distingue toujours ce que vous lui avez dit de ce qu’il ressent. Nous ne présentons jamais ces échanges comme une communication avérée avec une personne disparue, ni comme l’accès à une information cachée.

## Comment se déroule une consultation sur Luna

1. Vous présentez votre question ou ce que vous traversez.
2. Le guide vous écoute, reformule, puis partage ses impressions en précisant qu’il s’agit de ressentis.
3. Vous restez libre de ce que vous en retenez.

## Ce que cela peut vous apporter

- Un moment d’écoute attentive.
- Une autre façon de mettre des mots sur une intuition ou un ressenti diffus.

## Ce que cela ne fait pas

- Aucun guide Luna n’affirme transmettre de messages de défunts.
- Aucun guide ne prétend connaître des faits que vous ignorez, ni ce que pense ou fait une autre personne.
- Aucun rituel, objet ou prestation annexe n’est proposé.

## Les guides

Guides proposant cette pratique : [Aïcha Diallo](/voyants/aicha-diallo).

*Profils de démonstration, à valider avant publication.*

## Questions fréquentes

### Je viens de perdre un proche. Est-ce que cela peut m’aider ?

Un échange peut offrir un moment d’écoute, mais il ne remplace pas un accompagnement du deuil. Votre médecin, un psychologue ou une association spécialisée peuvent vous accompagner. Si la douleur devient trop lourde, le 3114 est joignable gratuitement, 24 h/24.

### Pourquoi Luna est-elle si prudente sur ce sujet ?

Parce qu’il touche des personnes souvent fragiles, et que nous refusons de présenter comme un fait ce qui relève de la croyance. Cette prudence fait partie de notre charte.

[Découvrir l’approche d’Aïcha](/voyants/aicha-diallo) · [Toutes les questions fréquentes](/faq)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis médical, juridique ou financier.*`,source:"content/editorial/specialites/mediumnite.md"},{path:"/specialites/numerologie/",slug:"specialites/numerologie",title:"Numérologie : chemin de vie et nombres | Luna",description:"La numérologie explore la symbolique des nombres de votre date de naissance et de votre prénom. Principes, calculs et limites, expliqués simplement.",h1:"La numérologie, la symbolique des nombres",body:`# La numérologie, la symbolique des nombres

La numérologie attribue une signification symbolique aux nombres de 1 à 9, ainsi qu’à quelques nombres dits « maîtres » comme 11 et 22. Elle s’inspire de traditions anciennes qui voyaient dans les nombres une façon d’ordonner le monde.

## Le principe

À partir de votre date de naissance, le numérologue calcule votre chemin de vie en additionnant les chiffres jusqu’à obtenir un seul chiffre. Par exemple, une naissance le 14 mars 1990 donne 1 + 4 + 3 + 1 + 9 + 9 + 0 = 27, puis 2 + 7 = 9. Les lettres de votre prénom et de votre nom peuvent aussi être converties en nombres. Chaque nombre est associé à des thèmes : l’initiative pour le 1, la coopération pour le 2, l’expression pour le 3, et ainsi de suite.

## Comment se déroule une consultation sur Luna

1. Vous transmettez votre date de naissance et, si vous le souhaitez, votre prénom et votre nom.
2. Le guide présente ses calculs et ce que chaque nombre évoque.
3. Vous échangez ensemble sur ce qui fait écho à votre vie actuelle.

## Ce que cela peut vous apporter

- Un support simple et accessible pour réfléchir à vos aspirations.
- Une lecture de votre « année personnelle », pour donner un thème à une période.

## Ce que cela ne fait pas

- Un nombre ne détermine ni votre caractère ni votre avenir.
- La numérologie ne sert pas à choisir une date pour signer, investir ou vous soigner.

## Les guides

Guides proposant cette pratique : [Inès Benali](/voyants/ines-benali), [Sofia Marin](/voyants/sofia-marin), [Véga](/voyants/vega) (guide IA).

*Profils de démonstration, à valider avant publication.*

## Questions fréquentes

### Que se passe-t-il si j’ai changé de nom ?

Les numérologues ont des approches différentes : les uns travaillent avec le nom de naissance, les autres avec le nom d’usage. Votre guide vous expliquera son choix.

### Puis-je calculer mon chemin de vie seul ?

Oui, l’exemple ci-dessus vous montre comment. La consultation apporte surtout l’échange autour de ces nombres.

[Échanger avec un numérologue](/voyants) · [Toutes les questions fréquentes](/faq)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis médical, juridique ou financier.*`,source:"content/editorial/specialites/numerologie.md"},{path:"/specialites/oracle/",slug:"specialites/oracle",title:"Cartes oracle : un message à interpréter | Luna",description:"Les cartes oracle proposent des images et des mots pour ouvrir une réflexion personnelle. Ce qu’elles sont, comment elles se lisent, avec qui consulter.",h1:"Les cartes oracle, une invitation à réfléchir",body:`# Les cartes oracle, une invitation à réfléchir

Un oracle est un jeu de cartes illustrées créé par un auteur ou une autrice, souvent autour d’un thème : la nature, les saisons, les animaux, les émotions. Contrairement au tarot, il n’existe pas de structure commune : chaque oracle a son nombre de cartes, ses images et son livret.

## Le principe

Chaque carte porte une image et, souvent, un mot ou une courte phrase. Le guide tire une ou plusieurs cartes et vous invite à observer ce qu’elles éveillent en vous. L’oracle est apprécié pour sa douceur : il propose un thème de réflexion plutôt qu’une lecture détaillée.

## Comment se déroule une consultation sur Luna

1. Vous prenez un moment pour poser votre question.
2. Le guide tire une à trois cartes et les décrit.
3. Ensemble, vous cherchez ce qu’elles peuvent signifier pour vous aujourd’hui.

## Ce que cela peut vous apporter

- Un temps calme pour faire le point.
- Un thème à garder en tête pendant quelques jours.

## Ce que cela ne fait pas

- Une carte oracle n’est pas un message venu de l’extérieur : c’est une image qui aide à réfléchir.

## Les guides

Guides proposant cette pratique : [Lucie Moreau](/voyants/lucie-moreau), [Claire](/voyants/claire).

*Profils de démonstration, à valider avant publication.*

## Questions fréquentes

### Quel oracle utilisent les guides ?

Chaque guide choisit ses jeux. Le nom de l’oracle utilisé peut vous être indiqué pendant l’échange.

### L’oracle convient-il à une première consultation ?

Oui, c’est souvent une porte d’entrée douce.

[Tirer une carte avec un guide](/voyants) · [Toutes les questions fréquentes](/faq)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis médical, juridique ou financier.*`,source:"content/editorial/specialites/oracle.md"},{path:"/specialites/pendule/",slug:"specialites/pendule",title:"Pendule : une pratique d’écoute | Luna",description:"Le pendule utilisé comme outil de clarification : principe, usage en consultation et limites. Sans prise de décision à votre place.",h1:"Le pendule, ralentir pour clarifier",body:`# Le pendule, ralentir pour clarifier

Le pendule est un petit poids suspendu à une chaîne ou à un fil. Dans les pratiques de guidance, on observe ses mouvements en réponse à des questions. Les études menées sur le sujet expliquent ces mouvements par des micro-mouvements involontaires de la main, appelés effet idéomoteur.

## Le principe

Sur Luna, le pendule est présenté pour ce qu’il est : un outil qui aide à ralentir et à faire émerger vos hésitations. Le guide s’en sert pour trier entre plusieurs formulations d’une même question, ou pour ouvrir une discussion sur ce que vous ressentez face à un choix.

## Comment se déroule une consultation sur Luna

1. Vous exposez votre question.
2. Le guide la reformule avec vous en plusieurs propositions.
3. Il utilise le pendule comme point de départ, puis échange avec vous sur ce que chaque réponse vous fait ressentir.

## Ce que cela peut vous apporter

- Clarifier une question confuse.
- Prendre conscience de votre préférence intime face à un choix.

## Ce que cela ne fait pas

- Le pendule ne décide pas à votre place.
- Il n’est jamais utilisé pour une question de santé, d’argent ou de droit, ni pour retrouver un objet ou une personne.

## Les guides

Guides proposant cette pratique : [Lucie Moreau](/voyants/lucie-moreau).

*Profils de démonstration, à valider avant publication.*

## Questions fréquentes

### Le pendule peut-il répondre par oui ou par non ?

Il peut l’indiquer, mais nos guides n’en font pas une réponse définitive. Ce qui compte est ce que la réponse éveille chez vous.

### Pourquoi parler d’effet idéomoteur ?

Par transparence : nous préférons vous dire ce que l’on sait de cet outil, et vous laisser libre de l’utiliser comme support.

[Échanger avec Lucie](/voyants/lucie-moreau) · [Toutes les questions fréquentes](/faq)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis médical, juridique ou financier.*`,source:"content/editorial/specialites/pendule.md"},{path:"/specialites/reves/",slug:"specialites/reves",title:"Interprétation des rêves : explorer vos rêves | Luna",description:"Lire vos rêves comme un récit personnel : symboles, émotions, échos du quotidien. Méthode, journal de rêves et limites de l’interprétation.",h1:"Les rêves, un récit à explorer",body:`# Les rêves, un récit à explorer

Tout le monde rêve, même sans s’en souvenir. Depuis l’Antiquité, les rêves ont été lus comme des messages, puis, avec la psychanalyse, comme une expression de la vie intérieure. Aujourd’hui, les chercheurs les relient aussi au traitement des émotions et des souvenirs pendant le sommeil.

## Le principe

Sur Luna, l’interprétation part de vous. Un même symbole, une maison, un trajet, l’eau, n’a pas le même sens pour tout le monde. Le guide vous aide à explorer vos associations personnelles, les émotions du rêve et les liens avec ce que vous vivez en ce moment.

## Comment se déroule une consultation sur Luna

1. Vous racontez votre rêve, au présent, avec le plus de détails possible.
2. Le guide vous pose des questions sur les lieux, les personnes et les émotions.
3. Ensemble, vous cherchez ce que ce rêve peut refléter de votre situation.

## Ce que cela peut vous apporter

- Mieux comprendre un rêve qui vous a marqué.
- Repérer les thèmes qui reviennent, grâce à un journal de rêves.

## Ce que cela ne fait pas

- Un rêve n’annonce pas l’avenir.
- Des cauchemars fréquents, des insomnies ou un sommeil perturbé relèvent d’un médecin.

## Les guides

Guides proposant cette pratique : [Théo Garnier](/voyants/theo-garnier).

*Profils de démonstration, à valider avant publication.*

## Questions fréquentes

### Je ne me souviens que de fragments. Est-ce utile ?

Oui. Un seul détail ou une émotion suffit souvent pour commencer. Notre article [Tenir un journal de rêves](/blog/tenir-un-journal-de-reves) vous aide à mieux vous en souvenir.

### Rêver d’une personne signifie-t-il qu’elle pense à moi ?

Non. Un rêve parle de vous, de vos émotions et de vos souvenirs, pas des pensées d’autrui.

[Raconter un rêve à un guide](/voyants) · [Toutes les questions fréquentes](/faq)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis médical, juridique ou financier.*`,source:"content/editorial/specialites/reves.md"},{path:"/specialites/runes/",slug:"specialites/runes",title:"Runes : lecture et symbolique | Luna",description:"Les runes, alphabet ancien des peuples germaniques, utilisées comme support de réflexion. Histoire, principe de lecture et limites de la pratique.",h1:"Les runes, un alphabet comme support de questions",body:`# Les runes, un alphabet comme support de questions

Les runes sont les lettres d’anciens alphabets germaniques. Le plus connu, le Futhark ancien, compte 24 signes, utilisés pendant plusieurs siècles pour des inscriptions. Leur usage comme support d’interprétation, tel qu’on le pratique aujourd’hui, est en grande partie une construction moderne.

## Le principe

Chaque rune porte un nom et des associations traditionnelles : Fehu évoque les biens et ce que l’on possède, Raidho le voyage, Berkana la croissance. Le guide tire une ou plusieurs runes et relie ces thèmes à votre question. La lecture reste sobre : les runes fonctionnent comme des mots-clés.

## Comment se déroule une consultation sur Luna

1. Vous formulez votre question.
2. Le guide tire généralement trois runes : la situation, l’enjeu, une piste.
3. Il présente chaque signe, puis l’ensemble.

## Ce que cela peut vous apporter

- Une lecture concise, centrée sur l’essentiel.
- Une découverte d’un pan d’histoire.

## Ce que cela ne fait pas

- Les runes ne sont pas des présages.
- Une rune « inversée » n’annonce pas de malheur : elle invite à regarder un aspect plus difficile de la question.

## Les guides

Guides proposant cette pratique : [Yann Le Goff](/voyants/yann-le-goff).

*Profils de démonstration, à valider avant publication.*

## Questions fréquentes

### Les runes sont-elles liées à une religion ?

Elles sont d’abord un système d’écriture. Les associations symboliques utilisées en consultation sont surtout issues de la tradition ésotérique moderne.

### Combien de runes compte un jeu ?

Le plus souvent 24, parfois 25 avec une rune « blanche » ajoutée récemment.

[Consulter un lecteur de runes](/voyants) · [Toutes les questions fréquentes](/faq)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis médical, juridique ou financier.*`,source:"content/editorial/specialites/runes.md"},{path:"/specialites/tarot/",slug:"specialites/tarot",title:"Tarot en ligne : tirages commentés par chat | Luna",description:"Le tarot comme support de réflexion : arcanes, tirages, déroulement d’une consultation sur Luna, avec un guide IA ou un guide humain.",h1:"Le tarot, des images pour réfléchir",body:`# Le tarot, des images pour réfléchir

Le tarot est un jeu de 78 cartes illustrées. Les 22 arcanes majeurs représentent de grandes figures (le Bateleur, l’Impératrice, la Roue de Fortune, l’Étoile…) et les 56 arcanes mineurs se répartissent en quatre séries : Bâtons, Coupes, Épées et Deniers. Utilisé d’abord comme jeu de cartes, il est devenu au fil des siècles un support d’interprétation symbolique.

## Le principe

Sur Luna, le tarot sert à ouvrir une conversation. Les cartes tirées ne « disent » pas l’avenir : elles proposent des images que le guide relie à votre question. Une carte peut évoquer un commencement, une attente, un choix, une tension. C’est en confrontant ces images à votre situation que des pistes apparaissent.

## Comment se déroule une consultation sur Luna

1. Vous formulez votre question, idéalement de façon ouverte.
2. Le guide choisit un tirage adapté : une carte pour un éclairage simple, trois cartes pour une situation (contexte, enjeu, piste), une croix pour une question plus complexe.
3. Il décrit chaque carte, puis la façon dont elles dialoguent entre elles.
4. Vous réagissez : ce qui vous parle, ce qui vous surprend, ce qui ne vous concerne pas.

## Ce que cela peut vous apporter

- Mettre des mots sur une situation confuse.
- Regarder un choix sous un angle nouveau.
- Prendre un temps pour soi, à distance du quotidien.

## Ce que cela ne fait pas

- Le tarot ne prédit pas d’événements et ne répond pas par oui ou par non à une question sur l’avenir.
- La carte de la Mort, par exemple, est traditionnellement lue comme un changement ou une fin de cycle, jamais comme une annonce.

## Les guides

Guides proposant cette pratique : [Séléné](/voyants/selene) (guide IA), [Hugo Lemaire](/voyants/hugo-lemaire), [Claire](/voyants/claire), [Sofia Marin](/voyants/sofia-marin).

*Profils de démonstration, à valider avant publication.*

## Questions fréquentes

### Faut-il connaître le tarot pour consulter ?

Non. Le guide vous explique chaque carte. Vous pouvez aussi commencer avec Séléné, notre guide IA, pour découvrir le tarot à votre rythme.

### Un tirage fait par une IA a-t-il la même valeur ?

Un tirage est un support de réflexion, qu’il soit proposé par un guide IA ou humain. La différence tient à l’échange : un guide humain apporte son écoute et son expérience, un guide IA reste disponible à toute heure. Dans les deux cas, vous savez avec qui vous échangez.

[Choisir un guide de tarot](/voyants) · [Toutes les questions fréquentes](/faq)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis médical, juridique ou financier.*`,source:"content/editorial/specialites/tarot.md"},{path:"/themes/amour/",slug:"themes/amour",title:"Guidance amour : y voir clair dans vos sentiments | Luna",description:"Une rencontre, un doute, une rupture : la guidance amoureuse vous aide à clarifier ce que vous ressentez. Sans promesse, avec des guides attentifs.",h1:"Amour : mettre des mots sur ce que vous ressentez",body:`# Amour : mettre des mots sur ce que vous ressentez

Une rencontre qui vous trouble, une attente qui dure, une histoire qui s’achève : les questions d’amour sont parmi les plus fréquentes, et souvent les plus intenses. Une consultation ne vous dira pas ce que pense l’autre ni ce qu’il fera. Elle peut en revanche vous aider à comprendre ce que vous vivez, vous.

## Des questions pour commencer

- Qu’est-ce que j’attends vraiment de cette relation ?
- Qu’est-ce qui me retient d’avancer ou de tourner la page ?
- Quels schémas se répètent dans mes histoires ?
- Comment aborder une conversation importante ?

## Reformuler pour mieux réfléchir

Une question ouverte donne un échange plus utile qu’une demande de prédiction. Quelques exemples :

- « Va-t-il revenir ? » devient « Qu’est-ce qui m’aiderait à aller mieux dans cette attente ? »
- « Est-ce la bonne personne ? » devient « Qu’est-ce qui compte pour moi dans une relation ? »

## Ce qu’une consultation ne fera pas

Aucun guide Luna ne promet le retour d’une personne, une rencontre ou un mariage. Aucun rituel n’est proposé pour influencer les sentiments d’autrui. Une relation dépend de deux personnes libres.

## Quand s’adresser à un professionnel

Si une relation vous fait peur, vous humilie ou vous isole, ce n’est pas une question de guidance. Le 3919 (Violences Femmes Info) est gratuit et anonyme ; en cas de danger immédiat, appelez le 17. Un psychologue peut aussi vous accompagner après une rupture difficile.

## Pratiques et guides

- **Pratiques adaptées** : [Tarot](/specialites/tarot), [Oracle](/specialites/oracle), [Astrologie](/specialites/astrologie)
- **Guides** : [Claire](/voyants/claire), [Séléné](/voyants/selene) (guide IA), [Hugo Lemaire](/voyants/hugo-lemaire) *(profils de démonstration)*

[Choisir un guide](/voyants) · [Comment ça marche](/comment-ca-marche)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel.*`,source:"content/editorial/themes/amour.md"},{path:"/themes/argent/",slug:"themes/argent",title:"Guidance et argent : votre rapport à l’argent | Luna",description:"Réfléchir à votre rapport à l’argent, à vos priorités et à vos peurs. Aucun conseil financier : pour vos décisions, adressez-vous à un professionnel.",h1:"Argent : réfléchir à votre rapport à l’argent",body:`# Argent : réfléchir à votre rapport à l’argent

L’argent touche à la sécurité, à la liberté, parfois à la culpabilité ou à la peur. Une consultation ne vous dira pas quoi acheter, vendre ou placer. Elle peut en revanche vous aider à comprendre ce que l’argent représente pour vous, et ce qui pèse dans vos choix.

## Des questions pour commencer

- Qu’est-ce que l’argent représente pour moi : sécurité, liberté, reconnaissance ?
- Quelles habitudes ai-je héritées de ma famille ?
- Qu’est-ce qui m’inquiète vraiment dans ma situation actuelle ?

## Reformuler pour mieux réfléchir

Une question ouverte donne un échange plus utile qu’une demande de prédiction. Quelques exemples :

- « Vais-je gagner de l’argent ? » devient « Qu’est-ce qui me rassurerait aujourd’hui ? »
- « Dois-je investir ? » devient « Quelles questions poser à un conseiller avant de décider ? »

## Ce qu’une consultation ne fera pas

Luna ne donne **aucun conseil financier**. Aucun guide ne se prononce sur un investissement, un crédit, un jeu d’argent ou une date favorable pour une opération. Nous vous invitons aussi à ne jamais consulter pour « récupérer » une somme : si une consultation vous met en difficulté financière, faites une pause.

## Quand s’adresser à un professionnel

Pour un budget difficile, les Points conseil budget proposent une aide gratuite et confidentielle. Pour un placement ou un crédit, consultez un conseiller financier ou votre banque. En cas de difficulté avec les jeux d’argent, Joueurs Info Service est joignable au 09 74 75 13 13 (appel non surtaxé).

## Pratiques et guides

- **Pratiques adaptées** : [Numérologie](/specialites/numerologie), [Tarot](/specialites/tarot)
- **Guides** : [Inès Benali](/voyants/ines-benali), [Sofia Marin](/voyants/sofia-marin) *(profils de démonstration)*

[Choisir un guide](/voyants) · [Comment ça marche](/comment-ca-marche)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel.*`,source:"content/editorial/themes/argent.md"},{path:"/themes/avenir/",slug:"themes/avenir",title:"Guidance et avenir : préparer ce qui vient | Luna",description:"Personne ne connaît l’avenir. Une consultation peut vous aider à clarifier vos envies, vos craintes et vos prochains pas. Sans prédiction.",h1:"Avenir : préparer ce qui vient, sans le prédire",body:`# Avenir : préparer ce qui vient, sans le prédire

« Que va-t-il se passer ? » C’est souvent la première question que l’on se pose, surtout dans une période d’incertitude. Soyons clairs : personne, sur Luna ou ailleurs, ne connaît votre avenir. Une consultation peut en revanche vous aider à regarder vos envies, vos craintes et vos ressources, pour aborder la suite avec plus de clarté.

## Des questions pour commencer

- Qu’est-ce que je souhaite voir évoluer dans ma vie ?
- Qu’est-ce qui me fait peur dans ce qui vient ?
- Quel premier pas serait à ma portée ?

## Reformuler pour mieux réfléchir

Une question ouverte donne un échange plus utile qu’une demande de prédiction. Quelques exemples :

- « Que va-t-il m’arriver cette année ? » devient « Sur quoi ai-je envie de mettre mon énergie cette année ? »
- « Est-ce que ça va marcher ? » devient « Qu’est-ce qui dépend de moi dans ce projet ? »

## Ce qu’une consultation ne fera pas

Aucun guide ne fait de prédiction datée ni n’annonce un événement. Une période difficile n’est jamais présentée comme une fatalité.

## Quand s’adresser à un professionnel

Si l’avenir vous angoisse au point de perturber votre sommeil ou votre quotidien, parlez-en à votre médecin ou à un psychologue. En cas de détresse, le 3114 est joignable gratuitement, 24 h/24.

## Pratiques et guides

- **Pratiques adaptées** : [Astrologie](/specialites/astrologie), [Tarot](/specialites/tarot), [Runes](/specialites/runes), [Numérologie](/specialites/numerologie)
- **Guides** : [Marc](/voyants/marc), [Séléné](/voyants/selene) (guide IA), [Yann Le Goff](/voyants/yann-le-goff), [Véga](/voyants/vega) (guide IA) *(profils de démonstration)*

[Choisir un guide](/voyants) · [Comment ça marche](/comment-ca-marche)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel.*`,source:"content/editorial/themes/avenir.md"},{path:"/themes/couple/",slug:"themes/couple",title:"Guidance couple : réfléchir à deux, ou pour soi | Luna",description:"Communication, projets communs, crise ou routine : une consultation pour prendre du recul sur votre couple. Des guides qui ne tranchent pas à votre place.",h1:"Couple : prendre du recul sur la relation",body:`# Couple : prendre du recul sur la relation

Vivre à deux, c’est accorder deux histoires, deux rythmes, deux façons d’aimer. Lorsque la communication se tend ou qu’une décision commune se profile, il peut être utile de s’arrêter et de regarder la relation avec un peu de distance.

## Des questions pour commencer

- Qu’est-ce qui a changé entre nous, et depuis quand ?
- De quoi ai-je besoin aujourd’hui dans ce couple ?
- Comment formuler une demande sans reproche ?
- Comment aborder un projet commun : emménager, un enfant, un déménagement ?

## Reformuler pour mieux réfléchir

Une question ouverte donne un échange plus utile qu’une demande de prédiction. Quelques exemples :

- « Mon couple va-t-il durer ? » devient « Qu’est-ce qui nourrit encore notre relation ? »
- « Doit-on se séparer ? » devient « Qu’est-ce que j’ai besoin de dire à l’autre ? »

## Ce qu’une consultation ne fera pas

Un guide ne décide pas d’une séparation et ne prend pas parti. Il n’a accès qu’à votre point de vue et vous le rappellera.

## Quand s’adresser à un professionnel

Un conseiller conjugal et familial ou un thérapeute de couple peut vous accompagner à deux. Pour une séparation, un avocat ou un médiateur familial vous informera sur vos droits. En cas de violence, appelez le 3919 ou, en cas de danger, le 17.

## Pratiques et guides

- **Pratiques adaptées** : [Tarot](/specialites/tarot), [Astrologie](/specialites/astrologie), [Cartomancie](/specialites/cartomancie)
- **Guides** : [Claire](/voyants/claire), [Marc](/voyants/marc), [Nadia Kovač](/voyants/nadia-kovac) *(profils de démonstration)*

[Choisir un guide](/voyants) · [Comment ça marche](/comment-ca-marche)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel.*`,source:"content/editorial/themes/couple.md"},{path:"/themes/famille/",slug:"themes/famille",title:"Guidance famille : comprendre vos liens | Luna",description:"Parents, enfants, fratrie : une consultation pour réfléchir à vos liens familiaux et à votre place. Avec des relais vers des professionnels si besoin.",h1:"Famille : comprendre votre place dans vos liens",body:`# Famille : comprendre votre place dans vos liens

La famille nous construit, et parfois nous pèse. Une tension avec un parent, une distance dans une fratrie, une question sur votre rôle de parent : ces liens sont complexes et chargés d’histoire. Une consultation peut vous aider à y voir plus clair dans ce que vous ressentez et dans ce que vous souhaitez.

## Des questions pour commencer

- Quelle place est-ce que j’occupe dans ma famille, et me convient-elle ?
- Qu’est-ce que j’aimerais dire à ce proche ?
- Quelles limites ai-je besoin de poser ?

## Reformuler pour mieux réfléchir

Une question ouverte donne un échange plus utile qu’une demande de prédiction. Quelques exemples :

- « Ma sœur va-t-elle me reparler ? » devient « Comment pourrais-je faire un premier pas, si je le souhaite ? »
- « Mon fils réussira-t-il ? » devient « Comment l’accompagner sans projeter mes propres attentes ? »

## Ce qu’une consultation ne fera pas

Aucun guide ne se prononce sur la santé d’un proche, une succession, une garde d’enfant ou une décision médicale. Aucune consultation ne porte sur une personne mineure à sa place.

## Quand s’adresser à un professionnel

Un médiateur familial peut faciliter le dialogue lors d’un conflit ou d’une séparation. Pour une succession, adressez-vous à un notaire. Si un enfant est en danger, appelez le 119 (Allô Enfance en Danger, gratuit, 24 h/24). Un psychologue peut vous accompagner sur les liens familiaux difficiles.

## Pratiques et guides

- **Pratiques adaptées** : [Tarot](/specialites/tarot), [Oracle](/specialites/oracle), [Astrologie](/specialites/astrologie)
- **Guides** : [Claire](/voyants/claire), [Lucie Moreau](/voyants/lucie-moreau), [Marc](/voyants/marc) *(profils de démonstration)*

[Choisir un guide](/voyants) · [Comment ça marche](/comment-ca-marche)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel.*`,source:"content/editorial/themes/famille.md"},{path:"/themes/travail/",slug:"themes/travail",title:"Guidance travail : vos questions professionnelles | Luna",description:"Envie de changement, doute, fatigue : une consultation pour réfléchir à votre vie professionnelle. Pour décider, des professionnels vous accompagnent.",h1:"Travail : réfléchir à votre place et à vos envies",body:`# Travail : réfléchir à votre place et à vos envies

Le travail occupe une grande partie de nos journées et de nos pensées. Une envie de changement, une ambiance difficile, une lassitude : ces questions méritent d’être prises au sérieux. Une consultation peut vous aider à clarifier ce que vous ressentez et ce qui compte pour vous, avant de passer à l’action avec les bons interlocuteurs.

## Des questions pour commencer

- Qu’est-ce qui me donne de l’énergie dans mon travail, et qu’est-ce qui m’en prend ?
- Quelles valeurs ai-je envie de retrouver dans mon activité ?
- Qu’est-ce qui me fait hésiter face à ce changement ?

## Reformuler pour mieux réfléchir

Une question ouverte donne un échange plus utile qu’une demande de prédiction. Quelques exemples :

- « Vais-je obtenir ce poste ? » devient « Qu’ai-je envie de mettre en avant dans cette candidature ? »
- « Dois-je démissionner ? » devient « De quoi ai-je besoin pour prendre cette décision sereinement ? »

## Ce qu’une consultation ne fera pas

Aucun guide ne vous dira de quitter ou de garder votre emploi, ni ne prédira une embauche ou une promotion. Aucun conseil juridique ou d’orientation n’est donné.

## Quand s’adresser à un professionnel

Pour une évolution ou une reconversion, le conseil en évolution professionnelle (CEP) est gratuit, et France Travail vous accompagne dans vos démarches. Pour une question de droit du travail, adressez-vous à un juriste, un avocat ou à l’inspection du travail. Si le travail affecte votre santé, parlez-en à votre médecin ou à la médecine du travail.

## Pratiques et guides

- **Pratiques adaptées** : [Tarot](/specialites/tarot), [Numérologie](/specialites/numerologie), [Runes](/specialites/runes)
- **Guides** : [Sofia Marin](/voyants/sofia-marin), [Inès Benali](/voyants/ines-benali), [Yann Le Goff](/voyants/yann-le-goff) *(profils de démonstration)*

[Choisir un guide](/voyants) · [Comment ça marche](/comment-ca-marche)

---

*Service réservé aux personnes majeures. Les consultations sont proposées à des fins de réflexion personnelle et de divertissement ; elles n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel.*`,source:"content/editorial/themes/travail.md"},{path:"/voyants/aicha-diallo/",slug:"voyants/aicha-diallo",title:"Aïcha Diallo, écoute intuitive et médiumnité | Luna",description:"Aïcha Diallo propose une écoute intuitive, présentée avec prudence et sans promesse. Échanges par téléphone ou message. Profil fictif.",h1:"Aïcha Diallo",body:`> **Profil fictif — contenu de démonstration**
> Aïcha Diallo est un personnage inventé pour illustrer la présentation d’un guide sur Luna. Toute ressemblance avec une personne existante serait fortuite.

# Aïcha Diallo

**Guide humaine · Écoute intuitive**

## En bref

- **Type** : guide humaine (fictif)
- **Spécialités** : Écoute intuitive, Médiumnité (approche prudente), Accompagnement des transitions
- **Canaux** : Téléphone, message écrit
- **Tarifs indicatifs** : Téléphone : à partir de 1,50 €/min (indicatif, à valider). Message écrit : [À DÉFINIR : prix par message].
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Aïcha décrit sa pratique comme une écoute intuitive : elle accueille ce que vous racontez, les images et les impressions qui lui viennent, et vous les propose comme des pistes à examiner, jamais comme des faits.

Elle se présente comme médium, avec une règle qu’elle s’impose : ne jamais affirmer qu’elle communique avec une personne disparue. Lorsqu’une consultation touche au deuil, elle vous écoute avec délicatesse et vous rappelle qu’un accompagnement spécialisé existe.

## Style de consultation

Doux et lent. Aïcha laisse des silences, pose peu de questions et beaucoup de reformulations. Elle distingue toujours ce que vous lui avez dit de ce qu’elle perçoit.

## Pour quelles questions

- Mettre des mots sur une intuition ou un ressenti diffus.
- Être écouté pendant une période de changement.

## Ce que Aïcha ne fait pas

- Aïcha ne prétend pas transmettre de messages de défunts et ne présente aucune perception comme une vérité.
- Pour un deuil difficile, elle vous oriente vers un médecin, un psychologue ou une association d’accompagnement du deuil.

[Appeler Aïcha](/voyants/aicha-diallo/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/aicha-diallo.md"},{path:"/voyants/claire/",slug:"voyants/claire",title:"Claire, guide relations : amour et liens | Luna",description:"Claire vous aide à y voir clair dans vos relations amoureuses, familiales ou amicales, par message écrit ou par chat. Profil de démonstration.",h1:"Claire",body:`> **Profil fictif — contenu de démonstration**
> Ce profil présente Claire comme une guide humaine. Tant que son existence et son accord ne sont pas confirmés, il s’agit d’un personnage de démonstration. Aucune note, aucun avis ni aucun chiffre d’activité n’est affiché.
>
> Statut : Guide présentée comme humaine dans la v1. Statut réel à confirmer par Ozen : personne réelle recrutée ou personnage de démonstration.

# Claire

**Guide humaine · Relations**

## En bref

- **Type** : guide humaine
- **Spécialités** : Relations amoureuses, Liens familiaux et amicaux, Tarot et oracle comme supports
- **Canaux** : Message écrit, chat
- **Tarifs indicatifs** : Chat : à partir de 1,50 €/min (indicatif, à valider). Message écrit : [À DÉFINIR : prix par message et délai de réponse].
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Claire accompagne les questions de relation : un couple qui se cherche, une amitié qui s’éloigne, un lien familial difficile à nommer. Elle utilise le tarot et les cartes oracle comme des supports de conversation, pour faire apparaître ce qui se joue entre deux personnes.

Sa conviction : une relation se comprend mieux quand on regarde sa propre place dedans. Elle ne vous dira pas ce que pense l’autre ; elle vous aidera à préciser ce que vous ressentez, ce que vous attendez et ce qui vous appartient.

## Style de consultation

Une écoute attentive, des questions précises, des réponses écrites détaillées que vous pouvez relire. Claire reformule beaucoup et ne tranche jamais à votre place.

## Pour quelles questions

- Clarifier vos sentiments avant une conversation importante.
- Prendre du recul après une rupture ou une dispute.
- Réfléchir à votre place dans un lien familial.

## Ce que Claire ne fait pas

- Claire ne promet ni retour, ni rencontre, ni réconciliation.
- En cas de violence dans une relation, elle vous oriente vers le 3919 (violences femmes info) ou le 17.
- Elle ne remplace pas un conseiller conjugal, un médiateur familial ou un psychologue.

[Écrire à Claire](/voyants/claire/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/claire.md"},{path:"/voyants/hugo-lemaire/",slug:"voyants/hugo-lemaire",title:"Hugo Lemaire, tarologue : tarot de Marseille | Luna",description:"Hugo Lemaire lit le tarot de Marseille avec rigueur et simplicité, par téléphone ou par chat. Un regard posé sur vos questions. Profil fictif.",h1:"Hugo Lemaire",body:`> **Profil fictif — contenu de démonstration**
> Hugo Lemaire est un personnage inventé pour illustrer la présentation d’un guide sur Luna. Toute ressemblance avec une personne existante serait fortuite.

# Hugo Lemaire

**Guide humain · Tarot**

## En bref

- **Type** : guide humain (fictif)
- **Spécialités** : Tarot de Marseille, Tirage en croix, Lecture des arcanes majeurs
- **Canaux** : Téléphone, chat
- **Tarifs indicatifs** : À partir de 1,50 €/min (indicatif, à valider).
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Hugo s’intéresse au tarot de Marseille pour ses images : des personnages, des gestes, des regards qui se répondent d’une carte à l’autre. Il lit un tirage comme une scène, en observant ce que les figures font et vers quoi elles se tournent.

Il aime les questions concrètes et les reformule avec vous jusqu’à ce qu’elles soient vraiment les vôtres. Pour lui, le tarot est un miroir qui aide à voir une situation autrement, pas une fenêtre sur l’avenir.

## Style de consultation

Direct, calme, sans jargon. Hugo décrit ce qu’il voit sur les cartes avant de l’interpréter, et vous demande souvent ce que vous y voyez vous-même.

## Pour quelles questions

- Une question précise sur une décision à prendre.
- Comprendre comment se lit un tirage de tarot.

## Ce que Hugo ne fait pas

- Hugo ne répond pas par oui ou par non aux questions sur l’avenir.
- Il oriente vers un professionnel pour toute question de santé, de droit ou d’argent.

[Appeler Hugo](/voyants/hugo-lemaire/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/hugo-lemaire.md"},{path:"/voyants/ines-benali/",slug:"voyants/ines-benali",title:"Inès Benali, numérologue : chemin de vie | Luna",description:"Inès Benali explore la symbolique des nombres de votre date de naissance et de votre prénom. Lecture par chat ou message. Profil fictif.",h1:"Inès Benali",body:`> **Profil fictif — contenu de démonstration**
> Inès Benali est un personnage inventé pour illustrer la présentation d’un guide sur Luna. Toute ressemblance avec une personne existante serait fortuite.

# Inès Benali

**Guide humaine · Numérologie**

## En bref

- **Type** : guide humaine (fictif)
- **Spécialités** : Numérologie, Chemin de vie, Années personnelles
- **Canaux** : Chat, message écrit
- **Tarifs indicatifs** : Chat : à partir de 1,50 €/min (indicatif, à valider). Message écrit : [À DÉFINIR : prix par message].
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Inès aborde la numérologie comme un langage symbolique. À partir de votre date de naissance et de votre prénom, elle calcule quelques nombres clés, dont le chemin de vie, et vous propose ce qu’ils évoquent traditionnellement : un rythme, des aspirations, des points de vigilance.

Ce qui l’intéresse, c’est le dialogue entre ces symboles et votre histoire. Un nombre ne décide de rien ; il peut en revanche ouvrir une question que vous ne vous posiez pas.

## Style de consultation

Clair et pédagogique. Inès montre ses calculs, explique d’où viennent les nombres et vous laisse le temps de réagir. Elle préfère deux idées bien comprises à dix interprétations rapides.

## Pour quelles questions

- Découvrir la numérologie avec des explications simples.
- Réfléchir à une nouvelle étape, au début d’une année personnelle.

## Ce que Inès ne fait pas

- Inès ne choisit pas de date « favorable » pour un contrat, un investissement ou une intervention médicale.
- Elle ne fait aucune prédiction.

[Échanger avec Inès](/voyants/ines-benali/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/ines-benali.md"},{path:"/voyants/lucie-moreau/",slug:"voyants/lucie-moreau",title:"Lucie Moreau, oracle et pendule | Luna",description:"Lucie Moreau utilise cartes oracle et pendule comme supports d’écoute, pour clarifier une question. Par chat ou message écrit. Profil fictif.",h1:"Lucie Moreau",body:`> **Profil fictif — contenu de démonstration**
> Lucie Moreau est un personnage inventé pour illustrer la présentation d’un guide sur Luna. Toute ressemblance avec une personne existante serait fortuite.

# Lucie Moreau

**Guide humaine · Oracle et pendule**

## En bref

- **Type** : guide humaine (fictif)
- **Spécialités** : Cartes oracle, Pendule, Clarification d’une question
- **Canaux** : Chat, message écrit
- **Tarifs indicatifs** : Chat : à partir de 1,50 €/min (indicatif, à valider). Message écrit : [À DÉFINIR : prix par message].
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Lucie travaille avec des cartes oracle illustrées et avec le pendule. Elle les utilise comme des outils pour ralentir et clarifier : une carte tirée ouvre un thème, le pendule aide à trier entre plusieurs formulations d’une même question.

Elle est attentive à ne pas transformer le pendule en machine à décider. Pour elle, sa valeur tient à ce qu’il révèle de vos hésitations, pas à une réponse venue d’ailleurs.

## Style de consultation

Apaisant et structuré. Lucie commence par un temps pour poser la question, tire une ou deux cartes, puis vous propose une synthèse écrite avec une question à garder en tête.

## Pour quelles questions

- Démêler une question confuse.
- Un moment calme pour faire le point.

## Ce que Lucie ne fait pas

- Lucie ne prend pas de décision à votre place et refuse les questions de santé ou d’argent posées au pendule.

[Échanger avec Lucie](/voyants/lucie-moreau/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/lucie-moreau.md"},{path:"/voyants/marc/",slug:"voyants/marc",title:"Marc, astrologue : thème natal et cycles | Luna",description:"Marc lit votre thème astral et les cycles en cours, par téléphone ou par message. Un regard posé sur les grandes étapes. Profil de démonstration.",h1:"Marc",body:`> **Profil fictif — contenu de démonstration**
> Ce profil présente Marc comme un guide humain. Tant que son existence et son accord ne sont pas confirmés, il s’agit d’un personnage de démonstration. Aucune note, aucun avis ni aucun chiffre d’activité n’est affiché.
>
> Statut : Guide présenté comme humain dans la v1. Statut réel à confirmer par Ozen : personne réelle recrutée ou personnage de démonstration.

# Marc

**Guide humain · Astrologie**

## En bref

- **Type** : guide humain
- **Spécialités** : Thème natal, Cycles planétaires et transits, Révolution solaire
- **Canaux** : Téléphone, message écrit
- **Tarifs indicatifs** : Téléphone : à partir de 1,50 €/min (indicatif, à valider). Message écrit : [À DÉFINIR : prix par message].
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Marc pratique l’astrologie comme on lit une carte de randonnée : pour repérer le relief, pas pour fixer l’itinéraire. Il part de votre thème natal, c’est-à-dire la position des planètes au moment de votre naissance, pour décrire vos ressources, vos tensions et la façon dont vous traversez les périodes de changement.

Il s’intéresse particulièrement aux cycles : les moments où une question revient, où un chapitre se ferme, où une envie nouvelle apparaît. Il vous aide à les reconnaître, sans jamais vous dire ce qui doit arriver.

## Style de consultation

Méthodique et chaleureux. Marc vous demande votre date, votre heure et votre lieu de naissance, puis commence par une vue d’ensemble avant d’entrer dans votre question. Par message, il rédige une lecture structurée, avec les termes astrologiques expliqués simplement.

## Pour quelles questions

- Comprendre votre thème natal pour la première fois.
- Prendre du recul sur une période de transition.
- Relire une année écoulée à la lumière des cycles.

## Ce que Marc ne fait pas

- Marc ne fait pas de prédiction datée et ne promet aucun événement.
- Il ne répond pas aux questions de santé, de droit ou d’investissement et vous oriente vers un professionnel.

[Appeler Marc](/voyants/marc/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/marc.md"},{path:"/voyants/nadia-kovac/",slug:"voyants/nadia-kovac",title:"Nadia Kovač, cartomancienne : jeu de 32 cartes | Luna",description:"Nadia Kovač pratique la cartomancie traditionnelle et les cartes Lenormand, par téléphone ou par chat. Lectures précises et sobres. Profil fictif.",h1:"Nadia Kovač",body:`> **Profil fictif — contenu de démonstration**
> Nadia Kovač est un personnage inventé pour illustrer la présentation d’un guide sur Luna. Toute ressemblance avec une personne existante serait fortuite.

# Nadia Kovač

**Guide humaine · Cartomancie**

## En bref

- **Type** : guide humaine (fictif)
- **Spécialités** : Cartomancie (jeu de 32 cartes), Cartes Lenormand, Questions du quotidien
- **Canaux** : Téléphone, chat
- **Tarifs indicatifs** : À partir de 1,50 €/min (indicatif, à valider).
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Nadia travaille avec des jeux simples : le jeu de 32 cartes et les cartes Lenormand, dont les images du quotidien (une maison, une lettre, un chemin) se combinent comme des mots dans une phrase.

Elle aime cette pratique pour son côté concret. Une lecture de Nadia ressemble à une conversation sur votre semaine, vos priorités, ce qui vous pèse et ce qui vous porte.

## Style de consultation

Vive et précise. Nadia annonce le tirage qu’elle utilise, lit les cartes par paires et vous résume l’essentiel en quelques phrases à la fin de l’échange.

## Pour quelles questions

- Une question pratique sur votre organisation ou vos priorités.
- Découvrir les cartes Lenormand.

## Ce que Nadia ne fait pas

- Nadia ne donne pas de date ni d’échéance.
- Elle ne répond pas aux questions financières, juridiques ou médicales.

[Appeler Nadia](/voyants/nadia-kovac/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/nadia-kovac.md"},{path:"/voyants/selene/",slug:"voyants/selene",title:"Séléné, guide IA de tarot : chat 24 h/24 | Luna",description:"Séléné est un guide IA de Luna : tirages de tarot commentés par chat, à toute heure. Réponses générées automatiquement, clairement signalées.",h1:"Séléné",body:`> **Profil fictif — contenu de démonstration**
> Séléné est un **guide IA** : ses réponses sont générées automatiquement par une intelligence artificielle. Ce profil est un exemple de présentation, à valider avant publication.
>
> Statut : Guide IA déjà présent dans la v1 de Luna. Profil maintenu, statut IA inchangé.

# Séléné

**Guide IA · Tarot**

## En bref

- **Type** : guide ia
- **Spécialités** : Tarot de Marseille, Tirages en trois cartes, Questions du quotidien
- **Canaux** : Chat uniquement
- **Tarifs indicatifs** : [À DÉFINIR : tarif du chat IA ou inclusion dans Luna+.] Tarifs indicatifs, à valider.
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Séléné est le guide IA de Luna. Ce n’est pas une personne : c’est un assistant conversationnel dont les réponses sont générées automatiquement, à partir de consignes écrites par l’équipe Luna.

Séléné s’appuie sur la symbolique du tarot de Marseille. Vous posez une question, Séléné tire des cartes et vous propose une lecture : ce que chaque arcane évoque, comment les cartes dialoguent entre elles, quelles questions elles peuvent ouvrir pour vous. Séléné ne voit rien, ne ressent rien et ne sait de vous que ce que vous lui écrivez.

## Style de consultation

Un ton doux et posé. Séléné commence toujours par reformuler votre question, propose un tirage simple (souvent trois cartes), puis vous invite à dire ce qui résonne pour vous. Ses réponses sont courtes et vous pouvez demander d’approfondir une carte précise.

## Pour quelles questions

- Mettre des mots sur une situation, à n’importe quelle heure.
- Découvrir le tarot sans pression.
- Préparer une question avant d’échanger avec un guide humain.

## Ce que Séléné ne fait pas

- Séléné ne prédit pas l’avenir et ne donne aucune certitude.
- Séléné ne donne pas de conseil médical, juridique ou financier et vous oriente vers un professionnel lorsque la question le demande.
- Si vous exprimez une détresse, Séléné vous communique les numéros d’aide (3114, 15, 112) et vous invite à parler à une personne.

[Discuter avec Séléné](/voyants/selene/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/selene.md"},{path:"/voyants/sofia-marin/",slug:"voyants/sofia-marin",title:"Sofia Marin, guidance travail et transitions | Luna",description:"Sofia Marin utilise tarot et numérologie pour vous aider à réfléchir à vos envies et transitions professionnelles. Par chat ou téléphone. Profil fictif.",h1:"Sofia Marin",body:`> **Profil fictif — contenu de démonstration**
> Sofia Marin est un personnage inventé pour illustrer la présentation d’un guide sur Luna. Toute ressemblance avec une personne existante serait fortuite.

# Sofia Marin

**Guide humaine · Travail et transitions**

## En bref

- **Type** : guide humaine (fictif)
- **Spécialités** : Questions de travail et de vocation, Tarot, Numérologie
- **Canaux** : Chat, téléphone
- **Tarifs indicatifs** : À partir de 1,50 €/min (indicatif, à valider).
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Sofia accompagne les questions liées au travail : une envie de changement, un doute sur sa place, une période de fatigue ou de lassitude. Elle utilise le tarot et la numérologie pour faire émerger ce qui compte pour vous : vos valeurs, vos besoins, vos limites.

Elle est claire sur un point : elle n’est pas conseillère en orientation ni en droit du travail. Une consultation avec Sofia sert à réfléchir ; les décisions concrètes se prennent avec les bons interlocuteurs.

## Style de consultation

Énergique et bienveillante. Sofia termine chaque échange par deux ou trois questions concrètes à vous poser, et vous suggère les professionnels à consulter si besoin.

## Pour quelles questions

- Faire le point sur vos envies professionnelles.
- Préparer une réflexion avant un bilan de compétences.

## Ce que Sofia ne fait pas

- Sofia ne vous dira pas de quitter ou de garder votre emploi.
- Pour une question de droit du travail, de santé au travail ou de reconversion, elle vous oriente vers un conseiller en évolution professionnelle, la médecine du travail ou un juriste.

[Échanger avec Sofia](/voyants/sofia-marin/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/sofia-marin.md"},{path:"/voyants/theo-garnier/",slug:"voyants/theo-garnier",title:"Théo Garnier, interprétation des rêves | Luna",description:"Théo Garnier vous aide à explorer vos rêves comme un récit personnel : symboles, émotions, échos du quotidien. Par message ou chat. Profil fictif.",h1:"Théo Garnier",body:`> **Profil fictif — contenu de démonstration**
> Théo Garnier est un personnage inventé pour illustrer la présentation d’un guide sur Luna. Toute ressemblance avec une personne existante serait fortuite.

# Théo Garnier

**Guide humain · Rêves**

## En bref

- **Type** : guide humain (fictif)
- **Spécialités** : Interprétation des rêves, Symbolique, Journal de rêves
- **Canaux** : Message écrit, chat
- **Tarifs indicatifs** : Chat : à partir de 1,50 €/min (indicatif, à valider). Message écrit : [À DÉFINIR : prix par message].
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Théo considère le rêve comme un récit que vous vous racontez à vous-même. Plutôt que de chercher le sens « officiel » d’un symbole dans un dictionnaire, il part de vos associations : ce que ce lieu, cette personne ou cet objet évoque pour vous.

Il s’inspire de plusieurs traditions symboliques et vous aide à relier un rêve à ce que vous vivez. Il vous encourage à tenir un journal de rêves pour repérer, avec le temps, les motifs qui reviennent.

## Style de consultation

Curieux et bienveillant. Théo vous demande de raconter le rêve au présent, avec le plus de détails possible, puis avance par questions. Ses messages se terminent souvent par une piste à observer dans les jours suivants.

## Pour quelles questions

- Un rêve qui vous a marqué et dont vous voulez parler.
- Commencer un journal de rêves.

## Ce que Théo ne fait pas

- Théo ne voit pas dans les rêves des annonces de l’avenir.
- Des cauchemars répétés ou des troubles du sommeil relèvent d’un médecin : il vous le dira.

[Écrire à Théo](/voyants/theo-garnier/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/theo-garnier.md"},{path:"/voyants/vega/",slug:"voyants/vega",title:"Véga, guide IA d’astrologie et de numérologie | Luna",description:"Véga est un guide IA de Luna : explications d’astrologie et de numérologie par chat, à toute heure. Réponses générées automatiquement et signalées.",h1:"Véga",body:`> **Profil fictif — contenu de démonstration**
> Véga est un **guide IA** : ses réponses sont générées automatiquement par une intelligence artificielle. Ce profil est un exemple de présentation, à valider avant publication.
>
> Statut : Nouveau guide IA proposé pour la v2. À valider par Ozen.

# Véga

**Guide IA · Astrologie et numérologie**

## En bref

- **Type** : guide ia
- **Spécialités** : Astrologie (découverte), Numérologie (découverte), Explications des signes et des nombres
- **Canaux** : Chat uniquement
- **Tarifs indicatifs** : [À DÉFINIR : tarif du chat IA ou inclusion dans Luna+.] Tarifs indicatifs, à valider.
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Véga est un guide IA de Luna. Ce n’est pas une personne : ses réponses sont générées automatiquement, à partir de consignes écrites par l’équipe Luna.

Véga est pensé pour la découverte. Vous voulez savoir ce qu’est un ascendant, ce que symbolise votre signe ou comment se calcule un chemin de vie ? Véga vous l’explique simplement, à partir des informations que vous lui donnez, et vous propose des pistes de réflexion.

## Style de consultation

Clair et pédagogique. Véga explique les notions pas à pas, donne des exemples et vous indique quand une question mériterait l’échange avec un guide humain.

## Pour quelles questions

- Comprendre les bases de l’astrologie ou de la numérologie.
- Préparer une consultation avec Marc ou Inès.

## Ce que Véga ne fait pas

- Véga ne fait pas de prédiction et ne donne aucune certitude.
- Véga ne donne pas de conseil médical, juridique ou financier.
- En cas de détresse exprimée, Véga communique les numéros d’aide (3114, 15, 112).

[Discuter avec Véga](/voyants/vega/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/vega.md"},{path:"/voyants/yann-le-goff/",slug:"voyants/yann-le-goff",title:"Yann Le Goff, lecture des runes | Luna",description:"Yann Le Goff lit les runes comme un alphabet symbolique pour éclairer vos questions, par téléphone ou par message écrit. Profil fictif.",h1:"Yann Le Goff",body:`> **Profil fictif — contenu de démonstration**
> Yann Le Goff est un personnage inventé pour illustrer la présentation d’un guide sur Luna. Toute ressemblance avec une personne existante serait fortuite.

# Yann Le Goff

**Guide humain · Runes**

## En bref

- **Type** : guide humain (fictif)
- **Spécialités** : Runes (Futhark ancien), Tirage à trois runes, Symbolique nordique
- **Canaux** : Téléphone, message écrit
- **Tarifs indicatifs** : Téléphone : à partir de 1,50 €/min (indicatif, à valider). Message écrit : [À DÉFINIR : prix par message].
- **Disponibilité** : affichée en temps réel sur la plateforme.

## Présentation

Yann s’est intéressé aux runes par l’histoire avant d’en faire un support de guidance. Il explique volontiers d’où vient chaque signe du Futhark ancien et ce que la tradition y associe : le voyage, la protection, la croissance, l’attente.

Il lit les runes avec sobriété, comme des mots-clés qui invitent à regarder une situation sous un angle précis. Son approche est terre à terre et laisse beaucoup de place à votre propre lecture.

## Style de consultation

Posé, concis, un brin d’humour. Yann présente chaque rune tirée en une phrase, puis relie les trois signes à votre question.

## Pour quelles questions

- Une question de changement ou de départ.
- Découvrir les runes avec un regard historique.

## Ce que Yann ne fait pas

- Yann ne présente jamais un tirage comme un avertissement ou une fatalité.

[Appeler Yann](/voyants/yann-le-goff/consulter) · [Voir tous les guides](/voyants)

---

*Service réservé aux personnes majeures. Les consultations n’ont pas de valeur scientifique et ne remplacent pas un avis professionnel. Les tarifs sont affichés en euros TTC avant chaque échange.*`,source:"content/editorial/voyants/yann-le-goff.md"}],Um=[{slug:"aicha-diallo",name:"Aïcha Diallo",kind:"human",channels:["call","message"],photo:null,demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:211},{slug:"claire",name:"Claire",kind:"human",channels:["chat","message"],photo:"mv9Jq.jpg",demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:19},{slug:"hugo-lemaire",name:"Hugo Lemaire",kind:"human",channels:["chat","call"],photo:null,demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:250},{slug:"ines-benali",name:"Inès Benali",kind:"human",channels:["chat","message"],photo:null,demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:130},{slug:"lucie-moreau",name:"Lucie Moreau",kind:"human",channels:["chat","message"],photo:null,demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:259},{slug:"marc",name:"Marc",kind:"human",channels:["call","message"],photo:"W9qq6.jpg",demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:174},{slug:"nadia-kovac",name:"Nadia Kovač",kind:"human",channels:["chat","call"],photo:null,demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:121},{slug:"selene",name:"Séléné",kind:"ai",channels:["chat"],photo:"a2fNm.jpg",demoChatCents:90,demoCallCents:150,demoVideoCents:150,hue:31},{slug:"sofia-marin",name:"Sofia Marin",kind:"human",channels:["chat","call"],photo:null,demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:145},{slug:"theo-garnier",name:"Théo Garnier",kind:"human",channels:["chat","message"],photo:null,demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:256},{slug:"vega",name:"Véga",kind:"ai",channels:["chat"],photo:null,demoChatCents:90,demoCallCents:150,demoVideoCents:150,hue:174},{slug:"yann-le-goff",name:"Yann Le Goff",kind:"human",channels:["call","message"],photo:null,demoChatCents:150,demoCallCents:150,demoVideoCents:150,hue:190}],Qc={pages:_m,voyants:Um},Bc=Qc.pages,en=Qc.voyants,Hc=new Map(Bc.map(e=>[e.path,e]));function Fr(e){return en.find(n=>n.slug===e)}const Om=[{path:"/voyants/",title:"Guides",description:"Annuaire des guides fictifs de démonstration, humains et IA.",group:"public",indexable:!0},{path:"/specialites/",title:"Spécialités",description:"Les pratiques proposées sur Luna.",group:"public",indexable:!0},{path:"/themes/",title:"Thèmes",description:"Questions d’amour, de travail, de famille et d’avenir.",group:"public",indexable:!0},{path:"/horoscope/",title:"Horoscope",description:"Les douze signes, comme repères symboliques.",group:"public",indexable:!0},{path:"/blog/",title:"Magazine",description:"Articles pour préparer une consultation avec mesure.",group:"public",indexable:!0},{path:"/tarifs/",title:"Tarifs et recharges",description:"Packs de crédit et tarif de démonstration.",group:"public",indexable:!0},{path:"/avis/",title:"Avis",description:"Avis de clients ayant réellement consulté. Aucun avis n’est encore publié.",group:"public",indexable:!0},{path:"/contact/",title:"Contact",description:"Écrire au service client de Luna.",group:"public",indexable:!0},{path:"/a-propos/",title:"À propos",description:"Ce qu’est le prototype Luna.",group:"public",indexable:!0},{path:"/aide/",title:"Aide",description:"Centre d’aide du prototype.",group:"public",indexable:!0},{path:"/aide/compte/",title:"Aide compte",description:"Créer un compte, se connecter, faire une pause.",group:"public",indexable:!0},{path:"/aide/paiements/",title:"Aide paiements",description:"Recharges, plafonds, factures et remboursements.",group:"public",indexable:!0},{path:"/aide/consultations/",title:"Aide consultations",description:"Chat, téléphone, visio et signalement.",group:"public",indexable:!0},{path:"/aide/guides/",title:"Aide guides",description:"Différence entre guide IA et guide humain.",group:"public",indexable:!0},{path:"/transparence/",title:"Transparence",description:"Nature du service et transparence sur l’intelligence artificielle.",group:"public",indexable:!0},{path:"/accessibilite/",title:"Accessibilité",description:"Engagement d’accessibilité du prototype.",group:"public",indexable:!0},{path:"/sous-traitants/",title:"Sous-traitants",description:"Destinataires et pays de traitement.",group:"public",indexable:!0},{path:"/preferences-cookies/",title:"Préférences cookies",description:"Choisir les cookies, ou les refuser.",group:"public",indexable:!0},{path:"/desinscription/",title:"Désinscription",description:"Retirer un consentement de prospection en un clic.",group:"public",indexable:!0},{path:"/plan-du-site/",title:"Plan du site",description:"Toutes les pages du prototype.",group:"public",indexable:!0},{path:"/legal/archives/",title:"Archives des textes juridiques",description:"Versions publiées des CGU, CGV et politiques.",group:"public",indexable:!0},{path:"/404/",title:"Page introuvable",description:"Cette adresse ne correspond à aucune page.",group:"public",indexable:!1},{path:"/devenir-voyant/candidature/",title:"Candidature guide",description:"Formulaire de candidature.",group:"public",indexable:!0},{path:"/inscription/",title:"Inscription",description:"Créer un compte Luna, réservé aux majeurs.",group:"account",indexable:!0},{path:"/connexion/",title:"Connexion",description:"Accéder à votre compte.",group:"account",indexable:!0},{path:"/mot-de-passe-oublie/",title:"Mot de passe oublié",description:"Recevoir un lien de réinitialisation simulé.",group:"account",indexable:!1},{path:"/reinitialiser-mot-de-passe/",title:"Nouveau mot de passe",description:"Choisir un nouveau mot de passe.",group:"account",indexable:!1},{path:"/compte/",title:"Mon compte",description:"Tableau de bord.",group:"account",indexable:!1},{path:"/compte/portefeuille/",title:"Portefeuille",description:"Solde et recharges.",group:"account",indexable:!1},{path:"/compte/recharger/",title:"Recharger",description:"Choisir un pack de crédit.",group:"account",indexable:!1},{path:"/compte/paiement/",title:"Paiement",description:"Paiement simulé par carte de test.",group:"account",indexable:!1},{path:"/compte/transactions/",title:"Transactions",description:"Historique du portefeuille.",group:"account",indexable:!1},{path:"/compte/factures/",title:"Factures",description:"Factures téléchargeables.",group:"account",indexable:!1},{path:"/compte/conversations/",title:"Conversations",description:"Historique des échanges.",group:"account",indexable:!1},{path:"/compte/favoris/",title:"Favoris",description:"Guides suivis et alertes.",group:"account",indexable:!1},{path:"/compte/reservations/",title:"Réservations",description:"Créneaux de visio.",group:"account",indexable:!1},{path:"/compte/notifications/",title:"Notifications",description:"Alertes de service.",group:"account",indexable:!1},{path:"/compte/parametres/",title:"Paramètres",description:"Profil et coordonnées.",group:"account",indexable:!1},{path:"/compte/confidentialite/",title:"Confidentialité",description:"Consentements, export et suppression.",group:"account",indexable:!1},{path:"/compte/mes-donnees/",title:"Mes données",description:"Télécharger ou supprimer vos données.",group:"account",indexable:!1},{path:"/compte/plafond/",title:"Plafond de dépense",description:"Limites quotidiennes et mensuelles.",group:"account",indexable:!1},{path:"/compte/pause/",title:"Faire une pause",description:"Auto-exclusion.",group:"account",indexable:!1},{path:"/compte/parrainage/",title:"Mon parrainage",description:"Votre lien personnel.",group:"account",indexable:!1},{path:"/compte/abonnement/",title:"Abonnement Luna+",description:"Résiliation en trois clics.",group:"account",indexable:!1},{path:"/session/test/",title:"Essai caméra et micro",description:"Tester le matériel avant une visio.",group:"session",indexable:!1},{path:"/espace-voyant/",title:"Espace guide",description:"Tableau de bord du guide.",group:"voyant",indexable:!1},{path:"/espace-voyant/disponibilites/",title:"Disponibilités",description:"Simulation de présence.",group:"voyant",indexable:!1},{path:"/espace-voyant/planning/",title:"Planning",description:"Créneaux.",group:"voyant",indexable:!1},{path:"/espace-voyant/tarifs/",title:"Tarifs du guide",description:"Tarifs indicatifs.",group:"voyant",indexable:!1},{path:"/espace-voyant/revenus/",title:"Revenus",description:"Relevés et commission.",group:"voyant",indexable:!1},{path:"/espace-voyant/profil/",title:"Profil guide",description:"Modifier la présentation.",group:"voyant",indexable:!1},{path:"/espace-voyant/avis/",title:"Avis reçus",description:"Avis réels uniquement.",group:"voyant",indexable:!1},{path:"/espace-voyant/consultations/",title:"Consultations",description:"Séances du guide, sans coordonnées client.",group:"voyant",indexable:!1},{path:"/admin/",title:"Administration",description:"Back-office.",group:"admin",indexable:!1},{path:"/admin/clients/",title:"Clients",description:"Comptes clients.",group:"admin",indexable:!1},{path:"/admin/voyants/",title:"Guides",description:"Fiches guides.",group:"admin",indexable:!1},{path:"/admin/validations/",title:"Validations",description:"Candidatures et KYC.",group:"admin",indexable:!1},{path:"/admin/tarification/",title:"Tarification",description:"Commission de la plateforme.",group:"admin",indexable:!1},{path:"/admin/revenus/",title:"Revenus",description:"Encaissements.",group:"admin",indexable:!1},{path:"/admin/statistiques/",title:"Statistiques",description:"Activité par guide.",group:"admin",indexable:!1},{path:"/admin/litiges/",title:"Litiges et remboursements",description:"Rembourser un paiement.",group:"admin",indexable:!1},{path:"/admin/avis/",title:"Modération des avis",description:"Avis en attente.",group:"admin",indexable:!1},{path:"/admin/audit/",title:"Journal d’audit",description:"Journal append-only.",group:"admin",indexable:!1},{path:"/admin/campagnes/",title:"Campagnes",description:"Prospection opt-in.",group:"admin",indexable:!1},{path:"/admin/codes-promo/",title:"Codes promo",description:"Code BIENVENUE.",group:"admin",indexable:!1},{path:"/admin/retention/",title:"Rétention",description:"Purge automatique.",group:"admin",indexable:!1},{path:"/admin/rgpd/",title:"Demandes RGPD",description:"Export et suppression.",group:"admin",indexable:!1},{path:"/admin/support/",title:"Support",description:"Accès aux conversations sur ticket.",group:"admin",indexable:!1},{path:"/admin/securite/",title:"Sécurité",description:"Double authentification.",group:"admin",indexable:!1},{path:"/admin/integrations/",title:"Intégrations",description:"Stripe, Twilio, Daily, Brevo, Matomo.",group:"admin",indexable:!1}];function pa(){const e=Bc.map(s=>({path:s.path,title:s.title,description:s.description,group:"public",indexable:s.path!=="/404/"})),n=en.flatMap(s=>[{path:`/voyants/${s.slug}/consulter/`,title:`Consulter ${s.name}`,description:`Séance de démonstration avec ${s.name}.`,group:"session",indexable:!1},{path:`/reserver/${s.slug}/`,title:`Réserver avec ${s.name}`,description:`Créneau de visio simulé avec ${s.name}.`,group:"session",indexable:!1},{path:`/session/appel/${s.slug}/`,title:`Appel avec ${s.name}`,description:`Appel simulé via Twilio avec ${s.name}.`,group:"session",indexable:!1},{path:`/session/video/${s.slug}/`,title:`Visio avec ${s.name}`,description:`Salle Daily simulée avec ${s.name}.`,group:"session",indexable:!1}]),t=new Map;for(const s of[...e,...Om,...n])t.set(s.path,s);return[...t.values()].sort((s,r)=>s.path.localeCompare(r.path,"fr"))}function Vm(){if(typeof document>"u")return"/luna/v2/";const e=document.querySelector('script[data-luna="app"]');if(!(e!=null&&e.src))return"/luna/v2/";const n=new URL(e.src).pathname,t=n.lastIndexOf("/assets/");return t>=0?n.slice(0,t+1):n.endsWith("/src/main.tsx")?"/":"/luna/v2/"}function As(e){const n=Vm();let t=e;return t.startsWith(n)&&(t=`/${t.slice(n.length)}`),t=t.replace(/index\.html$/,""),t=t.replace(/\/{2,}/g,"/"),t.startsWith("/")||(t=`/${t}`),t.endsWith("/")||(t+="/"),t}function ma(e,n){if(!n.startsWith("/"))return n;const t=n.indexOf("#"),s=t>=0?n.slice(t):"",r=t>=0?n.slice(0,t):n,i=r.indexOf("?"),a=i>=0?r.slice(i):"";let u=i>=0?r.slice(0,i):r;u.endsWith("/")||(u+="/");const l=e.split("/").filter(Boolean),c=u.split("/").filter(Boolean);let f=0;for(;f<l.length&&f<c.length&&l[f]===c[f];)f+=1;const g=[...Array(l.length-f).fill(".."),...c.slice(f)];return`${g.length?`${g.join("/")}/`:"./"}${a}${s}`}function Wc(e,n){const t=e.split("/").filter(Boolean).length;return`${"../".repeat(t+1)}images/${n}`}function Fm(e,n,t,s,r){return s?s.reason.trim().length>=20&&!!s.ticketId&&new Date(s.expiresAt).getTime()>r.getTime():!1}function wu(e){if(!Number.isInteger(e.balanceCents)||!Number.isInteger(e.rateCentsPerMin)||!Number.isInteger(e.billedMinutes))return{balanceCents:e.balanceCents,billedMinutes:e.billedMinutes,chargedCents:0,status:"invalid_rate"};if(e.rateCentsPerMin<=0||e.elapsedMs<0||e.billedMinutes<0)return{balanceCents:e.balanceCents,billedMinutes:e.billedMinutes,chargedCents:0,status:"invalid_rate"};const n=Math.floor(e.elapsedMs/6e4)+1;let t=e.balanceCents,s=e.billedMinutes,r=0;for(;s<n;){if(t<e.rateCentsPerMin)return{balanceCents:t,billedMinutes:s,chargedCents:r,status:"stopped_no_credit"};t-=e.rateCentsPerMin,s+=1,r+=e.rateCentsPerMin}return{balanceCents:t,billedMinutes:s,chargedCents:r,status:"running"}}function $m(e){if(e.rateCentsPerMin<=0||e.billedMinutes<0)return 0;const n=e.startedAtMs+e.billedMinutes*6e4,t=Math.floor(Math.max(0,e.balanceCents)/e.rateCentsPerMin);return Math.max(0,n-e.nowMs)+t*6e4}function Gm(e){return e>0&&e<=6e4}function Eu(e,n){if(!Number.isInteger(e)||e<0)throw new Error("MONTANT_INVALIDE");if(!Number.isInteger(n)||n<0||n>1e4)throw new Error("COMMISSION_INVALIDE");const t=Math.floor(e*n/1e4);return{platformCents:t,voyantCents:e-t}}function Qm(e,n,t){const s=e.filter(r=>r.purpose===n&&!0);return s.length===0?null:[...s].sort((r,i)=>r.at.localeCompare(i.at)).at(-1)??null}function Xs(e,n,t){var s;return((s=Qm(e,n))==null?void 0:s.granted)===!0}function Bm(e,n){if(!Number.isInteger(e)||!Number.isInteger(n))throw new Error("MONTANT_NON_ENTIER");const t=e+n;if(t<0)throw new Error("SOLDE_INSUFFISANT");return{balanceCents:t,balanceAfter:t}}function Ms(e){return e.pausedUntil&&new Date(e.pausedUntil).getTime()>e.now.getTime()?{ok:!1,reason:"PAUSE"}:e.amountCents>e.balanceCents?{ok:!1,reason:"FUNDS"}:e.spentTodayCents+e.amountCents>e.dailyLimitCents?{ok:!1,reason:"DAILY"}:e.spentMonthCents+e.amountCents>e.monthlyLimitCents?{ok:!1,reason:"MONTHLY"}:{ok:!0}}function Hm(e){return e.opposition||!e.consentGranted?{ok:!1,reason:"PAS_DE_CONSENTEMENT"}:e.selfExcluded?{ok:!1,reason:"AUTO_EXCLUSION"}:e.distressWithin30Days?{ok:!1,reason:"DETRESSE_RECENTE"}:e.capReachedWithin7Days?{ok:!1,reason:"PLAFOND_RECENT"}:(Number(new Intl.DateTimeFormat("fr-FR",{timeZone:"Europe/Paris",hour:"numeric",hourCycle:"h23"}).format(e.now)),new Intl.DateTimeFormat("en-GB",{timeZone:"Europe/Paris",weekday:"short"}).format(e.now),{ok:!0})}const br=[{id:"p20",payCents:2e3,creditCents:2200,name:"Essentiel"},{id:"p50",payCents:5e3,creditCents:5800,name:"Équilibre"},{id:"p100",payCents:1e4,creditCents:12e3,name:"Horizon"}];function Wm(e){return br.find(n=>n.id===e)??null}function Km(e,n){return!e||!e.trim()?{bonusCents:0}:e.trim().toUpperCase()!=="BIENVENUE"?{bonusCents:0,error:"CODE_INCONNU"}:n?{bonusCents:0,error:"CODE_DEJA_UTILISE"}:{bonusCents:500}}const Ym="4242424242424242",Jm="4000000000000002";function Xm(e){return e.replace(/[\s-]/g,"")}function Zm(e){const n=Xm(e);return n===Ym?"ok":n===Jm?"decline":"invalid"}function ef(e,n=new Date){const t=e.trim().match(/^(\d{2})\s*\/\s*(\d{2}|\d{4})$/);if(!t)return!1;const s=Number(t[1]);if(s<1||s>12)return!1;const r=t[2].length===2?2e3+Number(t[2]):Number(t[2]);return new Date(r,s,1).getTime()>n.getTime()}function nf(e){if([e.paidCents,e.grantedCents,e.consumedCents,e.alreadyRefundedCents,e.walletBalanceCents,e.requestedCents??0].some(a=>!Number.isInteger(a)||a<0))throw new Error("MONTANT_INVALIDE");if(e.grantedCents<e.consumedCents)throw new Error("CONSOMMATION_INVALIDE");const t=e.paidCents-e.alreadyRefundedCents;if(t<=0||e.grantedCents===0||e.walletBalanceCents===0)return{refundCents:0,walletDebitCents:0};const s=e.grantedCents-e.consumedCents,r=Math.min(e.walletBalanceCents,s);if(r<=0)return{refundCents:0,walletDebitCents:0};let i=Math.floor(r*e.paidCents/e.grantedCents);return i=Math.min(i,t),e.requestedCents!==void 0&&(i=Math.min(i,e.requestedCents)),i<=0?{refundCents:0,walletDebitCents:0}:{refundCents:i,walletDebitCents:r}}function tf(e,n,t){const s={message:n.messagesDays,recording:n.recordingsDays,log:n.serverLogsDays,account:n.inactiveAccountDays,audit:n.auditLogDays,prospect:n.prospectsDays},r=[],i=[],a=[];for(const u of e){const l=t.getTime()-new Date(u.at).getTime(),c=Number.isFinite(l)&&l>0&&l>sf(u,s)*864e5;if(u.category==="account"&&!u.inactive){i.push(u.id);continue}if(u.category==="accounting"){l>n.accountingArchiveDays*864e5?r.push(u.id):u.archived?i.push(u.id):a.push(u.id);continue}c?r.push(u.id):i.push(u.id)}return{removed:r,kept:i,archived:a}}function sf(e,n,t){return e.category==="accounting"?Number.POSITIVE_INFINITY:n[e.category]}function un(e,n=5e3){return e.replace(/<[^>]*>/g,"").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g,"").trim().slice(0,n)}const rf=[{pattern:/me suicider|id[ée]es? suicidaires?|je veux mourir|envie de mourir|mettre fin [àa] mes jours|plus envie de vivre|en finir avec la vie/i,category:"suicide"},{pattern:/me faire du mal|scarification|overdose/i,category:"self_harm"},{pattern:/il me bat|elle me bat|violences?( conjugales?)?|me frappe/i,category:"violence"}];function of(e){for(const n of rf)if(n.pattern.test(e))return{detected:!0,category:n.category};return{detected:!1,category:null}}function af(e){return/(es[-\s]?tu|êtes[-\s]?vous|t['’]es).{0,24}humain|tu es (un |une )?(humain|personne|vraie personne)|êtes-vous (un |une )?(humain|personne)|are you human/i.test(e)}const uf="Je suis une intelligence artificielle, et non une personne. Mes réponses sont générées automatiquement, elles peuvent être inexactes, et elles relèvent du divertissement. Elles ne remplacent pas un professionnel.",lf=/garanti[e]?|c['’]est certain|sortil[èe]ge|envo[ûu]tement|rechargez|ne partez pas|tu as besoin de moi|mal[ée]diction/i;function cf(e){return lf.test(e)?{text:"Je ne peux pas dire cela. Je propose seulement une lecture symbolique, sans certitude et sans vous inciter à poursuivre.",blocked:!0}:{text:e,blocked:!1}}function df(e,n=30,t=15,s=60){return e>=s?"hard_stop":e>=n&&(e-n)%t===0?"confirm":"ok"}function pf(e){const n=e.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi,"[coordonnées masquées]").replace(/(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g,"[coordonnées masquées]");return{text:n,redacted:n!==e}}function mf(e){const n=e.replace(/^::ffff:/,"");if(n.includes(".")){const t=n.split(".");if(t.length===4)return`${t[0]}.${t[1]}.${t[2]}.0`}return n.includes(":")?`${n.split(":").slice(0,3).join(":")}::`:null}const ff="Vous échangez avec une intelligence artificielle, et non avec une personne. Ses réponses sont générées automatiquement et peuvent être inexactes. Elles relèvent du divertissement et ne remplacent pas un professionnel.",vf=e=>`Vous échangez avec ${e}, guide humain(e) indépendant(e). Cette séance est une simulation : ce profil est fictif.`;async function Rs(e){const n=new TextEncoder().encode(`luna-demo-v1:${e}`),t=await crypto.subtle.digest("SHA-256",n);return[...new Uint8Array(t)].map(s=>s.toString(16).padStart(2,"0")).join("")}async function gf(e){const n=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e));return[...new Uint8Array(n)].map(t=>t.toString(16).padStart(2,"0")).join("")}const yi="e87a3cb72605b9042eee7ae4f059fdedb65fa33042a8b43f658313db2493e1c9",Kc="luna.v2.state.v3",Zs=5e3,er=15e3;function V(e){return`${e}_${Math.random().toString(36).slice(2,10)}`}function Tt(e){return new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Paris",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date(e))}function hf(e,n=new Date){const t=new Date(e);let s=n.getFullYear()-t.getFullYear();const r=n.getMonth()-t.getMonth();return(r<0||r===0&&n.getDate()<t.getDate())&&(s-=1),s}function Yc(){const e=new Date().toISOString(),n={id:"usr_admin",email:"admin@luna.test",passwordHash:yi,role:"admin",firstName:"Camille",lastName:"Morel",pseudonym:"Camille",birthDate:"1988-04-02",phone:"",demoRole:"admin",dailyCapCents:Zs,monthlyCapCents:er,pendingCap:null,selfExclusionUntil:null,referralCode:"LUNAADMIN",promoUsed:!1,lunaPlus:null,createdAt:e,lastActivityAt:e,closed:!1},t={id:"usr_marc",email:"voyant@luna.test",passwordHash:yi,role:"voyant",firstName:"Marc",lastName:"Démo",pseudonym:"Marc",birthDate:"1984-01-12",phone:"",demoRole:"voyant",voyantSlug:"marc",dailyCapCents:Zs,monthlyCapCents:er,pendingCap:null,selfExclusionUntil:null,referralCode:"LUNAMARC",promoUsed:!1,lunaPlus:null,createdAt:e,lastActivityAt:e,closed:!1},s={id:"usr_client",email:"client@luna.test",passwordHash:yi,role:"client",firstName:"Inès",lastName:"Martin",pseudonym:"Inès",birthDate:"1992-06-18",phone:"",demoRole:"client",dailyCapCents:Zs,monthlyCapCents:er,pendingCap:null,selfExclusionUntil:null,referralCode:"LUNAINE",promoUsed:!1,lunaPlus:null,createdAt:e,lastActivityAt:e,closed:!1},r={};for(const i of en)r[i.slug]=i.kind==="ai";return{users:[n,t,s],balances:{usr_admin:0,usr_marc:0,usr_client:0},payments:[],ledger:[],consents:[],sessions:[],messages:[],bookings:[],audit:[],disputes:[],favorites:[],presence:r,notifications:[],reports:[],dataRequests:[],supportGrants:[],applications:[],outbox:[],subscribers:[],opposition:[],distressSignals:[],invoices:[],currentUserId:null,pendingOtp:null,resetTokens:[],commissionBps:3e3,purgeRuns:[],capHitAt:{},savedCard:{}}}let x=Yc();const go=new Set;function z(){localStorage.setItem(Kc,JSON.stringify(x)),go.forEach(e=>e())}function U(e,n,t){var i;const s=((i=x.audit.at(-1))==null?void 0:i.rowHash)??"GENESIS",r={id:V("aud"),at:new Date().toISOString(),actorId:e,action:n,summary:t,prevHash:s,rowHash:""};r.rowHash=`${s}:${n}:${r.at}`.slice(0,64),x.audit=[...x.audit,r]}function xi(e){return x.consents.filter(n=>n.userId===e).map(n=>({purpose:n.purpose,granted:n.action==="granted",version:n.version,at:n.at}))}function yf(e){return x.consents.filter(n=>n.userId===e)}function _s(e,n=new Date){return e.selfExclusionUntil?e.selfExclusionUntil==="definitive"?!0:new Date(e.selfExclusionUntil).getTime()>n.getTime():!1}function ln(e,n,t=new Date){const s=Tt(t.toISOString()),r=s.slice(0,7),i=x.payments.filter(u=>u.userId===e&&u.status!=="failed"&&(n==="day"?Tt(u.createdAt)===s:Tt(u.createdAt).startsWith(r))),a=x.ledger.filter(u=>u.userId===e&&u.type==="session_charge"&&(n==="day"?Tt(u.at)===s:Tt(u.at).startsWith(r)));return i.reduce((u,l)=>u+l.paidCents,0)+a.reduce((u,l)=>u+Math.abs(l.amountCents),0)}function cn(e,n=new Date){const t=x.balances[e]??0,s=x.payments.filter(r=>r.userId===e&&r.status==="succeeded"&&new Date(r.usableAt).getTime()>n.getTime()).reduce((r,i)=>r+Math.max(0,i.grantedCents-i.consumedCents),0);return Math.max(0,t-s)}function Dn(e,n,t,s){const r=Bm(x.balances[e]??0,n);x.balances[e]=r.balanceCents,x.ledger.push({id:V("led"),userId:e,type:t,amountCents:n,balanceAfter:r.balanceAfter,ref:s,at:new Date().toISOString()})}function qi(e,n){let t=n;for(const s of x.payments.filter(r=>r.userId===e&&r.status==="succeeded")){const r=s.grantedCents-s.consumedCents,i=Math.min(r,t);if(s.consumedCents+=i,t-=i,t<=0)break}}async function zn(e,n,t,s,r){x.consents.push({id:V("cns"),userId:e,purpose:n,action:t,version:$c,textSha256:await gf(r),channel:"web",uiLocation:s,ipTruncated:mf("127.0.0.1"),at:new Date().toISOString()}),U(e,t==="granted"?"consent.granted":t==="refused"?"consent.refused":"consent.withdrawn",n)}const S={subscribe(e){return go.add(e),()=>go.delete(e)},get state(){return x},user(){return x.users.find(e=>e.id===x.currentUserId)??null},balance(e=x.currentUserId){return e?x.balances[e]??0:0},usable(e=x.currentUserId){return e?cn(e):0},async init(){const e=localStorage.getItem(Kc);x=e?JSON.parse(e):Yc();const n=window.__LUNA_TEST_ACCOUNTS__;if(n)for(const t of["admin","voyant","client"]){const s=n[t],r=x.users.find(a=>a.demoRole===t);if(!s||!r)continue;const i=x.users.find(a=>a.email===s.email.toLowerCase()&&a!==r);i&&(i.email=`archive-${i.id}@luna.test`),r.email=s.email.toLowerCase(),r.passwordHash=await Rs(s.password)}z()},async signup(e){if(!e.adult)return"La déclaration de majorité est obligatoire.";if(!e.cgu)return"Les conditions d’utilisation doivent être acceptées.";if(e.password.length<12)return"Le mot de passe doit contenir au moins 12 caractères.";if(hf(e.birthDate)<18)return U(null,"signup.blocked_minor","Tentative refusée, date non conservée"),z(),"Luna est réservé aux personnes majeures. Le compte n’a pas été créé.";const n=e.email.trim().toLowerCase();if(x.users.some(s=>s.email===n))return"Un compte existe déjà avec cet e-mail.";const t={id:V("usr"),email:n,passwordHash:await Rs(e.password),role:"client",firstName:un(e.firstName,80),lastName:un(e.lastName,80),pseudonym:un(e.firstName,40),birthDate:e.birthDate,phone:"",dailyCapCents:Zs,monthlyCapCents:er,pendingCap:null,selfExclusionUntil:null,referralCode:`LUNA${Math.random().toString(36).slice(2,7).toUpperCase()}`,promoUsed:!1,lunaPlus:null,createdAt:new Date().toISOString(),lastActivityAt:new Date().toISOString(),closed:!1};x.users.push(t),x.balances[t.id]=0,x.currentUserId=t.id,await zn(t.id,"age_18_declaration","granted","signup","age"),await zn(t.id,"cgu_acceptance","granted","signup","cgu");for(const[s,r]of Object.entries(e.marketing))await zn(t.id,s,r?"granted":"refused","signup",s);return U(t.id,"auth.login_success","Inscription"),z(),null},async login(e,n){const t=x.users.find(s=>s.email===e.trim().toLowerCase()&&!s.closed);return!t||t.passwordHash!==await Rs(n)?(U(null,"auth.login_failed",e),z(),"E-mail ou mot de passe incorrect."):t.role==="admin"?(x.pendingOtp={userId:t.id,code:"424242"},z(),"otp"):(x.currentUserId=t.id,t.lastActivityAt=new Date().toISOString(),U(t.id,"auth.login_success",t.role),z(),"ok")},verifyOtp(e){return!x.pendingOtp||x.pendingOtp.code!==e.trim()?"Code incorrect.":(x.currentUserId=x.pendingOtp.userId,x.pendingOtp=null,U(x.currentUserId,"auth.mfa_enrolled","Code démo accepté"),z(),null)},logout(){U(x.currentUserId,"auth.session_revoked","Déconnexion"),x.currentUserId=null,z()},async forgot(e){const n=x.users.find(s=>s.email===e.trim().toLowerCase()),t=V("rst");return n&&x.resetTokens.push({token:t,userId:n.id}),U((n==null?void 0:n.id)??null,"auth.password_reset","Demande"),z(),t},async reset(e,n){const t=x.resetTokens.find(r=>r.token===e);if(!t)return"Lien invalide.";if(n.length<12)return"12 caractères minimum.";const s=x.users.find(r=>r.id===t.userId);return s?(s.passwordHash=await Rs(n),x.resetTokens=x.resetTokens.filter(r=>r.token!==e),z(),null):"Compte introuvable."},async setConsent(e,n,t,s="settings"){const r=this.user();r&&(await zn(r.id,e,n?"granted":"withdrawn",s,t),e==="sensitive_data_art9"&&!n&&x.sessions.forEach(i=>{i.clientId===r.id&&i.status==="active"&&(i.status="ended")}),z())},async purchase(e){const n=this.user();if(!n)return"Connectez-vous pour payer.";if(_s(n))return"Votre pause est en cours : aucune recharge n’est possible.";if(!e.cgu)return"Cochez l’acceptation des conditions de vente.";const t=Wm(e.packId);if(!t)return"Pack inconnu.";const s=Zm(e.number);if(s==="decline")return"La carte a été refusée (carte de test de refus).";if(s!=="ok")return"En mode démonstration, seule la carte de test 4242 4242 4242 4242 est acceptée.";if(!ef(e.expiry)||!/^\d{3,4}$/.test(e.cvc.trim())||e.name.trim().length<2)return"Vérifiez la date d’expiration, le cryptogramme et le nom.";const r=Km(e.promo,n.promoUsed);if(r.error==="CODE_INCONNU")return"Code inconnu.";if(r.error==="CODE_DEJA_UTILISE")return"Code déjà utilisé.";const i=new Date,a=Ms({balanceCents:1e9,amountCents:t.payCents,spentTodayCents:ln(n.id,"day",i),spentMonthCents:ln(n.id,"month",i),dailyLimitCents:n.dailyCapCents,monthlyLimitCents:n.monthlyCapCents,pausedUntil:n.selfExclusionUntil==="definitive"?"2999-01-01":n.selfExclusionUntil,now:i});if(!a.ok&&a.reason!=="FUNDS")return"Cette recharge dépasse le plafond que vous vous êtes fixé. Aucune proposition d’augmentation n’est faite ici.";const u=t.creditCents+r.bonusCents,l={id:V("pay"),userId:n.id,packId:t.id,paidCents:t.payCents,grantedCents:u,consumedCents:0,refundedCents:0,status:"succeeded",stripePaymentIntentId:`pi_demo_${V("x")}`,last4:"4242",usableAt:e.waiver?i.toISOString():new Date(i.getTime()+14*864e5).toISOString(),createdAt:i.toISOString(),email:n.email};x.payments.push(l),Dn(n.id,t.payCents,"pack_purchase",l.id),u>t.payCents&&Dn(n.id,u-t.payCents,"pack_bonus",l.id),x.invoices.push({id:V("inv"),number:`LUN-2026-${String(x.invoices.length+1).padStart(4,"0")}`,paymentId:l.id,userId:n.id,at:i.toISOString()}),x.disputes.push({id:V("dsp"),paymentId:l.id,userId:n.id,email:n.email,reason:"Paiement capturé — remboursement possible",status:"ouverte",at:i.toISOString()}),r.bonusCents&&(n.promoUsed=!0),e.saveCard&&(x.savedCard[n.id]={last4:"4242",exp:e.expiry,setupIntentId:`seti_demo_${V("s")}`}),await zn(n.id,"cgv_acceptance","granted","checkout","cgv"),await zn(n.id,"withdrawal_waiver",e.waiver?"granted":"refused","checkout","waiver"),x.outbox.push({id:V("mail"),channel:"email",to:n.email,body:`Confirmation de commande ${l.stripePaymentIntentId}. Exécution immédiate : ${e.waiver?"oui":"non"}.`,at:i.toISOString()}),U(n.id,"wallet.topup",l.id);const c=Eu(t.payCents,x.commissionBps);return U(n.id,"payout.created",`Commission plateforme ${c.platformCents} c, guide ${c.voyantCents} c (Connect simulé)`),z(),null},refund(e){const n=this.user();if(!n||n.role!=="admin")return"Réservé à l’administration.";const t=x.payments.find(i=>i.id===e);if(!t||t.status==="refunded")return"Paiement introuvable.";const s=nf({paidCents:t.paidCents,grantedCents:t.grantedCents,consumedCents:t.consumedCents,alreadyRefundedCents:t.refundedCents,walletBalanceCents:x.balances[t.userId]??0});if(s.refundCents<=0)return"Rien à rembourser.";Dn(t.userId,-s.walletDebitCents,"refund_clawback",t.id),t.refundedCents+=s.refundCents,t.status="refunded";const r=x.disputes.find(i=>i.paymentId===t.id);return r&&(r.status="remboursee"),U(n.id,"wallet.refund",`${t.id} ${s.refundCents}`),z(),null},async startSession(e,n){const t=this.user(),s=en.find(f=>f.slug===e);if(!t||!s)return"Connexion requise.";if(t.role!=="client")return"Utilisez un compte client pour consulter.";if(_s(t))return"Votre pause est en cours.";if(!Xs(xi(t.id),"sensitive_data_art9"))return"CONSENT";const r=n==="call"?s.demoCallCents:n==="video"?s.demoVideoCents:s.demoChatCents,i=new Date,a=Ms({balanceCents:cn(t.id,i),amountCents:r,spentTodayCents:ln(t.id,"day",i),spentMonthCents:ln(t.id,"month",i),dailyLimitCents:t.dailyCapCents,monthlyLimitCents:t.monthlyCapCents,pausedUntil:t.selfExclusionUntil,now:i});if(!a.ok)return a.reason==="FUNDS"?"Crédit utilisable insuffisant pour une minute.":"Plafond atteint. La séance ne démarre pas.";const u={id:V("ses"),clientId:t.id,voyantSlug:e,channel:n,rateCentsPerMin:r,startedAt:i.toISOString(),billedMinutes:0,status:"active",recordingConsent:!1,videoRecorded:!1,guideKind:s.kind,distressPaused:!1,confirmPending:!1,billingHold:!1,twilioCallSid:n==="call"?`CA${V("twilio")}`:void 0,dailyRoom:n==="video"?`luna-${e}-${V("room")}`:void 0,aiDisclosureAt:s.kind==="ai"?i.toISOString():void 0},l=wu({balanceCents:cn(t.id,i),rateCentsPerMin:r,elapsedMs:0,billedMinutes:0});Dn(t.id,-l.chargedCents,"session_charge",u.id),qi(t.id,l.chargedCents),u.billedMinutes=l.billedMinutes,x.sessions.push(u);const c=s.kind==="ai"?ff:vf(s.name);return x.messages.push({id:V("msg"),sessionId:u.id,sender:"system",body:c,at:i.toISOString(),locked:!0}),U(t.id,"wallet.debit_session",u.id),z(),u.id},tick(e,n=Date.now()){const t=x.sessions.find(c=>c.id===e);if(!t||t.status!=="active")return;if(t.distressPaused||t.billingHold||t.confirmPending){t.confirmPending&&t.confirmAskedAt&&n-new Date(t.confirmAskedAt).getTime()>6e4&&(t.status="ended_time",t.endedAt=new Date(n).toISOString(),U(t.clientId,"session.time_alert_shown","Fin sans confirmation"),z());return}const s=n-new Date(t.startedAt).getTime(),r=Math.floor(s/6e4),i=df(r);if(i==="hard_stop"){t.status="ended_time",t.endedAt=new Date(n).toISOString(),z();return}if(i==="confirm"&&(t.confirmedThrough??-1)<r){t.confirmPending=!0,t.confirmAskedAt=new Date(n).toISOString(),t.billingHold=!0,U(t.clientId,"session.time_alert_shown",`${r} min`),z();return}const a=t.billedMinutes,u=wu({balanceCents:cn(t.clientId),rateCentsPerMin:t.rateCentsPerMin,elapsedMs:s,billedMinutes:t.billedMinutes}),l=x.users.find(c=>c.id===t.clientId);if(u.chargedCents>0){const c=Ms({balanceCents:cn(t.clientId),amountCents:u.chargedCents,spentTodayCents:ln(t.clientId,"day"),spentMonthCents:ln(t.clientId,"month"),dailyLimitCents:l.dailyCapCents,monthlyLimitCents:l.monthlyCapCents,pausedUntil:l.selfExclusionUntil,now:new Date(n)});if(!c.ok){t.status=c.reason==="FUNDS"?"ended_no_credit":"ended_cap",t.endedAt=new Date(n).toISOString(),c.reason!=="FUNDS"&&(x.capHitAt[t.clientId]=new Date(n).toISOString()),U(t.clientId,"limit.reached",t.status),z();return}Dn(t.clientId,-u.chargedCents,"session_charge",t.id),qi(t.clientId,u.chargedCents),t.billedMinutes=u.billedMinutes}u.status==="stopped_no_credit"&&u.billedMinutes===a&&(t.status="ended_no_credit",t.endedAt=new Date(n).toISOString()),(t.billedMinutes!==a||t.status!=="active")&&z()},continueSession(e){const n=x.sessions.find(t=>t.id===e);n&&(n.confirmPending=!1,n.billingHold=!1,n.confirmedThrough=Math.floor((Date.now()-new Date(n.startedAt).getTime())/6e4)+14,U(n.clientId,"session.continue_confirmed",e),z())},endSession(e){const n=x.sessions.find(r=>r.id===e);if(!n||n.status!=="active")return;n.status="ended",n.endedAt=new Date().toISOString();const t=n.billedMinutes*n.rateCentsPerMin,s=Eu(t,x.commissionBps);U(n.clientId,"payout.created",`tr_demo séance ${s.voyantCents}/${s.platformCents}`),z()},sendMessage(e,n){const t=x.sessions.find(u=>u.id===e),s=this.user();if(!t||!s||t.status!=="active")return;const r=pf(un(n,2e3));x.messages.push({id:V("msg"),sessionId:e,sender:"client",body:r.text,at:new Date().toISOString()}),r.redacted&&U(s.id,"chat.contact_info_redacted",e);const i=of(n);if(i.detected){t.distressPaused=!0,t.billingHold=!0,t.billedMinutes>0&&(Dn(t.clientId,t.rateCentsPerMin,"distress_reversal",t.id),t.billedMinutes-=1),x.distressSignals.push({id:V("dst"),userId:s.id,category:i.category??"suicide",at:new Date().toISOString()}),x.messages.push({id:V("msg"),sessionId:e,sender:"system",locked:!0,at:new Date().toISOString(),body:"Vous n’êtes pas seul(e). Si vous pensez au suicide ou si vous êtes en danger, appelez le 3114 (gratuit, 24 h/24), le 15 ou le 112, ou le 3919. Luna n’est pas un service d’urgence. La facturation de cette séance est suspendue."}),U(s.id,"distress.detected",i.category??""),U(s.id,"distress.billing_paused",e),z();return}const a=en.find(u=>u.slug===t.voyantSlug);if((a==null?void 0:a.kind)==="ai"){const u=af(n)?{text:uf,blocked:!1}:cf("Cette carte évoque un temps pour poser la question autrement, sans rien prédire. Qu’est-ce qui vous semble le plus juste, là, maintenant ?");u.blocked&&U(s.id,"ai.output_blocked",e),x.messages.push({id:V("msg"),sessionId:e,sender:"voyant",body:u.text,at:new Date().toISOString()})}else x.messages.push({id:V("msg"),sessionId:e,sender:"voyant",body:"Réponse simulée du guide fictif. Je peux seulement vous aider à formuler la question, sans prédire ce qui arrivera.",at:new Date().toISOString()});z()},setRecording(e,n){const t=x.sessions.find(s=>s.id===e);!t||t.channel==="video"||(t.recordingConsent=n,t.videoRecorded=!1,n?t.recordingPurgeAfter=new Date(Date.now()+30*864e5).toISOString():t.recordingPurgeAfter=void 0,z())},book(e,n){const t=this.user(),s=en.find(a=>a.slug===e);if(!t||!s)return"Connexion requise.";if(!Xs(xi(t.id),"sensitive_data_art9"))return"CONSENT";if(_s(t))return"Pause en cours.";const r=s.demoVideoCents*10;return cn(t.id)<r?"Crédit utilisable insuffisant. Le paiement se fait avant la consultation.":Ms({balanceCents:cn(t.id),amountCents:r,spentTodayCents:ln(t.id,"day"),spentMonthCents:ln(t.id,"month"),dailyLimitCents:t.dailyCapCents,monthlyLimitCents:t.monthlyCapCents,pausedUntil:t.selfExclusionUntil,now:new Date}).ok?(Dn(t.id,-r,"session_charge",e),qi(t.id,r),x.bookings.push({id:V("bk"),clientId:t.id,voyantSlug:e,start:n,durationMin:10,priceCents:r,status:"confirmed",dailyRoom:`luna-${e}-${V("daily")}`,at:new Date().toISOString()}),U(t.id,"wallet.debit_session","visio prépayée"),z(),null):"Plafond ou crédit insuffisant."},report(e,n){const t=this.user();t&&(x.reports.push({id:V("rpt"),userId:t.id,target:e,reason:un(n,500),at:new Date().toISOString()}),z())},setCap(e,n){const t=this.user();return t?e<0||n<0||e>15e3||n>5e4?"Montant hors plage.":e<=t.dailyCapCents&&n<=t.monthlyCapCents?(t.dailyCapCents=e,t.monthlyCapCents=n,t.pendingCap=null,U(t.id,"limit.changed","Baisse immédiate"),z(),null):(t.pendingCap={daily:e,monthly:n,at:new Date(Date.now()+72*36e5).toISOString()},U(t.id,"limit.changed","Hausse différée de 72 h"),z(),null):"Connexion requise."},exclude(e){const n=this.user();n&&(n.selfExclusionUntil=e,U(n.id,"self_exclusion.started",e),z())},toggleFavorite(e){const n=this.user();if(!n)return;const t=x.favorites.find(s=>s.userId===n.id&&s.slug===e);x.favorites=t?x.favorites.filter(s=>s!==t):[...x.favorites,{userId:n.id,slug:e}],z()},setPresence(e,n){const t=this.user();if(!(!t||t.role==="voyant"&&t.voyantSlug!==e)){if(x.presence[e]=n,n)for(const s of x.favorites.filter(r=>r.slug===e))x.notifications.push({id:V("ntf"),userId:s.userId,title:"Présence simulée",body:"Un guide favori a changé sa disponibilité simulée.",read:!1,at:new Date().toISOString()});z()}},subscribeNews(e,n){return n?(x.subscribers.push({email:e.trim().toLowerCase(),active:!0}),z(),null):"Cochez l’accord pour recevoir les e-mails de Luna."},unsubscribe(e){const n=e.trim().toLowerCase();x.subscribers.forEach(s=>{s.email===n&&(s.active=!1)}),x.opposition.includes(n)||x.opposition.push(n);const t=x.users.find(s=>s.email===n);t?zn(t.id,"marketing_email","withdrawn","email_link","stop").then(()=>z()):z()},sendCampaign(){const e=new Date;let n=0;for(const t of x.subscribers.filter(s=>s.active)){const s=x.users.find(u=>u.email===t.email),r=s?x.distressSignals.some(u=>u.userId===s.id&&e.getTime()-new Date(u.at).getTime()<30*864e5):!1,i=s?!!(x.capHitAt[s.id]&&e.getTime()-new Date(x.capHitAt[s.id]).getTime()<7*864e5):!1;Hm({consentGranted:s?Xs(xi(s.id),"marketing_email"):!0,opposition:x.opposition.includes(t.email),selfExcluded:s?_s(s):!1,distressWithin30Days:r,capReachedWithin7Days:i,now:e}).ok&&(x.outbox.push({id:V("out"),channel:"email",to:t.email,body:"Offre de Luna ([RAISON SOCIALE]). Se désinscrire.",at:e.toISOString()}),n+=1)}return z(),`${n} message(s) simulé(s). Aucun envoi réel.`},apply(e){return e.country.trim()?(x.applications.push({id:V("app"),name:un(e.name,80),email:e.email.trim().toLowerCase(),practice:un(e.practice,500),status:"pending",country:un(e.country,80),at:new Date().toISOString()}),z(),null):"Le pays d’établissement est obligatoire."},decideApplication(e,n){const t=this.user(),s=x.applications.find(r=>r.id===e);if(!(!t||t.role!=="admin"||!s)){if(!/ue|eee|france|belgique|allemagne|espagne|italie|portugal|pays-bas|irlande/i.test(s.country)&&n==="approved"){U(t.id,"guide.suspended","Transfert hors UE sans garantie"),z();return}s.status=n,U(t.id,n==="approved"?"guide.activated":"guide.suspended",e),z()}},openSupport(e,n,t){const s=this.user();if(!s||s.role!=="admin")return"Réservé à l’administration.";const r=x.sessions.find(l=>l.id===e);if(!r)return"Séance introuvable.";const i=new Date(Date.now()+4*36e5).toISOString(),a={ticketId:n,reason:t,expiresAt:i};if(!Fm({id:s.id},r.clientId,r.voyantSlug,a,new Date))return"Ticket et motif d’au moins 20 caractères requis.";x.supportGrants.push({id:V("grt"),actorId:s.id,sessionId:e,ticketId:n,reason:t,expiresAt:i}),U(s.id,"support.conversation_access",`${n} ${e}`);const u=x.users.find(l=>l.id===r.clientId);return u&&x.notifications.push({id:V("ntf"),userId:u.id,title:"Accès du support",body:`Un membre du support a consulté votre conversation dans le cadre de votre demande ${n}.`,read:!1,at:new Date().toISOString()}),z(),null},requestData(e){const n=this.user();n&&(x.dataRequests.push({id:V("dsr"),userId:n.id,type:e,status:"recue",at:new Date().toISOString()}),U(n.id,"dsr.request_received",e),z())},resolveData(e){const n=this.user(),t=x.dataRequests.find(s=>s.id===e);if(!(!n||n.role!=="admin"||!t)){if(t.status="traitee",t.type==="delete"){const s=x.users.find(r=>r.id===t.userId);s&&(s.closed=!0,s.email=`deleted-${s.id}@anonymise.luna`,s.firstName="Anonyme",s.phone="",s.birthDate=null,x.messages=x.messages.filter(r=>!x.sessions.some(i=>i.id===r.sessionId&&i.clientId===s.id))),U(n.id,"user.anonymized",t.userId)}U(n.id,"dsr.completed",e),z()}},runPurge(e=new Date){var s;const n=[...x.messages.map(r=>({id:r.id,category:"message",at:r.at})),...x.sessions.filter(r=>r.recordingConsent).map(r=>({id:r.id,category:"recording",at:r.recordingPurgeAfter?new Date(new Date(r.recordingPurgeAfter).getTime()-26784e5).toISOString():r.startedAt})),...x.users.map(r=>({id:r.id,category:"account",at:r.lastActivityAt,inactive:new Date(r.lastActivityAt).getTime()<e.getTime()-63072e6})),...x.audit.map(r=>({id:r.id,category:"audit",at:r.at})),...x.subscribers.map(r=>({id:r.email,category:"prospect",at:e.toISOString()})),...x.invoices.map(r=>({id:r.id,category:"accounting",at:r.at,archived:!1}))],t=tf(n,{messagesDays:365,recordingsDays:30,serverLogsDays:365,inactiveAccountDays:730,auditLogDays:365,prospectsDays:1095,accountingArchiveDays:3650},e);return x.messages=x.messages.filter(r=>!t.removed.includes(r.id)),x.purgeRuns.push({at:e.toISOString(),removed:t.removed.length,archived:t.archived.length}),U(((s=this.user())==null?void 0:s.id)??null,"retention.purged",`${t.removed.length} supprimés, ${t.archived.length} archivés`),z(),{removed:t.removed.length,archived:t.archived.length}},exportJson(){const e=this.user();return e?(U(e.id,"export.generated",e.id),z(),JSON.stringify({profil:{pseudonym:e.pseudonym,email:e.email,plafonds:{jour:e.dailyCapCents,mois:e.monthlyCapCents}},consentements:yf(e.id),portefeuille:x.ledger.filter(n=>n.userId===e.id)},null,2)):"{}"},clientForVoyant(e){const n=x.users.find(t=>t.id===e);return n?{pseudonym:n.pseudonym}:null},remaining(e,n){return $m({startedAtMs:new Date(e.startedAt).getTime(),billedMinutes:e.billedMinutes,balanceCents:cn(e.clientId),rateCentsPerMin:e.rateCentsPerMin,nowMs:n})}},Jc=P.createContext(null);function xf({children:e}){const[n,t]=P.useState(()=>({path:As(window.location.pathname),search:window.location.search}));P.useEffect(()=>{const r=()=>t({path:As(window.location.pathname),search:window.location.search});return window.addEventListener("popstate",r),()=>window.removeEventListener("popstate",r)},[]);const s=r=>{const i=As(window.location.pathname),a=r.startsWith("/")?ma(i,r):r,u=new URL(a,window.location.href);window.history.pushState({},"",`${u.pathname}${u.search}${u.hash}`),t({path:As(u.pathname),search:u.search}),window.scrollTo(0,0)};return o.jsx(Jc.Provider,{value:{path:n.path,search:new URLSearchParams(n.search),go:s},children:e})}function ke(){const e=P.useContext(Jc);if(!e)throw new Error("route");return e}function E({to:e,className:n,children:t,testId:s}){const r=ke(),i=ma(r.path,e);return o.jsx("a",{className:n,href:i,"data-testid":s,onClick:a=>{a.metaKey||a.ctrlKey||a.shiftKey||a.altKey||a.button!==0||(a.preventDefault(),r.go(e))},children:t})}const fa="luna.v2.cookies";function Us(){try{const e=JSON.parse(localStorage.getItem(fa)||"null");return!e||Date.now()-e.at>182*864e5?null:e}catch{return null}}function Ci(e){localStorage.setItem(fa,JSON.stringify({necessary:!0,...e,at:Date.now()}))}function qf({children:e}){const{path:n,go:t}=ke(),[,s]=P.useState(0),[r,i]=P.useState(!1),[a,u]=P.useState(Us),[l,c]=P.useState(!1),[f,g]=P.useState(!1),[v,y]=P.useState(!1);P.useEffect(()=>S.subscribe(()=>s(D=>D+1)),[]),P.useEffect(()=>i(!1),[n]);const C=S.user();P.useEffect(()=>{var p;const D=Hc.get(n)??pa().find(d=>d.path===n);D&&(document.title=D.title.includes("Luna")?D.title:`${D.title} · Luna`,(p=document.querySelector('meta[name="description"]'))==null||p.setAttribute("content",D.description))},[n]);const L=Wc(n,"kvoyc.jpg");return o.jsxs(o.Fragment,{children:[o.jsx("a",{className:"skip",href:"#contenu",children:"Aller au contenu"}),o.jsxs("div",{className:"topbar",children:[o.jsx("div",{className:"proto","data-testid":"prototype-banner",children:"Prototype – données et voyants fictifs, paiements simulés"}),!a&&o.jsxs("div",{className:"cookies",role:"dialog","aria-label":"Cookies",children:[o.jsx("p",{children:"Nous utilisons des cookies nécessaires au fonctionnement du site (connexion, sécurité, paiement). Avec votre accord, nous utilisons aussi des cookies pour mesurer l’audience de manière plus détaillée. Vous pouvez changer d’avis à tout moment via « Gérer mes cookies » en bas de chaque page."}),o.jsxs("div",{className:"btn-row",children:[o.jsx("button",{className:"btn btn-ghost",type:"button","data-testid":"cookie-reject",onClick:()=>{Ci({audience:!1,ads:!1}),u(Us())},children:"Tout refuser"}),o.jsx("button",{className:"btn btn-ghost",type:"button","data-testid":"cookie-accept",onClick:()=>{Ci({audience:!0,ads:!1}),u(Us())},children:"Tout accepter"}),o.jsx("button",{className:"btn btn-ghost",type:"button",onClick:()=>c(D=>!D),children:"Personnaliser"})]}),l&&o.jsxs("div",{children:[o.jsxs("label",{className:"check",children:[o.jsx("input",{type:"checkbox",checked:!0,disabled:!0})," Nécessaires, toujours actifs"]}),o.jsxs("label",{className:"check",children:[o.jsx("input",{type:"checkbox",checked:f,onChange:D=>g(D.target.checked)})," Mesure d’audience avancée"]}),o.jsxs("label",{className:"check",children:[o.jsx("input",{type:"checkbox",checked:v,onChange:D=>y(D.target.checked)})," Publicité, jamais sur les pages de consultation"]}),o.jsx("button",{className:"btn btn-gold",type:"button",onClick:()=>{Ci({audience:f,ads:v}),u(Us())},children:"Enregistrer"})]})]}),o.jsxs("header",{className:"header",children:[o.jsxs(E,{to:"/",className:"brand",children:[o.jsx("img",{src:L,width:42,height:42,alt:"Emblème Luna, croissant de lune"}),"Luna"]}),o.jsxs("nav",{className:"nav","aria-label":"Navigation principale",children:[o.jsx(E,{to:"/voyants/",children:"Guides"}),o.jsx(E,{to:"/specialites/",children:"Pratiques"}),o.jsx(E,{to:"/horoscope/",children:"Horoscope"}),o.jsx(E,{to:"/tarifs/",children:"Tarifs"}),o.jsx(E,{to:"/blog/",children:"Magazine"}),C?o.jsx(E,{to:C.role==="admin"?"/admin/":C.role==="voyant"?"/espace-voyant/":"/compte/",children:"Mon compte"}):o.jsx(E,{to:"/connexion/",children:"Connexion"}),C&&o.jsx("button",{type:"button",className:"btn btn-ghost","data-testid":"logout",onClick:()=>{S.logout(),t("/connexion/")},children:"Sortir"})]}),o.jsx("button",{className:"nav-toggle",type:"button","aria-expanded":r,onClick:()=>i(D=>!D),children:"Menu"})]}),r&&o.jsxs("div",{className:"menu-panel",children:[o.jsx(E,{to:"/voyants/",children:"Guides"}),o.jsx(E,{to:"/tarifs/",children:"Tarifs"}),o.jsx(E,{to:"/compte/pause/",children:"Faire une pause"}),o.jsx(E,{to:"/connexion/",children:"Connexion"})]})]}),o.jsx("main",{id:"contenu",children:e}),o.jsx("footer",{className:"footer",children:o.jsxs("div",{className:"wrap",children:[o.jsxs("div",{children:[o.jsx("strong",{children:"Luna"}),o.jsx("p",{children:Gc}),o.jsxs("p",{children:["Détresse : ",o.jsx("a",{href:"tel:3114",children:"3114"}),", urgences ",o.jsx("a",{href:"tel:15",children:"15"})," ou ",o.jsx("a",{href:"tel:112",children:"112"}),", violences ",o.jsx("a",{href:"tel:3919",children:"3919"}),"."]})]}),o.jsxs("div",{children:[o.jsx(E,{to:"/comment-ca-marche/",children:"Comment ça marche"}),o.jsx("br",{}),o.jsx(E,{to:"/offre-bienvenue/",children:"Offre de bienvenue"}),o.jsx("br",{}),o.jsx(E,{to:"/parrainage/",children:"Parrainage"}),o.jsx("br",{}),o.jsx(E,{to:"/devenir-voyant/",children:"Devenir guide"}),o.jsx("br",{}),o.jsx(E,{to:"/faq/",children:"FAQ"}),o.jsx("br",{}),o.jsx(E,{to:"/plan-du-site/",children:"Plan du site"})]}),o.jsxs("div",{children:[o.jsx(E,{to:"/mentions-legales/",children:"Mentions légales"}),o.jsx("br",{}),o.jsx(E,{to:"/cgu/",children:"CGU"}),o.jsx("br",{}),o.jsx(E,{to:"/cgv/",children:"CGV"}),o.jsx("br",{}),o.jsx(E,{to:"/confidentialite/",children:"Confidentialité"}),o.jsx("br",{}),o.jsx(E,{to:"/cookies/",children:"Cookies"}),o.jsx("br",{}),o.jsx("button",{className:"btn-ghost",type:"button",onClick:()=>{localStorage.removeItem(fa),u(null)},children:"Gérer mes cookies"})]})]})})]})}function pe(e){return new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(e/100)}function Nu(e){const n=Math.max(0,Math.floor(e)),t=Math.floor(n/60),s=n%60;return`${String(t).padStart(2,"0")}:${String(s).padStart(2,"0")}`}function Cf(e,n){return n||e.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")}function Kn(e,n,t){const s=[],r=/\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`/g;let i=0,a,u=0;for(;a=r.exec(e);){if(a.index>i&&s.push(e.slice(i,a.index)),a[1]&&a[2]){const l=a[2],c=l.startsWith("/")?ma(n,l.endsWith("/")||l.includes("#")||l.includes("?")?l:`${l}/`):l;s.push(o.jsx(Sf,{href:c,children:a[1]},`${t}-${u}`))}else a[3]?s.push(o.jsx("strong",{children:a[3]},`${t}-${u}`)):s.push(o.jsx("code",{children:a[4]},`${t}-${u}`));i=a.index+a[0].length,u+=1}return i<e.length&&s.push(e.slice(i)),s}function Sf({href:e,children:n}){const t=ke();return e.startsWith("http")||e.startsWith("mailto:")||e.startsWith("tel:")||e.startsWith("#")?o.jsx("a",{href:e,children:n}):o.jsx("a",{href:e,onClick:s=>{s.metaKey||s.ctrlKey||s.button!==0||(s.preventDefault(),t.go(e))},children:n})}function Lf({source:e}){const{path:n}=ke(),t=e.replace(/\r\n/g,`
`).split(`
`),s=[];let r=0,i=0;const a=()=>`b${i++}`;for(;r<t.length;){const u=t[r];if(!u.trim()){r+=1;continue}if(u.startsWith("|")){const f=[];for(;r<t.length&&t[r].startsWith("|");)/^\|\s*-+/.test(t[r])||f.push(t[r].split("|").slice(1,-1).map(g=>g.trim())),r+=1;s.push(o.jsx("div",{className:"table-wrap",children:o.jsx("table",{children:o.jsx("tbody",{children:f.map((g,v)=>o.jsx("tr",{children:g.map((y,C)=>v===0?o.jsx("th",{children:Kn(y,n,`${v}-${C}`)},C):o.jsx("td",{children:Kn(y,n,`${v}-${C}`)},C))},v))})})},a()));continue}if(/^---+$/.test(u.trim())){s.push(o.jsx("hr",{},a())),r+=1;continue}const l=/^(#{1,3})\s+(.+)$/.exec(u);if(l){const f=l[1].length,g=/\{#([a-z0-9-]+)\}/.exec(l[2]),v=l[2].replace(/\s*\{#[^}]+\}\s*/,""),y=Cf(v,g==null?void 0:g[1]),C=f===1?"h1":f===2?"h2":"h3";s.push(o.jsx(C,{id:y,children:Kn(v,n,y)},a())),r+=1;continue}if(u.startsWith(">")){const f=[];for(;r<t.length&&t[r].startsWith(">");)f.push(t[r].replace(/^>\s?/,"")),r+=1;s.push(o.jsx("blockquote",{className:"panel",children:f.map((g,v)=>g.trim()?o.jsx("p",{children:Kn(g,n,`q${v}`)},v):null)},a()));continue}if(/^\s*[-*]\s+/.test(u)){const f=[];for(;r<t.length&&/^\s*[-*]\s+/.test(t[r]);)f.push(t[r].replace(/^\s*[-*]\s+/,"")),r+=1;s.push(o.jsx("ul",{children:f.map((g,v)=>o.jsx("li",{children:Kn(g,n,`li${v}`)},v))},a()));continue}const c=[u];for(r+=1;r<t.length&&t[r].trim()&&!/^(#{1,3}\s|>\s?|\|\s*|---|\s*[-*]\s+)/.test(t[r]);)c.push(t[r]),r+=1;s.push(o.jsx("p",{children:Kn(c.join(" "),n,`p${i}`)},a()))}return o.jsx("div",{className:"prose",children:s.map((u,l)=>o.jsx(P.Fragment,{children:u},l))})}function Xc({onDone:e}){const[n,t]=P.useState(!1);return o.jsx("div",{className:"gate",role:"dialog","aria-modal":"true","aria-labelledby":"art9-title","data-testid":"sensitive-consent-screen",children:o.jsxs("div",{className:"panel",children:[o.jsx("h2",{id:"art9-title",children:"Avant votre première consultation"}),zm.split(`

`).map(s=>o.jsx("p",{children:s},s.slice(0,24))),o.jsxs("label",{className:"check",children:[o.jsx("input",{"data-testid":"sensitive-consent",type:"checkbox",checked:n,onChange:s=>t(s.target.checked)})," ",o.jsx("span",{children:da})]}),o.jsxs("div",{className:"btn-row",children:[o.jsx("button",{className:"btn btn-ghost",type:"button","data-testid":"sensitive-consent-refuse",onClick:()=>e(!1),children:"Je refuse"}),o.jsx("button",{className:"btn btn-gold",type:"button","data-testid":"sensitive-consent-accept",disabled:!n,onClick:()=>e(!0),children:"Je donne mon accord"})]})]})})}function Zc(){const e=S.user();if(!e)return!1;const n=S.state.consents.filter(t=>t.userId===e.id).map(t=>({purpose:t.purpose,granted:t.action==="granted",at:t.at}));return!Xs(n,"sensitive_data_art9")}function ed({guide:e,from:n}){return e.photo?o.jsx("img",{className:"avatar",src:Wc(n,e.photo),alt:`Illustration fictive de ${e.name}`,width:84,height:84}):o.jsxs("svg",{className:"avatar-svg",viewBox:"0 0 84 84",role:"img","aria-label":`Illustration fictive de ${e.name}`,children:[o.jsx("circle",{cx:"42",cy:"42",r:"40",fill:`hsl(${e.hue} 28% 18%)`}),o.jsx("circle",{cx:"42",cy:"34",r:"14",fill:"#f4e2bc"}),o.jsx("path",{d:"M16 72c6-14 16-20 26-20s20 6 26 20",fill:"#e4c48a"})]})}function jf({page:e}){const n=e.slug.startsWith("voyants/")?Fr(e.slug.slice(8)):void 0,{path:t}=ke(),s=n?S.state.presence[n.slug]:!1;return o.jsxs("article",{className:"wrap",children:[n&&o.jsx("header",{className:"panel",style:{marginBottom:"1rem"},children:o.jsxs("div",{className:"btn-row",children:[o.jsx(ed,{guide:n,from:t}),o.jsxs("div",{children:[o.jsx("p",{className:"pill",children:"Profil fictif — contenu de démonstration"}),n.kind==="ai"?o.jsxs(o.Fragment,{children:[o.jsx("p",{className:"pill pill-ai",children:"IA"}),o.jsx("p",{className:"banner-ai",children:"Guide virtuel : intelligence artificielle"})]}):o.jsx("p",{className:"pill pill-human",children:"Guide humain"}),o.jsx("p",{children:n.kind==="ai"?"Disponible maintenant, 24 h/24.":s?"Disponibilité simulée : marqué en ligne dans la démo. Ce profil n’est pas un guide réel.":"Disponibilité simulée : hors ligne. Ce profil fictif n’est pas proposé comme disponible au lancement."}),o.jsxs(E,{className:"btn btn-gold",to:`/voyants/${n.slug}/consulter/`,children:["Consulter ",n.name]})]})]})}),o.jsx(Lf,{source:e.body})]})}function nd(){const{go:e}=ke();return o.jsx("div",{className:"grid cards",children:br.map(n=>o.jsxs("article",{className:"card",children:[o.jsx("h2",{children:n.name}),o.jsxs("p",{children:["Vous payez ",pe(n.payCents),". Vous recevez ",pe(n.creditCents)," de crédits. Le bonus n’est pas remboursable en argent."]}),o.jsxs("button",{className:"btn btn-gold",type:"button","data-testid":n.id==="p20"?"pack-20":n.id==="p50"?"pack-50":"pack-100",onClick:()=>e(`/compte/paiement/?pack=${n.id}`),children:["Choisir ",pe(n.payCents)]})]},n.id))})}function bf(){const{go:e}=ke(),[n,t]=P.useState(null),[s,r]=P.useState({marketing_email:!1,marketing_sms:!1,marketing_whatsapp:!1,marketing_push:!1});async function i(a){a.preventDefault();const u=new FormData(a.currentTarget),l=await S.signup({firstName:String(u.get("firstName")||""),lastName:String(u.get("lastName")||""),email:String(u.get("email")||""),password:String(u.get("password")||""),birthDate:String(u.get("birthDate")||""),adult:u.get("adult")==="on",cgu:u.get("cgu")==="on",marketing:s});l?t(l):e("/compte/")}return o.jsxs("form",{className:"wrap","data-testid":"signup-form",onSubmit:i,children:[o.jsx("h1",{children:"Créer un compte"}),o.jsxs("label",{className:"field",children:["Prénom",o.jsx("input",{name:"firstName",required:!0,autoComplete:"given-name"})]}),o.jsxs("label",{className:"field",children:["Nom",o.jsx("input",{name:"lastName",required:!0,autoComplete:"family-name"})]}),o.jsxs("label",{className:"field",children:["E-mail",o.jsx("input",{name:"email",type:"email",required:!0,autoComplete:"email","data-testid":"signup-email"})]}),o.jsxs("label",{className:"field",children:["Mot de passe",o.jsx("input",{name:"password",type:"password",required:!0,minLength:12,autoComplete:"new-password","data-testid":"signup-password"})]}),o.jsxs("label",{className:"field",children:["Date de naissance",o.jsx("input",{name:"birthDate",type:"date",required:!0,"data-testid":"signup-birth"})]}),o.jsxs("label",{className:"check",children:[o.jsx("input",{name:"adult",type:"checkbox","data-testid":"signup-adult"})," ",o.jsx("span",{children:km})]}),o.jsxs("label",{className:"check",children:[o.jsx("input",{name:"cgu",type:"checkbox","data-testid":"signup-cgu"})," ",o.jsxs("span",{children:[Im," ",o.jsx(E,{to:"/cgu/",children:"Lire les CGU"}),". ",o.jsx(E,{to:"/confidentialite/",children:"Lire la politique"}),"."]})]}),o.jsxs("fieldset",{children:[o.jsx("legend",{children:Tm}),Object.entries(Am).map(([a,u])=>o.jsxs("label",{className:"check",children:[o.jsx("input",{type:"checkbox",checked:s[a],onChange:l=>r({...s,[a]:l.target.checked})})," ",o.jsx("span",{children:u})]},a))]}),n&&o.jsx("p",{className:"alert",role:"alert",children:n}),o.jsx("button",{className:"btn btn-gold",type:"submit","data-testid":"signup-submit",children:"Créer mon compte"})]})}function wf(){var a;const{go:e}=ke(),[n,t]=P.useState(null),[s,r]=P.useState(!1);async function i(u){var g;u.preventDefault();const l=new FormData(u.currentTarget);if(s){const v=S.verifyOtp(String(l.get("otp")||""));v?t(v):e("/admin/");return}const c=await S.login(String(l.get("email")||""),String(l.get("password")||""));if(c==="otp"){r(!0),t(null);return}if(c!=="ok"){t(c);return}const f=(g=S.user())==null?void 0:g.role;e(f==="admin"?"/admin/":f==="voyant"?"/espace-voyant/":"/compte/")}return o.jsxs("form",{className:"wrap","data-testid":"login-form",onSubmit:i,children:[o.jsx("h1",{children:"Connexion"}),o.jsx("p",{className:"muted",children:"Comptes de démonstration : admin@luna.test, voyant@luna.test, client@luna.test. Mot de passe Luna-demo-2026. Surchargeables par les variables LUNA_ADMIN_EMAIL et LUNA_ADMIN_PASSWORD."}),!s&&o.jsxs(o.Fragment,{children:[o.jsxs("label",{className:"field",children:["E-mail",o.jsx("input",{name:"email",type:"email",required:!0,"data-testid":"login-email",autoComplete:"username"})]}),o.jsxs("label",{className:"field",children:["Mot de passe",o.jsx("input",{name:"password",type:"password",required:!0,"data-testid":"login-password",autoComplete:"current-password"})]})]}),s&&o.jsxs(o.Fragment,{children:[o.jsxs("p",{children:["Un code de démonstration est affiché ici, parce qu’aucun e-mail réel n’est envoyé. ",o.jsx("strong",{"data-testid":"demo-otp",children:(a=S.state.pendingOtp)==null?void 0:a.code})]}),o.jsxs("label",{className:"field",children:["Code",o.jsx("input",{name:"otp",inputMode:"numeric",required:!0})]})]}),n&&o.jsx("p",{className:"alert",role:"alert",children:n}),o.jsx("button",{className:"btn btn-gold",type:"submit","data-testid":"login-submit",children:s?"Valider le code":"Se connecter"}),o.jsx("p",{children:o.jsx(E,{to:"/mot-de-passe-oublie/",children:"Mot de passe oublié"})})]})}function Ef(){const{search:e,go:n}=ke(),t=e.get("pack")||"p20",s=br.find(u=>u.id===t)??br[0],[r,i]=P.useState(null);async function a(u){u.preventDefault();const l=new FormData(u.currentTarget),c=await S.purchase({packId:s.id,number:String(l.get("number")||""),expiry:String(l.get("expiry")||""),cvc:String(l.get("cvc")||""),name:String(l.get("name")||""),cgu:l.get("cgv")==="on",waiver:l.get("waiver")==="on",promo:String(l.get("promo")||""),saveCard:l.get("save")==="on"});c?i(c):n("/compte/portefeuille/")}return o.jsxs("form",{className:"wrap",onSubmit:a,children:[o.jsx("h1",{children:"Paiement simulé"}),o.jsxs("p",{children:["Pack ",s.name," : ",pe(s.payCents)," payés, ",pe(s.creditCents)," crédités. Adaptateur Stripe, mode test. Le numéro complet n’est pas stocké."]}),o.jsxs("label",{className:"field",children:["Numéro de carte",o.jsx("input",{name:"number","data-testid":"card-number",autoComplete:"cc-number",inputMode:"numeric",required:!0,placeholder:"4242 4242 4242 4242"})]}),o.jsxs("label",{className:"field",children:["Expiration",o.jsx("input",{name:"expiry","data-testid":"card-expiry",autoComplete:"cc-exp",required:!0,placeholder:"12/30"})]}),o.jsxs("label",{className:"field",children:["Cryptogramme",o.jsx("input",{name:"cvc","data-testid":"card-cvc",autoComplete:"cc-csc",required:!0,placeholder:"123"})]}),o.jsxs("label",{className:"field",children:["Nom sur la carte",o.jsx("input",{name:"name","data-testid":"card-name",autoComplete:"cc-name",required:!0})]}),o.jsxs("label",{className:"field",children:["Code promo",o.jsx("input",{name:"promo",placeholder:"BIENVENUE"})]}),o.jsxs("label",{className:"check",children:[o.jsx("input",{name:"cgv",type:"checkbox"})," ",o.jsx("span",{children:Pm})]}),o.jsxs("label",{className:"check",children:[o.jsx("input",{name:"waiver",type:"checkbox"})," ",o.jsx("span",{children:Dm})]}),o.jsxs("label",{className:"check",children:[o.jsx("input",{name:"save",type:"checkbox"})," ",o.jsx("span",{children:"Enregistrer la carte via un SetupIntent simulé (4 derniers chiffres seulement)."})]}),r&&o.jsx("p",{className:"alert",role:"alert",children:r}),o.jsxs("button",{className:"btn btn-gold",type:"submit","data-testid":"pay-button",children:["Payer ",pe(s.payCents)]})]})}function Si({slug:e,channel:n}){const t=Fr(e),{go:s}=ke(),[r,i]=P.useState(Date.now()),[a,u]=P.useState(null),[l,c]=P.useState(!1),[f,g]=P.useState(""),v=S.user(),y=S.state.sessions.find(h=>h.clientId===(v==null?void 0:v.id)&&h.voyantSlug===e&&h.channel===n&&h.status==="active");if(P.useEffect(()=>{if(!y)return;const h=window.setInterval(()=>{S.tick(y.id),i(Date.now())},1e3);return()=>window.clearInterval(h)},[y==null?void 0:y.id,y==null?void 0:y.status]),!t)return o.jsx("p",{className:"wrap",children:"Guide introuvable."});async function C(){if(!S.user()){s("/connexion/");return}if(Zc()){c(!0);return}const h=await S.startSession(e,n);h==="CONSENT"?c(!0):h&&h.startsWith("ses_")?u(null):u(h)}async function L(h){if(await S.setConsent("sensitive_data_art9",h,da,"first_session_gate"),c(!1),!h){u("Sans cet accord, nous ne pouvons pas vous proposer de consultation. Les contenus gratuits du site restent accessibles.");return}const j=await S.startSession(e,n);j&&!j.startsWith("ses_")&&u(j)}const D=y?Math.floor((r-new Date(y.startedAt).getTime())/1e3):0,p=y?y.billedMinutes*y.rateCentsPerMin:0,d=y?Math.floor(S.remaining(y,r)/1e3):0,m=y?S.state.messages.filter(h=>h.sessionId===y.id):[];return o.jsxs("section",{className:"wrap",children:[l&&o.jsx(Xc,{onDone:L}),o.jsx("p",{className:"pill",children:"Profil fictif — contenu de démonstration"}),t.kind==="ai"&&o.jsx("p",{className:"banner-ai",children:"IA · Guide virtuel : intelligence artificielle. Ce bandeau reste affiché pendant toute la séance."}),o.jsx("h1",{children:n==="call"?`Appeler ${t.name}`:n==="video"?`Visio avec ${t.name}`:`Écrire à ${t.name}`}),o.jsxs("p",{children:["Tarif de démonstration : ",pe(n==="call"?t.demoCallCents:n==="video"?t.demoVideoCents:t.demoChatCents)," TTC par minute. Vous avez ",pe(S.usable())," utilisables, soit environ ",S.usable()&&t.demoChatCents?Math.floor(S.usable()/(n==="call"?t.demoCallCents:t.demoChatCents)):0," minutes. ",t.kind==="human"?"Disponibilité simulée.":"Disponible maintenant."]}),!y&&n==="chat"&&o.jsx("button",{className:"btn btn-gold",type:"button","data-testid":"start-chat",onClick:C,children:"Démarrer le chat"}),!y&&n!=="chat"&&o.jsx("button",{className:"btn btn-gold",type:"button",onClick:C,children:"Démarrer la simulation"}),n==="call"&&o.jsxs("div",{className:"panel",children:[o.jsx("h2",{children:"Twilio Voice, mode démo"}),o.jsx("p",{children:"Pont d’appel : votre numéro et celui du guide restent masqués. Aucun enregistrement par défaut."}),o.jsx("p",{children:Mm}),y&&o.jsxs("label",{className:"check",children:[o.jsx("input",{type:"checkbox",checked:y.recordingConsent,onChange:h=>S.setRecording(y.id,h.target.checked)})," ",o.jsx("span",{children:"Touche 1 : j’accepte l’enregistrement qualité de cet appel, conservé 30 jours."})]})]}),n==="video"&&o.jsxs("div",{className:"panel",children:[o.jsx("h2",{children:"Daily, salle simulée"}),o.jsx("p",{children:Rm}),o.jsxs("p",{children:["recordParticipantsOnConnect = false. Salle : ",(y==null?void 0:y.dailyRoom)??"créée au démarrage","."]}),o.jsx(E,{to:"/session/test/",children:"Essayer la caméra et le micro"})]}),y&&o.jsxs("div",{className:"panel",children:[o.jsxs("p",{className:"counter","data-testid":n==="chat"?"chat-countdown":"call-counter",children:[Nu(D)," · ",pe(p)," · reste ",Nu(d)]}),Gm(d*1e3)&&o.jsx("p",{className:"warn",role:"status",children:"Il reste moins d’une minute de crédit."}),y.confirmPending&&o.jsxs("div",{className:"panel",role:"dialog","aria-modal":"true",children:[o.jsxs("p",{children:["Vous êtes en consultation depuis ",Math.floor(D/60)," minutes. Cela vous a coûté ",pe(p),". Voulez-vous continuer ?"]}),o.jsxs("div",{className:"btn-row",children:[o.jsx("button",{className:"btn btn-ghost",type:"button","data-testid":"end-session",onClick:()=>S.endSession(y.id),children:"Terminer la séance"}),o.jsx("button",{className:"btn btn-gold",type:"button",onClick:()=>S.continueSession(y.id),children:"Continuer 15 minutes"})]})]}),o.jsx("div",{className:"chat","aria-live":"polite",children:m.map(h=>o.jsxs("p",{className:`bubble ${h.sender==="client"?"client":""}`,children:[o.jsx("strong",{children:h.sender==="system"?"Luna":h.sender==="client"?"Vous":t.name}),o.jsx("br",{}),h.body]},h.id))}),n==="chat"&&o.jsxs("form",{onSubmit:h=>{h.preventDefault(),f.trim()&&(S.sendMessage(y.id,f),g(""))},children:[o.jsxs("label",{className:"field",children:["Message",o.jsx("textarea",{"data-testid":"chat-input",value:f,onChange:h=>g(h.target.value)})]}),o.jsx("button",{className:"btn btn-gold",type:"submit","data-testid":"chat-send",children:"Envoyer"})]}),!y.confirmPending&&o.jsx("button",{className:"btn btn-ghost",type:"button","data-testid":"end-session",onClick:()=>S.endSession(y.id),children:"Terminer la séance"}),o.jsx(Nf,{target:y.id})]}),a&&o.jsx("p",{className:"alert",role:"alert",children:a}),o.jsx("p",{children:Gc})]})}function Nf({target:e}){const[n,t]=P.useState(!1),[s,r]=P.useState("");return o.jsxs("div",{children:[o.jsx("button",{className:"btn btn-ghost",type:"button","data-testid":"report-button",onClick:()=>t(!0),children:"Signaler"}),n&&o.jsxs("form",{onSubmit:i=>{i.preventDefault(),S.report(e,s),t(!1)},children:[o.jsxs("label",{className:"field",children:["Motif du signalement",o.jsx("textarea",{value:s,onChange:i=>r(i.target.value),required:!0})]}),o.jsx("button",{className:"btn btn-gold",type:"submit",children:"Envoyer le signalement"})]})]})}function kf({slug:e}){const n=Fr(e),[t,s]=P.useState(null),[r,i]=P.useState(null),[a,u]=P.useState(!1),l=P.useMemo(()=>{const f=new Date;f.setHours(9,0,0,0);const g=[];for(let v=1;v<=4;v+=1)for(const y of[9,11,14,16]){const C=new Date(f);C.setDate(f.getDate()+v),C.setHours(y),g.push({iso:C.toISOString(),label:C.toLocaleString("fr-FR",{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}),free:(v+y)%5!==0})}return g},[]);if(!n)return null;async function c(){if(t){if(Zc()){u(!0);return}i(S.book(e,t))}}return o.jsxs("section",{className:"wrap",children:[a&&o.jsx(Xc,{onDone:async f=>{await S.setConsent("sensitive_data_art9",f,da,"booking"),u(!1),f&&t&&i(S.book(e,t))}}),o.jsxs("h1",{children:["Réserver une visio avec ",n.name]}),o.jsxs("p",{children:["Créneau simulé de 10 minutes, payé avant la consultation : ",pe(n.demoVideoCents*10),". ",n.kind==="human"?"Disponibilité simulée.":"Guide IA."," La visio n’est pas enregistrée."]}),o.jsx("div",{className:"btn-row",children:l.map(f=>o.jsxs("button",{className:"btn btn-ghost",type:"button",disabled:!f.free,"data-testid":f.free?"booking-slot":void 0,"aria-pressed":t===f.iso,onClick:()=>s(f.iso),children:[f.label,f.free?"":" (pris)"]},f.iso))}),o.jsx("button",{className:"btn btn-gold",type:"button","data-testid":"booking-confirm",disabled:!t,onClick:c,children:"Confirmer et payer"}),r&&o.jsx("p",{className:r?"alert":"ok",role:"status",children:r}),!r&&S.state.bookings.some(f=>{var g;return f.voyantSlug===e&&f.clientId===((g=S.user())==null?void 0:g.id)})&&o.jsx("p",{className:"ok",children:"Réservation confirmée. Salle Daily simulée prête."})]})}function If(){const[e,n]=P.useState("Aucun flux pour le moment.");async function t(){try{const s=await navigator.mediaDevices.getUserMedia({video:!0,audio:!0}),r=document.querySelector("video");r&&(r.srcObject=s),n("Caméra et micro détectés. Rien n’est enregistré.")}catch{n("Autorisation refusée ou absente. Vous pouvez continuer en simulation, sans flux réel.")}}return o.jsxs("section",{className:"wrap","data-testid":"video-device-test",children:[o.jsx("h1",{children:"Essai du matériel"}),o.jsx("p",{children:"Activez la caméra et le micro avant une visio. Aucun enregistrement n’est lancé."}),o.jsx("video",{autoPlay:!0,muted:!0,playsInline:!0,width:320,height:240}),o.jsx("p",{role:"status",children:e}),o.jsx("button",{className:"btn btn-gold",type:"button",onClick:t,children:"Tester la caméra et le micro"})]})}function A(e,n){return o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:e}),n]})}function Pf(){const{path:e,search:n,go:t}=ke(),[,s]=P.useState(0);P.useEffect(()=>S.subscribe(()=>s(c=>c+1)),[]);const r=Hc.get(e);if(r)return o.jsx(jf,{page:r});const i=/^\/voyants\/([^/]+)\/consulter\/$/.exec(e);if(i)return o.jsx(Si,{slug:i[1],channel:"chat"});const a=/^\/session\/appel\/([^/]+)\/$/.exec(e);if(a)return o.jsx(Si,{slug:a[1],channel:"call"});const u=/^\/session\/video\/([^/]+)\/$/.exec(e);if(u)return o.jsx(Si,{slug:u[1],channel:"video"});const l=/^\/reserver\/([^/]+)\/$/.exec(e);return l?o.jsx(kf,{slug:l[1]}):e==="/session/test/"?o.jsx(If,{}):e==="/voyants/"?o.jsx(Df,{}):e==="/specialites/"||e==="/themes/"||e==="/horoscope/"||e==="/blog/"?o.jsx(zf,{prefix:e}):e==="/tarifs/"||e==="/compte/recharger/"?o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:"Recharges"}),o.jsx(nd,{})]}):e==="/inscription/"?o.jsx(bf,{}):e==="/connexion/"?o.jsx(wf,{}):e==="/compte/paiement/"?o.jsx(Ef,{}):e==="/compte/portefeuille/"||e==="/compte/"?o.jsx(Tf,{home:e==="/compte/"}):e==="/admin/litiges/"?o.jsx(Af,{}):e==="/plan-du-site/"?o.jsx(Hf,{}):e==="/compte/plafond/"?o.jsx(Mf,{}):e==="/compte/pause/"?o.jsx(Rf,{}):e==="/compte/confidentialite/"||e==="/compte/mes-donnees/"?o.jsx(_f,{}):e==="/compte/abonnement/"?o.jsx(Uf,{}):e==="/devenir-voyant/candidature/"?o.jsx(Of,{}):e==="/avis/"?A("Avis",o.jsx("p",{children:"Aucun avis n’est publié. Seules les personnes ayant réalisé une consultation payante pourront en laisser un, daté, après contrôle. Les profils fictifs n’affichent ni note ni témoignage."})):e==="/preferences-cookies/"?A("Préférences cookies",o.jsx("p",{children:"Utilisez « Gérer mes cookies » en bas de page. Tout refuser est au même niveau que tout accepter."})):e==="/desinscription/"?o.jsx(Vf,{}):e==="/admin/"?o.jsx(Wf,{}):e.startsWith("/admin/")?o.jsx(Kf,{path:e}):e.startsWith("/espace-voyant")?o.jsx(Jf,{path:e}):e.startsWith("/compte/")?o.jsx(Xf,{path:e}):e==="/mot-de-passe-oublie/"?o.jsx(Ff,{}):e==="/reinitialiser-mot-de-passe/"?o.jsx($f,{token:n.get("token")||""}):e==="/contact/"?o.jsx(Gf,{}):e==="/sous-traitants/"?o.jsx(Qf,{}):e==="/a-propos/"||e==="/transparence/"||e==="/accessibilite/"||e==="/aide/"||e.startsWith("/aide/")?o.jsx(Bf,{path:e}):e==="/legal/archives/"?A("Archives des textes",o.jsxs(o.Fragment,{children:[o.jsxs("p",{children:["Version en vigueur : ",$c,". Les textes actuels :"]}),o.jsxs("ul",{children:[o.jsx("li",{children:o.jsx(E,{to:"/cgu/",children:"CGU"})}),o.jsx("li",{children:o.jsx(E,{to:"/cgv/",children:"CGV"})}),o.jsx("li",{children:o.jsx(E,{to:"/confidentialite/",children:"Politique de confidentialité"})}),o.jsx("li",{children:o.jsx(E,{to:"/cookies/",children:"Politique cookies"})}),o.jsx("li",{children:o.jsx(E,{to:"/mentions-legales/",children:"Mentions légales"})}),o.jsx("li",{children:o.jsx(E,{to:"/conditions-guides/",children:"Conditions des guides"})})]}),o.jsx("p",{children:"Aucune version antérieure n’a encore été publiée."})]})):e==="/404/"?A("Page introuvable",o.jsxs("p",{children:["Cette adresse ne mène nulle part. ",o.jsx(E,{to:"/",children:"Retour à l’accueil"}),"."]})):A("Page introuvable",o.jsxs("p",{children:["Cette adresse ne mène nulle part. ",o.jsx(E,{to:"/404/",children:"Page 404"}),"."]}))}function Df(){const{path:e,search:n,go:t}=ke(),s=n.get("type")||"",r=n.get("canal")||"",i=en.filter(a=>(s?a.kind===s:!0)&&(r?a.channels.includes(r):!0));return o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:"Guides"}),o.jsx("p",{children:"Tous les profils sont fictifs. Les guides humains ne sont pas affichés comme disponibles au lancement. Aucune note n’est montrée."}),o.jsxs("div",{className:"filters",children:[o.jsxs("label",{children:["Type",o.jsxs("select",{value:s,onChange:a=>t(`/voyants/?type=${a.target.value}`),children:[o.jsx("option",{value:"",children:"Tous"}),o.jsx("option",{value:"ai",children:"Guides IA uniquement"}),o.jsx("option",{value:"human",children:"Guides humains uniquement"})]})]}),o.jsxs("label",{children:["Canal",o.jsxs("select",{value:r,onChange:a=>t(`/voyants/?canal=${a.target.value}`),children:[o.jsx("option",{value:"",children:"Tous"}),o.jsx("option",{value:"chat",children:"Chat"}),o.jsx("option",{value:"call",children:"Téléphone"}),o.jsx("option",{value:"message",children:"Message"})]})]})]}),o.jsx("div",{className:"grid cards",children:i.map(a=>o.jsxs("article",{className:"card",children:[o.jsx(ed,{guide:a,from:e}),o.jsx("h2",{children:o.jsx(E,{to:`/voyants/${a.slug}/`,children:a.name})}),a.kind==="ai"?o.jsx("p",{className:"pill pill-ai",children:"IA · Guide virtuel : intelligence artificielle"}):o.jsx("p",{className:"pill pill-human",children:"Guide humain · profil fictif"}),o.jsx("p",{children:a.kind==="ai"?"Disponible maintenant, 24 h/24.":"Disponibilité simulée."}),o.jsxs("p",{children:["Démonstration : ",pe(a.demoChatCents)," / min en chat."]})]},a.slug))})]})}function zf({prefix:e}){const n=pa().filter(s=>s.path.startsWith(e)&&s.path!==e),t={"/specialites/":"Pratiques","/themes/":"Thèmes","/horoscope/":"Signes","/blog/":"Magazine"};return o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:t[e]}),o.jsx("ul",{children:n.map(s=>o.jsx("li",{children:o.jsx(E,{to:s.path,children:s.title})},s.path))})]})}function Tf({home:e}){const n=S.user();return n?o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:e?`Bonjour ${n.firstName}`:"Portefeuille"}),o.jsxs("p",{"data-testid":"wallet-balance",children:["Solde : ",pe(S.balance(n.id)),". Utilisable : ",pe(S.usable(n.id)),"."]}),o.jsxs("div",{className:"btn-row",children:[o.jsx(E,{className:"btn btn-gold",to:"/compte/recharger/",children:"Recharger"}),o.jsx(E,{className:"btn btn-ghost",to:"/compte/plafond/",children:"Plafond"}),o.jsx(E,{className:"btn btn-ghost",to:"/compte/pause/",children:"Faire une pause"}),o.jsx(E,{className:"btn btn-ghost",to:"/compte/confidentialite/",children:"Confidentialité"})]}),!e&&o.jsx(nd,{})]}):A("Mon compte",o.jsxs("p",{children:[o.jsx(E,{to:"/connexion/",children:"Connectez-vous"})," ou ",o.jsx(E,{to:"/inscription/",children:"créez un compte"}),"."]}))}function Af(){const e=S.user();return!e||e.role!=="admin"?A("Litiges",o.jsxs("p",{children:["Réservé à l’administration. ",o.jsx(E,{to:"/connexion/",children:"Connexion"})]})):o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:"Litiges et remboursements"}),o.jsx("div",{className:"table-wrap",children:o.jsxs("table",{children:[o.jsx("thead",{children:o.jsxs("tr",{children:[o.jsx("th",{children:"Paiement"}),o.jsx("th",{children:"Compte"}),o.jsx("th",{children:"Statut"}),o.jsx("th",{})]})}),o.jsx("tbody",{children:S.state.disputes.map(n=>o.jsxs("tr",{"data-testid":"dispute-row",children:[o.jsx("td",{children:n.reason}),o.jsx("td",{children:n.email}),o.jsx("td",{children:n.status==="remboursee"?"Remboursé":n.status}),o.jsx("td",{children:n.status==="ouverte"&&o.jsx("button",{className:"btn btn-gold",type:"button","data-testid":"admin-refund",onClick:()=>S.refund(n.paymentId),children:"Rembourser"})})]},n.id))})]})})]})}function Mf(){const e=S.user(),[n,t]=P.useState(e?e.dailyCapCents/100:50),[s,r]=P.useState(e?e.monthlyCapCents/100:150),[i,a]=P.useState(null);return e?o.jsxs("form",{className:"wrap",onSubmit:u=>{u.preventDefault(),a(S.setCap(Math.round(n*100),Math.round(s*100)))},children:[o.jsx("h1",{children:"Plafond de dépense"}),o.jsxs("p",{children:["Par défaut, 50 € par jour et 150 € par mois. Une baisse est immédiate. Une hausse prend effet après 72 heures. ",e.pendingCap&&`Hausse prévue le ${new Date(e.pendingCap.at).toLocaleString("fr-FR")}.`]}),o.jsxs("label",{className:"field",children:["Plafond du jour (€)",o.jsx("input",{type:"number",min:0,max:150,value:n,onChange:u=>t(Number(u.target.value))})]}),o.jsxs("label",{className:"field",children:["Plafond du mois (€)",o.jsx("input",{type:"number",min:0,max:500,value:s,onChange:u=>r(Number(u.target.value))})]}),o.jsx("button",{className:"btn btn-gold",type:"submit",children:"Enregistrer"}),i&&o.jsx("p",{role:"status",children:i})]}):A("Plafond",o.jsx(E,{to:"/connexion/",children:"Connexion"}))}function Rf(){const e=S.user();return e?o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:"Faire une pause"}),o.jsxs("p",{children:["La pause est immédiate : plus de séance, de recharge, de prospection ni de bonus. ",e.selfExclusionUntil?`En cours jusqu’au ${e.selfExclusionUntil}.`:"Aucune pause en cours."]}),o.jsx("div",{className:"btn-row",children:[["7 jours",new Date(Date.now()+7*864e5).toISOString()],["30 jours",new Date(Date.now()+30*864e5).toISOString()],["6 mois",new Date(Date.now()+182*864e5).toISOString()],["1 an",new Date(Date.now()+365*864e5).toISOString()],["Définitive","definitive"]].map(([n,t])=>o.jsx("button",{className:"btn btn-ghost",type:"button",onClick:()=>S.exclude(t),children:n},n))})]}):A("Pause",o.jsx(E,{to:"/connexion/",children:"Connexion"}))}function _f(){const e=S.user();if(!e)return A("Confidentialité",o.jsx(E,{to:"/connexion/",children:"Connexion"}));const n=["sensitive_data_art9","marketing_email","marketing_sms","marketing_whatsapp","marketing_push","ai_training","cookies_audience"];return o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:"Confidentialité"}),o.jsx("ul",{children:n.map(t=>{const s=[...S.state.consents].reverse().find(r=>r.userId===e.id&&r.purpose===t);return o.jsxs("li",{children:[t," : ",s?`${s.action} le ${s.at} (version ${s.version}, IP ${s.ipTruncated})`:"aucun choix"," ",o.jsx("button",{type:"button",className:"btn btn-ghost",onClick:()=>S.setConsent(t,!1,t),children:"Retirer"})]},t)})}),o.jsxs("label",{className:"check",children:[o.jsx("input",{type:"checkbox",onChange:t=>S.setConsent("ai_training",t.target.checked,bu,"settings")})," ",o.jsx("span",{children:bu})]}),o.jsx("button",{className:"btn btn-gold",type:"button",onClick:()=>{const t=new Blob([S.exportJson()],{type:"application/json"}),s=URL.createObjectURL(t),r=document.createElement("a");r.href=s,r.download="luna-donnees.json",r.click()},children:"Télécharger mes données"}),o.jsx("button",{className:"btn btn-ghost",type:"button",onClick:()=>S.requestData("delete"),children:"Supprimer mon compte"})]})}function Uf(){const e=S.user(),[n,t]=P.useState(0),[s,r]=P.useState(!1);return o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:"Abonnement Luna+"}),o.jsx("p",{children:"Prix : [PRIX] € TTC par [mois]. Résiliation en trois clics, sans frais."}),e&&o.jsx("button",{className:"btn btn-ghost",type:"button",onClick:()=>{e.lunaPlus="active",t(1)},children:"Souscrire (simulation)"}),n===1&&o.jsx("button",{className:"btn btn-ghost",type:"button",onClick:()=>t(2),children:"Résilier mon abonnement"}),n===2&&o.jsx("button",{className:"btn btn-ghost",type:"button",onClick:()=>t(3),children:"Confirmer la résiliation"}),n===3&&o.jsx("button",{className:"btn btn-gold",type:"button",onClick:()=>{e&&(e.lunaPlus="ended"),r(!0)},children:"Valider"}),s&&o.jsx("p",{className:"ok",children:"Résiliation confirmée. Elle prend effet à la fin de la période en cours."})]})}function Of(){const[e,n]=P.useState(null);return o.jsxs("form",{className:"wrap",onSubmit:t=>{t.preventDefault();const s=new FormData(t.currentTarget);n(S.apply({name:String(s.get("name")),email:String(s.get("email")),practice:String(s.get("practice")),country:String(s.get("country"))}))},children:[o.jsx("h1",{children:"Candidature"}),o.jsxs("label",{className:"field",children:["Nom",o.jsx("input",{name:"name",required:!0})]}),o.jsxs("label",{className:"field",children:["E-mail",o.jsx("input",{name:"email",type:"email",required:!0})]}),o.jsxs("label",{className:"field",children:["Pays d’établissement",o.jsx("input",{name:"country",required:!0})]}),o.jsxs("label",{className:"field",children:["Pratique",o.jsx("textarea",{name:"practice",required:!0})]}),o.jsx("button",{className:"btn btn-gold",type:"submit",children:"Envoyer"}),e&&o.jsx("p",{role:"status",children:e})]})}function Vf(){const{search:e}=ke(),[n,t]=P.useState(e.get("email")||"");return o.jsxs("form",{className:"wrap",onSubmit:s=>{s.preventDefault(),S.unsubscribe(n)},children:[o.jsx("h1",{children:"Désinscription"}),o.jsxs("label",{className:"field",children:["E-mail",o.jsx("input",{value:n,onChange:s=>t(s.target.value),type:"email",required:!0})]}),o.jsx("button",{className:"btn btn-gold",type:"submit",children:"Me désinscrire"})]})}function Ff(){const[e,n]=P.useState(null);return o.jsxs("form",{className:"wrap",onSubmit:async t=>{t.preventDefault();const s=new FormData(t.currentTarget);n(await S.forgot(String(s.get("email"))))},children:[o.jsx("h1",{children:"Mot de passe oublié"}),o.jsxs("label",{className:"field",children:["E-mail",o.jsx("input",{name:"email",type:"email",required:!0})]}),o.jsx("button",{className:"btn btn-gold",type:"submit",children:"Recevoir le lien"}),e&&o.jsxs("p",{children:["Lien simulé : ",o.jsx(E,{to:`/reinitialiser-mot-de-passe/?token=${e}`,children:"choisir un nouveau mot de passe"})]})]})}function $f({token:e}){const[n,t]=P.useState(null);return o.jsxs("form",{className:"wrap",onSubmit:async s=>{s.preventDefault();const r=new FormData(s.currentTarget);t(await S.reset(e,String(r.get("password"))))},children:[o.jsx("h1",{children:"Nouveau mot de passe"}),o.jsxs("label",{className:"field",children:["Mot de passe",o.jsx("input",{name:"password",type:"password",minLength:12,required:!0})]}),o.jsx("button",{className:"btn btn-gold",type:"submit",children:"Enregistrer"}),n===null?null:o.jsx("p",{role:"status",children:n||"Mot de passe mis à jour."})]})}function Gf(){return A("Contact",o.jsxs("form",{onSubmit:e=>e.preventDefault(),children:[o.jsxs("label",{className:"field",children:["Nom",o.jsx("input",{required:!0})]}),o.jsxs("label",{className:"field",children:["E-mail",o.jsx("input",{type:"email",required:!0})]}),o.jsxs("label",{className:"field",children:["Message",o.jsx("textarea",{required:!0})]}),o.jsx("button",{className:"btn btn-gold",type:"submit",children:"Envoyer"}),o.jsx("p",{children:"Service client : [EMAIL DE CONTACT]. Délai de réponse : [5] jours ouvrés."})]}))}function Qf(){const e=[["Hébergeur applicatif","[CROCHET]","UE recommandée"],["GitHub Pages (prototype statique)","GitHub, Inc.","États-Unis — aucune donnée personnelle"],["Stripe","Stripe Payments Europe","Irlande, transferts possibles"],["Twilio","Twilio","États-Unis par défaut"],["Daily","Daily","[CROCHET]"],["Brevo","Brevo","[CROCHET]"],["Matomo","auto-hébergé","UE"],["[NOM DU FOURNISSEUR D'IA]","[CROCHET]","[CROCHET]"]];return o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:"Sous-traitants"}),o.jsx("table",{children:o.jsx("tbody",{children:e.map(n=>o.jsxs("tr",{children:[o.jsx("td",{children:n[0]}),o.jsx("td",{children:n[1]}),o.jsx("td",{children:n[2]})]},n[0]))})})]})}function Bf({path:e}){const n={"/a-propos/":"Luna est un prototype de guidance en ligne. Les guides affichés sont fictifs. Les paiements sont simulés.","/transparence/":"Les guides marqués IA sont des programmes. Ils ne sont pas des personnes. Leurs réponses sont générées automatiquement et peuvent être inexactes.","/accessibilite/":"Le prototype vise le niveau WCAG AA : contrastes, clavier, textes de remplacement, cibles tactiles.","/aide/":"Choisissez un sujet : compte, paiements, consultations ou guides."};return A(e.replaceAll("/"," ").trim()||"Aide",o.jsxs("p",{children:[n[e]||"Consultez aussi la FAQ et les pages de confidentialité."," ",o.jsx(E,{to:"/faq/",children:"FAQ"})]}))}function Hf(){const e=pa();return o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:"Plan du site"}),o.jsx("ul",{children:e.map(n=>o.jsx("li",{children:o.jsx(E,{to:n.path,children:n.title})},n.path))})]})}function Wf(){const e=S.user();if(!e||e.role!=="admin")return A("Administration",o.jsx(E,{to:"/connexion/",children:"Connexion administrateur"}));const n=[40,55,48,62,58,70];return o.jsxs("section",{className:"wrap",children:[o.jsx("h1",{children:"Administration"}),o.jsx("div",{className:"chart","aria-hidden":"true",children:n.map(t=>o.jsx("span",{style:{height:`${t}%`}},t))}),o.jsxs("table",{children:[o.jsx("caption",{children:"Revenus de démonstration"}),o.jsx("tbody",{children:n.map((t,s)=>o.jsxs("tr",{children:[o.jsxs("td",{children:["Mois ",s+1]}),o.jsx("td",{children:t})]},s))})]}),o.jsx("ul",{children:["/admin/clients/","/admin/voyants/","/admin/validations/","/admin/litiges/","/admin/audit/","/admin/retention/","/admin/rgpd/","/admin/support/","/admin/campagnes/","/admin/securite/"].map(t=>o.jsx("li",{children:o.jsx(E,{to:t,children:t})},t))})]})}function Kf({path:e}){const n=S.user();return!n||n.role!=="admin"?A("Administration",o.jsx(E,{to:"/connexion/",children:"Connexion"})):e==="/admin/clients/"?A("Clients",o.jsx("ul",{children:S.state.users.filter(t=>t.role==="client").map(t=>o.jsxs("li",{children:[t.pseudonym," — ",t.email]},t.id))})):e==="/admin/voyants/"?A("Guides",o.jsx("ul",{children:en.map(t=>o.jsxs("li",{children:[t.name," — ",t.kind==="ai"?"IA":"humain fictif"," — ",S.state.presence[t.slug]?"présence simulée active":"hors ligne"]},t.slug))})):e==="/admin/validations/"?A("Validations",o.jsx("ul",{children:S.state.applications.map(t=>o.jsxs("li",{children:[t.name," (",t.country,") ",t.status," ",o.jsx("button",{type:"button",onClick:()=>S.decideApplication(t.id,"approved"),children:"Approuver"})]},t.id))})):e==="/admin/audit/"?A("Journal d’audit",o.jsx("ul",{children:S.state.audit.map(t=>o.jsxs("li",{children:[t.at," — ",t.action," — ",t.summary]},t.id))})):e==="/admin/retention/"?A("Rétention",o.jsx("button",{className:"btn btn-gold",type:"button",onClick:()=>S.runPurge(),children:"Lancer la purge du jour"})):e==="/admin/rgpd/"?A("Demandes",o.jsx("ul",{children:S.state.dataRequests.map(t=>o.jsxs("li",{children:[t.type," ",t.status," ",o.jsx("button",{type:"button",onClick:()=>S.resolveData(t.id),children:"Traiter"})]},t.id))})):e==="/admin/support/"?o.jsx(Yf,{}):e==="/admin/campagnes/"?A("Campagnes",o.jsxs(o.Fragment,{children:[o.jsx("p",{children:"Un opt-in par canal, au seul nom de Luna. Pas de ciblage sur les conversations ni la détresse. Pas de démarchage téléphonique."}),o.jsx("button",{className:"btn btn-gold",type:"button",onClick:()=>alert(S.sendCampaign()),children:"Simuler un envoi e-mail"})]})):e==="/admin/avis/"?A("Modération",o.jsx("p",{children:"File vide. Exemple de présentation, non publié : « Lecture claire » — cet exemple n’est pas un avis client."})):e==="/admin/securite/"?A("Sécurité",o.jsx("p",{children:"Le compte administrateur exige un second facteur. Mot de passe argon2 côté serveur. Ici, la démo affiche un code à l’écran."})):e==="/admin/integrations/"?A("Intégrations",o.jsx("p",{children:"Stripe, Twilio Voice, Daily, Brevo et Matomo sont branchés derrière des adaptateurs. Sans clés, ils restent en mode démo. Audiotel (Media Technologies) est un adaptateur non activé."})):A(e,o.jsxs("p",{children:["Réglage de démonstration. Commission actuelle : ",S.state.commissionBps/100," %."]}))}function Yf(){var l;const[e,n]=P.useState(((l=S.state.sessions[0])==null?void 0:l.id)||""),[t,s]=P.useState("T-1001"),[r,i]=P.useState(""),[a,u]=P.useState(null);return o.jsxs("form",{className:"wrap",onSubmit:c=>{c.preventDefault(),u(S.openSupport(e,t,r))},children:[o.jsx("h1",{children:"Accès support"}),o.jsx("p",{children:"Une conversation ne s’ouvre qu’avec un ticket et un motif d’au moins 20 caractères, pendant 4 heures. Le client est prévenu."}),o.jsxs("label",{className:"field",children:["Séance",o.jsx("input",{value:e,onChange:c=>n(c.target.value)})]}),o.jsxs("label",{className:"field",children:["Ticket",o.jsx("input",{value:t,onChange:c=>s(c.target.value)})]}),o.jsxs("label",{className:"field",children:["Motif",o.jsx("textarea",{value:r,onChange:c=>i(c.target.value)})]}),o.jsx("button",{className:"btn btn-gold",type:"submit",children:"Ouvrir 4 heures"}),a&&o.jsx("p",{role:"status",children:a})]})}function Jf({path:e}){const n=S.user();if(!n||n.role!=="voyant"||!n.voyantSlug)return A("Espace guide",o.jsxs("p",{children:[o.jsx(E,{to:"/connexion/",children:"Connexion guide"}),". Le compte de démonstration est voyant@luna.test."]}));const t=Fr(n.voyantSlug),s=S.state.presence[n.voyantSlug];if(e==="/espace-voyant/disponibilites/")return A("Disponibilité simulée",o.jsxs(o.Fragment,{children:[o.jsx("p",{children:"Ce réglage ne présente pas le guide comme réellement disponible au lancement."}),o.jsx("button",{className:"btn btn-gold",type:"button",onClick:()=>S.setPresence(n.voyantSlug,!s),children:s?"Passer hors ligne (simulation)":"Marquer en ligne (simulation)"})]}));if(e==="/espace-voyant/consultations/"){const r=S.state.sessions.filter(i=>i.voyantSlug===n.voyantSlug);return A("Consultations",o.jsx("ul",{children:r.map(i=>{var a;return o.jsxs("li",{children:[(a=S.clientForVoyant(i.clientId))==null?void 0:a.pseudonym," — ",i.channel," — ",pe(i.billedMinutes*i.rateCentsPerMin)]},i.id)})}))}return A((t==null?void 0:t.name)||"Guide",o.jsxs(o.Fragment,{children:[o.jsx("p",{children:"Profil fictif. Commission de démonstration : 30 %. Les coordonnées réelles des clients ne sont pas affichées."}),o.jsx(E,{to:"/espace-voyant/disponibilites/",children:"Disponibilités"})]}))}function Xf({path:e}){const n=S.user();return n?e==="/compte/transactions/"?A("Transactions",o.jsx("ul",{children:S.state.ledger.filter(t=>t.userId===n.id).map(t=>o.jsxs("li",{children:[t.type," ",pe(t.amountCents)]},t.id))})):e==="/compte/factures/"?A("Factures",o.jsx("ul",{children:S.state.invoices.filter(t=>t.userId===n.id).map(t=>o.jsxs("li",{children:[t.number," ",o.jsx("button",{type:"button",onClick:()=>Zf(t.number,t.paymentId),children:"Télécharger"})]},t.id))})):e==="/compte/conversations/"?A("Conversations",o.jsx("ul",{children:S.state.sessions.filter(t=>t.clientId===n.id).map(t=>o.jsx("li",{children:o.jsx(E,{to:t.channel==="call"?`/session/appel/${t.voyantSlug}/`:`/voyants/${t.voyantSlug}/consulter/`,children:t.voyantSlug})},t.id))})):e==="/compte/favoris/"?A("Favoris",o.jsx("ul",{children:en.map(t=>o.jsx("li",{children:o.jsx("button",{type:"button",onClick:()=>S.toggleFavorite(t.slug),children:t.name})},t.slug))})):e==="/compte/reservations/"?A("Réservations",o.jsx("ul",{children:S.state.bookings.filter(t=>t.clientId===n.id).map(t=>o.jsxs("li",{children:[t.voyantSlug," — ",t.dailyRoom]},t.id))})):e==="/compte/notifications/"?A("Notifications",o.jsx("ul",{children:S.state.notifications.filter(t=>t.userId===n.id).map(t=>o.jsxs("li",{children:[t.title," — ",t.body]},t.id))})):e==="/compte/parrainage/"?A("Parrainage",o.jsxs("p",{children:["Votre lien : ?parrain=",n.referralCode,". Luna ne demande pas les coordonnées de vos proches. Le bonus est [MONTANT] €, non convertible en argent."]})):e==="/compte/parametres/"?A("Paramètres",o.jsxs("p",{children:["Pseudonyme : ",n.pseudonym,". E-mail : ",n.email,"."]})):A("Compte",o.jsx(E,{to:"/compte/",children:"Tableau de bord"})):A("Compte",o.jsx(E,{to:"/connexion/",children:"Connexion"}))}function Zf(e,n){const s=[`Facture ${e}`,"Luna — [RAISON SOCIALE]",`Paiement ${n}`,"Document de démonstration"].map((c,f)=>`BT /F1 12 Tf 50 ${780-f*24} Td (${c}) Tj ET`).join(`
`),i=`%PDF-1.4
1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj
2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj
3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj
4 0 obj ${`<< /Length ${s.length} >>
stream
${s}
endstream`} endobj
5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj
xref
0 6
trailer << /Root 1 0 R >>
startxref
0
%%EOF`,a=new Blob([i],{type:"application/pdf"}),u=URL.createObjectURL(a),l=document.createElement("a");l.href=u,l.download=`${e}.pdf`,l.click()}function ev(){return o.jsx(xf,{children:o.jsx(qf,{children:o.jsx(Pf,{})})})}const ku=document.getElementById("root");ku&&S.init().then(()=>{Fc(ku).render(o.jsx(ev,{}))});
