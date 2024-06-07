import{b as y,g as h,c as f,_ as l,r as x,e as k,f as B,j as t,h as C,W as T}from"./index-95278824.js";import{G as u}from"./Grid-31ae232f.js";import{s as j,c as A,T as v,g as m}from"./Button-be02418c.js";import{P as R}from"./Paper-5de84e29.js";function D(o){return y("MuiAppBar",o)}h("MuiAppBar",["root","positionFixed","positionAbsolute","positionSticky","positionStatic","positionRelative","colorDefault","colorPrimary","colorSecondary","colorInherit","colorTransparent","colorError","colorInfo","colorSuccess","colorWarning"]);const I=["className","color","enableColorOnDark","position"],$=o=>{const{color:r,position:a,classes:s}=o,c={root:["root",`color${f(r)}`,`position${f(a)}`]};return A(c,D,s)},g=(o,r)=>o?`${o==null?void 0:o.replace(")","")}, ${r})`:r,U=j(R,{name:"MuiAppBar",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:a}=o;return[r.root,r[`position${f(a.position)}`],r[`color${f(a.color)}`]]}})(({theme:o,ownerState:r})=>{const a=o.palette.mode==="light"?o.palette.grey[100]:o.palette.grey[900];return l({display:"flex",flexDirection:"column",width:"100%",boxSizing:"border-box",flexShrink:0},r.position==="fixed"&&{position:"fixed",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0,"@media print":{position:"absolute"}},r.position==="absolute"&&{position:"absolute",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},r.position==="sticky"&&{position:"sticky",zIndex:(o.vars||o).zIndex.appBar,top:0,left:"auto",right:0},r.position==="static"&&{position:"static"},r.position==="relative"&&{position:"relative"},!o.vars&&l({},r.color==="default"&&{backgroundColor:a,color:o.palette.getContrastText(a)},r.color&&r.color!=="default"&&r.color!=="inherit"&&r.color!=="transparent"&&{backgroundColor:o.palette[r.color].main,color:o.palette[r.color].contrastText},r.color==="inherit"&&{color:"inherit"},o.palette.mode==="dark"&&!r.enableColorOnDark&&{backgroundColor:null,color:null},r.color==="transparent"&&l({backgroundColor:"transparent",color:"inherit"},o.palette.mode==="dark"&&{backgroundImage:"none"})),o.vars&&l({},r.color==="default"&&{"--AppBar-background":r.enableColorOnDark?o.vars.palette.AppBar.defaultBg:g(o.vars.palette.AppBar.darkBg,o.vars.palette.AppBar.defaultBg),"--AppBar-color":r.enableColorOnDark?o.vars.palette.text.primary:g(o.vars.palette.AppBar.darkColor,o.vars.palette.text.primary)},r.color&&!r.color.match(/^(default|inherit|transparent)$/)&&{"--AppBar-background":r.enableColorOnDark?o.vars.palette[r.color].main:g(o.vars.palette.AppBar.darkBg,o.vars.palette[r.color].main),"--AppBar-color":r.enableColorOnDark?o.vars.palette[r.color].contrastText:g(o.vars.palette.AppBar.darkColor,o.vars.palette[r.color].contrastText)},{backgroundColor:"var(--AppBar-background)",color:r.color==="inherit"?"inherit":"var(--AppBar-color)"},r.color==="transparent"&&{backgroundImage:"none",backgroundColor:"transparent",color:"inherit"}))}),z=x.forwardRef(function(r,a){const s=k({props:r,name:"MuiAppBar"}),{className:c,color:n="primary",enableColorOnDark:e=!1,position:p="fixed"}=s,i=B(s,I),d=l({},s,{color:n,position:p,enableColorOnDark:e}),b=$(d);return t.jsx(U,l({square:!0,component:"header",ownerState:d,elevation:4,className:C(b.root,c,p==="fixed"&&"mui-fixed"),ref:a},i))}),G=z;function _(o){return y("MuiToolbar",o)}h("MuiToolbar",["root","gutters","regular","dense"]);const E=["className","component","disableGutters","variant"],L=o=>{const{classes:r,disableGutters:a,variant:s}=o;return A({root:["root",!a&&"gutters",s]},_,r)},M=j("div",{name:"MuiToolbar",slot:"Root",overridesResolver:(o,r)=>{const{ownerState:a}=o;return[r.root,!a.disableGutters&&r.gutters,r[a.variant]]}})(({theme:o,ownerState:r})=>l({position:"relative",display:"flex",alignItems:"center"},!r.disableGutters&&{paddingLeft:o.spacing(2),paddingRight:o.spacing(2),[o.breakpoints.up("sm")]:{paddingLeft:o.spacing(3),paddingRight:o.spacing(3)}},r.variant==="dense"&&{minHeight:48}),({theme:o,ownerState:r})=>r.variant==="regular"&&o.mixins.toolbar),O=x.forwardRef(function(r,a){const s=k({props:r,name:"MuiToolbar"}),{className:c,component:n="div",disableGutters:e=!1,variant:p="regular"}=s,i=B(s,E),d=l({},s,{component:n,disableGutters:e,variant:p}),b=L(d);return t.jsx(M,l({as:n,className:C(b.root,c),ref:a,ownerState:d},i))}),P=O;function N(){const[o,r]=x.useState(""),a=localStorage.getItem("admin");x.useEffect(()=>{(async()=>{try{const e=await fetch("https://jmleadership.pythonanywhere.com/get_user_info/",{method:"GET",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"}});if(e.ok){const p=await e.json();r(p.username)}}catch(e){console.error("Error fetching user data:",e)}})()},[a]);const s=async()=>{try{const n=await fetch("https://jmleadership.pythonanywhere.com/export_survey_responses/",{method:"GET",headers:{Authorization:`Bearer ${a}`,"Content-Type":"application/json"}});if(n.ok){console.log("success");const e=await n.blob(),p=window.URL.createObjectURL(e),i=document.createElement("a");i.href=p,i.download="survey_results.xlsx",document.body.appendChild(i),i.click(),i.remove()}else console.error("Failed to download results")}catch(n){console.error("Error downloading results:",n)}},c=()=>{localStorage.removeItem("admin"),window.location.href="/signin"};return t.jsxs(u,{container:!0,spacing:2,style:{padding:20},children:[t.jsx(G,{position:"static",sx:{backgroundColor:"#ffffff00"},children:t.jsxs(P,{children:[t.jsx(v,{variant:"h6",style:{flexGrow:1},children:o}),t.jsx(m,{variant:"contained",onClick:c,children:"Logout"})]})}),t.jsxs(u,{item:!0,xs:12,children:[t.jsx(v,{variant:"h4",children:"Admin Panel"}),t.jsx(v,{variant:"body1",style:{margin:"20px 0"},children:"This section is for admins only. Here, you can manage survey results and download participant data."})]}),t.jsx(u,{item:!0,xs:12,children:t.jsx(m,{variant:"contained",color:"primary",onClick:s,children:"Download Results"})}),t.jsx(u,{item:!0,xs:12})]})}function V(){return t.jsxs(t.Fragment,{children:[t.jsx(T,{children:t.jsx("title",{children:" admin data download "})}),t.jsx(N,{})]})}export{V as default};
