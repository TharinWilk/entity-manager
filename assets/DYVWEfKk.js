const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./CumMLxI7.js","./zdSoBpvb.js","./CMyMP_Ly.js","./entry.DAiuen1A.css","./DlAUqK2U.js","./data-manager.DQEguKTQ.css","./rTXGKihM.js","./DAe8SwUm.js","./uMVcZGof.js","./Icon.Dan13sfw.css","./Dialog.DJ8JYDDE.css","./BRiUadZn.js","./AddManager.BQ7v2t6X.css"])))=>i.map(i=>d[i]);
import{d as T,r as h,o as G,Q as ue,x as w,v as _,R as se,y as l,S as _e,A as o,C as V,z as k,J as j,j as W,M as J,N as D,B as r,I as e,U,V as Q,F as B,G as X,W as re,L as q,H as P,X as Y,K as O,_ as L,D as Z,E as ee,P as ce,Y as ie,Z as me,T as fe}from"./CMyMP_Ly.js";import F from"./DAe8SwUm.js";import{_ as N}from"./DlAUqK2U.js";import{u as te,_ as R,a as H}from"./zdSoBpvb.js";const pe=Symbol.for("nuxt:client-only"),oe=T({name:"ClientOnly",inheritAttrs:!1,props:["fallback","placeholder","placeholderTag","fallbackTag"],setup(t,{slots:u,attrs:a}){const i=h(!1);return G(()=>{i.value=!0}),ue(pe,!0),n=>{var p;if(i.value)return(p=u.default)==null?void 0:p.call(u);const s=u.fallback||u.placeholder;if(s)return s();const x=n.fallback||n.placeholder||"",m=n.fallbackTag||n.placeholderTag||"span";return w(m,a,x)}}}),ve={},ge={role:"tooltip"};function he(t,u){return _(),w("tool-tip",ge,[se(t.$slots,"default")])}const ae=N(ve,[["render",he]]),xe={class:"relative w-full"},ye=["value"],we={key:0,class:"error-message"},be=T({inheritAttrs:!1,__name:"Input",props:{modelValue:{type:[String,Number,Boolean,Array,Object]},error:{type:String,default:void 0}},emits:["update:modelValue","clearError"],setup(t,{emit:u}){const a=u,i=n=>{a("update:modelValue",n),a("clearError")};return(n,s)=>{const x=F;return _(),w("div",xe,[l("input",_e({type:"text",class:["base-input",{error:t.error}],value:t.modelValue,onInput:s[0]||(s[0]=m=>{var p;return i((p=m.target)==null?void 0:p.value)})},n.$attrs),null,16,ye),t.error?(_(),w("span",we,[o(x,{name:"mdi:information-slab-circle",class:"h-[14px] w-[14px]"}),V(" "+k(t.error),1)])):j("",!0)])}}}),ne=N(be,[["__scopeId","data-v-bd72ca50"]]),K=()=>{const t=h("light"),u=W(()=>t.value==="dark"?h("white"):h("black")),a=W(()=>{if(!window)return t.value;const n=localStorage.getItem("theme-preference"),s=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";return n||s});return G(()=>{t.value=a.value,document.documentElement.setAttribute("data-theme",t.value)}),{theme:t,themeColor:u,userPreference:a,toggleTheme:()=>{t.value=t.value==="light"?"dark":"light",localStorage.setItem("theme-preference",t.value),document.documentElement.setAttribute("data-theme",t.value)}}},Se={class:"grid gap-4 place-items-center"},$e=l("label",{for:"manager-name",class:"text-lg"},"New Manager Name",-1),ke={class:"grid gap-4 place-items-center"},Ce=l("span",null,"Select Icon",-1),Ie=l("span",{class:"sr-only"},"Close Popup",-1),ze={class:"grid place-items-center w-full gap-4"},Me={key:1,class:"grid place-items-center gap-4 w-full"},Ve=l("p",null,"Select Icon",-1),Ee={class:"flex flex-wrap gap-4 items-center justify-center"},De={class:"sr-only"},Te=T({__name:"EditManager",props:{dialog:{type:Object,required:!0}},setup(t,{expose:u}){const a=t,i=()=>{var d;s.value="",y(),(d=a.dialog)==null||d.close()},n=te(),s=h(),x=["star","folder","file-cabinet","pencil","car","gamepad"],m=h(),p=h(!1),f=d=>{p.value=d},c=d=>{m.value=d,f(!1)},g=()=>{if(!n.getActiveManager){console.error("No active manager");return}const{name:d,icon:b}=n.getActiveManager;s.value=d,c(b)};G(()=>{g()}),J(()=>a.dialog.visible,()=>g());const v=()=>{C(s.value)&&(n.updateManager(s.value,m.value),i())},$=h(""),y=()=>{$.value=""},C=d=>{let b=!1;return!d||d===""?($.value="This field is required",b):b=!0},{themeColor:I}=K();function M(){s.value="",y()}return u({clearForm:M,isSelectingIcon:p,updateIsSelectingIcon:f,selectIcon:c}),(d,b)=>{const S=ne,E=F,A=R;return _(),D(re,{name:"fade",mode:"out-in"},{default:r(()=>[e(p)?(_(),w("section",Me,[Ve,l("div",Ee,[(_(),w(B,null,X(x,z=>o(A,{key:z,onClick:bt=>c(z)},{default:r(()=>[l("span",De,"Select "+k(z)+" icon",1),o(E,{name:`mdi:${z}`,size:"32",color:e(I)},null,8,["name","color"])]),_:2},1032,["onClick"])),64))])])):(_(),w("form",{key:0,class:"grid place-items-center gap-10 overflow-auto pb-8 px-2",onSubmit:U(v,["prevent"])},[l("div",Se,[$e,o(S,{id:"manager-name",modelValue:e(s),"onUpdate:modelValue":b[0]||(b[0]=z=>Q(s)?s.value=z:null),placeholder:"Name",error:e($),autofocus:"",onClearError:y,class:"w-full !text-xl"},null,8,["modelValue","error"])]),l("div",ke,[Ce,o(A,{onClick:b[1]||(b[1]=z=>f(!0))},{default:r(()=>[Ie,o(E,{name:`mdi:${e(m)}`,size:"32",color:e(I)},null,8,["name","color"])]),_:1})]),l("div",ze,[o(A,{class:"w-full",type:"submit"},{default:r(()=>[V("Update Manager")]),_:1})])],32))]),_:1})}}}),Ne=O(()=>L(()=>import("./CumMLxI7.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url).then(t=>t.default||t)),Be=O(()=>L(()=>import("./rTXGKihM.js"),__vite__mapDeps([6,2,3,7,8,4,9,1,5,10]),import.meta.url).then(t=>t.default||t)),le=t=>(Z("data-v-34d99824"),t=t(),ee(),t),Ae={key:0,class:"flex gap-2"},Oe=le(()=>l("span",{class:"sr-only"},"Download Manager",-1)),Le=le(()=>l("span",{class:"sr-only"},"Edit Manager",-1)),Fe=le(()=>l("span",{class:"sr-only"},"Delete Manager",-1)),Re={class:"sr-only"},Pe=T({__name:"index",setup(t){const{toggleTheme:u,themeColor:a}=K(),i=te(),{getActiveManager:n}=q(i),s=H(),{data:x,filter:m}=q(s),p=h(),f=h();function c(y){f.value=y}function g(y){if(!y){p.value.close();return}m.value?$():v(),p.value.close()}function v(){if(!n.value)throw Error("Manager could not be deleted. No active manager found");const y=i.getManagerIndex(n.value);i.removeManager(y)}function $(){if(!n.value)throw Error("Section could not be deleted. No active manager found");if(!x.value||!x.value[m.value])throw Error("Section could not be deleted. Data not found");delete x.value[m.value],s.setFilter("")}return(y,C)=>{const I=F,M=ae,d=R,b=Te,S=Ne,E=Be,A=oe;return _(),w(B,null,[l("header",{class:P(["header text-2xl text-center p-3 border-color flex",e(n)?"justify-between":"justify-end"])},[o(re,{name:"fade"},{default:r(()=>[e(n)?(_(),w("ul",Ae,[l("li",null,[o(d,{size:"xs",class:"w-8 h-8",onClick:e(i).downloadManager},{default:r(()=>[Oe,o(I,{name:"mdi:file-download-outline",color:e(a),size:"24"},null,8,["color"]),o(M,{bottom:""},{default:r(()=>[V("Download "+k(e(n).name)+" Manager",1)]),_:1})]),_:1},8,["onClick"])]),l("li",null,[o(d,{size:"xs",class:"w-8 h-8",onClick:C[0]||(C[0]=z=>(c("edit"),e(p).show()))},{default:r(()=>[Le,o(I,{name:"mdi:text-box-edit-outline",color:e(a),size:"24"},null,8,["color"]),o(M,{bottom:""},{default:r(()=>[V("Edit "+k(e(n).name)+" Manager",1)]),_:1})]),_:1})]),l("li",null,[o(d,{size:"xs",class:"w-8 h-8",onClick:C[1]||(C[1]=z=>(c("delete"),e(p).show()))},{default:r(()=>[Fe,o(I,{name:"mdi:trash-outline",color:e(a),size:"24"},null,8,["color"]),o(M,{bottom:""},{default:r(()=>[V("Delete "+k(e(n).name)+" Manager",1)]),_:1})]),_:1})])])):j("",!0)]),_:1}),l("ul",null,[l("li",null,[o(d,{size:"xs",class:"w-8 h-8",onClick:e(u)},{default:r(()=>[l("span",Re,"Toggle Color Theme: "+k(e(a)),1),o(I,{name:"mdi:sun-moon-stars",color:e(a),size:"24"},null,8,["color"])]),_:1},8,["onClick"])])])],2),o(A,null,{default:r(()=>[(_(),D(Y,{to:"#layout"},[o(E,{ref_key:"modal",ref:p,"has-header":!1,class:"z-10"},{default:r(()=>{var z;return[e(f)=="edit"?(_(),D(b,{key:0,dialog:e(p)},null,8,["dialog"])):(_(),D(S,{key:1,onSubmit:g,prompt:`Are you sure you want to delete ${e(m)?e(m):(z=e(n))==null?void 0:z.name}?`,confirm:"Delete"},null,8,["prompt"]))]}),_:1},512)]))]),_:1})],64)}}}),je=N(Pe,[["__scopeId","data-v-34d99824"]]),Ue=O(()=>L(()=>import("./BRiUadZn.js"),__vite__mapDeps([11,7,8,2,3,4,9,1,5,12]),import.meta.url).then(t=>t.default||t)),qe=O(()=>L(()=>import("./rTXGKihM.js"),__vite__mapDeps([6,2,3,7,8,4,9,1,5,10]),import.meta.url).then(t=>t.default||t)),Ge=t=>(Z("data-v-3f66fd22"),t=t(),ee(),t),He={id:"sidebarNav",class:"sidebar-nav border-color"},Ke=Ge(()=>l("span",{class:"sr-only"},"Add",-1)),We={class:"sr-only"},Je=T({__name:"Navigation",setup(t){const u=te(),{managers:a,getActiveManager:i}=q(u),n=H(),s=h(),x=()=>{var c;(c=s.value)==null||c.show()},{themeColor:m}=K(),p=c=>{u.setActiveManager(c.name),n.setFilter("")},f=h();return J(()=>{var c;return(c=s.value)==null?void 0:c.visible},(c,g)=>{c||!g||(f.value.isSelectingIcon?f.value.updateIsSelectingIcon(!1):f.value.clearForm())}),(c,g)=>{const v=F,$=R,y=ae,C=Ue,I=qe,M=oe;return _(),w(B,null,[l("section",He,[o($,{size:"xs",onClick:x},{default:r(()=>[Ke,o(v,{name:"mdi:plus",size:"24",color:e(m)},null,8,["color"])]),_:1}),(_(!0),w(B,null,X(e(a),d=>{var b,S;return _(),D($,{size:"xs",style:ce(((b=e(i))==null?void 0:b.name)===d.name?"--box-shadow-color: var(--text-accent)":""),"aria-selected":((S=e(i))==null?void 0:S.name)===d.name,onClick:E=>p(d)},{default:r(()=>{var E;return[l("span",We,k(d.name),1),o(v,{name:`mdi:${d.icon}`,size:"24",color:((E=e(i))==null?void 0:E.name)===d.name?"var(--text-accent)":e(m).value},null,8,["name","color"]),o(y,{right:""},{default:r(()=>[V(k(d.name),1)]),_:2},1024)]}),_:2},1032,["style","aria-selected","onClick"])}),256))]),o(M,null,{default:r(()=>[(_(),D(Y,{to:"#layout"},[o(I,{ref_key:"modal",ref:s,title:"Create New Manager"},{default:r(()=>[o(C,{ref_key:"form",ref:f,dialog:e(s)},null,8,["dialog"])]),_:1},512)]))]),_:1})],64)}}}),Qe=N(Je,[["__scopeId","data-v-3f66fd22"]]),Xe={class:"grid gap-4 place-items-center"},Ye=l("label",{for:"data-name",class:"text-lg"},"New Data Section",-1),Ze={class:"grid place-items-center w-full gap-4"},et=T({__name:"AddSection",props:{dialog:{type:Object,default:void 0}},setup(t){const u=t,a=()=>{var f;n.value="",m(),(f=u.dialog)==null||f.close()},i=H(),n=h(""),s=()=>{p(n.value)&&(i.addNewKey(n.value),a())},x=h(""),m=()=>{x.value=""},p=f=>{let c=!1;return!f||f===""?(x.value="This field is required",c):i.getSections.find(v=>v===n.value)?(x.value="Name already exists",c):c=!0};return(f,c)=>{const g=ne,v=R;return _(),w("form",{class:"grid place-items-center gap-10 overflow-auto pb-8 px-2",onSubmit:U(s,["prevent"])},[l("div",Xe,[Ye,o(g,{id:"data-name",modelValue:e(n),"onUpdate:modelValue":c[0]||(c[0]=$=>Q(n)?n.value=$:null),placeholder:"Name",error:e(x),autofocus:"",onClearError:m,class:"w-full !text-xl"},null,8,["modelValue","error"])]),l("div",Ze,[o(v,{class:"w-full",type:"submit"},{default:r(()=>[V("Create New Data")]),_:1})])],32)}}});function tt(t,u){const a=ie(t),i=n=>{n.target.nodeName!=="DIALOG"&&a.value&&!a.value.contains(n.target)&&u()};G(()=>{document.addEventListener("click",i)}),me(()=>{document.removeEventListener("click",i)})}const ot=O(()=>L(()=>import("./rTXGKihM.js"),__vite__mapDeps([6,2,3,7,8,4,9,1,5,10]),import.meta.url).then(t=>t.default||t)),de=t=>(Z("data-v-793fc95e"),t=t(),ee(),t),at={class:"overflow-hidden"},nt={class:"grid p-4 gap-4"},lt=de(()=>l("label",{for:"drawer-search",class:"sr-only"},"Search",-1)),st={class:"w-full",key:"addNewEntity"},rt=de(()=>l("span",{class:"sr-only"},"Add",-1)),ct={class:"sr-only"},it={class:"sr-only"},dt=T({__name:"Drawer",setup(t){const u=h(),a=h(!0);tt(()=>{var g;return(g=u.value)==null?void 0:g.parentElement},()=>{const v=ie(window).value.innerWidth<768,$=document.querySelector("dialog[open]");a.value&&v&&!$&&(a.value=!1)});const i=H(),{filter:n}=q(i),s=h(""),x=W(()=>{const g=s.value.toLowerCase();return i.getSections.filter(v=>v.toLowerCase().includes(g))}),m=h(),p=()=>{var g;(g=m.value)==null||g.show()},{themeColor:f}=K(),c=h(!1);return J(a,()=>{a.value?c.value=!1:setTimeout(()=>{c.value=!0},500)}),(g,v)=>{const $=ne,y=R,C=F,I=oe,M=ae,d=et,b=ot;return _(),w(B,null,[l("section",{ref_key:"drawer",ref:u,class:P([e(a)?"md:grid-cols-[1fr] translate-x-0":"md:grid-cols-[0fr] -translate-x-full md:translate-x-0","sidebar-drawer motion-safe:duration-500 flex -z-10 md:grid md:z-10 absolute md:relative left-full md:left-auto bg-[var(--surface-default)]"])},[l("div",at,[l("div",nt,[l("div",null,[o($,{id:"drawer-search",placeholder:"Search",disabled:!e(a),modelValue:e(s),"onUpdate:modelValue":v[0]||(v[0]=S=>Q(s)?s.value=S:null)},null,8,["disabled","modelValue"]),lt]),o(I,null,{default:r(()=>[o(fe,{tag:"ul",class:"relative grid gap-4 w-full",name:"fade",appear:""},{default:r(()=>[(_(!0),w(B,null,X(e(x),S=>(_(),w("li",{key:S,class:"w-full"},[o(y,{size:"xs",disabled:!e(a),"aria-selected":e(n)===S,class:"text-base w-full",style:ce(e(n)===S?"color: var(--text-accent); --box-shadow-color: var(--text-accent)":""),onClick:E=>e(i).setFilter(S)},{default:r(()=>[V(k(S),1)]),_:2},1032,["disabled","aria-selected","style","onClick"])]))),128)),l("li",st,[o(y,{size:"xs",class:"text-base w-full",disabled:!e(a),onClick:p},{default:r(()=>[rt,o(C,{name:"mdi:plus",size:"24",color:e(f)},null,8,["color"])]),_:1},8,["disabled"])])]),_:1})]),_:1})])]),e(c)?j("",!0):(_(),D(y,{key:0,size:"xs",class:"absolute w-8 h-8 !rounded-full left-full -translate-x-4 top-1/2 -translate-y-1/2",onClick:v[1]||(v[1]=U(S=>a.value=!e(a),["stop"]))},{default:r(()=>[l("span",ct,k(e(a)?"Close":"Open")+" Sidebar Drawer",1),o(C,{name:"mdi:chevron-right",color:e(f),size:"24",class:P({"rotate-180":e(a)})},null,8,["color","class"]),o(M,{right:""},{default:r(()=>[V(k(e(a)?"Close":"Open")+" Sidebar Drawer ",1)]),_:1})]),_:1}))],2),e(c)?(_(),D(y,{key:0,size:"xs",class:"absolute w-8 h-8 !rounded-full left-full -translate-x-4 top-1/2 -translate-y-1/2 z-10",onClick:v[2]||(v[2]=U(S=>a.value=!e(a),["stop"]))},{default:r(()=>[l("span",it,k(e(a)?"Close":"Open")+" Sidebar Drawer",1),o(C,{name:"mdi:chevron-right",color:e(f),size:"24",class:P({"rotate-180":e(a)})},null,8,["color","class"]),o(M,{right:""},{default:r(()=>[V(k(e(a)?"Close":"Open")+" Sidebar Drawer ",1)]),_:1})]),_:1})):j("",!0),o(I,null,{default:r(()=>[(_(),D(Y,{to:"#layout"},[o(b,{ref_key:"modal",ref:m,title:"Create Data Section"},{default:r(()=>[o(d,{dialog:e(m)},null,8,["dialog"])]),_:1},512)]))]),_:1})],64)}}}),ut=N(dt,[["__scopeId","data-v-793fc95e"]]),_t={},mt={class:"footer p-2 text-center text-2xl"};function ft(t,u){return _(),w("footer",mt,"Footer")}const pt=N(_t,[["render",ft],["__scopeId","data-v-0cbe9fe5"]]),vt={},gt={id:"layout",class:"grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] min-h-screen duration-[300ms]"},ht={class:"sticky top-0 h-screen z-50 flex col-span-1 col-start-1 row-start-1 row-span-3 isolate"},xt={id:"content",class:"relative col-start-2 col-span-1 row-span-1 row-start-2"};function yt(t,u){const a=je,i=Qe,n=ut,s=pt;return _(),w("div",gt,[o(a),l("aside",ht,[o(i),o(n)]),l("div",xt,[se(t.$slots,"default")]),o(s,{class:"hidden"})])}const wt=N(vt,[["render",yt]]),It=Object.freeze(Object.defineProperty({__proto__:null,default:wt},Symbol.toStringTag,{value:"Module"}));export{ne as _,It as a,K as u};