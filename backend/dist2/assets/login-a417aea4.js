import{u as w,r as d,j as e,B as y,a as v,W as I}from"./index-d32fc211.js";import{T as m,L as b,b as S}from"./css-9b31c60c.js";import{L}from"./logo-6d5bb5b0.js";import{S as a,I as C,C as k}from"./iconify-a94b1346.js";import{I as D,a as T}from"./InputAdornment-fbc49d7b.js";import{L as i}from"./Link-24f9d0bf.js";import{T as h}from"./Button-b98eb45c.js";import"./Paper-b687ea86.js";function P(){const p=w(),[r,u]=d.useState(!1),[n,l]=d.useState({userid:"",password:""});function c(s){const t={...n};t[s.target.name]=s.target.value,l(t)}const g=async s=>{s.preventDefault(),console.log(n);try{const o=await(await fetch("https://jmleadership.pythonanywhere.com/login/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)})).json();if(console.log(o),o.message==="success"){console.log("로그인성공");const{token:f,name:j}=o;localStorage.setItem("token",f),localStorage.setItem("name",j),window.location.href="/"}else o.message==="ID or password is incorrect"&&(window.alert("ID or password is incorrect"),l({userid:"",password:""}))}catch(t){console.error("오류:",t)}},x=e.jsxs(e.Fragment,{children:[e.jsxs(a,{spacing:3,children:[e.jsx(m,{name:"userid",label:"User ID",value:n.userid,onChange:s=>c(s),required:!0}),e.jsx(m,{value:n.password,name:"password",label:"Password",type:r?"text":"password",onChange:s=>c(s),InputProps:{endAdornment:e.jsx(D,{position:"end",children:e.jsx(T,{onClick:()=>u(!r),edge:"end",children:e.jsx(C,{icon:r?"eva:eye-fill":"eva:eye-off-fill"})})})}})]}),e.jsx(a,{direction:"row",alignItems:"center",justifyContent:"flex-end",sx:{my:3},children:e.jsx(i,{variant:"subtitle2",underline:"hover",children:"Forgot password?"})}),e.jsx(b,{fullWidth:!0,size:"large",type:"submit",variant:"contained",color:"inherit",onClick:g,children:"Login"}),e.jsx(i,{href:"/adminsignin",children:"Are you admin?"})]});return e.jsxs(y,{sx:{...S({color:v(p.palette.background.default,.9),imgUrl:"/assets/background/overlay_4.jpg"}),height:1},children:[e.jsx(L,{sx:{position:"fixed",top:{xs:16,md:24},left:{xs:16,md:24}}}),e.jsx(a,{alignItems:"center",justifyContent:"center",sx:{height:1},children:e.jsxs(k,{sx:{p:5,width:1,maxWidth:420},children:[e.jsx(h,{variant:"h4",children:"JM Survey Sign in"}),e.jsxs(h,{variant:"body2",sx:{mt:2,mb:5},children:["Don’t have an account?",e.jsx(i,{variant:"subtitle2",sx:{ml:.5},href:"/signup",children:"Get started"})]}),x]})})]})}function U(){return e.jsxs(e.Fragment,{children:[e.jsx(I,{children:e.jsx("title",{children:" Login "})}),e.jsx(P,{})]})}export{U as default};
