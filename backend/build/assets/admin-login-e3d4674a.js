import{u as f,r as d,j as e,B as j,a as w,W as y}from"./index-d1e62de7.js";import{T as c,L as I,b as S}from"./css-faf46cdb.js";import{L as b}from"./logo-231938e8.js";import{S as m,I as v,C}from"./iconify-9af3f04e.js";import{I as L,a as k}from"./InputAdornment-1a996e0c.js";import{T}from"./Button-f2a30209.js";import"./Paper-1023c101.js";import"./Link-f75607f8.js";function D(){const p=f(),[n,g]=d.useState(!1),[t,r]=d.useState({userid:"",password:""});function i(s){const o={...t};o[s.target.name]=s.target.value,r(o)}const h=async s=>{s.preventDefault(),console.log(t);try{const a=await(await fetch("http://127.0.0.1:8000/adminlogin/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).json();if(console.log(a),a.message==="success"){console.log("로그인성공");const{token:l,name:x}=a;localStorage.setItem("token",l),localStorage.setItem("name",x),localStorage.setItem("admin",l),window.location.href="/adminpage"}else window.alert("ID or password is incorrect"),r({userid:"",password:""})}catch(o){window.alert("not match"),console.error("오류:",o)}},u=e.jsxs(e.Fragment,{children:[e.jsxs(m,{spacing:3,children:[e.jsx(c,{name:"userid",label:"admin ID",value:t.userid,onChange:s=>i(s),required:!0}),e.jsx(c,{value:t.password,name:"password",label:"Password",type:n?"text":"password",onChange:s=>i(s),InputProps:{endAdornment:e.jsx(L,{position:"end",children:e.jsx(k,{onClick:()=>g(!n),edge:"end",children:e.jsx(v,{icon:n?"eva:eye-fill":"eva:eye-off-fill"})})})}})]}),e.jsx(I,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:h,children:"Login"})]});return e.jsxs(j,{sx:{...S({color:w(p.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[e.jsx(b,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),e.jsx(m,{alignItems:"center",justifyContent:"center",sx:{height:1},children:e.jsxs(C,{sx:{p:5,width:1,maxWidth:420},children:[e.jsx(T,{variant:"h4",children:"ADMIN Sign in"}),u]})})]})}function V(){return e.jsxs(e.Fragment,{children:[e.jsx(y,{children:e.jsx("title",{children:" Login "})}),e.jsx(D,{})]})}export{V as default};
