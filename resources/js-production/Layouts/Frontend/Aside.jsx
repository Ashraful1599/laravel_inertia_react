import React from 'react'
import * as fIcon from 'react-feather';
import { Link, usePage } from '@inertiajs/inertia-react';
//import route from 'vendor/tightenco/ziggy/src/js';

export default function Aside() {

    const { flash, auth, error } = usePage().props;

  return (
    <div id="layoutSidenav_nav">
    <nav className="sidenav shadow-right sidenav-light">
        <div className="sidenav-menu">
            <div className="nav accordion" id="accordionSidenav">
 
                <div className="sidenav-menu-heading d-sm-none">Account</div>
 
                <a className="nav-link d-sm-none" href="#!">
                    <div className="nav-link-icon"><fIcon.Bell /></div>
                    Alerts
                    <span className="badge bg-warning-soft text-warning ms-auto">4 New!</span>
                </a>
  
                <a className="nav-link d-sm-none" href="#!">
                    <div className="nav-link-icon"><fIcon.Mail /></div>
                    Messages
                    <span className="badge bg-success-soft text-success ms-auto">2 New!</span>
                </a>
       



                <div className="sidenav-menu-heading">Custom</div>

                {/* <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    Pages
                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="collapsePages" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
                     <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuth" aria-expanded="false" aria-controls="pagesCollapseAuth">
                            Authentication
                            <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="pagesCollapseAuth" data-bs-parent="#accordionSidenavPagesMenu">
                            <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesAuth">
                    
                                <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#pagesCollapseAuthBasic" aria-expanded="false" aria-controls="pagesCollapseAuthBasic">
                                    Basic
                                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="pagesCollapseAuthBasic" data-bs-parent="#accordionSidenavPagesAuth">
                                    <nav className="sidenav-menu-nested nav">
                                        <a className="nav-link" href="auth-login-basic.html">Login</a>
                                        <a className="nav-link" href="auth-register-basic.html">Register</a>
                                        <a className="nav-link" href="auth-password-basic.html">Forgot Password</a>
                                    </nav>
                                </div>
                            </nav>
                        </div>

                    </nav>
                </div> */}
         


                <Link className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#file" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    File
                     <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div> 
                </Link>
                <div className="collapse" id="file" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
                     <Link className="nav-link collapsed" href={route('file')}>
                            All file
                        </Link>             
                        
                        <Link className="nav-link collapsed" href={route('file.create')}>
                            Add file
                        </Link>                     
                    </nav>
                </div>                
                
                <Link className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#users" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    User
                     <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div> 
                </Link>
                <div className="collapse" id="users" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
                     <Link className="nav-link collapsed" href={route('users')}>
                            All users
                        </Link>             
                        
                        <Link className="nav-link collapsed" href={route('user.index')}>
                            Add user
                        </Link>                     
                    </nav>
                </div>
               
                
                <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#categories" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    Category
                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="categories" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
                     <Link className="nav-link collapsed" href={route('cat')}>
                            All categories
                        </Link>                     
                        <Link className="nav-link collapsed" href={route('cat.create')} >
                            Add category
                        </Link>
                    </nav>
                </div>                
                
                
                <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#tag" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    Tag
                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="tag" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
                     <Link className="nav-link collapsed" href={route('tag')}>
                            All tags
                        </Link>                     
                        <Link className="nav-link collapsed" href={route('tag.create')} >
                            Add tag
                        </Link>
                    </nav>
                </div>                
                
                
                <a className="nav-link collapsed" href="#!" data-bs-toggle="collapse" data-bs-target="#product" aria-expanded="false" aria-controls="collapsePages">
                    <div className="nav-link-icon"><fIcon.Grid /></div>
                    Product
                    <div className="sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </a>
                <div className="collapse" id="product" data-bs-parent="#accordionSidenav">
                    <nav className="sidenav-menu-nested nav accordion" id="accordionSidenavPagesMenu">
                     <Link className="nav-link collapsed" href={route('product')} >
                            All products
                        </Link>                     
                        <Link className="nav-link collapsed" href={route('product.create')} >
                            Add product
                        </Link>
                    </nav>
                </div>
      
            </div>
        </div>

        <div className="sidenav-footer">
            <div className="sidenav-footer-content">
                <div className="sidenav-footer-subtitle">Logged in as:</div>
                <div className="sidenav-footer-title">{auth.user.name +" "+auth.user.lname}</div>
            </div>
        </div>
    </nav>
</div>
  )
}
