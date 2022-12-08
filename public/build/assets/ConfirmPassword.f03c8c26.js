import{b as s,r as u,a as f,j as m,H as p}from"./app.8ee9396d.js";import{G as h}from"./GuestLayout.5b5e848f.js";import{P as x}from"./PrimaryButton.e26ad969.js";function g({message:e,className:r=""}){return e?s("p",{className:"text-sm text-red-600 "+r,children:e}):null}function w({forInput:e,value:r,className:a,children:o}){return s("label",{htmlFor:e,className:"block font-medium text-sm text-gray-700 "+a,children:r||o})}function b({type:e="text",name:r,value:a,className:o,autoComplete:n,required:i,isFocused:c,handleChange:l}){const t=u.exports.useRef();return u.exports.useEffect(()=>{c&&t.current.focus()},[]),s("div",{className:"flex flex-col items-start",children:s("input",{type:e,name:r,value:a,className:"border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm "+o,ref:t,autoComplete:n,required:i,onChange:d=>l(d)})})}function C(){const{data:e,setData:r,post:a,processing:o,errors:n,reset:i}=f({password:""});u.exports.useEffect(()=>()=>{i("password")},[]);const c=t=>{r(t.target.name,t.target.value)};return m(h,{children:[s(p,{title:"Confirm Password"}),s("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),m("form",{onSubmit:t=>{t.preventDefault(),a(route("password.confirm"))},children:[m("div",{className:"mt-4",children:[s(w,{forInput:"password",value:"Password"}),s(b,{type:"password",name:"password",value:e.password,className:"mt-1 block w-full",isFocused:!0,handleChange:c}),s(g,{message:n.password,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(x,{className:"ml-4",processing:o,children:"Confirm"})})]})]})}export{C as default};