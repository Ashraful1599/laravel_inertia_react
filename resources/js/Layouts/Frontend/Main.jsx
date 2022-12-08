import { usePage, Link,useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import banner1 from '../../../FrontEnd/assets/images/demoes/demo4/slider/slide-1.jpg'
import banner2 from '../../../FrontEnd/assets/images/demoes/demo4/slider/slide-2.jpg'


export default function Main({filterProduct}) {

    const {  categories,productsCustom } = usePage().props;

    const products = productsCustom.data;
  //  console.log(productsCustom);

    // const [items, setItems] = useState(products)

    // useEffect(()=>{

    //     setItems(filterProduct);
    //     console.log("here");

    // },[filterProduct])


 //   const items = filterProduct;

    // let items = filterProduct;
    // let itemsPerPage = 4;

  //  console.log(items);
 // We start with an empty list of items.
//  const [currentItems, setCurrentItems] = useState();
//  const [pageCount, setPageCount] = useState(0);
//  // Here we use item offsets; we could also use page offsets
//  // following the API or data you're working with.
//  const [itemOffset, setItemOffset] = useState(0);

//  useEffect(() => {
//    // Fetch items from another resources.
//    const endOffset = itemOffset + itemsPerPage;
//    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//    setCurrentItems(items.slice(itemOffset, endOffset));
//    setPageCount(Math.ceil(items.length / itemsPerPage));
//  }, [itemOffset, itemsPerPage,items]);

//  // Invoke when user click to request another page.
//  const handlePageClick = (event) => {
//    const newOffset = (event.selected * itemsPerPage) % items.length;
//    console.log(
//      `User requested page number ${event.selected}, which is offset ${newOffset}`
//    );
//    setItemOffset(newOffset);
//  };

const fewFirstElements = products.slice(0, 10);


const {data, setData, post, processing, errors, reset} = useForm({
    id: '',
    name: '',
    price: '',
    quantity: 1,
    image: '',
    slug: '',
    product_type: '',
    add_to_cart: false,
})


const cartHandle = (e,prod,index,product_row)=>{
e.preventDefault();


localStorage.setItem('product_grid', index);
localStorage.setItem('product_row', product_row);
setData({
    ...data,
    id: prod.id,
    name: prod.name,
    price: prod.offer_price,
    quantity: 1,
    image: prod.image,
    slug: prod.slug,
    product_type: prod.product_type,
    add_to_cart: true,
})

setscrollX(window.scrollX);
setscrollY(window.scrollY);


}


useEffect(()=>{
console.log(data);
if(data.add_to_cart){
post(route('cart.store', data));
}
},[data])

    useEffect(()=>{
        if(processing){
            var product_row = localStorage.getItem('product_row');
            var product_grid = localStorage.getItem('product_grid');
           // console.log(product_row)
                document.querySelectorAll('.'+product_row+'.product_grid'+product_grid+' .btn_loader_home')[0].style.display = 'block';
        }else{
            document.querySelectorAll('.product-default .btn_loader_home').forEach((el)=>{
                el.style.display = "none";
            })
        }

    },[processing])

  //  const scrollX = window.scrollX;
  //  const scrollY = window.scrollY;
  const [scrollX, setscrollX] = useState();
  const [scrollY, setscrollY] = useState();
    useLayoutEffect(() => {
      window.scrollTo(scrollX, scrollY);
    });



    return (
    //     <div role="main" className="main shop pt-4">

    //         <div className="container">
    //             <div className="masonry-loader masonry-loader-loaded">
    //                 <div
    //                     className="row products product-thumb-info-list"
    //                     data-plugin-masonry
    //                     data-plugin-options="{'layoutMode': 'fitRows'}"
    //                 >

    //                     {currentItems && 
    //                         currentItems.map((item, index) => {
    //                         return (
    //                             <div key={index} className="col-12 col-sm-6 col-lg-3">
    //                                 <div className="product mb-0">
    //                                     <div className="product-thumb-info border-0 mb-3">
    //                                         <div className="product-thumb-info-badges-wrapper">
    //                                             <span className="badge badge-ecommerce badge-success">
    //                                                 NEW
    //                                             </span>
    //                                         </div>

    //                                         <div className="addtocart-btn-wrapper">
    //                                             <a
    //                                                 href="shop-cart.html"
    //                                                 className="text-decoration-none addtocart-btn"
    //                                                 title="Add to Cart"
    //                                             >
    //                                                 <i className="icons icon-bag"></i>
    //                                             </a>
    //                                         </div>

    //                                         <a
    //                                             href="ajax/shop-product-quick-view.html"
    //                                             className="quick-view text-uppercase font-weight-semibold text-2"
    //                                         >
    //                                             QUICK VIEW
    //                                         </a>
    //                                         <a href="shop-product-sidebar-left.html">
    //                                             <div className="product-thumb-info-image">
    //                                                 <img
    //                                                     alt=""
    //                                                     className="img-fluid"
    //                                                     src={'/uploads/'+item.image}
    //                                                 />
    //                                             </div>
    //                                         </a>
    //                                     </div>
    //                                     <div className="d-flex justify-content-between">
    //                                         <div>
    //                                             <a
    //                                                 href="#"
    //                                                 className="d-block text-uppercase text-decoration-none text-color-default text-color-hover-primary line-height-1 text-0 mb-1"
    //                                             >
    //                                                 {item.category? item.category.cat_name : ""}
    //                                             </a>
    //                                             <h3 className="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0">
    //                                                 <a
    //                                                     href="shop-product-sidebar-right.html"
    //                                                     className="text-color-dark text-color-hover-primary"
    //                                                 >
    //                                                    {item.name}
    //                                                 </a>
    //                                             </h3>
    //                                         </div>
    //                                         <a
    //                                             href="#"
    //                                             className="text-decoration-none text-color-default text-color-hover-dark text-4"
    //                                         >
    //                                             <i className="far fa-heart"></i>
    //                                         </a>
    //                                     </div>
    //                                     {/* <div title="Rated 5 out of 5">
    //                                         <input
    //                                             type="text"
    //                                             className="d-none"
    //                                             value="5"
    //                                             title=""
    //                                             data-plugin-star-rating
    //                                             data-plugin-options="{'displayOnly': true, 'color': 'default', 'size':'xs'}"
    //                                         />
    //                                     </div> */}
    //                                     <p className="price text-5 mb-3">
    //                                         {/* <span className="sale text-color-dark font-weight-semi-bold">
    //                                             $69,00
    //                                         </span> */}
    //                                         <span className="amount">
    //                                             {item.price} $
    //                                         </span>
    //                                     </p>
    //                                 </div>
    //                             </div>
    //                         );
    //                     })}
    //                 </div>
    //                 <div className="row mt-4">
    //                     <div className="col">


    //  <ReactPaginate
    //     breakLabel="..."
    //     nextLabel={<i className="fas fa-angle-right"></i>}
    //    onPageChange={handlePageClick}
    //     pageRangeDisplayed={5}
    //     pageCount={pageCount}
    //     previousLabel={<i className="fas fa-angle-left"></i>}
    //     renderOnZeroPageCount={null}
    //     containerClassName = "pagination float-end"
    //     pageClassName="page-item"
    //     activeClassName = "active"
    //     breakClassName="page-item"
    //     pageLinkClassName="page-link"
    //     previousClassName="page-item"
    //     nextClassName='page-item' 
    //     previousLinkClassName="page-link"
    //     nextLinkClassName="page-link"
    //   />



    //                         {/* <ul className="pagination float-end">
    //                             <li className="page-item">
    //                                 <a className="page-link" href="#">
    //                                     <i className="fas fa-angle-left"></i>
    //                                 </a>
    //                             </li>
    //                             <li className="page-item active">
    //                                 <a className="page-link" href="#">
    //                                     1
    //                                 </a>
    //                             </li>
    //                             <li className="page-item">
    //                                 <a className="page-link" href="#">
    //                                     2
    //                                 </a>
    //                             </li>
    //                             <li className="page-item">
    //                                 <a className="page-link" href="#">
    //                                     3
    //                                 </a>
    //                             </li>
    //                             <li className="page-item">
    //                                 <a className="page-link" href="#">
    //                                     <i className="fas fa-angle-right"></i>
    //                                 </a>
    //                             </li>
    //                         </ul> */}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    <main className="main">
     <div className="home-slider slide-animate owl-carousel owl-theme show-nav-hover nav-big mb-2 text-uppercase" data-owl-options="{
        'loop': false
    }">
        <div className="home-slide home-slide1 banner">
            <img className="slide-bg" src={banner1} width="1903" height="499" alt="slider image" />
            <div className="container d-flex align-items-center">
                <div className="banner-layer appear-animate" data-animation-name="fadeInUpShorter">
                    <h4 className="text-transform-none m-b-3">Find the Boundaries. Push Through!</h4>
                    <h2 className="text-transform-none mb-0">Summer Sale</h2>
                    <h3 className="m-b-3">70% Off</h3>
                    <h5 className="d-inline-block mb-0">
                        <span>Starting At</span>
                        <b className="coupon-sale-text text-white bg-secondary align-middle"><sup>$</sup><em
                                className="align-text-top">199</em><sup>99</sup></b>
                    </h5>
                    <Link href="/shop" className="btn btn-dark btn-lg">Shop Now!</Link>
                </div>
    
            </div>
        </div>


        <div className="home-slide home-slide2 banner banner-md-vw">
            <img className="slide-bg" style={{'backgroundColor': '#ccc'}} width="1903" height="499" src={banner2} alt="slider image"/>
            <div className="container d-flex align-items-center">
                <div className="banner-layer d-flex justify-content-center appear-animate" data-animation-name="fadeInUpShorter">
                    <div className="mx-auto">
                        <h4 className="m-b-1">Extra</h4>
                        <h3 className="m-b-2">20% off</h3>
                        <h3 className="mb-2 heading-border">Accessories</h3>
                        <h2 className="text-transform-none m-b-4">Summer Sale</h2>
                        <Link href="/shop" className="btn btn-block btn-dark">Shop All Sale</Link>
                    </div>
                </div>

            </div>
        </div>

    </div> 


     <div className="container">
        <div className="info-boxes-slider owl-carousel owl-theme mb-2" data-owl-options="{
            'dots': false,
            'loop': false,
            'responsive': {
                '576': {
                    'items': 2
                },
                '992': {
                    'items': 3
                }
            }
        }">
            <div className="info-box info-box-icon-left">
                <i className="icon-shipping"></i>

                <div className="info-box-content">
                    <h4>FREE SHIPPING &amp; RETURN</h4>
                    <p className="text-body">Free shipping on all orders over $99.</p>
                </div>

            </div>


            <div className="info-box info-box-icon-left">
                <i className="icon-money"></i>

                <div className="info-box-content">
                    <h4>MONEY BACK GUARANTEE</h4>
                    <p className="text-body">100% money back guarantee</p>
                </div>

            </div>


            <div className="info-box info-box-icon-left">
                <i className="icon-support"></i>

                <div className="info-box-content">
                    <h4>ONLINE SUPPORT 24/7</h4>
                    <p className="text-body">Lorem ipsum dolor sit amet.</p>
                </div>

            </div>

        </div>


        <div className="banners-container mb-2">
            <div className="banners-slider owl-carousel owl-theme" data-owl-options="{
                'dots': false
            }">
                <div className="banner banner1 banner-sm-vw d-flex align-items-center appear-animate" style={{'backgroundColor': '#ccc'}} data-animation-name="fadeInLeftShorter" data-animation-delay="500">
                    <figure className="w-100">
                        <img src="/assets/images/demoes/demo4/banners/banner-1.jpg" alt="banner" width="380" height="175" />
                    </figure>
                    <div className="banner-layer">
                        <h3 className="m-b-2">Porto Watches</h3>
                        <h4 className="m-b-3 text-primary"><sup className="text-dark"><del>20%</del></sup>30%<sup>OFF</sup></h4>
                        <Link href="/shop" className="btn btn-sm btn-dark">Shop Now</Link>
                    </div>
                </div>


                <div className="banner banner2 banner-sm-vw text-uppercase d-flex align-items-center appear-animate" data-animation-name="fadeInUpShorter" data-animation-delay="200">
                    <figure className="w-100">
                        <img src="/assets/images/demoes/demo4/banners/banner-2.jpg" style={{'backgroundColor': '#ccc'}} alt="banner" width="380" height="175" />
                    </figure>
                    <div className="banner-layer text-center">
                        <div className="row align-items-lg-center">
                            <div className="col-lg-7 text-lg-right">
                                <h3>Deal Promos</h3>
                                <h4 className="pb-4 pb-lg-0 mb-0 text-body">Starting at $99</h4>
                            </div>
                            <div className="col-lg-5 text-lg-left px-0 px-xl-3">
                                <Link href="/shop" className="btn btn-sm btn-dark">Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="banner banner3 banner-sm-vw d-flex align-items-center appear-animate" style={{'backgroundColor': '#ccc'}} data-animation-name="fadeInRightShorter" data-animation-delay="500">
                    <figure className="w-100">
                        <img src="/assets/images/demoes/demo4/banners/banner-3.jpg" alt="banner" width="380" height="175" />
                    </figure>
                    <div className="banner-layer text-right">
                        <h3 className="m-b-2">Handbags</h3>
                        <h4 className="m-b-2 text-secondary text-uppercase">Starting at $99</h4>
                        <Link href="/shop" className="btn btn-sm btn-dark">Shop Now</Link>
                    </div>
                </div>

            </div>
        </div>
    </div> 


    <section className="featured-products-section">
        <div className="container">
            <h2 className="section-title heading-border ls-20 border-0">Featured Products</h2>

            <div className="products-slider custom-products owl-carousel owl-theme nav-outer show-nav-hover nav-image-center" data-owl-options="{
                'dots': false,
                'nav': true
            }">



            {fewFirstElements.map((item, index)=>{
                return(
                    <div  key={index} className={'product_featured product-default appear-animate product_grid'+index} data-animation-name="fadeInRightShorter">
                        {<img style={{'display':'none'}} className='btn_loader btn_loader_home' src="/loader_blue.svg" alt="" />}
                    <figure>
                        <Link href={route('product.show',item.slug)}>
                            <img src={`/uploads/${item.image}`} width="280" height="280" alt="product" />
                            {item.image2? <img src={`/uploads/${item.image2}`} width="280" height="280" alt="product" />: ""}
                        </Link>
                        <div className="label-group">
                            <div className="product-label label-hot">{item.promo1}</div>
                            <div className="product-label label-sale">{item.promo2}</div>
                        </div>
                    </figure>
                    <div className="product-details">
                        <div className="category-list">
                            <Link href="/" className="product-category">{item.category.cat_name}</Link>
                        </div>
                        <h3 className="product-title">
                        <Link href={route('product.show',item.slug)}>
                                {item.name}</Link>
                        </h3>
                        <div className="ratings-container">
                            <div className="product-ratings">
                                <span className="ratings" style={{'width': '60%'}}></span>
          
                                <span className="tooltiptext tooltip-top"></span>
                            </div>
               
                        </div>
                      {  
                      item.product_type == "simple"?
                        <div className="price-box">
                            <del className="old-price">{item.regular_price}</del>
                            <span className="product-price">{item.offer_price}</span>
                        </div>
                        :
                        <div className="price-box">
                            {/* <del className="old-price">{item.regular_price}</del> */}
                            <span className="product-price">{item.variable_min_max}</span> 
                        </div>
                    }

{
                   item.product_type == "simple"?
                   <div className="product-action">
                   <Link href="/" className="btn-icon-wish" title="wishlist"><i
                           className="icon-heart"></i></Link>
        
                    <Link disabled={processing} as="button" type="button" onClick={(e)=>cartHandle(e,item,index,'product_featured')} className={processing?'btn-icon btn-add-cart disabled':"btn-icon btn-add-cart"}><i
                           className="fa fa-arrow-right"></i><span>ADD TO CART</span></Link>
                   <Link href="/" className="btn-quickview" title="Quick View"><i
                           className="fas fa-external-link-alt"></i></Link>
               </div>: 

                <div className="product-action">
                <Link href={route('product.show',item.slug)} className="btn-icon-wish" title="wishlist"><i
                        className="icon-heart"></i></Link>
                <Link href={route('product.show',item.slug)} className="btn-icon btn-add-cart"><i
                        className="fa fa-arrow-right"></i><span>SELECT
                        OPTIONS</span></Link>
                <Link href={route('product.show',item.slug)} className="btn-quickview" title="Quick View"><i
                        className="fas fa-external-link-alt"></i></Link>
                </div>
        }
                            

                    </div>

                </div>
                )
            })}


            </div>

        </div>
    </section> 

     <section className="new-products-section">
        <div className="container">
            <h2 className="section-title heading-border ls-20 border-0">New Arrivals</h2>

            <div className="products-slider custom-products owl-carousel owl-theme nav-outer show-nav-hover nav-image-center mb-2" data-owl-options="{
                'dots': false,
                'nav': true,
                'responsive': {
                    '992': {
                        'items': 4
                    },
                    '1200': {
                        'items': 5
                    }
                }
            }">

