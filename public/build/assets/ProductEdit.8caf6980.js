import{a as B,r as x,j as l,b as e,F as Q}from"./app.8ee9396d.js";import{D as Z}from"./DashboardLayout.be011592.js";import{H as $}from"./Header.c54a3ebc.js";import{E as ee}from"./Editor.e0b08e3e.js";import{S as ae}from"./react-select.esm.8c846078.js";import{X as le}from"./react-select-animated.esm.533b1a11.js";import"./index.9c46ddb8.js";import"./react-toastify.esm.b4b407d9.js";import"./hoist-non-react-statics.cjs.d2fea6c5.js";function ve({categories:H,tags:D,terms:w,attributes:y,product:s,skus:b}){console.log(b),console.log(s);var L=[];D.map(a=>{L.push({value:a.id,label:a.tag_name})});var S=[];s.tag&&s.tag.map(a=>{S.push({value:a.id,label:a.tag_name})});const{data:p,setData:v,post:E,processing:T,errors:i,reset:re,progress:P}=B({name:s.name,slug:s.slug,regular_price:s.regular_price,offer_price:s.offer_price,sku:s.sku!=null?s.sku:"",promo1:s.promo1!=null?s.promo1:"",promo2:s.promo2!=null?s.promo2:"",tax_class:s.tax_class,cat_id:s.cat_id,tag_id:S,image:null,image2:null,gallery:null,status:s.status,fetured:s.fetured,description:s.description,product_type:s.product_type,variable:JSON.parse(s.variable)}),h=a=>{v(a.target.name,a.target.value)},q=a=>{a.preventDefault(),v("image",a.target.files[0])},I=a=>{a.preventDefault(),v("image2",a.target.files[0])},z=a=>{a.preventDefault(),v("gallery",a.target.files)},K=a=>{v("description",a)},M=a=>{a.preventDefault(),E(route("product.update",s.id))};console.log(p);const O={};y.map(a=>O[a.name.toLowerCase()]="");const[U,te]=x.exports.useState(O);let G={...U,...{price:"",sku:""}};const[V,ie]=x.exports.useState({});let J={};b.map((a,t)=>{a.var_products.map((r,c)=>{J[r.variant_id]=[r.variant_option_id]})});let g=[];if(s.product_type=="variable"){s.variant.map(a=>{var t=a.attribute.name.toLowerCase(),r=w.filter(m=>a.attribute_id==m.attribute_id),c=[];return r.forEach(m=>{c.push(m.id)}),V[t]=c});for(const[a,t]of Object.entries(V))g.push(t.map(r=>({[a]:r})));g.length!=0&&(g=g.reduce((a,t)=>a.flatMap(r=>t.map(c=>({...r,...c}))))),g.map((a,t)=>{if(b[t])var r=b[t].price;else var r="";if(b[t])var c=b[t].sku;else var c="";Object.defineProperty(a,"price",{value:r,writable:!0,configurable:!0,enumerable:!0}),Object.defineProperty(a,"sku",{value:c,writable:!0,configurable:!0,enumerable:!0})})}const[N,C]=x.exports.useState(g),[j,A]=x.exports.useState(s.variant),[_,X]=x.exports.useState([]);JSON.parse(s.variable);const F=a=>{var t=document.querySelectorAll(".variant_check:checked");if(t.length==1?t[0].disabled=!0:t.forEach(c=>{c.disabled=!1}),a.target.checked){const c=_.indexOf(a.target.name);c>-1&&_.splice(c,1);let m={};y.map(n=>{var o=w.filter(u=>n.id==u.attribute_id),d=[];o.forEach(u=>{d.push(u.id)}),(n.name.toLowerCase()==a.target.name||_.includes(n.name.toLowerCase())==!1)&&(m[n.name.toLowerCase()]=d)});let f=[];for(const[n,o]of Object.entries(m))f.push(o.map(d=>({[n]:d})));f=f.reduce((n,o)=>n.flatMap(d=>o.map(u=>({...d,...u})))),f.map((n,o)=>{if(b[o])var d=b[o].price;else var d="";if(b[o])var u=b[o].sku;else var u="";Object.defineProperty(n,"price",{value:d,writable:!0,configurable:!0,enumerable:!0}),Object.defineProperty(n,"sku",{value:u,writable:!0,configurable:!0,enumerable:!0})}),C(f),v("variable",N);var r=y.filter(n=>n.name.toLowerCase()==a.target.name);A(n=>[...n,...r])}else{X(n=>[...n,a.target.name]);let c={};y.map(n=>{var o=w.filter(u=>n.id==u.attribute_id),d=[];o.forEach(u=>{d.push(u.id)}),n.name.toLowerCase()!=a.target.name&&_.includes(n.name.toLowerCase())==!1&&(c[n.name.toLowerCase()]=d)});let m=[];for(const[n,o]of Object.entries(c))m.push(o.map(d=>({[n]:d})));m=m.reduce((n,o)=>n.flatMap(d=>o.map(u=>({...d,...u})))),m.map((n,o)=>{if(b[o])var d=b[o].price;else var d="";if(b[o])var u=b[o].sku;else var u="";Object.defineProperty(n,"price",{value:d,writable:!0,configurable:!0,enumerable:!0}),Object.defineProperty(n,"sku",{value:u,writable:!0,configurable:!0,enumerable:!0})}),console.log("inarr"),console.log(j),C(m),v("variable",N);var r=j.filter(n=>n.name?n.name.toLowerCase()!=a.target.name:n.attribute.name.toLowerCase()!=a.target.name);A(r)}},R=()=>{C(a=>[...a,G])};let W=a=>{let t=[...N];t.splice(a,1),v("variable",t),C(t)};const k=a=>{a.preventDefault();const t=a.target.id;C(r=>{const c=r.slice();return c[t][a.target.name]=a.target.value,c}),v("variable",N)},Y=a=>{v("tag_id",a)};return console.log(N),l(Z,{children:[e($,{title:"Product"}),e("div",{className:"container-xl px-4",children:e("form",{onSubmit:M,children:l("div",{className:"row",children:[e("div",{className:"col-lg-8",children:l("div",{className:"card mb-4",children:[e("div",{className:"card-header",children:"Product Information"}),l("div",{className:"card-body",children:[l("div",{className:"form-group",children:[e("label",{className:"col-sm-2 col-form-label",children:"Name"}),e("input",{onChange:h,value:p.name,name:"name",type:"text",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.name})]}),l("div",{className:"form-group",children:[e("label",{className:"col-sm-2 col-form-label",children:"Slug"}),e("input",{onChange:h,value:p.slug,name:"slug",type:"text",className:"form-control"})]}),l("div",{className:"form-group mb-3",children:[e("label",{className:"col-sm-2 col-form-label",children:"Description"}),e(ee,{apiKey:"nkkvgg6v97wpitv8o0qjvf3zsut8x3eqyb5difq13e14dzko",initialValue:p.description,init:{height:400,menubar:!0,plugins:["advlist","autolink","lists","link","image","charmap","preview","anchor","searchreplace","visualblocks","code","fullscreen","insertdatetime","media","table","code","help","wordcount"],toolbar:"undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",content_style:"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",images_upload_url:"http://127.0.0.1:8000/imgupload",automatic_uploads:!0},onEditorChange:K}),i&&e("div",{className:"text-danger",children:i.description})]}),l("div",{className:"form-group mt-3 mb-3",children:[e("div",{className:" form-check-inline",children:e("label",{className:"form-check-label",children:"Product type:"})}),l("div",{className:"form-check form-check-inline",children:[e("label",{className:"form-check-label",htmlFor:"inlineCheckbox1",children:"Simple"}),e("input",{onChange:h,checked:p.product_type=="simple",name:"product_type",className:"form-check-input",type:"radio",id:"inlineCheckbox1",value:"simple"})]}),l("div",{className:"form-check form-check-inline",children:[e("label",{className:"form-check-label",htmlFor:"inlineCheckbox2",children:"Variable"}),e("input",{onChange:h,checked:p.product_type=="variable",name:"product_type",className:"form-check-input",type:"radio",id:"inlineCheckbox2",value:"variable"})]})]}),p.product_type==="simple"?l("div",{className:"d-flex align-items-start",children:[l("div",{className:"nav flex-column nav-pills me-3",id:"v-pills-tab",role:"tablist","aria-orientation":"vertical",children:[e("button",{className:"nav-link active",id:"v-pills-home-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-home",type:"button",children:"Price"}),e("button",{className:"nav-link",id:"v-pills-profile-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-profile",type:"button",children:"SKU"}),e("button",{className:"nav-link",id:"v-pills-messages-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-messages",type:"button",children:"Tax class"}),e("button",{className:"nav-link",id:"v-pills-settings-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-settings",type:"button",children:"Promo label"})]}),l("div",{className:"tab-content product_tab_content",id:"v-pills-tabContent",children:[l("div",{className:"tab-pane fade show active",id:"v-pills-home",role:"tabpanel","aria-labelledby":"v-pills-home-tab",children:[l("div",{className:"form-group",children:[e("label",{className:"col-form-label",children:"Regular Price"}),e("input",{onChange:h,value:p.regular_price,name:"regular_price",type:"number",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.regular_price})]}),l("div",{className:"form-group",children:[e("label",{className:"col-form-label",children:"Offer Price"}),e("input",{onChange:h,value:p.offer_price,name:"offer_price",type:"number",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.offer_price})]})]}),e("div",{className:"tab-pane fade",id:"v-pills-profile",role:"tabpanel","aria-labelledby":"v-pills-profile-tab",children:l("div",{className:"form-group",children:[e("label",{className:"col-form-label",children:"SKU"}),e("input",{onChange:h,value:p.sku,name:"sku",type:"text",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.sku})]})}),e("div",{className:"tab-pane fade",id:"v-pills-messages",role:"tabpanel","aria-labelledby":"v-pills-messages-tab",children:l("div",{className:"form-group",children:[e("label",{className:"col-form-label",children:"Tax class"}),l("select",{onChange:h,className:"form-select",name:"tax_class",defaultValue:"no_tax",children:[e("option",{value:"",children:"Select a tax class"}),e("option",{value:"no_tax",children:"No tax"}),e("option",{value:"standard",children:"Standard"})]})]})}),l("div",{className:"tab-pane fade",id:"v-pills-settings",role:"tabpanel","aria-labelledby":"v-pills-settings-tab",children:[l("div",{className:"form-group",children:[e("label",{className:"col-form-label",children:"Promotional label 1"}),e("input",{onChange:h,value:p.promo1,name:"promo1",type:"text",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.promo1})]}),l("div",{className:"form-group",children:[e("label",{className:"col-form-label",children:"Promotional label 2"}),e("input",{onChange:h,value:p.promo2,name:"promo2",type:"text",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.promo2})]})]})]})]}):l("div",{className:"d-flex align-items-start",children:[l("div",{className:"nav flex-column nav-pills me-3",id:"v-pills-tab",role:"tablist","aria-orientation":"vertical",children:[e("button",{className:"nav-link active",id:"v-pills-home-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-home",type:"button",children:"Variable"}),e("button",{className:"nav-link",id:"v-pills-messages-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-messages",type:"button",children:"Tax class"}),e("button",{className:"nav-link",id:"v-pills-settings-tab","data-bs-toggle":"pill","data-bs-target":"#v-pills-settings",type:"button",children:"Promo label"})]}),l("div",{className:"tab-content product_tab_content",id:"v-pills-tabContent",children:[e("div",{className:"tab-pane fade show active",id:"v-pills-home",role:"tabpanel","aria-labelledby":"v-pills-home-tab",children:l("div",{children:[l("div",{className:"row",children:[e("div",{className:"col-sm-4",children:e("button",{className:"btn btn-secondary ",type:"button",onClick:R,children:"Add variable"})}),e("div",{className:"col-sm-8",children:y.map((a,t)=>{if(s.variant[t]){if(s.variant[t].attribute.name.toLowerCase()==a.name.toLowerCase())return l("div",{className:"form-check form-check-inline",children:[e("input",{defaultChecked:!0,onChange:F,name:a.name.toLowerCase(),className:"form-check-input variant_check variant_check"+a.name.toLowerCase(),type:"checkbox",value:a.name.toLowerCase()}),e("label",{className:"form-check-label",children:a.name})]},t)}else return l("div",{className:"form-check form-check-inline",children:[e("input",{onChange:F,name:a.name.toLowerCase(),className:"form-check-input variant_check variant_check"+a.name.toLowerCase(),type:"checkbox",value:a.name.toLowerCase()}),e("label",{className:"form-check-label",children:a.name})]},t)})})]}),N.map((a,t)=>l("div",{className:"row mt-3 variable_row",children:[j.map((r,c)=>e(Q,{children:r.name?e("div",{className:"col-sm attr_"+r.name.toLowerCase(),children:l("select",{required:!0,value:a[r.name.toLowerCase()],name:r.name.toLowerCase(),onChange:k,id:t,className:"form-select "+a[r.name.toLowerCase()],children:[l("option",{className:"firstItem"+r.name.toLowerCase(),value:r.name.toLowerCase(),children:["Select ",r.name]}),r.terms.map((m,f)=>e("option",{value:m.id,children:m.name},f))]})}):r.attribute?e("div",{className:"col-sm attr_"+r.attribute.name.toLowerCase(),children:l("select",{required:!0,value:a[r.attribute.name.toLowerCase()],name:r.attribute.name.toLowerCase(),onChange:k,id:t,className:"form-select "+a[r.attribute.name.toLowerCase()],children:[l("option",{className:"firstItem"+r.attribute.name.toLowerCase(),value:r.attribute.name.toLowerCase(),children:["Select ",r.attribute.name]}),r.variant_option.map((m,f)=>e("option",{value:m.term.id,children:m.term.name},f))]})}):""})),e("div",{className:"col-sm",children:e("input",{onChange:k,required:!0,defaultValue:a.price,placeholder:"Enter price",name:"price",id:t,type:"number",size:"40",className:"form-control"})}),l("div",{className:"col-sm",children:[e("input",{onChange:k,placeholder:"Enter SKU",name:"sku",value:a.sku,id:t,type:"text",size:"40",className:"form-control"}),l("button",{type:"button",className:" variable_remove",onClick:()=>W(t),children:[" ",e(le,{})," "]})]})]},t))]})}),e("div",{className:"tab-pane fade",id:"v-pills-messages",role:"tabpanel","aria-labelledby":"v-pills-messages-tab",children:l("div",{className:"form-group",children:[e("label",{className:"col-form-label",children:"Tax class"}),l("select",{onChange:h,className:"form-select",name:"tax_class",defaultValue:"no_tax",children:[e("option",{value:"",children:"Select a tax class"}),e("option",{value:"no_tax",children:"No tax"}),e("option",{value:"standard",children:"Standard"})]})]})}),l("div",{className:"tab-pane fade",id:"v-pills-settings",role:"tabpanel","aria-labelledby":"v-pills-settings-tab",children:[l("div",{className:"form-group",children:[e("label",{className:"col-form-label",children:"Promotional label 1"}),e("input",{onChange:h,value:p.promo1,name:"promo1",type:"text",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.promo1})]}),l("div",{className:"form-group",children:[e("label",{className:"col-form-label",children:"Promotional label 2"}),e("input",{onChange:h,value:p.promo2,name:"promo2",type:"text",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.promo2})]})]})]})]})]})]})}),e("div",{className:"col-lg-4",children:l("div",{className:"card mb-4 nav-sticky",children:[e("div",{className:"card-header",children:"Product Information"}),l("div",{className:"card-body",children:[l("div",{className:"form-group",children:[e("label",{className:"col-sm-2 col-form-label",children:"Category"}),l("select",{defaultValue:p.cat_id,className:"form-control",onChange:h,name:"cat_id",children:[e("option",{children:"Select a Category"}),H.map((a,t)=>e("option",{value:a.id,children:a.cat_name},t))]}),i&&e("div",{className:"text-danger",children:i.cat_id})]}),l("div",{className:"form-group",children:[e("label",{className:"col-sm-2 col-form-label",children:"Tag"}),console.log(L),e(ae,{isMulti:!0,options:L,defaultValue:S,name:"tag_id",classNamePrefix:"select",onChange:Y}),i&&e("div",{className:"text-danger",children:i.tag_id})]}),l("div",{className:"form-group",children:[e("label",{className:" col-form-label",children:"Fetured"}),l("select",{className:"form-control",onChange:h,name:"fetured",defaultValue:p.fetured,children:[e("option",{children:"Select featured status"}),e("option",{value:"0",children:"No"}),e("option",{value:"1",children:"Yes"})]}),i&&e("div",{className:"text-danger",children:i.fetured})]}),l("div",{className:"form-group",children:[e("label",{className:" col-form-label",children:"Status"}),l("select",{className:"form-control",onChange:h,name:"status",defaultValue:p.status,children:[e("option",{value:"1",children:"Publish"}),e("option",{value:"0",children:"Draft"})]}),i&&e("div",{className:"text-danger",children:i.status})]}),l("div",{className:"form-group mb-3",children:[e("label",{className:" col-form-label",children:"Small image"}),e("input",{onChange:q,name:"image",type:"file",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.image})]}),l("div",{className:"form-group mb-3",children:[e("label",{className:" col-form-label",children:"Small image on hover"}),e("input",{onChange:I,name:"image2",type:"file",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.image2})]}),l("div",{className:"form-group mb-3",children:[e("label",{className:" col-form-label",children:"Gallery (you can select multiple images)"}),e("input",{multiple:"multiple",onChange:z,name:"gallery",type:"file",className:"form-control"}),i&&e("div",{className:"text-danger",children:i.gallery})]}),e("div",{className:"row",children:P&&l("progress",{value:P.percentage,max:"100",children:[P.percentage,"%"]})}),e("button",{disabled:T,type:"submit",className:"btn btn-primary",children:"Save"})]})]})})]})})})]})}export{ve as default};