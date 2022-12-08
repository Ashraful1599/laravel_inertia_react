import { usePage, Link,useForm } from '@inertiajs/inertia-react';
import React,{useEffect} from 'react'
import cartIcon from '../../../FrontEnd/img/icons/icon-cart-big.svg'
import logo from '../../../FrontEnd/assets/images/logo.png'
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';


export default function Header(props) {

   const{flashData, auth, flash} = usePage().props;
  //  console.log(flash)
 //  console.log(auth);
const categories = flashData.categories;
const cartItems = flashData.cartItems;
const subtotal = flashData.subtotal;
const total = flashData.total;
const count = flashData.count;
//console.log(cartItems)
//   const setFilterProduct = props.setFilterProduct;

//     const [isActive, setActive] = React.useState("false");

    const handleToggle = () => {
      setActive(!isActive);
        if(isActive){
            document.getElementById('headerTopCartDropdown').style.opacity = 1;
        }else{
            document.getElementById('headerTopCartDropdown').style.opacity = 0;
        }
    };
    const getFilteredList = (e)=> {
            console.log(e.target.value)
            if (e.target.value == 'all') {
                setFilterProduct(products);
            }else{
            setFilterProduct(products.filter((item)=>{
              return  item.cat_id == e.target.value
            }))
             }
          }



 const {data, setData, post, processing, errors, reset} = useForm({
            rowId: '',
            qty: '',
            type: '',
        })
    
        // const inputRef = useRef([]);
        // const qtyChange = (id)=>{
        //     var qty =inputRef.current[id].value;
        //     setData({
        //         rowId: id,
        //         qty: qty,
        //         type: 'update'
        //     });
    
        // }
        const removeCartItem = (rowId)=>{
            setData({
                rowId: rowId,
                type: 'remove'
            });
        }
    
        useEffect(()=>{
            if(data.rowId != '' && data.type == 'update'){
                post(route('cart.update', data))
            }		
            if(data.rowId != '' && data.type == 'remove'){
                post(route('cart.remove', data))
            }
        },[data])


       // window.addEventListener('load', function () {   alert("It's loaded!") }) 
    const [allProd, setAllprod] = useState({});

    useEffect(()=>{

      //  Inertia.get(route('product.all'));
        axios.get(route('product.all')).then(res => {
           // console.log(res.data)
           setAllprod(res.data.products);
        }).catch(err => {
            console.error(err)
        }).finally(() => {
            //alert('is done')
        });
 
    },[])

 //   console.log(allProd);

const [filterSearch, setFilterSearch] = useState();

    const search = (e)=>{
      //  console.log(e.target.value);
    //  Inertia.post(route('search', e.target.value || " "));
    if(e.target.value != ""){
        var filterSearchResult =  allProd.filter((item)=>{
            var inputforSearch = e.target.value.toLowerCase();
            var prodforSearch = item.name.toLowerCase();
            return prodforSearch.includes(inputforSearch) || prodforSearch.indexOf(inputforSearch) >= 0;
        })
    }

        setFilterSearch(filterSearchResult);
    }

  return (
//     <header id="header" data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 135, 'stickySetTop': '-135px', 'stickyChangeLogo': true}">
//     <div className="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
//         <div className="header-top header-top-small-minheight header-top-simple-border-bottom">
//             <div className="container">
//                 <div className="header-row justify-content-between">
//                     <div className="header-column col-auto px-0">
//                         <div className="header-row">
//                             <p className="font-weight-semibold text-1 mb-0 d-none d-sm-block d-md-none">FREE SHIPPING ORDERS $99+</p>
//                             <p className="font-weight-semibold text-1 mb-0 d-none d-md-block">FREE RETURNS, STANDARD SHIPPING ORDERS $99+</p>
//                         </div>
//                     </div>
//                     <div className="header-column justify-content-end col-auto px-0">
//                         <div className="header-row">
//                             <nav className="header-nav-top">
//                                 <ul className="nav nav-pills font-weight-semibold text-2">
//                                     <li className="nav-item dropdown nav-item-left-border d-lg-none">
//                                         <a className="nav-link text-color-default text-color-hover-primary" href="#" role="button" id="dropdownMobileMore" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                             More
//                                             <i className="fas fa-angle-down"></i>
//                                         </a>
//                                         <div className="dropdown-menu" aria-labelledby="dropdownMobileMore">
//                                             <a className="dropdown-item" href="#">About</a>
//                                             <a className="dropdown-item" href="#">Our Stores</a>
//                                             <a className="dropdown-item" href="#">Blog</a>
//                                             <a className="dropdown-item" href="#">Contact</a>
//                                             <a className="dropdown-item" href="#">Help & FAQs</a>
//                                             <a className="dropdown-item" href="#">Track Order</a>
//                                         </div>
//                                     </li>
//                                     <li className="nav-item d-none d-lg-inline-block">
//                                         <a href="#" className="text-decoration-none text-color-default text-color-hover-primary">About</a>
//                                     </li>
//                                     <li className="nav-item d-none d-lg-inline-block">
//                                         <a href="#" className="text-decoration-none text-color-default text-color-hover-primary">Our Stores</a>
//                                     </li>
//                                     <li className="nav-item d-none d-lg-inline-block">
//                                         <a href="#" className="text-decoration-none text-color-default text-color-hover-primary">Blog</a>
//                                     </li>
//                                     <li className="nav-item d-none d-lg-inline-block">
//                                         <a href="#" className="text-decoration-none text-color-default text-color-hover-primary">Contact</a>
//                                     </li>
//                                     <li className="nav-item d-none d-xl-inline-block">
//                                         <a href="#" className="text-decoration-none text-color-default text-color-hover-primary">Help & FAQs</a>
//                                     </li>
//                                     <li className="nav-item d-none d-xl-inline-block">
//                                         <a href="#" className="text-decoration-none text-color-default text-color-hover-primary">Track Order</a>
//                                     </li>
//                                     <li className="nav-item dropdown nav-item-left-border">
//                                         <a className="nav-link text-color-default text-color-hover-primary" href="#" role="button" id="dropdownCurrency" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                             USD
//                                             <i className="fas fa-angle-down"></i>
//                                         </a>
//                                         <div className="dropdown-menu dropdown-menu-arrow-centered min-width-0" aria-labelledby="dropdownCurrency">
//                                             <a className="dropdown-item" href="#">EUR</a>
//                                             <a className="dropdown-item" href="#">USD</a>
//                                         </div>
//                                     </li>
//                                     <li className="nav-item dropdown nav-item-right-border">
//                                         <a className="nav-link text-color-default text-color-hover-primary" href="#" role="button" id="dropdownLanguage" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                             ENG
//                                             <i className="fas fa-angle-down"></i>
//                                         </a>
//                                         <div className="dropdown-menu dropdown-menu-arrow-centered min-width-0" aria-labelledby="dropdownLanguage">
//                                             <a className="dropdown-item" href="#">ESP</a>
//                                             <a className="dropdown-item" href="#">FRA</a>
//                                             <a className="dropdown-item" href="#">ENG</a>
//                                         </div>
//                                     </li>
//                                 </ul>
//                                 <ul className="header-social-icons social-icons social-icons-clean social-icons-icon-gray">
//                                     <li className="social-icons-facebook">
//                                         <a href="http://www.facebook.com/" target="_blank" title="Facebook"><i className="fab fa-facebook-f"></i></a>
//                                     </li>
//                                     <li className="social-icons-twitter">
//                                         <a href="http://www.twitter.com/" target="_blank" title="Twitter"><i className="fab fa-twitter"></i></a>
//                                     </li>
//                                     <li className="social-icons-linkedin">
//                                         <a href="http://www.linkedin.com/" target="_blank" title="Linkedin"><i className="fab fa-linkedin-in"></i></a>
//                                     </li>
//                                 </ul>
//                             </nav>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="header-container container">
//             <div className="header-row py-2">
//                 <div className="header-column w-100">
//                     <div className="header-row justify-content-between">
//                         <div className="header-logo z-index-2 col-lg-2 px-0">
//                             <a href="index.html">
//                             <img alt="Porto" width="100" height="48" data-sticky-width="82" data-sticky-height="40" data-sticky-top="84" src={logo} />
//                             </a>
//                         </div>
//                         <div className="header-nav-features header-nav-features-no-border col-lg-5 col-xl-6 px-0 ms-0">
//                             <div className="header-nav-feature ps-lg-5 pe-lg-4">
//                                 <form role="search" action="page-search-results.html" method="get">
//                                     <div className="search-with-select">
//                                         <a href="#" className="mobile-search-toggle-btn me-2" data-porto-toggle-class="open">
//                                             <i className="icons icon-magnifier text-color-dark text-color-hover-primary"></i>
//                                         </a>
//                                         <div className="search-form-wrapper input-group">
//                                             <input className="form-control text-1" id="headerSearch" name="q" type="search"  placeholder="Search..." />
//                                             <div className="search-form-select-wrapper">
//                                                 <div className="custom-select-1">
//                                                     <select onChange={getFilteredList} name="category" className="form-control form-select" defaultValue="all">
//                                                         <option value="all">All Categories</option>
//                                                         {
//                                                             categories.map((item, index)=>{
//                                                                 return(
//                                                                     <option key={index}  value={item.id}>{item.cat_name}</option>
//                                                                 )
//                                                             })
//                                                         }
//                                                     </select>
//                                                 </div>
//                                                 <button className="btn" type="submit">
//                                                     <i className="icons icon-magnifier header-nav-top-icon text-color-dark"></i>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </form>
//                             </div>
//                         </div>
//                         <ul className="header-extra-info col-lg-3 col-xl-2 ps-2 ps-xl-0 ms-lg-3 d-none d-lg-block">
//                             <li className="d-none d-sm-inline-flex ms-0">
//                                 <div className="header-extra-info-icon ms-lg-4">
//                                     <i className="icons icon-phone text-3 text-color-dark position-relative top-1"></i>
//                                 </div>
//                                 <div className="header-extra-info-text">
//                                     <label className="text-1 font-weight-semibold text-color-default">CALL US NOW</label>
//                                     <strong className="text-4"><a href="tel:+1234567890" className="text-color-hover-primary text-decoration-none">+123 4567 890</a></strong>
//                                 </div>
//                             </li>
//                         </ul>
//                         <div className="d-flex col-auto col-lg-2 pe-0 ps-0 ps-xl-3">
//                             <ul className="header-extra-info">
//                                 <li className="ms-0 ms-xl-4">
//                                     <div className="header-extra-info-icon">
//                                         <a href="#" className="text-decoration-none text-color-dark text-color-hover-primary text-2">
//                                             <i className="icons icon-user"></i>
//                                         </a>
//                                     </div>
//                                 </li>
//                                 <li className="me-2 ms-3">
//                                     <div className="header-extra-info-icon">
//                                         <a href="#" className="text-decoration-none text-color-dark text-color-hover-primary text-2">
//                                             <i className="icons icon-heart"></i>
//                                         </a>
//                                     </div>
//                                 </li>
//                             </ul>
//                             <div className="header-nav-features ps-0 ms-1">
//                                 <div className="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
//                                     <a href="#" className="header-nav-features-toggle" onClick={handleToggle}>
//                                         <img src={cartIcon} height="30" alt="" className="header-nav-top-icon-img" />
//                                         <span className="cart-info">
//                                             <span className="cart-qty">1</span>
//                                         </span>
//                                     </a>
//                                     <div  className="header-nav-features-dropdown" id="headerTopCartDropdown">
//                                         <ol className="mini-products-list">
//                                             <li className="item">
//                                                 <a href="#" title="Camera X1000" className="product-image">

//                                                     {/* <img src="img/products/product-1.jpg" alt="Camera X1000"/> */}

//                                                     </a>
//                                                 <div className="product-details">
//                                                     <p className="product-name">
//                                                         <a href="#">Camera X1000 </a>
//                                                     </p>
//                                                     <p className="qty-price">
//                                                          1X <span className="price">$890</span>
//                                                     </p>
//                                                     <a href="#" title="Remove This Item" className="btn-remove"><i className="fas fa-times"></i></a>
//                                                 </div>
//                                             </li>
//                                         </ol>
//                                         <div className="totals">
//                                             <span className="label">Total:</span>
//                                             <span className="price-total"><span className="price">$890</span></span>
//                                         </div>
//                                         <div className="actions">
//                                             <a className="btn btn-dark" href="#">View Cart</a>
//                                             <a className="btn btn-primary" href="#">Checkout</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="header-column justify-content-end">
//                     <div className="header-row">

//                     </div>
//                 </div>
//             </div>
//         </div>
//         <div className="header-nav-bar header-nav-bar-top-border bg-light">
//             <div className="header-container container">
//                 <div className="header-row">
//                     <div className="header-column">
//                         <div className="header-row justify-content-end">
//                             <div className="header-nav header-nav-line header-nav-top-line header-nav-top-line-with-border justify-content-start" data-sticky-header-style="{'minResolution': 991}" data-sticky-header-style-active="{'margin-left': '105px'}" data-sticky-header-style-deactive="{'margin-left': '0'}">
//                                 <div className="header-nav-main header-nav-main-square header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1 w-100">
//                                     <nav className="collapse w-100">
//                                         <ul className="nav nav-pills w-100" id="mainNav">
//                                             <li className="dropdown">
//                                                 <a className="dropdown-item dropdown-toggle" href="index.html">
//                                                     Home
//                                                 </a>
//                                             </li>
//                                             <li className="dropdown ms-lg-auto">
//                                                 <a href="#" className="dropdown-item">
//                                                     Outlet
//                                                 </a>
//                                             </li>
//                                             <li className="dropdown">
//                                                 <a href="#" className="dropdown-item">
//                                                     Buy Porto!
//                                                 </a>
//                                             </li>
//                                         </ul>
//                                     </nav>
//                                 </div>
//                                 <button className="btn header-btn-collapse-nav" data-bs-toggle="collapse" data-bs-target=".header-nav-main nav">
//                                     <i className="fas fa-bars"></i>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </header>


<header className="header">
<div className="header-top">
    <div className="container">
        <div className="header-left d-none d-sm-block">
            <p className="top-message text-uppercase">FREE Returns. Standard Shipping Orders $99+</p>
        </div>


        <div className="header-right header-dropdowns ml-0 ml-sm-auto w-sm-100">
            <div className="header-dropdown dropdown-expanded d-none d-lg-block">
                <a href="#">Links</a>
                <div className="header-menu">
                    <ul>
                        
                        {/* <li><a href="about.html">About Us</a></li>
                        <li><a href="blog.html">Blog</a></li> */}
                        <li><a href="#">My Wishlist</a></li>
                        <li><Link href="/cart">Cart</Link></li>
                        {
                            auth.user != null? <li><Link href={route('user.account')}>My Account</Link></li>: <li><Link href={route('user.login')}>Log In</Link></li>
                        }
                        
                    </ul>
                </div>

            </div>


            <span className="separator"></span>

            <div className="header-dropdown">
                <a href="#"><i className="flag-us flag"></i>ENG</a>
                <div className="header-menu">
                    <ul>
                        <li><a href="#"><i className="flag-us flag mr-2"></i>ENG</a>
                        </li>
                        <li><a href="#"><i className="flag-fr flag mr-2"></i>FRA</a></li>
                    </ul>
                </div>

            </div>


            <div className="header-dropdown mr-auto mr-sm-3 mr-md-0">
                <a href="#">USD</a>
                <div className="header-menu">
                    <ul>
                        <li><a href="#">EUR</a></li>
                        <li><a href="#">USD</a></li>
                    </ul>
                </div>

            </div>


            <span className="separator"></span>

            <div className="social-icons">
                <a href="#" className="social-icon social-facebook icon-facebook" target="_blank"></a>
                <a href="#" className="social-icon social-twitter icon-twitter" target="_blank"></a>
                <a href="#" className="social-icon social-instagram icon-instagram" target="_blank"></a>
            </div>

        </div>

    </div>

</div>


<div className="header-middle sticky-header" data-sticky-options="{'mobile': true}">
    <div className="container">
        <div className="header-left col-lg-2 w-auto pl-0">
            <button className="mobile-menu-toggler text-primary mr-2" type="button">
                <i className="fas fa-bars"></i>
            </button>
            <Link href={route('home')} className="logo">
                <img src={logo} width="111" height="44" alt="Porto Logo" />
            </Link>
        </div>


        <div className="header-right w-lg-max">
            <div className="header-icon header-search header-search-inline header-search-category w-lg-max text-right mt-0">
                <a href="#" className="search-toggle" role="button"><i className="icon-search-3"></i></a>
                <form action="#" autoComplete='off' method="get">
                    <div className="header-search-wrapper">
                        <input autoComplete='off' onChange={search}  type="search" className="form-control" name="q" id="q" placeholder="Search..." required />
                        <div className="select-custom">
                            <select id="cat"  name="category" defaultValue="all">
                                <option value="all">All Categories</option>
                                {
                                                        categories.map((item, index)=>{
                                                                return(
                                                                    <option key={index}  value={item.id}>{item.cat_name}</option>
                                                                )
                                                            })
                                 }
                            </select>


                        </div>

                        <button disabled className="btn icon-magnifier p-0" title="search" type="submit"></button>
                    </div>

                </form>
                {
              filterSearch && Object.keys(filterSearch).length !=0?
                <div className="search_reuslt_wrap">
                    <div className='search_result'>
                    <ul>
                        {
                          // flash.data && flash.data.search && flash.data.search.map((item)=>{
                            filterSearch.map((item,index)=>{
                                return(
                                    <li key={index}><Link href={route('product.show', item.slug)}>{item.name}</Link></li>
                                )
                            })
                        }

         
                    </ul>
                </div></div>: ""
                }

            </div>


            <div className="header-contact d-none d-lg-flex pl-4 pr-4">
                <img alt="phone" src="/assets/images/phone.png" width="30" height="30" className="pb-1" />
                <h6><span>Call us now</span><a href="tel:#" className="text-dark font1">+123 5678 890</a></h6>
            </div>
            {
                auth.user != null?<Link href={route('user.account')} className="header-icon" title="login"><i className="icon-user-2"></i></Link>:<Link href={route('user.login')} className="header-icon" title="login"><i className="icon-user-2"></i></Link>
            }
            

            <a href="#" className="header-icon" title="wishlist"><i className="icon-wishlist-2"></i></a>

            <div className="dropdown cart-dropdown">
                <a href="#" title="Cart" className="dropdown-toggle dropdown-arrow cart-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                    <i className="minicart-icon"></i>
                    <span className="cart-count badge-circle">{count}</span>
                </a>

                <div className="cart-overlay"></div>

                <div className="dropdown-menu mobile-cart">
                    <a href="#" title="Close (Esc)" className="btn-close">×</a>

                    <div className="dropdownmenu-wrapper custom-scrollbar">
                        <div className="dropdown-cart-header">Shopping Cart</div>


                        <div className="dropdown-cart-products">

                            {
                              Object.values(cartItems).length !=0?Object.values(cartItems).map((item, index)=>{
                                    return(

                                        <div key={index} className="product">
                                        <div className="product-details">
                                            <h4 className="product-title">
                                                <Link href={route('product.show',item.options.slug)}>{item.name}</Link>
                                            </h4>
        
                                            <span className="cart-product-info">
                                                <span className="cart-product-qty">{item.qty}</span> × {item.price}
                                            </span>
                                        </div>
          
        
                                        <figure className="product-image-container">
                                            <a href="product.html" className="product-image">
                                                <img src={'/public/uploads/'+item.options.image} alt="product" width="80" height="80" />
                                            </a>
        
                                            <Link onClick={()=>removeCartItem(item.rowId)}  className="btn-remove" title="Remove Product"><span>×</span></Link>
                                        </figure>
                                    </div>
               
        
                                    )
                                }): <p style={{'fontSize':'15px'}}> The cart is empty! </p>
                            }


                        </div>


                        <div className="dropdown-cart-total">
                            <span>SUBTOTAL:</span>

                            <span className="cart-total-price float-right">${subtotal}</span>
                        </div>

                        <div className="dropdown-cart-action">
                            <Link href={route('cart.list')} className="btn btn-gray btn-block view-cart">View
                                Cart</Link>
                            <Link href={route('checkout.index')} className="btn btn-dark btn-block">Checkout</Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>


<div className="header-bottom sticky-header d-none d-lg-block" data-sticky-options="{'mobile': false}">
    <div className="container">
        <nav className="main-nav w-100">
            <ul className="menu">
                <li className="active">
                    <Link href="/">Home</Link>
                </li>                
                <li className="">
                    <Link href="/shop">Shop</Link>
                </li>
                <li>
                    <a href="#">Categories</a>
                    <div className="megamenu megamenu-fixed-width megamenu-3cols">
                        <div className="row">
                            <div className="col-lg-7">
                            <ul className="submenu">
                                {
                                    categories.map((item, index)=>{
                                      //  console.log(item);
                                      return(<li key={index}><Link href={route('category.product.show', item.cat_slug)} className="nolink">{item.cat_name}</Link></li>)
                                    })
                                }
                            </ul>
                                {/* <ul className="submenu">
                                    <li><a href="category.html">Fullwidth Banner</a></li>
                                    <li><a href="category-banner-boxed-slider.html">Boxed Slider Banner</a>
                                    </li>
                                    <li><a href="category-banner-boxed-image.html">Boxed Image Banner</a>
                                    </li>
                                    <li><a href="category.html">Left Sidebar</a></li>
                                    <li><a href="category-sidebar-right.html">Right Sidebar</a></li>
                                    <li><a href="category-off-canvas.html">Off Canvas Filter</a></li>
                                    <li><a href="category-horizontal-filter1.html">Horizontal Filter1</a>
                                    </li>
                                    <li><a href="category-horizontal-filter2.html">Horizontal Filter2</a>
                                    </li>
                                </ul> */}
                            </div>
                            {/* <div className="col-lg-4">
                                <a href="#" className="nolink">VARIATION 2</a>
                                <ul className="submenu">
                                    <li><a href="category-list.html">List Types</a></li>
                                    <li><a href="category-infinite-scroll.html">Ajax Infinite Scroll</a>
                                    </li>
                                    <li><a href="category.html">3 Columns Products</a></li>
                                    <li><a href="category-4col.html">4 Columns Products</a></li>
                                    <li><a href="category-5col.html">5 Columns Products</a></li>
                                    <li><a href="category-6col.html">6 Columns Products</a></li>
                                    <li><a href="category-7col.html">7 Columns Products</a></li>
                                    <li><a href="category-8col.html">8 Columns Products</a></li>
                                </ul>
                            </div> */}
                            <div className="col-lg-5 p-0">
                                <div className="menu-banner">
                                    <figure>
                                        <img src="/assets/images/menu-banner.jpg" width="192" height="313" alt="Menu banner" />
                                    </figure>
                                    <div className="banner-content">
                                        <h4>
                                            <span className="">UP TO</span><br />
                                            <b className="">50%</b>
                                            <i>OFF</i>
                                        </h4>
                                        <Link href="#" className="btn btn-sm btn-dark">SHOP NOW</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </li>
        
                <li className=''><a href="#">Blog</a></li>
                <li className=''><a href="#">About Us</a></li>

                <li className=''><a href="#">Contact Us</a></li>

                {/* <li className="float-right"><a href="https://1.envato.market/DdLk5" rel="noopener" className="pl-5" target="_blank">Buy Porto!</a></li> */}
                <li className="float-right"><a href="#" className="pl-5">Special Offer!</a></li>
            </ul>
        </nav>
    </div>

</div>

</header>


  )
}