{fewFirstElements.map((item, index)=>{
                return(
                    <div key={index} className={'product_new_arrival product-default appear-animate product_grid'+index} data-animation-name="fadeInRightShorter">
                          {<img style={{'display':'none'}} className='btn_loader btn_loader_home' src="/loader_blue.svg" alt="" />}
                    <figure>
                    <Link href={route('product.show',item.slug)}>
                            <img src={`/uploads/${item.image}`} width="280" height="220" alt="product" />
                          {item.image2?<img src={`/uploads/${item.image2}`} width="280" height="220" alt="product" />: "" }  
                        </Link>
                        <div className="label-group">
                        <div className="product-label label-hot">{item.promo1}</div>
                            <div className="product-label label-sale">{item.promo2}</div>
                        </div>
                    </figure>
                    <div className="product-details">
                        <div className="category-list">
                            <Link href="/" className="product-category">{item.category.cat_name}</Link>
                        </div>
                        <h3 className="product-title">
                        <Link href={route('product.show',item.slug)}>{item.name}</Link>
                        </h3>
                        <div className="ratings-container">
                            <div className="product-ratings">
                                <span className="ratings" style={{'width': '60%'}}></span>
          
                                <span className="tooltiptext tooltip-top"></span>
                            </div>
               
                        </div>
                      {  
                      item.product_type == "simple"?
                        <div className="price-box">
                            <del className="old-price">{item.regular_price}</del>
                            <span className="product-price">{item.offer_price}</span>
                        </div>
                        :
                        <div className="price-box">
                            {/* <del className="old-price">{item.regular_price}</del> */}
                            <span className="product-price">{item.variable_min_max}</span>
                        </div>
                    }

{
                   item.product_type == "simple"?
                   <div className="product-action">
                   <Link href="/" className="btn-icon-wish" title="wishlist"><i
                           className="icon-heart"></i></Link>      
                   <Link disabled={processing} as="button" type="button" onClick={(e)=>cartHandle(e,item,index,'product_new_arrival')} className={processing?'btn-icon btn-add-cart disabled':"btn-icon btn-add-cart"}><i
                           className="fa fa-arrow-right"></i><span>ADD TO CART </span></Link>
                   <Link href="/" className="btn-quickview" title="Quick View"><i
                           className="fas fa-external-link-alt"></i></Link>
               </div>: 

                <div className="product-action">
                <Link href={route('product.show',item.slug)} className="btn-icon-wish" title="wishlist"><i
                        className="icon-heart"></i></Link>
                <Link href={route('product.show',item.slug)} className="btn-icon btn-add-cart"><i
                        className="fa fa-arrow-right"></i><span>SELECT
                        OPTIONS</span></Link>
                <Link href={route('product.show',item.slug)} className="btn-quickview" title="Quick View"><i
                        className="fas fa-external-link-alt"></i></Link>
                </div>
        }
                            

                    </div>
                </div>
                )
            } )
        }    


            </div>


            <div className="banner banner-big-sale appear-animate" data-animation-delay="200" data-animation-name="fadeInUpShorter" >
                <div className="banner-content row align-items-center mx-0">
                    <div className="col-md-9 col-sm-8">
                        <h2 className="text-white text-uppercase text-center text-sm-left ls-n-20 mb-md-0 px-4">
                            <b className="d-inline-block mr-3 mb-1 mb-md-0">Big Sale</b> All new fashion brands items up to 70% off
                            <small className="text-transform-none align-middle">Online Purchases Only</small>
                        </h2>
                    </div>
                    <div className="col-md-3 col-sm-4 text-center text-sm-right">
                        <a className="btn btn-light btn-white btn-lg" href="#">View Sale</a>
                    </div>
                </div>
            </div>

            <h2 className="section-title categories-section-title heading-border border-0 ls-0 appear-animate" data-animation-delay="100" data-animation-name="fadeInUpShorter">Browse Our Categories
            </h2>

            <div className="categories-slider owl-carousel owl-theme show-nav-hover nav-outer">

                {
                    categories.map((item, index)=>{
                        return(
                            <div key={index} className="product-category appear-animate" data-animation-name="fadeInUpShorter">
                            <Link href={route('category.product.show', item.cat_slug)}>
                                <figure>
                                    <img src={'/uploads/'+item.image.slug} alt={item.name} width="280" height="240" />
                                </figure>
                                <div className="category-content">
                                    <h3>{item.cat_name}</h3>
                                    <span><mark className="count">{item.product_count.length}</mark> products</span>
                                </div>
                            </Link>
                        </div>
                        )
                    })
                }

            </div>
        </div>
    </section> 
 
    <section className="feature-boxes-container">
        <div className="container appear-animate" data-animation-name="fadeInUpShorter">
            <div className="row">
                <div className="col-md-4">
                    <div className="feature-box px-sm-5 feature-box-simple text-center">
                        <div className="feature-box-icon">
                            <i className="icon-earphones-alt"></i>
                        </div>

                        <div className="feature-box-content p-0">
                            <h3>Customer Support</h3>
                            <h5>You Won't Be Alone</h5>

                            <p>We really care about you and your website as much as you do. Purchasing Porto or any other theme from us you get 100% free support.</p>
                        </div>

                    </div>
      
                </div>
   

                <div className="col-md-4">
                    <div className="feature-box px-sm-5 feature-box-simple text-center">
                        <div className="feature-box-icon">
                            <i className="icon-credit-card"></i>
                        </div>

                        <div className="feature-box-content p-0">
                            <h3>Fully Customizable</h3>
                            <h5>Tons Of Options</h5>

                            <p>With Porto you can customize the layout, colors and styles within only a few minutes. Start creating an amazing website right now!</p>
                        </div>
   
                    </div>

                </div>


                <div className="col-md-4">
                    <div className="feature-box px-sm-5 feature-box-simple text-center">
                        <div className="feature-box-icon">
                            <i className="icon-action-undo"></i>
                        </div>
                        <div className="feature-box-content p-0">
                            <h3>Powerful Admin</h3>
                            <h5>Made To Help You</h5>

                            <p>Porto has very powerful admin features to help customer to build their own shop in minutes without any special skills in web development.</p>
                        </div>

                    </div>
     
                </div>
   
            </div>

        </div>

    </section> 


     <section className="promo-section bg-dark" data-parallax="{'speed': 2, 'enableOnMobile': true}" data-image-src="/assets/images/demoes/demo4/banners/banner-5.jpg">
        <div className="promo-banner banner container text-uppercase">
            <div className="banner-content row align-items-center text-center">
                <div className="col-md-4 ml-xl-auto text-md-right appear-animate" data-animation-name="fadeInRightShorter" data-animation-delay="600">
                    <h2 className="mb-md-0 text-white">Top Fashion<br />Deals</h2>
                </div>
                <div className="col-md-4 col-xl-3 pb-4 pb-md-0 appear-animate" data-animation-name="fadeIn" data-animation-delay="300">
                    <a href="#" className="btn btn-dark btn-black ls-10">View Sale</a>
                </div>
                <div className="col-md-4 mr-xl-auto text-md-left appear-animate" data-animation-name="fadeInLeftShorter" data-animation-delay="600">
                    <h4 className="mb-1 mt-1 font1 coupon-sale-text p-0 d-block ls-n-10 text-transform-none">
                        <b>Exclusive
                            COUPON</b></h4>
                    <h5 className="mb-1 coupon-sale-text text-white ls-10 p-0"><i className="ls-0">UP TO</i><b className="text-white bg-secondary ls-n-10">$100</b> OFF</h5>
                </div>
            </div>
        </div>
    </section> 

     <section className="blog-section pb-0">
        <div className="container">
            <h2 className="section-title heading-border border-0 appear-animate" data-animation-name="fadeInUp"> Latest News</h2>

            <div className="owl-carousel owl-theme appear-animate" data-animation-name="fadeIn" data-owl-options="{
                'loop': false,
                'margin': 20,
                'autoHeight': false,
                'autoplay': false,
                'dots': false,
                'items': 2,
                'responsive': {
                    '0': {
                        'items': 1
                    },
                    '480': {
                        'items': 2
                    },
                    '576': {
                        'items': 3
                    },
                    '768': {
                        'items': 4
                    }
                }
            }">
                <article className="post">
                    <div className="post-media">
                        <a href="#">
                            <img src="/assets/images/blog/home/post-1.jpg" alt="Post" width="225" height="280" />
                        </a>
                        <div className="post-date">
                            <span className="day">26</span>
                            <span className="month">Feb</span>
                        </div>
                    </div>
    

                    <div className="post-body">
                        <h2 className="post-title">
                            <a href="#">Top New Collection</a>
                        </h2>
                        <div className="post-content">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus sem. Aenean...</p>
                        </div>

                        <a href="#" className="post-comment">0 Comments</a>
                    </div>
      
                </article>
  

                <article className="post">
                    <div className="post-media">
                        <a href="#">
                            <img src="/assets/images/blog/home/post-2.jpg" alt="Post" width="225" height="280" />
                        </a>
                        <div className="post-date">
                            <span className="day">26</span>
                            <span className="month">Feb</span>
                        </div>
                    </div>


                    <div className="post-body">
                        <h2 className="post-title">
                            <a href="#">Fashion Trends</a>
                        </h2>
                        <div className="post-content">
                            <p>Leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of...</p>
                        </div>
      
                        <a href="#" className="post-comment">0 Comments</a>
                    </div>

                </article>


                <article className="post">
                    <div className="post-media">
                        <a href="#">
                            <img src="/assets/images/blog/home/post-3.jpg" alt="Post" width="225" height="280" />
                        </a>
                        <div className="post-date">
                            <span className="day">26</span>
                            <span className="month">Feb</span>
                        </div>
                    </div>


                    <div className="post-body">
                        <h2 className="post-title">
                            <a href="#">Right Choices</a>
                        </h2>
                        <div className="post-content">
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the...</p>
                        </div>

                        <a href="#" className="post-comment">0 Comments</a>
                    </div>

                </article>


                <article className="post">
                    <div className="post-media">
                        <a href="#">
                            <img src="/assets/images/blog/home/post-4.jpg" alt="Post" width="225" height="280" />
                        </a>
                        <div className="post-date">
                            <span className="day">26</span>
                            <span className="month">Feb</span>
                        </div>
                    </div>


                    <div className="post-body">
                        <h2 className="post-title">
                            <a href="#">Perfect Accessories</a>
                        </h2>
                        <div className="post-content">
                            <p>Leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of...</p>
                        </div>
     
                        <a href="#" className="post-comment">0 Comments</a>
                    </div>

                </article>

            </div>

            <hr className="mt-0 m-b-5" />

             {/* <div className="brands-slider owl-carousel owl-theme images-center " data-owl-options="{
            'margin': 0}">
                <img src="/assets/images/brands/brand1.png" width="130" height="56" alt="brand" />
                <img src="/assets/images/brands/brand2.png" width="130" height="56" alt="brand" />
                <img src="/assets/images/brands/brand3.png" width="130" height="56" alt="brand" />
                <img src="/assets/images/brands/brand4.png" width="130" height="56" alt="brand" />
                <img src="/assets/images/brands/brand5.png" width="130" height="56" alt="brand" />
                <img src="/assets/images/brands/brand6.png" width="130" height="56" alt="brand" />
            </div> 

            <hr className="mt-4 m-b-5" /> */}




            <div className="product-widgets-container row pb-2">
