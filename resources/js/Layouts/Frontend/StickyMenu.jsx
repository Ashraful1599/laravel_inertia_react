import React from 'react'
import { usePage, Link,useForm } from '@inertiajs/inertia-react';


export default function StickyMenu() {

    const{flashData, auth, flash} = usePage().props;
const count = flashData.count;
  return (
    <div> 
            <div className="sticky-navbar">
        <div className="sticky-info">
            <Link href="/">
                <i className="icon-home"></i>Home
            </Link>
        </div>
        <div className="sticky-info">
            <Link href="#" className="">
                <i className="icon-bars"></i>Categories
            </Link>
        </div>
        <div className="sticky-info">
            <Link href="#" className="">
                <i className="icon-wishlist-2"></i>Wishlist
            </Link>
        </div>
        <div className="sticky-info">
            <Link href="my-account" className="">
                <i className="icon-user-2"></i>Account
            </Link>
        </div>
        <div className="sticky-info">
            <Link href="/cart" className="">
                <i className="icon-shopping-cart position-relative">
					<span className="cart-count badge-circle">{count}</span>
				</i>Cart
            </Link>
        </div>
    </div>
    </div>
  )
}
