import{d as i,r as a,M as u,v as c,x as d,y as f,R as v,S as p}from"./CMyMP_Ly.js";import{_ as m}from"./DlAUqK2U.js";const _={class:"px-8 py-4 grid rounded-lg w-full gap-10 max-h-dvh overflow-hidden"},g=i({__name:"Popover",props:{title:{type:String,default:""}},setup(w,{expose:l}){const t=a(),s=a(!1);l({show:()=>{var e;(e=t.value)==null||e.show(),s.value=!0},close:e=>{var o;return(o=t.value)==null?void 0:o.close(e)},visible:s}),u(s,e=>{if(e){if(!t.value)return;t.value.removeAttribute("inert"),setTimeout(()=>{window.addEventListener("click",r)},100),n()}else{if(!t.value)return;t.value.setAttribute("inert",""),window.removeEventListener("click",r)}});async function r({target:e}){var o;e.closest("dialog")||(o=t.value)==null||o.close("dismiss")}function n(){var o;const e=(o=t.value)==null?void 0:o.querySelector("[autofocus]");e&&e.focus()}return(e,o)=>(c(),d("dialog",p({ref_key:"dialog",ref:t,onClose:o[0]||(o[0]=y=>s.value=!1)},e.$attrs,{inert:""}),[f("div",_,[v(e.$slots,"default",{},void 0,!0)])],16))}}),E=m(g,[["__scopeId","data-v-c314c36a"]]);export{E as default};