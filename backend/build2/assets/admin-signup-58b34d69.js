import{u as g,r as x,j as e,B as f,a as j,W as w}from"./index-1fe25cfa.js";import{T as o,L as y,b as S}from"./css-660a57a0.js";import{L as b}from"./logo-523dca9f.js";import{S as d,C,I as T}from"./iconify-6ce7d3e1.js";import{L as I}from"./Link-007fcfc9.js";import{T as D}from"./Button-9cb57f13.js";import"./Paper-75b97886.js";function F(){const p=g(),[r,u]=x.useState({userid:"",password:""}),n=i=>{const{name:l,value:c}=i.target,t={...r,[l]:c};u(t)},m=async i=>{if(i.preventDefault(),["userid","password"].some(s=>!r[s])){window.alert("Please fill in all required fields.");return}const t={...r};try{console.log(t);const s=await fetch("https://jmleadership.pythonanywhere.com/adminsignup_backend/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),a=await s.json();a.message==="EXISTS_ID"?(console.log(a),window.alert("The same ID exists")):a.message==="success"?(window.alert("success"),window.location.href="/adminsignin"):console.log("서버오류 : ",s.status)}catch(s){console.error("오류:",s)}},h=e.jsxs(e.Fragment,{children:[e.jsxs(d,{spacing:3,children:[e.jsx(o,{label:"ID",name:"userid",margin:"dense",required:!0,fullWidth:!0,onChange:n}),e.jsx(o,{label:"PassWord",type:"password",name:"password",required:!0,fullWidth:!0,onChange:n,margin:"dense"}),e.jsx(o,{label:"Password Confirm",type:"password",name:"passwordConfirm",required:!0,fullWidth:!0,margin:"dense",onChange:n,error:r.ispasswordMatch===!1,helperText:r.errormessage})]}),e.jsx(y,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:m,sx:{mt:3},children:"SignIn"})]});return e.jsxs(f,{sx:{...S({color:j(p.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[e.jsx(b,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),e.jsx(d,{alignItems:"center",justifyContent:"center",sx:{height:1},children:e.jsxs(C,{sx:{p:5,width:1,maxWidth:420},children:[e.jsxs(d,{direction:"row",spacing:2,alignItems:"center",position:"relative",children:[e.jsx(I,{href:"signin",children:e.jsx(T,{position:"absolute",sx:{top:9},icon:"ic:twotone-arrow-back-ios"})}),e.jsx(D,{variant:"h4",sx:{pl:2,pb:5},children:"Sign Up"})]}),e.jsx("form",{children:h})]})})]})}function U(){return e.jsxs(e.Fragment,{children:[e.jsx(w,{children:e.jsx("title",{children:" SignUp "})}),e.jsx(F,{})]})}export{U as default};
