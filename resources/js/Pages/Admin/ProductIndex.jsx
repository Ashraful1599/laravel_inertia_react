import React, {useEffect} from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import * as fIcon from 'react-feather';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import TruncateMarkup from 'react-truncate-markup';

//datatable start
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//datatable end
import { usePage } from "@inertiajs/inertia-react";



export default function ProductIndex({products}) {
    const { flash, auth } = usePage().props;

console.log(products);

 //datatable start
 const columns = [
      
     {
        name: "Id",
        selector: row => row.id,
        sortable: true,
     //   hide: 0,

    },     
    {
        name: "Name",
        selector: row => row.name,
        sortable: true
    },
    {
        name: "Slug",
        selector: row => row.slug,
        sortable: true
    },
    {
        name: "Description",
        selector: row =>{
            return(
                    <TruncateMarkup lines={2}>
                        <div>
                         {row.description}
                        </div>
                    </TruncateMarkup>
            )
        },
        sortable: true

    },    
    {
        name: "Category",
       selector: row => row.category.cat_name?row.category.cat_name: " ",
        sortable: true
    },    
    {
        name: "Tag",
        selector: row =>{
        return  row.tag.map((item)=>{
            return item.tag_name+", "
          })
        } ,
        sortable: true
    },    
    {
        name: "Product type",
        selector: row => row.product_type,
        sortable: true
    },    
    // {
    //     name: "Regular price",
    //     selector: row => row.regular_price,
    //     sortable: true
    // },    
    {
        name: "Price",
        selector: row =>{
            if(row.product_type == 'simple'){
                return   row.offer_price+ " $";
            }else{
                const jsonToArry =  JSON.parse(row.variable);
                if(jsonToArry){
                    const priceArray = [];
                    jsonToArry.forEach(item => {
                        priceArray.push(item.price)
                    });
                    return Math.min(...priceArray) + "-"+ Math.max(...priceArray)+" $";
                }
            }

         
        },
        sortable: true,

    },    
    {
        name: "Image",
        selector: row => <img className='preview_img' src={'/uploads/'+row.image} />
    },
    {
        name: "Action",
        selector: row => {
            return (
                <div>
                    <Link
                        href={route("product.edit", row.id)}
                        className="btn btn-datatable btn-icon btn-transparent-dark me-2"
                    >
                        {" "}
                        <fIcon.Edit2 />
                    </Link>                    
                    <Link
                        href={route("product.duplicate", row.id)}
                        className="btn btn-datatable btn-icon btn-transparent-dark me-2"
                    >
                        {" "}
                        <fIcon.Copy />
                    </Link>
                    <button
                        onClick={() => {
                            if (
                                window.confirm(
                                    "Are you sure to delete this record?"
                                )
                            ) {
                                Inertia.delete(
                                    route("product.destroy", row.id)
                                );
                            }
                        }}
                        className="btn btn-datatable btn-icon btn-transparent-dark deleteBtn"
                    >
                        <fIcon.Trash2 />
                    </button>
                </div>
            );
        }
    }
];

const success = flash.success;

useEffect(() => {
    toast.success(success, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
    });

    // setToggleCleared(true)
}, [success]);

const [selectedRows, setSelectedRows] = React.useState([]);
const [toggleCleared, setToggleCleared] = React.useState(false);
const [data, setData] = React.useState(products);

const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
}, []);

// console.log(selectedRows)

const contextActions = React.useMemo(() => {
    const handleDelete = () => {
        if (
            window.confirm(
                `Are you sure you want to delete ${selectedRows.length} item?`
            )
        ) {
            const selectedItem = [];
            selectedRows.map(r => {
                selectedItem.push(r.id);
            });
            const selectedItemString = selectedItem.join();
            // console.log(selectedItemString);
            Inertia.delete(route("product.destroy", selectedItemString));
            setToggleCleared(!toggleCleared);
        }
    };

    return (
        <button onClick={handleDelete} className="btn btn-primary">
            Delete
        </button>
    );
}, [data, selectedRows, toggleCleared]);

// data provides access to your row data
const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
);
const [filterText, setFilterText] = React.useState("");
const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
);
const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
        if (filterText) {
            setResetPaginationToggle(!resetPaginationToggle);
            setFilterText("");
        }
    };

    return (
        // <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        <div className="input-group mb-3">
            <input
                onChange={e => {
                    setFilterText(e.target.value);
                }}
                value={filterText}
                type="text"
                className="form-control"
                placeholder="Search here"
            />
            <div className="input-group-append">
                <button
                    onClick={handleClear}
                    className="btn btn-outline-secondary"
                    type="button"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}, [filterText, resetPaginationToggle]);

const filteredItems = products.filter(
    item =>
        (item.name &&
            item.name.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.slug &&
            item.slug.toLowerCase().includes(filterText.toLowerCase()))
);

const [pending, setPending] = React.useState(true);
useEffect(() => {
    setPending(false);
}, [products]);

//datatable end

  return (
    <DashboardLayout>
        <Header title ="Products"/>

        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Product Information <Link className='btn btn-primary' style={{'float':'right'}} href={route('product.create')}>Add product</Link></div>
                <div className="card-body">

<div className="datatable">
<DataTable
                            title="Products List" //must enable the title to show selected row and button
                            columns={columns}
                            data={filteredItems}
                            pagination
                            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            selectableRows
                            contextActions={contextActions}
                            onSelectedRowsChange={handleRowSelected}
                            clearSelectedRows={toggleCleared}
                            defaultSortFieldId={1}
                            defaultSortAsc={false}
                            //   theme="default"
                            //    progressPending={pending}
                            // expandableRows
                            //  expandableRowsComponent={ExpandedComponent}
                        />
</div>



                </div>
            </div>
        </div>


    </DashboardLayout>
  )
}
