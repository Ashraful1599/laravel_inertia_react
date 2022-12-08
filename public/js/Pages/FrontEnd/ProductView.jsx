import FrontendLayout from '@/Layouts/Frontend/FrontendLayout'
import { usePage,Link,useForm } from '@inertiajs/inertia-react';
import React from 'react'
import { useState,useRef,useLayoutEffect } from 'react';
import { Parser } from 'html-to-react';
import { useEffect } from 'react';
import { data } from 'autoprefixer';
import { useMemo } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function ProductView() {
    const { productCollection,prevProduct,nextProduct,related,terms, flash } = usePage().props;

    const product = productCollection.data;
    const success = flash.success;

    const variable = product.variable;
    
    const [price, setPrice] = useState();
    const [sku, setSku] = useState();

//     const variable = product.variable.filter((item)=>{
//         return item;
  
//     });
//     variable.forEach((item)=>{
//         console.log(terms.find((term)=> term.id == item.size));
//     })

//  const find =  product.variable.find((item)=> item.size == 1).mark = "marked!";


   console.log(product);
  //  console.log(price)
  //  console.log(sku)
  //  console.log(variable);
  //  console.log(terms);
  //  console.log(find);



    const [commonsArray, setcommonsArray] = useState([]);
    const [count_option_id, setcount_option_id] = useState([]);
   // const count_option_id = [];
   // var commonsArray = [];
//   const  commonsArray = useMemo(()=>{
//         console.log('meno');
//             return [] 
//          }
//      );
  


    const priceCalculator =( optionid, optionValueId)=>{

     //   console.log(commonsArray);

            const filterOption = product.sku_value.filter((val)=>{
                return val.variant_id == optionid && val.variant_option_id == optionValueId;
            });
            for(var i = 0; i<filterOption.length; i++){
                const index =  commonsArray.findIndex((el)=>el.variant_id == optionid);

                if(index != -1){
                    commonsArray.splice(index, 1);
                }
            }
            filterOption.forEach((i)=>{
                commonsArray.push(i);
            })
            const findCommonArray = [];
            commonsArray.forEach((el)=> findCommonArray.push(el.sku_id));

        //   console.log('var '+ product.variant.length);
           console.log(findCommonArray)

            count_option_id.push(optionid);
            //console.log(count_option_id);

            if(count_option_id.length >= product.variant.length){

                if(findCommonArray.length != 1){
                 var findCommonArrayResult =   checkForDuplicates(findCommonArray);
                }else{
                    var findCommonArrayResult = findCommonArray[0];
                }
              //  console.log(findCommonArrayResult[0]);
               const sku_Id =  product.sku_value.filter((item, index)=>{
                     return item.sku.id == findCommonArrayResult;
                 })
              //  console.log(sku_Id[0]);

                setPrice(sku_Id[0].sku.price);
                setSku(sku_Id[0].sku.sku);
             //   console.log(sku_Id[0].sku.price);

            }

    };

    function checkForDuplicates(arr1){

        var mf = 1;
        var m = 0;
        var item;
        for (var i=0; i<arr1.length; i++)
        {
                for (var j=i; j<arr1.length; j++)
                {
                        if (arr1[i] == arr1[j])
                         m++;
                        if (mf<m)
                        {
                          mf=m; 
                          item = arr1[i];
                        }
                }
                m=0;
        }
        
        return item;
        
        }


        function getMinMaxPrice(item){
          //  console.log(item);

            var maxPrice =  Math.max.apply(Math, item.map(function(o) { return o.price; }))
            var minPrice =  Math.min.apply(Math, item.map(function(o) { return o.price; }))
            if(minPrice != Infinity && maxPrice != Infinity){
                return minPrice+"$ - "+maxPrice+"$";
            }else{
                return false;
            }
         }


    const {data, setData, post, processing, errors, reset} = useForm({
            id: product.id,
            name: product.name,
            price: product.offer_price,
            quantity: 1,
            image: product.image,
            slug: product.slug,
            attr_array: [],
            product_type: product.product_type,
            add_to_cart: false,
    })
   
    const inputRef = useRef(null);

    const cartHandle = (e)=>{
        e.preventDefault();
        const attr_array = [];
        var var_price = '';
        if(product.product_type == 'variable'){
            var_price = document.getElementById('var_price').innerText;
            document.querySelectorAll('.attr_name.active a').forEach((el)=>{
                var attr_name = el.getAttribute('attr_name');
                var term_name = el.innerText;
                attr_array.push({attr_name, term_name})
            })
        }
        setData({
            ...data,
            quantity: inputRef.current.value,
            attr_array: attr_array,
            add_to_cart: true,
            var_price: var_price,
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

// useEffect(()=>{
//     toast.success(success, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined
//     }); 

// },[success])

const [scrollX, setscrollX] = useState();
const [scrollY, setscrollY] = useState();
  useLayoutEffect(() => {
    window.scrollTo(scrollX, scrollY);
  });




  return (
    <FrontendLayout>
            {/* <ToastContainer />   */}
        <main className="main">
            <div className="container">
                <nav aria-label="breadcrumb" className="breadcrumb-nav">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="demo1.html"><i className="icon-home"></i></a></li>
                        <li className="breadcrumb-item"><a href="#">Products</a></li>
                        <li className="breadcrumb-item"><a href="#">{product.name}</a></li>
                    </ol>
                </nav>
                <div className="product-single-container product-single-default">
                    {
                    success?
                        <div className="cart-message">
                            <strong className="single-cart-notice">“{product.name}” </strong>
                            <span>has been added to your cart.</span>
                        </div> 
                        : ""
                    }
  

                     <div className="row">
                        <div className="col-lg-5 col-md-6 product-single-gallery">
                            <div className="product-slider-container">
                                <div className="label-group">
                                    <div className="product-label label-hot">{product.promo1}</div>
          
                                    <div className="product-label label-sale">
                                       {product.promo2}
                                    </div>
                                </div>

                              <div className="product-single-carousel owl-carousel owl-theme show-nav-hover">
                                {product.gallery.map((item, index)=>{
                                    return(
                                        <div key={index} className="product-item">
                                            <img className="product-single-image" src={`/uploads/${item}`} data-zoom-image={`/uploads/${item}`} width="468" height="468" alt="product" />
                                        </div>
                                    )
                                })}
                                </div> 
         
                                <span className="prod-full-screen">
                                    <i className="icon-plus"></i>
                                </span>
                            </div>

                            <div className="prod-thumbnail owl-dots">

                            {product.gallery.map((item, index)=>{
                                    return(
                          
                                        <div key={index} className="owl-dot">
                                            <img src={`/uploads/${item}`} width="110" height="110" alt="product-thumbnail" />
                                        </div>
                                    )
                                })}
                            </div> 
                        </div>
  
 
                        <div className="col-lg-7 col-md-6 product-single-details">
                            <h1 className="product-title">{product.name}</h1>

                                
                            <div className="product-nav">
                                {
                                
                                prevProduct?<div className="product-prev">
                                <Link href={route('product.show', prevProduct.slug)}>
                                        <span className="product-link"></span>

                                        <span className="product-popup">
                                            <span className="box-content">
                                                <img alt="product" width="150" height="150"
                                                    src={`/uploads/${prevProduct.image}`}
                                                    style={{'paddingTop': '0px'}} />

                                                <span>{prevProduct.name}</span>
                                        </span>
                                        </span>
                                    </Link>
                                </div>
                                 : ""
                                }
                                {
                                   nextProduct? 
                                   <div className="product-next">
                                   <Link href={route('product.show', nextProduct.slug)}>
                                       <span className="product-link"></span>

                                       <span className="product-popup">
                                           <span className="box-content">
                                               <img alt="product" width="150" height="150"
                                                   src={`/uploads/${nextProduct.image}`}
                                                   style={{'paddingTop': '0px'}} />

                                               <span>{nextProduct.name}</span>
                                       </span>
                                       </span>
                                   </Link>
                               </div>: ""
                                }

                            </div>

                            <div className="ratings-container">
                                <div className="product-ratings">
                                    <span className="ratings" style={{'width':'60%'}}></span>

                                    <span className="tooltiptext tooltip-top"></span>
                                </div>
  

                                <a href="#" className="rating-link">( 6 Reviews )</a>
                            </div>


                            <hr className="short-divider" />

                            
                            { product.product_type=='simple'?
                            <div className="price-box">
                                {
                                    product.regular_price? <span className="old-price">{product.regular_price}</span> : ""
                                }                     
                                 {
                                    product.offer_price? <span className="new-price">{product.offer_price}</span> : ""
                                }
                                
                                
                            </div>: 

                                <div className="price-box">                     
                                {
                                    product.variable_min_max? <span className="new-price">{product.variable_min_max}</span> : ""
                                }

                                </div>


                            }

                            <div className="product-desc">
                        
                                    {Parser().parse(product.description)}
                                   
                      
                            </div>


                            <ul className="single-info-list">

                                <li>
                                    SKU:
                                    <strong> {sku? sku : product.sku}</strong>
                                </li>
                                <li>
                                    CATEGORY: <strong><a href="#" className="product-category">{product.category.cat_name}</a></strong>
                                </li>
                                <li>
                                    TAGs:
                                    {
                                        product.tag.map((item, index)=>{
                                            return(
                                                <strong key={index}><a href="#" className="product-category"> {item.tag_name+", "}</a></strong>
                                            )
                
                                          })
                                    }
                                </li>
                            </ul>

                            {
                            product.product_type == 'simple'?
                            <div className="product-action">
                                <div className="product-single-qty">
                                    <input ref={inputRef} className="horizontal-quantity form-control" type="text" />
                                </div>
                   
                                <Link disabled={processing} as="button" type="button" onClick={cartHandle} className={processing?'btn btn-dark add-cart mr-2 disabled':"btn btn-dark add-cart mr-2"} title="Add to Cart">Add to Cart {<img style={processing? {'display':'block'}: {'display':'none'}} className='btn_loader' src="/loader_white.svg" alt="" />}</Link>
                                {
                                    success?<Link href={route('cart.list')} className="btn btn-gray view-cart">View cart</Link>: ""
                                }
                                
                            </div>: ""
                            }

{
                            product.product_type == 'variable'?
                            <>
                            <div className="product-filters-container">

                            {

product.variant.map((item, index)=>{
    return(
        <div key={index} className="product-single-filter">
        <label className="font2">{item.attribute.name}</label>
        <ul className="config-size-list">
            {
                item.variant_option.map((option, index)=>{
                    return(
                        <li key={index} className={"attr_name "+item.id+" "+option.id}  ><Link attr_name={item.attribute.name} href="#" onClick={()=>priceCalculator( item.id, option.id)}  className="d-flex align-items-center justify-content-center">{option.term.name}</Link></li>
                    )
                })
            }
        </ul>
    </div>

        )
    })
}

                                <div className="product-single-filter">
                                    <label></label>
                                    <a className="font1 text-uppercase clear-btn" href="#">Clear</a>
                                </div>
   
                            </div> 
                            <div className="product-action">
                            <div className="price-box product-filtered-pricer">
                                {/* <del className="old-price"><span>$286.00</span></del> */}
                                <span id='var_price' className="product-price">{price?price+"$":""}</span>
                            </div>

                            <div className="product-single-qty">
                                <input ref={inputRef} className="horizontal-quantity form-control" type="text" />
                            </div>


 
                            <Link disabled={processing} as="button" type="button" onClick={cartHandle} className={processing?'btn btn-dark add-cart mr-2 disabled':"btn btn-dark add-cart mr-2"} title="Add to Cart">Add to Cart {<img style={processing? {'display':'block'}: {'display':'none'}} className='btn_loader' src="/loader_white.svg" alt="" />}</Link>
                                {
                                    success?<Link href={route('cart.list')} className="btn btn-gray view-cart">View cart</Link>: ""
                                }
                        </div>



                         </>   
                            : ""
                    }

                            <hr className="divider mb-0 mt-0" />

                            <div className="product-single-share mb-2">
                                <label className="sr-only">Share:</label>

                                <div className="social-icons mr-2">
                                    <a href="#" className="social-icon social-facebook icon-facebook" target="_blank" title="Facebook"></a>
                                    <a href="#" className="social-icon social-twitter icon-twitter" target="_blank" title="Twitter"></a>
                                    <a href="#" className="social-icon social-linkedin fab fa-linkedin-in" target="_blank" title="Linkedin"></a>
                                    <a href="#" className="social-icon social-gplus fab fa-google-plus-g" target="_blank" title="Google +"></a>
                                    <a href="#" className="social-icon social-mail icon-mail-alt" target="_blank" title="Mail"></a>
                                </div>
    

                                <a href="wishlist.html" className="btn-icon-wish add-wishlist" title="Add to Wishlist"><i
                                        className="icon-wishlist-2"></i><span>Add to
                                        Wishlist</span></a>
                            </div>

                        </div> 
  
                    </div> 

                </div>


                <div className="product-single-tabs">
                    <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" id="product-tab-desc" data-toggle="tab" href="#product-desc-content" role="tab" aria-controls="product-desc-content" aria-selected="true">Description</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" id="product-tab-tags" data-toggle="tab" href="#product-tags-content" role="tab" aria-controls="product-tags-content" aria-selected="false">Additional
                                Information</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" id="product-tab-reviews" data-toggle="tab" href="#product-reviews-content" role="tab" aria-controls="product-reviews-content" aria-selected="false">Reviews (1)</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="product-desc-content" role="tabpanel" aria-labelledby="product-tab-desc">
                            <div className="product-desc-content">
                                {Parser().parse(product.description)}
                           </div>
 
                        </div>
 

                        <div className="tab-pane fade" id="product-tags-content" role="tabpanel" aria-labelledby="product-tab-tags">
                            <table className="table table-striped mt-2">
                                <tbody>
                                    <tr>
                                        <th>Weight</th>
                                        <td>23 kg</td>
                                    </tr>

                                    <tr>
                                        <th>Dimensions</th>
                                        <td>12 × 24 × 35 cm</td>
                                    </tr>

                                    <tr>
                                        <th>Color</th>
                                        <td>Black, Green, Indigo</td>
                                    </tr>

                                    <tr>
                                        <th>Size</th>
                                        <td>Large, Medium, Small</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
 

                        <div className="tab-pane fade" id="product-reviews-content" role="tabpanel" aria-labelledby="product-tab-reviews">
                            <div className="product-reviews-content">
                                <h3 className="reviews-title">1 review for Men Black Sports Shoes</h3>

                                <div className="comment-list">
                                    <div className="comments">
                                        <figure className="img-thumbnail">
                                            <img src="/assets/images/blog/author.jpg" alt="author" width="80" height="80" />
                                        </figure>

                                        <div className="comment-block">
                                            <div className="comment-header">
                                                <div className="comment-arrow"></div>

                                                <div className="ratings-container float-sm-right">
                                                    <div className="product-ratings">
                                                        <span className="ratings" style={{'width':'60%'}}></span>
                               
                                                        <span className="tooltiptext tooltip-top"></span>
                                                    </div>
                                  
                                                </div>

                                                <span className="comment-by">
                                                    <strong>Joe Doe</strong> – April 12, 2018
                                                </span>
                                            </div>

                                            <div className="comment-content">
                                                <p>Excellent.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="divider"></div>

                                <div className="add-product-review">
                                    <h3 className="review-title">Add a review</h3>

                                    <form action="#" className="comment-form m-0">
                                        <div className="rating-form">
                                            <label htmlFor="rating">Your rating <span className="required">*</span></label>
                                            <span className="rating-stars">
                                                <a className="star-1" href="#">1</a>
                                                <a className="star-2" href="#">2</a>
                                                <a className="star-3" href="#">3</a>
                                                <a className="star-4" href="#">4</a>
                                                <a className="star-5" href="#">5</a>
                                            </span>

                                            <select name="rating" id="rating" required="" style={{'display': 'none'}}>
                                                <option value="">Rate…</option>
                                                <option value="5">Perfect</option>
                                                <option value="4">Good</option>
                                                <option value="3">Average</option>
                                                <option value="2">Not that bad</option>
                                                <option value="1">Very poor</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label>Your review <span className="required">*</span></label>
                                            <textarea cols="5" rows="6" className="form-control form-control-sm"></textarea>
                                        </div>
            


                                        <div className="row">
                                            <div className="col-md-6 col-xl-12">
                                                <div className="form-group">
                                                    <label>Name <span className="required">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" required />
                                                </div>
            
                                            </div>

                                            <div className="col-md-6 col-xl-12">
                                                <div className="form-group">
                                                    <label>Email <span className="required">*</span></label>
                                                    <input type="text" className="form-control form-control-sm" required />
                                                </div>
                
                                            </div>

                                            <div className="col-md-12">
                                                <div className=" custom-control custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" id="save-name" />
                                                    <label className="custom-control-label mb-0" htmlFor="save-name">Save my
                                                        name, email, and website in this browser for the next time I
                                                        comment.</label>
                                                </div>
                                            </div>
                                        </div>

                                        <input type="submit" className="btn btn-primary" value="Submit" />
                                    </form>
                                </div>
                 
                            </div>
            
                        </div>

                    </div>

                </div>
   

               <div className="products-section pt-0">
                    <h2 className="section-title">Related Products</h2>

                     <div className="products-slider 5col owl-carousel owl-theme dots-top dots-small">
                        {
                            related.map((item, index)=>{
                                return(
                                    <div key={index} className="product-default inner-quickview inner-icon">
                                    <figure className="img-effect">
                                        <a href={route('product.show', item.slug)}>
                                            <img src={`/uploads/${item.image}`} width="205" height="205" alt="product" />
                                         {item.image2?<img src={`/uploads/${item.image2}`} width="205" height="205" alt="product" />:""}   
                                        </a>
                                        <div className="label-group">
                                            <div className="product-label label-hot">{item.promo1}</div>
                                            <div className="product-label label-sale">{item.promo2}</div>
                                        </div>
                                        <div className="btn-icon-group">
                                            <a href="#" className="btn-icon btn-add-cart product-type-simple"><i
                                                    className="icon-shopping-cart"></i></a>
                                        </div>
                                        <a href="ajax/product-quick-view.html" className="btn-quickview" title="Quick View">Quick
                                            View</a>
        
                                    </figure>
                                    <div className="product-details">
                                        <div className="category-wrap">
                                            <div className="category-list">
                                                <a href="demo1-shop.html" className="product-category">{item.category.cat_name}</a>
                                            </div>
                                            <a href="wishlist.html" title="Wishlist" className="btn-icon-wish"><i
                                                    className="icon-heart"></i></a>
                                        </div>
                                        <h3 className="product-title">
                                            <a href={route('product.show', item.slug)}>{item.name}</a>
                                        </h3>
                                        <div className="ratings-container">
                                            <div className="product-ratings">
                                                <span className="ratings" style={{'width':'100%'}}></span>
                               
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
                            <span className="product-price">{getMinMaxPrice(item.skus)}</span>
                        </div>
                    }
        
                                    </div>
           
                                </div>
                                )
                            })
                        }

                    </div> 
       
                </div>


            </div>
        </main>
    </FrontendLayout>
  )
}
