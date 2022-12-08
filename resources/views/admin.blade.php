<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>


        {{-- <link href="https://cdn.jsdelivr.net/npm/litepicker/dist/css/litepicker.css" rel="stylesheet" /> --}}
        
        {{-- @vite(['resources/css/styles.css','']) --}}
        <link href="{{ asset('/css/styles.css') }}" rel="stylesheet" />

        <link rel="icon" type="image/x-icon" href="{{ asset('assets/images/icons/favicon.png') }}" />
        {{-- <script data-search-pseudo-elements defer src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/js/all.min.js" crossorigin="anonymous"></script>  --}}
        {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/feather-icons/4.28.0/feather.min.js" crossorigin="anonymous"></script>  --}}




        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite('resources/js/app.jsx')
        @inertiaHead
    </head>
    <body class="nav-fixed">
        @inertia



<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
{{-- @vite(['resources/js/scripts.js']) --}}
<script src="{{ asset('/js/scripts.js') }}"></script>
 {{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js" crossorigin="anonymous"></script>
<script src="{{ Vite::asset('resources/assets/demo/chart-area-demo.js') }}"></script>
<script src="{{ Vite::asset('resources/assets/demo/chart-bar-demo.js') }}"></script>  --}}
{{-- <script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>
<script src="{{ Vite::asset('resources/js/datatables/datatables-simple-demo.js') }}"></script> --}}
<script src="https://cdn.jsdelivr.net/npm/litepicker/dist/bundle.js" crossorigin="anonymous"></script>

{{-- @vite(['resources/js/litepicker.js']) --}}
<script src="{{ asset('/js/litepicker.js') }}"></script>




    </body>
</html>
