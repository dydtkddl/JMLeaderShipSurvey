import{u as f,r as d,j as e,B as j,a as w,W as y}from"./index-bd824a2b.js";import{T as c,L as I,b as S}from"./css-73f84cbe.js";import{L as b}from"./logo-116e9b77.js";import{S as m,I as v,C}from"./iconify-4a3e51cd.js";import{I as L,a as k}from"./InputAdornment-6ac0d799.js";import{T}from"./Button-d619c2c6.js";import"./Paper-44cc8530.js";import"./Link-adc09490.js";function D(){const p=f(),[n,h]=d.useState(!1),[t,r]=d.useState({userid:"",password:""});function i(s){const o={...t};o[s.target.name]=s.target.value,r(o)}const g=async s=>{s.preventDefault(),console.log(t);try{const a=await(await fetch("https://jmleadership.pythonanywhere.com/adminlogin/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json();if(console.log(a),a.message==="success"){console.log("로그인성공");const{token:l,name:x}=a;localStorage.setItem("token",l),localStorage.setItem("name",x),localStorage.setItem("admin",l),window.location.href="/adminpage"}else window.alert("ID or password is incorrect"),r({userid:"",password:""})}catch(o){window.alert("not match"),console.error("오류:",o)}},u=e.jsxs(e.Fragment,{children:[e.jsxs(m,{spacing:3,children:[e.jsx(c,{name:"userid",label:"admin ID",value:t.userid,onChange:s=>i(s),required:!0}),e.jsx(c,{value:t.password,name:"password",label:"Password",type:n?"text":"password",onChange:s=>i(s),InputProps:{endAdornment:e.jsx(L,{position:"end",children:e.jsx(k,{onClick:()=>h(!n),edge:"end",children:e.jsx(v,{icon:n?"eva:eye-fill":"eva:eye-off-fill"})})})}})]}),e.jsx(I,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:g,children:"Login"})]});return e.jsxs(j,{sx:{...S({color:w(p.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[e.jsx(b,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),e.jsx(m,{alignItems:"center",justifyContent:"center",sx:{height:1},children:e.jsxs(C,{sx:{p:5,width:1,maxWidth:420},children:[e.jsx(T,{variant:"h4",children:"ADMIN Sign in"}),u]})})]})}function V(){return e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsx("title",{children:" Login "})}),e.jsx(D,{})]})}export{V as default};
