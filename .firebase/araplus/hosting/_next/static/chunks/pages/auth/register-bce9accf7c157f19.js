(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[461],{3829:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/auth/register",function(){return n(2565)}])},926:function(e,r,n){"use strict";n.d(r,{a:function(){return o}});var t=n(7294),i=n(261);let o=()=>(0,t.useContext)(i.Vo)},4285:function(e,r,n){"use strict";n.d(r,{A:function(){return c}});var t=n(5893),i=n(5697),o=n.n(i),a=n(1664),s=n.n(a),l=n(7357),u=n(1426),d=n(5861);let c=e=>{let{children:r}=e;return(0,t.jsx)(l.Z,{component:"main",sx:{display:"flex",flex:"1 1 auto"},children:(0,t.jsxs)(u.Z,{container:!0,sx:{flex:"1 1 auto"},children:[(0,t.jsxs)(u.Z,{xs:12,lg:6,sx:{backgroundColor:"background.paper",display:"flex",flexDirection:"column",position:"relative"},children:[(0,t.jsx)(l.Z,{component:"header",sx:{left:0,p:3,position:"fixed",top:0,width:"100%"},children:(0,t.jsx)(l.Z,{component:s(),href:"/",sx:{display:"inline-flex",height:32,width:32},children:(0,t.jsx)("img",{src:"/assets/logo.svg",alt:"my image"})})}),r]}),(0,t.jsx)(u.Z,{xs:12,lg:6,sx:{alignItems:"center",background:"radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",color:"white",display:"flex",justifyContent:"center","& img":{maxWidth:"100%"}},children:(0,t.jsxs)(l.Z,{sx:{p:3},children:[(0,t.jsxs)(d.Z,{align:"center",color:"inherit",sx:{fontSize:"24px",lineHeight:"32px",mb:1},variant:"h1",children:["أهلا بكم في"," ",(0,t.jsx)(l.Z,{component:"a",sx:{color:"#8DAF47"},target:"_blank",children:"ARA"})]}),(0,t.jsx)("img",{alt:"",src:"/assets/auth-illustration.svg"})]})})]})})};c.prototypes={children:o().node}},2565:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return $}});var t=n(5893),i=n(9008),o=n.n(i),a=n(1664),s=n.n(a),l=n(9332),u=n(8482),d=n(6310),c=n(7357),h=n(6447),m=n(5861),x=n(3366),p=n(7462),g=n(7294),f=n(6010),b=n(4780),v=n(8216),y=n(948),Z=n(1657),j=n(8791),w=n(1705),C=n(1588),k=n(4867);function _(e){return(0,k.Z)("MuiLink",e)}let A=(0,C.Z)("MuiLink",["root","underlineNone","underlineHover","underlineAlways","button","focusVisible"]);var S=n(4844),D=n(1796);let N={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},W=e=>N[e]||e;var B=({theme:e,ownerState:r})=>{let n=W(r.color),t=(0,S.DW)(e,`palette.${n}`,!1)||r.color,i=(0,S.DW)(e,`palette.${n}Channel`);return"vars"in e&&i?`rgba(${i} / 0.4)`:(0,D.Fq)(t,.4)};let E=["className","color","component","onBlur","onFocus","TypographyClasses","underline","variant","sx"],R=e=>{let{classes:r,component:n,focusVisible:t,underline:i}=e,o={root:["root",`underline${(0,v.Z)(i)}`,"button"===n&&"button",t&&"focusVisible"]};return(0,b.Z)(o,_,r)},T=(0,y.ZP)(m.Z,{name:"MuiLink",slot:"Root",overridesResolver:(e,r)=>{let{ownerState:n}=e;return[r.root,r[`underline${(0,v.Z)(n.underline)}`],"button"===n.component&&r.button]}})(({theme:e,ownerState:r})=>(0,p.Z)({},"none"===r.underline&&{textDecoration:"none"},"hover"===r.underline&&{textDecoration:"none","&:hover":{textDecoration:"underline"}},"always"===r.underline&&(0,p.Z)({textDecoration:"underline"},"inherit"!==r.color&&{textDecorationColor:B({theme:e,ownerState:r})},{"&:hover":{textDecorationColor:"inherit"}}),"button"===r.component&&{position:"relative",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none","&::-moz-focus-inner":{borderStyle:"none"},[`&.${A.focusVisible}`]:{outline:"auto"}})),q=g.forwardRef(function(e,r){let n=(0,Z.Z)({props:e,name:"MuiLink"}),{className:i,color:o="primary",component:a="a",onBlur:s,onFocus:l,TypographyClasses:u,underline:d="always",variant:c="inherit",sx:h}=n,m=(0,x.Z)(n,E),{isFocusVisibleRef:b,onBlur:v,onFocus:y,ref:C}=(0,j.Z)(),[k,_]=g.useState(!1),A=(0,w.Z)(r,C),S=(0,p.Z)({},n,{color:o,component:a,focusVisible:k,underline:d,variant:c}),D=R(S);return(0,t.jsx)(T,(0,p.Z)({color:o,className:(0,f.Z)(D.root,i),classes:u,component:a,onBlur:e=>{v(e),!1===b.current&&_(!1),s&&s(e)},onFocus:e=>{y(e),!0===b.current&&_(!0),l&&l(e)},ref:A,ownerState:S,variant:c,sx:[...Object.keys(N).includes(o)?[]:[{color:o}],...Array.isArray(h)?h:[h]]},m))});var F=n(6515),L=n(3321),M=n(926),P=n(4285);let V=()=>{let e=(0,l.useRouter)(),r=(0,M.a)(),n=(0,u.TA)({initialValues:{email:"",name:"",password:"",submit:null},validationSchema:d.Ry({email:d.Z_().email("Must be a valid email").max(255).required("Email is required"),name:d.Z_().max(255).required("Name is required"),password:d.Z_().max(255).required("Password is required")}),onSubmit:async(n,t)=>{try{await r.signUp(n.email,n.name,n.password),e.push("/")}catch(e){t.setStatus({success:!1}),t.setErrors({submit:e.message}),t.setSubmitting(!1)}}});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o(),{children:(0,t.jsx)("title",{children:"Register | Devias Kit"})}),(0,t.jsx)(c.Z,{sx:{flex:"1 1 auto",alignItems:"center",display:"flex",justifyContent:"center"},children:(0,t.jsx)(c.Z,{sx:{maxWidth:550,px:3,py:"100px",width:"100%"},children:(0,t.jsxs)("div",{children:[(0,t.jsxs)(h.Z,{spacing:1,sx:{mb:3},children:[(0,t.jsx)(m.Z,{variant:"h4",children:"Register"}),(0,t.jsxs)(m.Z,{color:"text.secondary",variant:"body2",children:["Already have an account? \xa0",(0,t.jsx)(q,{component:s(),href:"/auth/login",underline:"hover",variant:"subtitle2",children:"Log in"})]})]}),(0,t.jsxs)("form",{noValidate:!0,onSubmit:n.handleSubmit,children:[(0,t.jsxs)(h.Z,{spacing:3,children:[(0,t.jsx)(F.Z,{error:!!(n.touched.name&&n.errors.name),fullWidth:!0,helperText:n.touched.name&&n.errors.name,label:"Name",name:"name",onBlur:n.handleBlur,onChange:n.handleChange,value:n.values.name}),(0,t.jsx)(F.Z,{error:!!(n.touched.email&&n.errors.email),fullWidth:!0,helperText:n.touched.email&&n.errors.email,label:"Email Address",name:"email",onBlur:n.handleBlur,onChange:n.handleChange,type:"email",value:n.values.email}),(0,t.jsx)(F.Z,{error:!!(n.touched.password&&n.errors.password),fullWidth:!0,helperText:n.touched.password&&n.errors.password,label:"Password",name:"password",onBlur:n.handleBlur,onChange:n.handleChange,type:"password",value:n.values.password})]}),n.errors.submit&&(0,t.jsx)(m.Z,{color:"error",sx:{mt:3},variant:"body2",children:n.errors.submit}),(0,t.jsx)(L.Z,{fullWidth:!0,size:"large",sx:{mt:3},type:"submit",variant:"contained",children:"Continue"})]})]})})})]})};V.getLayout=e=>(0,t.jsx)(P.A,{children:e});var $=V}},function(e){e.O(0,[394,904,709,703,760,783,774,888,179],function(){return e(e.s=3829)}),_N_E=e.O()}]);