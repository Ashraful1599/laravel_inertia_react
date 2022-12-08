import React, {useState} from 'react';
import { Link, Head, usePage } from '@inertiajs/inertia-react';
import FrontendLayout from '@/Layouts/Frontend/FrontendLayout';
import Main from '@/Layouts/Frontend/Main';


export default function Welcome(props) {

    const { products,categories } = usePage().props;
    const [filterProduct, setFilterProduct] = useState(products);
   // console.log(categories);

    return (
        <FrontendLayout>
            <Main   />
        </FrontendLayout>
    );
}



