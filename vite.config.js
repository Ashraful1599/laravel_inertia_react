import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input:[
                'resources/js/app.jsx',
             //   'resources/FrontEnd/assets/js/jquery.min.js',
                'resources/FrontEnd/assets/css/bootstrap.min.css', 
                'resources/FrontEnd/assets/css/style.min.css',
                'resources/FrontEnd/assets/css/demo4.min.css',
                'resources/FrontEnd/assets/vendor/fontawesome-free/css/all.min.css',
                'resources/FrontEnd/assets/vendor/simple-line-icons/css/simple-line-icons.min.css',
                'resources/FrontEnd/assets/js/jquery.min.js',
                'resources/FrontEnd/assets/js/bootstrap.bundle.min.js',
                'resources/FrontEnd/assets/js/optional/isotope.pkgd.min.js',
                'resources/FrontEnd/assets/js/plugins.min.js',
                'resources/FrontEnd/assets/js/jquery.appear.min.js',
                'resources/FrontEnd/assets/js/nouislider.min.js',
                'resources/FrontEnd/assets/js/main.min.js',
             //   'https://www.paypal.com/sdk/js?client-id=AeeX7xCalgqVoqlfptNjgh5ZTRYIBKWu9V875yR70pA0sBp0S0XDeNGJVin0kpBR5-19waWM33_jyJmR&enable-funding=venmo'
            ],
            refresh: true,
        }),
        react(),
    ],
    // server: {
    //     https: false,
    //     host: 'http://127.0.0.1:8000',
    // },
    
});


