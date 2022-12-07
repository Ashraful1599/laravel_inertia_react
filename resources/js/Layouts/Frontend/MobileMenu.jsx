import { usePage, Link,useForm } from '@inertiajs/inertia-react';
import React,{useEffect} from 'react'
import cartIcon from '../../../FrontEnd/img/icons/icon-cart-big.svg'
import logo from '../../../FrontEnd/assets/images/logo.png'
import { Inertia } from '@inertiajs/inertia';
import { useState } from 'react';

export default function MobileMenu(props) {


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
    <div>
            <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
            <span className="mobile-menu-close"><i className="fa fa-times"></i></span>
            <nav className="mobile-nav">
                <ul className="mobile-menu">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/shop">Shop</Link></li>
                    <li>
                        <Link href="#">Categories</Link>
                        <ul>
                            {
                                categories.map((item, index)=>{
                                    return(
                                        <li key={index}><Link href={route('category.product.show', item.cat_slug)}>{item.cat_name}</Link></li>
                                    )
                                })
                            }
         
                        </ul>
                    </li>
                    <li><Link href="#">Blog</Link></li>
                    <li><Link href="#">About Us</Link></li>
                    <li><Link href="#">Contact Us</Link></li>

                </ul>

                {/* <ul className="mobile-menu mt-2 mb-2">
                    <li className="border-0">
                        <a href="#">
							Special Offer!
						</a>
                    </li>

                </ul> */}

                <ul className="mobile-menu">

                    <li><Link href="#">My Wishlist</Link></li>
                    <li><Link href="/cart">Cart</Link></li>
                    {
                            auth.user != null? <li><Link href={route('user.account')}>My Account</Link></li>: <li><Link href={route('user.login')}>Log In</Link></li>
                        }
              
                </ul>
            </nav>
     

            <form className="search-wrapper mb-2" action="#">
                <input onChange={search} type="text" className="form-control mb-0" placeholder="Search..." required />
                <button disabled className="btn icon-search text-white bg-transparent p-0" type="submit"></button>
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
            </form>


            <div className="social-icons">
                <a href="#" className="social-icon social-facebook icon-facebook" target="_blank">
                </a>
                <a href="#" className="social-icon social-twitter icon-twitter" target="_blank">
                </a>
                <a href="#" className="social-icon social-instagram icon-instagram" target="_blank">
                </a>
            </div>
        </div>

    </div>
    </div>
  )
}
