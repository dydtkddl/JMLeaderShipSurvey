import{g as C,b as I,c as r,_ as a,d as x,r as f,e as $,f as R,j as d,h as B}from"./index-1fb307e2.js";import{s as E,B as L,c as P,T as j}from"./Button-10252383.js";import{u as M,F as T}from"./iconify-e2bc7aea.js";function _(o){return I("MuiIconButton",o)}const F=C("MuiIconButton",["root","disabled","colorInherit","colorPrimary","colorSecondary","colorError","colorInfo","colorSuccess","colorWarning","edgeStart","edgeEnd","sizeSmall","sizeMedium","sizeLarge"]),N=F,k=["edge","children","className","color","disabled","disableFocusRipple","size"],U=o=>{const{classes:t,disabled:e,color:n,edge:s,size:i}=o,c={root:["root",e&&"disabled",n!=="default"&&`color${r(n)}`,s&&`edge${r(s)}`,`size${r(i)}`]};return P(c,_,t)},O=E(L,{name:"MuiIconButton",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:e}=o;return[t.root,e.color!=="default"&&t[`color${r(e.color)}`],e.edge&&t[`edge${r(e.edge)}`],t[`size${r(e.size)}`]]}})(({theme:o,ownerState:t})=>a({textAlign:"center",flex:"0 0 auto",fontSize:o.typography.pxToRem(24),padding:8,borderRadius:"50%",overflow:"visible",color:(o.vars||o).palette.action.active,transition:o.transitions.create("background-color",{duration:o.transitions.duration.shortest})},!t.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${o.vars.palette.action.activeChannel} / ${o.vars.palette.action.hoverOpacity})`:x(o.palette.action.active,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},t.edge==="start"&&{marginLeft:t.size==="small"?-3:-12},t.edge==="end"&&{marginRight:t.size==="small"?-3:-12}),({theme:o,ownerState:t})=>{var e;const n=(e=(o.vars||o).palette)==null?void 0:e[t.color];return a({},t.color==="inherit"&&{color:"inherit"},t.color!=="inherit"&&t.color!=="default"&&a({color:n==null?void 0:n.main},!t.disableRipple&&{"&:hover":a({},n&&{backgroundColor:o.vars?`rgba(${n.mainChannel} / ${o.vars.palette.action.hoverOpacity})`:x(n.main,o.palette.action.hoverOpacity)},{"@media (hover: none)":{backgroundColor:"transparent"}})}),t.size==="small"&&{padding:5,fontSize:o.typography.pxToRem(18)},t.size==="large"&&{padding:12,fontSize:o.typography.pxToRem(28)},{[`&.${N.disabled}`]:{backgroundColor:"transparent",color:(o.vars||o).palette.action.disabled}})}),S=f.forwardRef(function(t,e){const n=$({props:t,name:"MuiIconButton"}),{edge:s=!1,children:i,className:c,color:p="default",disabled:g=!1,disableFocusRipple:u=!1,size:m="medium"}=n,b=R(n,k),l=a({},n,{edge:s,color:p,disabled:g,disableFocusRipple:u,size:m}),v=U(l);return d.jsx(O,a({className:B(v.root,c),centerRipple:!0,focusRipple:!u,disabled:g,ref:e},b,{ownerState:l,children:i}))}),Y=S;function W(o){return I("MuiInputAdornment",o)}const H=C("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),y=H;var z;const q=["children","className","component","disablePointerEvents","disableTypography","position","variant"],D=(o,t)=>{const{ownerState:e}=o;return[t.root,t[`position${r(e.position)}`],e.disablePointerEvents===!0&&t.disablePointerEvents,t[e.variant]]},G=o=>{const{classes:t,disablePointerEvents:e,hiddenLabel:n,position:s,size:i,variant:c}=o,p={root:["root",e&&"disablePointerEvents",s&&`position${r(s)}`,c,n&&"hiddenLabel",i&&`size${r(i)}`]};return P(p,W,t)},J=E("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:D})(({theme:o,ownerState:t})=>a({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(o.vars||o).palette.action.active},t.variant==="filled"&&{[`&.${y.positionStart}&:not(.${y.hiddenLabel})`]:{marginTop:16}},t.position==="start"&&{marginRight:8},t.position==="end"&&{marginLeft:8},t.disablePointerEvents===!0&&{pointerEvents:"none"})),K=f.forwardRef(function(t,e){const n=$({props:t,name:"MuiInputAdornment"}),{children:s,className:i,component:c="div",disablePointerEvents:p=!1,disableTypography:g=!1,position:u,variant:m}=n,b=R(n,q),l=M()||{};let v=m;m&&l.variant,l&&!v&&(v=l.variant);const h=a({},n,{hiddenLabel:l.hiddenLabel,size:l.size,disablePointerEvents:p,position:u,variant:v}),A=G(h);return d.jsx(T.Provider,{value:null,children:d.jsx(J,a({as:c,ownerState:h,className:B(A.root,i),ref:e},b,{children:typeof s=="string"&&!g?d.jsx(j,{color:"text.secondary",children:s}):d.jsxs(f.Fragment,{children:[u==="start"?z||(z=d.jsx("span",{className:"notranslate",children:"​"})):null,s]})}))})}),Z=K;export{Z as I,Y as a};
