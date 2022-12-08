import { usePage, Link,useForm } from "@inertiajs/inertia-react";
import React, { useEffect, useLayoutEffect, useState } from 'react';
import CheckoutForm from './CheckoutForm';
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from '@stripe/stripe-js';
import FrontendLayout from '@/Layouts/Frontend/FrontendLayout'
import ReactPaginate from 'react-paginate';

export default function Shop({cat,products,catProduct}) {

const{flashData, auth} = usePage().props;
const categories = flashData.categories;
console.log(catProduct);
console.log(products);


  // console.log(productsCustom);

    // const [items, setItems] = useState(products)

    // useEffect(()=>{

    //     setItems(filterProduct);
    //     console.log("here");

    // },[filterProduct])
    const productByCat = products.data;
    const [items, setItems] = useState(productByCat);

   // let items = products.data;
  //  let itemsPerPage = 12;
    const [itemsPerPage, setItemPerPage]= useState(9);

    const countHangle = (e)=>{
        e.preventDefault();
        setItemPerPage(e.target.value);
    }

   console.log(items);
 //We start with an empty list of items.
 const [currentItems, setCurrentItems] = useState();
 const [pageCount, setPageCount] = useState(0);
 // Here we use item offsets; we could also use page offsets
 // following the API or data you're working with.
 const [itemOffset, setItemOffset] = useState(0);

 useEffect(() => {
   // Fetch items from another resources.
   const endOffset = itemOffset + itemsPerPage;
   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
   setCurrentItems(items.slice(itemOffset, endOffset));
   setPageCount(Math.ceil(items.length / itemsPerPage));
 }, [itemOffset, itemsPerPage,items]);

 // Invoke when user click to request another page.
 const handlePageClick = (event) => {
   const newOffset = (event.selected * itemsPerPage) % items.length;
   console.log(
     `User requested page number ${event.selected}, which is offset ${newOffset}`
   );
   setItemOffset(newOffset);
 };


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
            document.querySelectorAll('.btn_loader_home').forEach((el)=>{
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

const priceRangeSubmit = (e)=>{
    e.preventDefault();
   var filterPrice = document.getElementById("filter-price-range").innerText;
  var filterPriceArray = filterPrice.split('-');
  var minfilterPriceArray1 = filterPriceArray[0].replace('$', "");
  var minfilterPriceArray2 = filterPriceArray[1].replace('$', "");
 //  console.log(minfilterPriceArray2);
 var filterByPrice = productByCat.filter((prod)=>{
  //  if(prod.price >minfilterPriceArray1 || prod.price <minfilterPriceArray2){
    var pricewithoutdollar = prod.offer_price.replace('$', "");
       // var trimmaxprice = minfilterPriceArray2.trim();
        var trimmaxprice = Number(minfilterPriceArray2.trim());
        var triminprice = Number(minfilterPriceArray1.trim());
        var triprodprice = Number(pricewithoutdollar.trim());
     //   console.log(typeof trimmaxprice);
      //  console.log(triminprice);
       // console.log(typeof triprodprice);
        return  triprodprice >= triminprice && triprodprice <= trimmaxprice;
       // return triprodprice <= trimmaxprice;
  //  }
 })
 setItems(filterByPrice);
}

  return (
    <FrontendLayout>

<main className="main">


            <div className="container">
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link href="/"><i className="icon-home"></i></Link></li>
                        <li className="breadcrumb-item"><a href="#">Shop</a></li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-lg-9 main-content">
                        <nav className="toolbox sticky-header" data-sticky-options="{'mobile': true}">
                            <div className="toolbox-left">
                                <a href="#" className="sidebar-toggle">
                                    <svg data-name="Layer 3" id="Layer_3" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
										<line x1="15" x2="26" y1="9" y2="9" className="cls-1"></line>
										<line x1="6" x2="9" y1="9" y2="9" className="cls-1"></line>
										<line x1="23" x2="26" y1="16" y2="16" className="cls-1"></line>
										<line x1="6" x2="17" y1="16" y2="16" className="cls-1"></line>
										<line x1="17" x2="26" y1="23" y2="23" className="cls-1"></line>
										<line x1="6" x2="11" y1="23" y2="23" className="cls-1"></line>
										<path
											d="M14.5,8.92A2.6,2.6,0,0,1,12,11.5,2.6,2.6,0,0,1,9.5,8.92a2.5,2.5,0,0,1,5,0Z"
											className="cls-2"></path>
										<path d="M22.5,15.92a2.5,2.5,0,1,1-5,0,2.5,2.5,0,0,1,5,0Z" className="cls-2"></path>
										<path d="M21,16a1,1,0,1,1-2,0,1,1,0,0,1,2,0Z" className="cls-3"></path>
										<path
											d="M16.5,22.92A2.6,2.6,0,0,1,14,25.5a2.6,2.6,0,0,1-2.5-2.58,2.5,2.5,0,0,1,5,0Z"
											className="cls-2"></path>
									</svg>
                                    <span>Filter</span>
                                </a>

                                <div className="toolbox-item toolbox-sort">
                                    <label>Sort By:</label>

                                    <div className="select-custom">
                                        <select defaultValue={'menu_order'} name="orderby" className="form-control">
											<option value="menu_order">Default sorting</option>
											<option value="popularity">Sort by popularity</option>
											<option value="rating">Sort by average rating</option>
											<option value="date">Sort by newness</option>
											<option value="price">Sort by price: low to high</option>
											<option value="price-desc">Sort by price: high to low</option>
										</select>
                                    </div>
           


                                </div>
                 
                            </div>
            

                            <div className="toolbox-right">
                                <div className="toolbox-item toolbox-show">
                                    <label>Show:</label>

                                    <div className="select-custom">
                                    <select value={itemsPerPage} onChange={countHangle} name="count" className="form-control">
											<option value="9">9</option>
											<option value="12">12</option>
											<option value="24">24</option>
											<option value="36">36</option>
										</select>
                                    </div>
                    
                                </div>
             

                                <div className="toolbox-item layout-modes">
                                    <a href="#" className="layout-btn btn-grid active" title="Grid">
                                        <i className="icon-mode-grid"></i>
                                    </a>
                                    <a href="#" className="layout-btn btn-list" title="List">
                                        <i className="icon-mode-list"></i>
                                    </a>
                                </div>
         
                            </div>
          
                        </nav>

                        <div className="row">

                        {currentItems && 
                             currentItems.map((item, index) => {
                                if(item.product_type == 'variable'){
                                    return (
                                        <div key={index} className="col-6 col-sm-4">
                                        <div className="product-default">
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
                                                <div className="category-wrap">
                                                    <div className="category-list">
                                                        <Link href={route('category.product.show', item.category.cat_slug)} className="product-category">{item.category.cat_name}</Link>
                                                    </div>
                                                </div>
        
                                                <h3 className="product-title"> <Link href={route('product.show', item.slug)}>{item.name}</Link> </h3>
        
                                                <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{'width':'100%'}}></span>
                    
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                  
                                                </div>
                           
        
                                                <div className="price-box">
                                                <span className="product-price">{item.variable_min_max}</span>
                                                </div>
                   
        
                                                <div className="product-action">
                                                <Link href="/" className="btn-icon-wish" title="wishlist"><i
                                                        className="icon-heart"></i></Link>
                                                <Link href="/" className="btn-icon btn-add-cart"><i
                                                        className="fa fa-arrow-right"></i><span>SELECT
                                                        OPTIONS</span></Link>
                                                <Link href="/" className="btn-quickview" title="Quick View"><i
                                                        className="fas fa-external-link-alt"></i></Link>
                                                </div>
                                            </div>
                
                                        </div>
                                    </div>
        
                                     )
                                }else{
                                    return(
                                        <div key={index} className={'category_product col-6 col-sm-4 product_grid'+index}>
                                                 <img style={{'display':'none'}} className='btn_loader btn_loader_home' src="/loader_blue.svg" alt="" />
                                        <div className="product-default">
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
                                                    {item.name}
                                                    </Link>
                                            </h3>
        
                                                <div className="ratings-container">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{'width':'100%'}}></span>
                                       
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                            
                                                </div>
                               
        
                                                <div className="price-box">
                                                    <del className="old-price">{item.regular_price}</del>
                                                    <span className="product-price">{item.offer_price}</span>
                                                </div>
                                    
                                                <div className="product-action">
                                                    <Link href="/" className="btn-icon-wish" title="wishlist"><i
                                                            className="icon-heart"></i></Link>
                                            
                                                        <Link disabled={processing} as="button" type="button" onClick={(e)=>cartHandle(e,item,index,'category_product')} className={processing?'btn-icon btn-add-cart disabled':"btn-icon btn-add-cart"}><i
                                                            className="fa fa-arrow-right"></i><span>ADD TO CART</span></Link>
                                                    <Link href="/" className="btn-quickview" title="Quick View"><i
                                                            className="fas fa-external-link-alt"></i></Link>
                                                </div>
                                            </div>
                              
                                        </div>
                                    </div>
        
                                    )
                                }

                        })
                        }




                        
                        </div>


                        <nav className="toolbox toolbox-pagination">
                            <div className="toolbox-item toolbox-show">
                                <label>Show:</label>

                                <div className="select-custom">
                                    <select value={itemsPerPage} onChange={countHangle} name="count" className="form-control">
                                        <option value="9">9</option>
										<option value="12">12</option>
										<option value="24">24</option>
										<option value="36">36</option>
									</select>
                                </div>
 
                            </div>

{
         <ReactPaginate
        breakLabel="..."
        nextLabel={<i className="icon-angle-right"></i>}
       onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel={<i className="icon-angle-left"></i>}
        renderOnZeroPageCount={null}
        containerClassName = "pagination toolbox-item"
        pageClassName="page-item"
        activeClassName = "active"
        breakClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        nextClassName='page-item'
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
      />
}
                            {/* <ul className="pagination toolbox-item">
                                <li className="page-item disabled">
                                    <a className="page-link page-link-btn" href="#"><i className="icon-angle-left"></i></a>
                                </li>
                                <li className="page-item active">
                                    <a className="page-link" href="#">1 <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><span className="page-link">...</span></li>
                                <li className="page-item">
                                    <a className="page-link page-link-btn" href="#"><i className="icon-angle-right"></i></a>
                                </li>
                            </ul> */}
                        </nav>
                    </div>
   

                    <div className="sidebar-overlay"></div>
                    <aside className="sidebar-shop col-lg-3 order-lg-first mobile-sidebar">
                        <div className="sidebar-wrapper">
                            <div className="widget">
                                <h3 className="widget-title">
                                    <a data-toggle="collapse" href="#widget-body-2" role="button" aria-expanded="true" aria-controls="widget-body-2">Categories</a>
                                </h3>

                                <div className="collapse show" id="widget-body-2">
                                    <div className="widget-body">
                                        <ul className="cat-list">
                                            {/* <li>
                                                <a href="#widget-category-1" data-toggle="collapse" role="button" aria-expanded="true" aria-controls="widget-category-1">
													Accessories<span className="products-count">(3)</span>
													<span className="toggle"></span>
												</a>
                                                <div className="collapse show" id="widget-category-1">
                                                    <ul className="cat-sublist">
                                                        <li>Caps<span className="products-count">(1)</span></li>
                                                        <li>Watches<span className="products-count">(2)</span></li>
                                                    </ul>
                                                </div>
                                            </li>                                             */}
                                            {
                                                catProduct.map((item, index)=>{
                                                    return(
                                                        <li key={index}>
                                                        <Link href={route('category.product.show',item.cat_slug)} >
                                                            {item.cat_name}<span className="products-count">({item.products_count})</span>
                                                        </Link>
                        
                                                    </li>
                                                    )

                                                })
                                            }

    
                                        </ul>
                                    </div>
           
                                </div>
            
                            </div>


                            <div className="widget">
                                <h3 className="widget-title">
                                    <a data-toggle="collapse" href="#widget-body-3" role="button" aria-expanded="true" aria-controls="widget-body-3">Price</a>
                                </h3>

                                <div className="collapse show" id="widget-body-3">
                                    <div className="widget-body pb-0">
                                        <form onSubmit={priceRangeSubmit}>
                                            <div className="price-slider-wrapper">
                                                <div id="price-slider"></div>
              
                                            </div>
                 

                                            <div className="filter-price-action d-flex align-items-center justify-content-between flex-wrap">
                                                <div className="filter-price-text">
                                                    Price:
                                                    <span id="filter-price-range"></span>
                                                </div>
                                                <input type="hidden" />

                                                <button type="submit" className="btn btn-primary">Filter</button>
                                            </div>
                               
                                        </form>
                                    </div>
         
                                </div>
            
                            </div>
                      

                            {/* <div className="widget widget-color">
                                <h3 className="widget-title">
                                    <a data-toggle="collapse" href="#widget-body-4" role="button" aria-expanded="true" aria-controls="widget-body-4">Color</a>
                                </h3>

                                <div className="collapse show" id="widget-body-4">
                                    <div className="widget-body pb-0">
                                        <ul className="config-swatch-list">
                                            <li className="active">
                                                <a href="#" style={{'backgroundColor': '#000'}}></a>
                                            </li>
                                            <li>
                                                <a href="#" style={{'backgroundColor': '#0188cc'}}></a>
                                            </li>
                                            <li>
                                                <a href="#" style={{'backgroundColor': '#81d742'}}></a>
                                            </li>
                                            <li>
                                                <a href="#" style={{'backgroundColor': '#6085a5'}}></a>
                                            </li>
                                            <li>
                                                <a href="#" style={{'backgroundColor': '#ab6e6e'}}></a>
                                            </li>
                                        </ul>
                                    </div>
               
                                </div>
        
                            </div>
      

                            <div className="widget widget-size">
                                <h3 className="widget-title">
                                    <a data-toggle="collapse" href="#widget-body-5" role="button" aria-expanded="true" aria-controls="widget-body-5">Sizes</a>
                                </h3>

                                <div className="collapse show" id="widget-body-5">
                                    <div className="widget-body pb-0">
                                        <ul className="config-size-list">
                                            <li className="active"><a href="#">XL</a></li>
                                            <li><a href="#">L</a></li>
                                            <li><a href="#">M</a></li>
                                            <li><a href="#">S</a></li>
                                        </ul>
                                    </div>
                     
                                </div>
       
                            </div>


                            <div className="widget widget-featured">
                                <h3 className="widget-title">Featured</h3>

                                <div className="widget-body">
                                    <div className="owl-carousel widget-featured-products">
                                        <div className="featured-col">
                                            <div className="product-default left-details product-widget">
                                                <figure>
                                                    <a href="product.html">
                                                        <img src="/assets/images/products/small/product-4.jpg" width="75" height="75" alt="product" />
                                                        <img src="/assets/images/products/small/product-4-2.jpg" width="75" height="75" alt="product" />
                                                    </a>
                                                </figure>
                                                <div className="product-details">
                                                    <h3 className="product-title"> <a href="product.html">Blue Backpack for
															the Young - S</a> </h3>
                                                    <div className="ratings-container">
                                                        <div className="product-ratings">
                                                            <span className="ratings" style={{'width':'100%'}}></span>
                                          
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
                                                    <a href="product.html">
                                                        <img src="/assets/images/products/small/product-5.jpg" width="75" height="75" alt="product" />
                                                        <img src="/assets/images/products/small/product-5-2.jpg" width="75" height="75" alt="product" />
                                                    </a>
                                                </figure>
                                                <div className="product-details">
                                                    <h3 className="product-title"> <a href="product.html">Casual Spring Blue
															Shoes</a> </h3>
                                                    <div className="ratings-container">
                                                        <div className="product-ratings">
                                                            <span className="ratings" style={{'width':'100%'}}></span>
                                     
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
                                                    <a href="product.html">
                                                        <img src="/assets/images/products/small/product-6.jpg" width="75" height="75" alt="product" />
                                                        <img src="/assets/images/products/small/product-6-2.jpg" width="75" height="75" alt="product" />
                                                    </a>
                                                </figure>
                                                <div className="product-details">
                                                    <h3 className="product-title"> <a href="product.html">Men Black Gentle
															Belt</a> </h3>
                                                    <div className="ratings-container">
                                                        <div className="product-ratings">
                                                            <span className="ratings" style={{'width':'100%'}}></span>
                                               
                                                            <span className="tooltiptext tooltip-top"></span>
                                                        </div>
                                     
                                                    </div>
                                         
                                                    <div className="price-box">
                                                        <span className="product-price">$49.00</span>
                                                    </div>
                    
                                                </div>
                             
                                            </div>
                                        </div>
                  

                                        <div className="featured-col">
                                            <div className="product-default left-details product-widget">
                                                <figure>
                                                    <a href="product.html">
                                                        <img src="/assets/images/products/small/product-1.jpg" width="75" height="75" alt="product" />
                                                        <img src="/assets/images/products/small/product-1-2.jpg" width="75" height="75" alt="product" />
                                                    </a>
                                                </figure>
                                                <div className="product-details">
                                                    <h3 className="product-title"> <a href="product.html">Ultimate 3D
															Bluetooth Speaker</a> </h3>
                                                    <div className="ratings-container">
                                                        <div className="product-ratings">
                                                            <span className="ratings" style={{'width':'100%'}}></span>
                         
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
                                                    <a href="product.html">
                                                        <img src="/assets/images/products/small/product-2.jpg" width="75" height="75" alt="product" />
                                                        <img src="/assets/images/products/small/product-2-2.jpg" width="75" height="75" alt="product" />
                                                    </a>
                                                </figure>
                                                <div className="product-details">
                                                    <h3 className="product-title"> <a href="product.html">Brown Women Casual
															HandBag</a> </h3>
                                                    <div className="ratings-container">
                                                        <div className="product-ratings">
                                                            <span className="ratings" style={{'width':'100%'}}></span>
                                                  
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
                                                    <a href="product.html">
                                                        <img src="/assets/images/products/small/product-3.jpg" width="75" height="75" alt="product" />
                                                        <img src="/assets/images/products/small/product-3-2.jpg" width="75" height="75" alt="product" />
                                                    </a>
                                                </figure>
                                                <div className="product-details">
                                                    <h3 className="product-title"> <a href="product.html">Circled Ultimate
															3D Speaker</a> </h3>
                                                    <div className="ratings-container">
                                                        <div className="product-ratings">
                                                            <span className="ratings" style={{'width':'100%'}}></span>
                                      
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

                            </div> */}


                            {/* <div className="widget widget-block">
                                <h3 className="widget-title">Custom HTML Block</h3>
                                <h5>This is a custom sub-title.</h5>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non placerat mi. Etiam non tellus </p>
                            </div>
     */}
                        </div>

                    </aside>

                </div>
            </div>


            <div className="mb-4"></div>
        </main>

    </FrontendLayout>
  )
}

