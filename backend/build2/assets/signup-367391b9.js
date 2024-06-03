import{u as M,r as _,j as e,B as C,a as E,W as Y}from"./index-1fe25cfa.js";import{T as n,F as S,L as F,b as O}from"./css-660a57a0.js";import{L as v}from"./logo-523dca9f.js";import{S as u,C as T,I as q}from"./iconify-6ce7d3e1.js";import{G as l}from"./Grid-d76d40a7.js";import{R as W,F as p,a as g}from"./FormControlLabel-37669a99.js";import{L}from"./Link-007fcfc9.js";import{T as I}from"./Button-9cb57f13.js";import"./Paper-75b97886.js";const R=/^(19[0-9][0-9]|20\d{2})$/,B=/^([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])$/,G=/^(1[0-2]|[1-9]|0[1-9])$/;function $(){const b=M(),[t,m]=_.useState({name:"",birthdate_YY:"",birthdate_MM:"",birthdate_DD:"",userid:"",password:"",passwordConfirm:"",gender:"",ispasswordMatch:!0,isyearOk:!0,ismonthOk:!0,isdayOk:!0,submitokay:!1,passwordMatchError:"",birYearError:"",birMonthError:"",birDayError:""}),i=d=>{const{name:s,value:a}=d.target,r={...t,[s]:a};s==="passwordConfirm"&&(r.submitokay=!0,r.ispasswordMatch=a===t.password),s.slice(0,-3)==="birthdate"&&(s==="birthdate_YY"&&!R.test(a)?(r.isyearOk=!1,r.birYearError="태어난 년도 4자리를 정확하게 입력하세요."):(r.isyearOk=!0,r.birYearError="",r.submitokay=!0),s==="birthdate_MM"&&!G.test(a)?(r.ismonthOk=!1,r.birMonthError="태어난 월을 정확하게 입력해주세요"):(r.ismonthOk=!0,r.birMonthError="",r.submitokay=!0),s==="birthdate_DD"&&!B.test(a)?(r.isdayOk=!1,r.birDayError="태어난 일을 정확하게 입력해주세요"):(r.birDayError="",r.isdayOk=!0,r.submitokay=!0)),m(r)},x=d=>{const{value:s}=d.target;m(a=>({...a,gender:s}))},f=async d=>{if(d.preventDefault(),["name","birthdate_YY","birthdate_MM","birthdate_DD","userid","password","passwordConfirm","gender"].some(o=>!t[o])){window.alert("Please fill in all required fields.");return}const{birthdate_YY:r,birthdate_MM:y,birthdate_DD:w,...D}=t,k=`${r}/${y}/${w}`,c={...D,birthdate:k};try{console.log(c);const o=await fetch("https://jmleadership.pythonanywhere.com/signup_backend/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)}),h=await o.json();h.message==="EXISTS_ID"?(console.log(h),window.alert("The same ID exists")):h.message==="success"?(window.alert("success"),window.location.href="/signin"):console.log("서버오류 : ",o.status)}catch(o){console.error("오류:",o)}},j=e.jsxs(e.Fragment,{children:[e.jsxs(u,{spacing:3,children:[e.jsx(n,{label:"Name",name:"name",margin:"dense",required:!0,fullWidth:!0,autoFocus:!0,onChange:i}),e.jsxs(l,{container:!0,children:[e.jsx(l,{item:!0,xs:4,paddingRight:"4px",children:e.jsx(n,{label:"Birth Year",name:"birthdate_YY",margin:"dense",required:!0,fullWidth:!0,value:t.birthdate_YY,onChange:i,error:t.isyearOk===!1,helperText:t.birYearError})}),e.jsx(l,{item:!0,xs:4,children:e.jsx(n,{label:"Birth Month",name:"birthdate_MM",margin:"dense",required:!0,fullWidth:!0,value:t.birthdate_MM,onChange:i,error:t.ismonthOk===!1,helperText:t.birMonthError})}),e.jsx(l,{item:!0,xs:4,paddingLeft:"4px",children:e.jsx(n,{label:"Birth Date",name:"birthdate_DD",margin:"dense",required:!0,fullWidth:!0,value:t.birthdate_DD,onChange:i,error:t.isdayOk===!1,helperText:t.birDayError})})]}),e.jsx(S,{component:"legend",children:"Gender"}),e.jsxs(W,{row:!0,"aria-label":"gender",name:"gender",value:t.gender,onChange:x,children:[e.jsx(p,{value:"male",control:e.jsx(g,{}),label:"Male"}),e.jsx(p,{value:"female",control:e.jsx(g,{}),label:"Female"})]}),e.jsx(n,{label:"ID",name:"userid",margin:"dense",required:!0,fullWidth:!0,onChange:i}),e.jsx(n,{label:"Password",type:"password",name:"password",required:!0,fullWidth:!0,onChange:i,margin:"dense"}),e.jsx(n,{label:"Password Confirm",type:"password",name:"passwordConfirm",required:!0,fullWidth:!0,margin:"dense",onChange:i,error:t.ispasswordMatch===!1,helperText:t.errormessage})]}),e.jsx(F,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:f,sx:{mt:3},children:"Sign Up"})]});return e.jsxs(C,{sx:{...O({color:E(b.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[e.jsx(v,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),e.jsx(u,{alignItems:"center",justifyContent:"center",sx:{height:1},children:e.jsxs(T,{sx:{p:5,width:1,maxWidth:420},children:[e.jsxs(u,{direction:"row",spacing:2,alignItems:"center",position:"relative",children:[e.jsx(L,{href:"signin",children:e.jsx(q,{position:"absolute",sx:{top:9},icon:"ic:twotone-arrow-back-ios"})}),e.jsx(I,{variant:"h4",sx:{pl:2,pb:5},children:"Sign Up"})]}),e.jsx("form",{children:j})]})})]})}function K(){return e.jsxs(e.Fragment,{children:[e.jsx(Y,{children:e.jsx("title",{children:" SignUp "})}),e.jsx($,{})]})}export{K as default};
