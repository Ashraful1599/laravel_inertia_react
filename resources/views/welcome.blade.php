<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	
		<title>Porto - Bootstrap eCommerce Template</title>
	
		<meta name="keywords" content="HTML5 Template" />
		<meta name="description" content="Porto - Bootstrap eCommerce Template">
		<meta name="author" content="SW-THEMES">
	
		<!-- Favicon -->
		<link rel="icon" type="image/x-icon" href="/assets/images/icons/favicon.png">
	
		<script>
			// WebFontConfig = {
			// 	google: {
			// 		families: ['Open+Sans:300,400,600,700,800', 'Poppins:300,400,500,600,700,800', 'Oswald:300,400,500,600,700,800']
			// 	}
			// };
			// (function(d) {
			// 	var wf = d.createElement('script'),
			// 		s = d.scripts[0];
			// 	wf.src = 'assets/js/webfont.js';
			// 	wf.async = true;
			// 	s.parentNode.insertBefore(wf, s);
			// })(document);
		</script>

    <!-- Plugins CSS File -->
    <link rel="stylesheet" href="{{ Vite::asset('resources/FrontEnd/assets/css/bootstrap.min.css') }}">

    <!-- Main CSS File -->
    <link rel="stylesheet" href="{{ Vite::asset('resources/FrontEnd/assets/css/style.min.css') }}">
	<link rel="stylesheet" href="{{ Vite::asset('resources/FrontEnd/assets/css/demo4.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ Vite::asset('resources/FrontEnd/assets/vendor/fontawesome-free/css/all.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ Vite::asset('resources/FrontEnd/assets/vendor/simple-line-icons/css/simple-line-icons.min.css') }}">



        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead
    </head>
    <body>

		<div class="page-wrapper"></div>	



        @inertia


		


    <!-- Plugins JS File -->
    <script src={{ Vite::asset('resources/FrontEnd/assets/js/jquery.min.js') }}></script>
    <script src={{ Vite::asset('resources/FrontEnd/assets/js/bootstrap.bundle.min.js') }}></script>
    <script src={{ Vite::asset('resources/FrontEnd/assets/js/optional/isotope.pkgd.min.js') }}></script>
    <script src={{ Vite::asset('resources/FrontEnd/assets/js/plugins.min.js') }}></script>
    <script src={{ Vite::asset('resources/FrontEnd/assets/js/jquery.appear.min.js') }}></script>
    <script src={{ Vite::asset('resources/FrontEnd/assets/js/nouislider.min.js') }}></script>

    <!-- Main JS File -->
      <script src={{ Vite::asset('resources/FrontEnd/assets/js/main.min.js') }} defer ></script>  

	  <script  src="https://www.paypal.com/sdk/js?client-id={{env('PAYPAL_CLIENT_ID')}}&enable-funding=venmo&buyer-country=US"></script> 
	


    </body>
</html>