<div className="col-lg-3 col-sm-6 pb-5 pb-md-0 appear-animate" data-animation-name="fadeInLeftShorter" data-animation-delay="200">
    <h4 className="section-sub-title">Featured Products</h4>
    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-1.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-1-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Ultimate 3D Bluetooth Speaker</a>
            </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>

                    <span className="tooltiptext tooltip-top"></span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>

    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-2.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-2-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Brown Women Casual HandBag</a>
            </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>

                    <span className="tooltiptext tooltip-top">5.00</span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>

    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-3.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-3-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Circled Ultimate 3D Speaker</a>
            </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>
                    <span className="tooltiptext tooltip-top"></span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>
</div>

<div className="col-lg-3 col-sm-6 pb-5 pb-md-0 appear-animate" data-animation-name="fadeInLeftShorter" data-animation-delay="500">
    <h4 className="section-sub-title">Best Selling Products</h4>
    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-4.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-4-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Blue Backpack for the Young -
                    S</a> </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>
                    <span className="tooltiptext tooltip-top">5.00</span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>

    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-5.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-5-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Casual Spring Blue Shoes</a> </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>

                    <span className="tooltiptext tooltip-top"></span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>

    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-6.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-6-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Men Black Gentle Belt</a> </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>
        
                    <span className="tooltiptext tooltip-top">5.00</span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>
