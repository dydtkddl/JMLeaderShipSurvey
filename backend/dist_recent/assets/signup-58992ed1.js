import{u as y,r as k,j as e,B as E,a as C,W as Y}from"./index-a42fac35.js";import{T as n,F as S,L as F,b as v}from"./css-d2993a26.js";import{L as O}from"./logo-930822f9.js";import{S as m,C as T,I as q}from"./iconify-d347a262.js";import{R as D,F as h,a as p}from"./FormControlLabel-ec464454.js";import{L as W}from"./Link-e71238e1.js";import{T as _}from"./Typography-e8e340d9.js";import"./Button-e684f2b7.js";import"./Paper-045d3c87.js";const I=/^(19[0-9][0-9]|20\d{2})$/,L=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function P(){const g=y(),[s,u]=k.useState({name:"",email:"",birthdate_YY:"",userid:"",password:"",passwordConfirm:"",gender:"",ispasswordMatch:!0,isyearOk:!0,ismonthOk:!0,isdayOk:!0,isEmailOk:!0,submitokay:!1,passwordMatchError:"",birYearError:"",birMonthError:"",birDayError:"",emailError:""}),i=l=>{const{name:a,value:t}=l.target,r={...s,[a]:t};a==="email"&&!L.test(t)?(r.isEmailOk=!1,r.emailError="Please enter a valid email address. ex) xxx@google.com"):a==="email"&&(r.isEmailOk=!0,r.emailError="",r.submitokay=!0),a==="passwordConfirm"&&(r.submitokay=!0,r.ispasswordMatch=t===s.password),a.slice(0,-3)==="birthdate"&&(a==="birthdate_YY"&&!I.test(t)?(r.isyearOk=!1,r.birYearError="Please enter the 4-digit year of birth correctly. ex) 2000"):(r.isyearOk=!0,r.birYearError="",r.submitokay=!0)),u(r)},x=l=>{const{value:a}=l.target;u(t=>({...t,gender:a}))},f=async l=>{if(l.preventDefault(),["name","email","birthdate_YY","userid","password","passwordConfirm","gender"].some(o=>!s[o])){window.alert("Please fill in all required fields.");return}const{birthdate_YY:r,...j}=s,w=`${r}`,c={...j,birthdate:w};try{console.log(c);const o=await fetch("http://127.0.0.1:8000/signup_backend/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)}),d=await o.json();d.message==="EXISTS_ID"?(console.log(d),window.alert("The same ID exists")):d.message==="success"?(window.alert("success"),window.location.href="/signin"):console.log("서버오류 : ",o.status)}catch(o){console.error("오류:",o)}},b=e.jsxs(e.Fragment,{children:[e.jsxs(m,{spacing:3,children:[e.jsx(n,{label:"Name",name:"name",margin:"dense",required:!0,fullWidth:!0,autoFocus:!0,onChange:i}),e.jsx(n,{label:"Email",name:"email",margin:"dense",required:!0,fullWidth:!0,onChange:i,error:s.isEmailOk===!1,helperText:s.emailError}),e.jsx(n,{label:"ID",name:"userid",margin:"dense",required:!0,fullWidth:!0,onChange:i}),e.jsx(n,{label:"Password",type:"password",name:"password",required:!0,fullWidth:!0,onChange:i,margin:"dense"}),e.jsx(n,{label:"Password Confirm",type:"password",name:"passwordConfirm",required:!0,fullWidth:!0,margin:"dense",onChange:i,error:s.ispasswordMatch===!1,helperText:s.errormessage}),e.jsx(S,{component:"legend",children:"Gender"}),e.jsxs(D,{row:!0,"aria-label":"gender",name:"gender",value:s.gender,onChange:x,children:[e.jsx(h,{value:"male",control:e.jsx(p,{}),label:"Male"}),e.jsx(h,{value:"female",control:e.jsx(p,{}),label:"Female"})]}),e.jsx(n,{label:"Birth Year",name:"birthdate_YY",margin:"dense",required:!0,fullWidth:!0,value:s.birthdate_YY,onChange:i,error:s.isyearOk===!1,helperText:s.birYearError})]}),e.jsx(F,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:f,sx:{mt:3},children:"Sign Up"})]});return e.jsxs(E,{sx:{...v({color:C(g.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[e.jsx(O,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),e.jsx(m,{alignItems:"center",justifyContent:"center",sx:{height:1},children:e.jsxs(T,{sx:{p:5,width:1,maxWidth:420},children:[e.jsxs(m,{direction:"row",spacing:2,alignItems:"center",position:"relative",children:[e.jsx(W,{href:"/signin",children:e.jsx(q,{position:"absolute",sx:{top:9},icon:"ic:twotone-arrow-back-ios"})}),e.jsx(_,{variant:"h4",sx:{pl:2,pb:5},children:"Sign Up"})]}),e.jsx("form",{children:b})]})})]})}function z(){return e.jsxs(e.Fragment,{children:[e.jsx(Y,{children:e.jsx("title",{children:" SignUp "})}),e.jsx(P,{})]})}export{z as default};
