import React from 'react'

export default function StickyMenu() {
  return (
    <div>
            <div className="sticky-navbar">
        <div className="sticky-info">
            <a href="demo4.html">
                <i className="icon-home"></i>Home
            </a>
        </div>
        <div className="sticky-info">
            <a href="category.html" className="">
                <i className="icon-bars"></i>Categories
            </a>
        </div>
        <div className="sticky-info">
            <a href="wishlist.html" className="">
                <i className="icon-wishlist-2"></i>Wishlist
            </a>
        </div>
        <div className="sticky-info">
            <a href="login.html" className="">
                <i className="icon-user-2"></i>Account
            </a>
        </div>
        <div className="sticky-info">
            <a href="cart.html" className="">
                <i className="icon-shopping-cart position-relative">
					<span className="cart-count badge-circle">3</span>
				</i>Cart
            </a>
        </div>
    </div>
    </div>
  )
}
