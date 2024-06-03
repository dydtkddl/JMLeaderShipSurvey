import{_ as l,v as y,c as m,w as k,r as R,f as G,j as s,h as S,b as P,e as T,B as p,W as $}from"./index-bd824a2b.js";import{R as L,L as N}from"./logo-116e9b77.js";import{c as w,s as M,T as f,g as F}from"./Button-d619c2c6.js";import{s as _}from"./Link-adc09490.js";const B=["className","component","disableGutters","fixed","maxWidth","classes"],H=y(),U=_("div",{name:"MuiContainer",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:i}=o;return[t.root,t[`maxWidth${m(String(i.maxWidth))}`],i.fixed&&t.fixed,i.disableGutters&&t.disableGutters]}}),z=o=>k({props:o,name:"MuiContainer",defaultTheme:H}),D=(o,t)=>{const i=a=>P(t,a),{classes:u,fixed:x,disableGutters:h,maxWidth:e}=o,n={root:["root",e&&`maxWidth${m(String(e))}`,x&&"fixed",h&&"disableGutters"]};return w(n,i,u)};function E(o={}){const{createStyledComponent:t=U,useThemeProps:i=z,componentName:u="MuiContainer"}=o,x=t(({theme:e,ownerState:n})=>l({width:"100%",marginLeft:"auto",boxSizing:"border-box",marginRight:"auto",display:"block"},!n.disableGutters&&{paddingLeft:e.spacing(2),paddingRight:e.spacing(2),[e.breakpoints.up("sm")]:{paddingLeft:e.spacing(3),paddingRight:e.spacing(3)}}),({theme:e,ownerState:n})=>n.fixed&&Object.keys(e.breakpoints.values).reduce((a,r)=>{const c=r,d=e.breakpoints.values[c];return d!==0&&(a[e.breakpoints.up(c)]={maxWidth:`${d}${e.breakpoints.unit}`}),a},{}),({theme:e,ownerState:n})=>l({},n.maxWidth==="xs"&&{[e.breakpoints.up("xs")]:{maxWidth:Math.max(e.breakpoints.values.xs,444)}},n.maxWidth&&n.maxWidth!=="xs"&&{[e.breakpoints.up(n.maxWidth)]:{maxWidth:`${e.breakpoints.values[n.maxWidth]}${e.breakpoints.unit}`}}));return R.forwardRef(function(n,a){const r=i(n),{className:c,component:d="div",disableGutters:b=!1,fixed:C=!1,maxWidth:j="lg"}=r,W=G(r,B),g=l({},r,{component:d,disableGutters:b,fixed:C,maxWidth:j}),v=D(g,u);return s.jsx(x,l({as:d,ownerState:g,className:S(v.root,c),ref:a},W))})}const A=E({createStyledComponent:M("div",{name:"MuiContainer",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:i}=o;return[t.root,t[`maxWidth${m(String(i.maxWidth))}`],i.fixed&&t.fixed,i.disableGutters&&t.disableGutters]}}),useThemeProps:o=>T({props:o,name:"MuiContainer"})}),I=A;function O(){const o=s.jsx(p,{component:"header",sx:{top:0,left:0,width:1,lineHeight:0,position:"fixed",p:t=>({xs:t.spacing(3,3,0),sm:t.spacing(5,5,0)})},children:s.jsx(N,{})});return s.jsxs(s.Fragment,{children:[o,s.jsx(I,{children:s.jsxs(p,{sx:{py:12,maxWidth:480,mx:"auto",display:"flex",minHeight:"100vh",textAlign:"center",alignItems:"center",flexDirection:"column",justifyContent:"center"},children:[s.jsx(f,{variant:"h3",sx:{mb:3},children:"Sorry, page not found!"}),s.jsx(f,{sx:{color:"text.secondary"},children:"Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling."}),s.jsx(p,{component:"img",src:"/assets/illustrations/illustration_404.svg",sx:{mx:"auto",height:260,my:{xs:5,sm:10}}}),s.jsx(F,{href:"/",size:"large",variant:"contained",component:L,children:"Go to Home"})]})})]})}function Q(){return s.jsxs(s.Fragment,{children:[s.jsx($,{children:s.jsx("title",{children:" 404 Page Not Found "})}),s.jsx(O,{})]})}export{Q as default};
