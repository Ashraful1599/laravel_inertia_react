import{a as t,j as e,b as a}from"./app.8ee9396d.js";import{D as d}from"./DashboardLayout.be011592.js";import{H as p}from"./Header.c54a3ebc.js";import"./index.9c46ddb8.js";import"./react-toastify.esm.b4b407d9.js";function g(){const{data:l,setData:s,post:m,processing:n,errors:c,reset:u}=t({name:"",lname:"",email:"",role:"0",password_confirmation:"12345678",password:"12345678"}),o=r=>{r.preventDefault(),s(r.target.name,r.target.value)},i=r=>{r.preventDefault(),m(route("user.add"))};return console.log(c),e(d,{children:[a(p,{title:"User Edit"}),a("div",{className:"container-xl px-4",children:e("div",{className:"card mb-4",children:[a("div",{className:"card-header",children:"Users Information"}),a("div",{className:"card-body",children:e("form",{onSubmit:i,children:[e("div",{className:"form-group",children:[a("label",{className:"col-sm-2 col-form-label",children:"First name"}),a("input",{onChange:o,value:l.name,name:"name",type:"name",className:"form-control"})]}),e("div",{className:"form-group mb-3",children:[a("label",{className:"col-sm-2 col-form-label",children:"Last name"}),a("input",{onChange:o,value:l.lname,name:"lname",type:"lname",className:"form-control"})]}),e("div",{className:"form-group mb-3",children:[a("label",{className:"col-sm-2 col-form-label",children:"Email"}),a("input",{onChange:o,value:l.email,name:"email",type:"email",className:"form-control"})]}),e("div",{className:"form-group mb-3",children:[a("label",{className:"col-sm-2 col-form-label",children:"Password"}),a("input",{onChange:o,value:l.password,name:"password",type:"password",className:"form-control"})]}),e("div",{className:"form-group mb-3",children:[a("label",{className:"col-sm-2 col-form-label",children:"Confirm password"}),a("input",{onChange:o,value:l.password_confirmation,name:"password_confirmation",type:"password",className:"form-control"})]}),e("div",{className:"form-group mb-3",children:[a("label",{className:"col-sm-2 col-form-label",children:"Role"}),e("select",{onChange:o,defaultValue:l.role,className:"form-control",name:"role",id:"",children:[a("option",{value:"0",children:"Customer"}),a("option",{value:"1",children:"Admin"})]})]}),a("button",{disabled:n,type:"submit",className:"btn btn-primary",children:"Save"})]})})]})})]})}export{g as default};