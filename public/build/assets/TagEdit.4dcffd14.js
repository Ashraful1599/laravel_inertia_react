import{a as m,j as e,b as a}from"./app.8ee9396d.js";import{D as c}from"./DashboardLayout.be011592.js";import{H as i}from"./Header.c54a3ebc.js";import"./index.9c46ddb8.js";import"./react-toastify.esm.b4b407d9.js";function _({tag:t}){const{data:r,setData:o,put:n,processing:d,errors:u,reset:g}=m({id:t.id,tag_name:t.tag_name,tag_slug:t.tag_slug,tag_des:t.tag_des}),s=l=>{l.preventDefault(),o(l.target.name,l.target.value)};return e(c,{children:[a(i,{title:"Tag Edit"}),a("div",{className:"container-xl px-4",children:e("div",{className:"card mb-4",children:[a("div",{className:"card-header",children:"Tag Information"}),a("div",{className:"card-body",children:e("form",{onSubmit:l=>{l.preventDefault(),n(route("tag.update",t.id))},children:[e("div",{className:"form-group",children:[a("label",{className:"col-sm-2 col-form-label",children:"Category name"}),a("input",{onChange:s,value:r.tag_name,name:"tag_name",type:"text",className:"form-control"})]}),e("div",{className:"form-group mb-3",children:[a("label",{className:"col-sm-2 col-form-label",children:"Category slug"}),a("input",{onChange:s,value:r.tag_slug,name:"tag_slug",type:"text",className:"form-control"})]}),e("div",{className:"form-group mb-3",children:[a("label",{className:"col-sm-2 col-form-label",children:"Category description"}),a("input",{onChange:s,value:r.tag_des,name:"tag_des",type:"text",className:"form-control"})]}),a("button",{type:"submit",className:"btn btn-primary",children:"Update"})]})})]})})]})}export{_ as default};