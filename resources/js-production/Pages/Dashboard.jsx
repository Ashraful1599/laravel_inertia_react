import React from 'react'
import atWork from "../../assets/img/illustrations/at-work.svg"
import {DataTable} from "simple-datatables"
import { useEffect } from 'react'
import Main from '@/Layouts/Main'
import DashboardLayout from '@/Layouts/DashboardLayout'
import { usePage } from '@inertiajs/inertia-react'

export default function Dashboard() {

   // const { flash, auth, error } = usePage().props;
   
   // const currentUser = auth.user;

    useEffect(() => {
        const myTable = document.querySelector("#datatablesSimple");
        const dataTable = new DataTable(myTable);


        const litepickerSingleDate = document.getElementById('litepickerSingleDate');
        if (litepickerSingleDate) {
            new Litepicker({
                element: litepickerSingleDate,
                format: 'MMM DD, YYYY'
            });
        }
    
        const litepickerDateRange = document.getElementById('litepickerDateRange');
        if (litepickerDateRange) {
            new Litepicker({
                element: litepickerDateRange,
                singleMode: false,
                format: 'MMM DD, YYYY'
            });
        }
    
        const litepickerDateRange2Months = document.getElementById('litepickerDateRange2Months');
        if (litepickerDateRange2Months) {
            new Litepicker({
                element: litepickerDateRange2Months,
                singleMode: false,
                numberOfMonths: 2,
                numberOfColumns: 2,
                format: 'MMM DD, YYYY'
            });
        }
    
        const litepickerRangePlugin = document.getElementById('litepickerRangePlugin');
        if (litepickerRangePlugin) {
            new Litepicker({
                element: litepickerRangePlugin,
                startDate: new Date(),
                endDate: new Date(),
                singleMode: false,
                numberOfMonths: 2,
                numberOfColumns: 2,
                format: 'MMM DD, YYYY',
                plugins: ['ranges']
            });
        }







    }, [])
    

    // const dataTable = () =>{
    //     const myTable = document.querySelector("#datatablesSimple");
    //     const dataTable = new DataTable(myTable);
    // }


  return (


<DashboardLayout>
    
   <Main />

</DashboardLayout>


  )
}
