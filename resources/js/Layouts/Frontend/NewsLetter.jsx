import React from 'react'

export default function NewsLetter() {
  return (
    <div>
            <div className="newsletter-popup mfp-hide bg-img" id="newsletter-popup-form" style={{'backgroundImage': 'url(/assets/images/newsletter_popup_bg.jpg)'}}>
        <div className="newsletter-popup-content">
            <img src="/assets/images/logo.png" width="111" height="44" alt="Logo" className="logo-newsletter" />
            <h2>Subscribe to newsletter</h2>

            <p>
                Subscribe to the Porto mailing list to receive updates on new arrivals, special offers and our promotions.
            </p>

            <form action="#">
                <div className="input-group">
                    <input type="email" className="form-control" id="newsletter-email" name="newsletter-email" placeholder="Your email address" required />
                    <input type="submit" className="btn btn-primary" value="Submit" />
                </div>
            </form>
            <div className="newsletter-subscribe">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" value="0" id="show-again" />
                    <label htmlFor="show-again" className="custom-control-label">
						Don't show this popup again
					</label>
                </div>
            </div>
        </div>


        <button title="Close (Esc)" type="button" className="mfp-close">
			×
		</button>
    </div>

    </div>
  )
}