</div>

<div className="col-lg-3 col-sm-6 pb-5 pb-md-0 appear-animate" data-animation-name="fadeInLeftShorter" data-animation-delay="800">
    <h4 className="section-sub-title">Latest Products</h4>
    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-7.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-7-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Brown-Black Men Casual Glasses</a>
            </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>

                    <span className="tooltiptext tooltip-top"></span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>

    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-8.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-8-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Brown-Black Men Casual Glasses</a>
            </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>
                    <span className="tooltiptext tooltip-top">5.00</span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>

    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-9.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-9-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Black Men Casual Glasses</a> </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>

                    <span className="tooltiptext tooltip-top"></span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>
</div>

<div className="col-lg-3 col-sm-6 pb-5 pb-md-0 appear-animate" data-animation-name="fadeInLeftShorter" data-animation-delay="1100">
    <h4 className="section-sub-title">Top Rated Products</h4>
    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-10.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-10-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Basketball Sports Blue Shoes</a>
            </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>

                    <span className="tooltiptext tooltip-top"></span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>

    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-11.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-11-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Men Sports Travel Bag</a> </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>

                    <span className="tooltiptext tooltip-top">5.00</span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>

    <div className="product-default left-details product-widget">
        <figure>
            <a href="#">
                <img src="/assets/images/products/small/product-12.jpg" width="84" height="84" alt="product" />
                <img src="/assets/images/products/small/product-12-2.jpg" width="84" height="84" alt="product" />
            </a>
        </figure>

        <div className="product-details">
            <h3 className="product-title"> <a href="#">Brown HandBag</a> </h3>

            <div className="ratings-container">
                <div className="product-ratings">
                    <span className="ratings" style={{'width' : '100%'}}></span>
  
                    <span className="tooltiptext tooltip-top"></span>
                </div>

            </div>


            <div className="price-box">
                <span className="product-price">$49.00</span>
            </div>

        </div>

    </div>
</div>
</div>





            

            </div>
   </section> 


</main>

    );
}
