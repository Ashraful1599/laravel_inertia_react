import React, { useEffect } from "react";
import DashboardLayout from "@/Layouts/DashboardLayout";
import Header from "@/Components/Admin/Header";
import * as fIcon from "react-feather";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
//datatable start
import DataTable from "react-data-table-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//datatable end
import { usePage } from "@inertiajs/inertia-react";

export default function AttributeIndex({ attributes }) {
    const { flash, auth } = usePage().props;

    console.log(attributes);


    //datatable start
    const columns = [
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
            name: "Terms",
            selector: row =>  row.terms.map((item, index)=> <Link key={index} href={route("term.edit", item.id)} >{item.name}, </Link>)
            ,
            sortable: true
        },
        {
            name: "Description",
            selector: row => row.des
        },
        {
            name: "Action",
            selector: row => {
                return (
                    <div>
                        <Link
                            href={route("attribute.edit", row.id)}
                            className="btn btn-datatable btn-icon btn-transparent-dark me-2"
                        >
                            {" "}
                            <fIcon.Edit2 />
                        </Link>
                        <button
                            onClick={() => {
                                if (
                                    window.confirm(
                                        "Are you sure to delete this record?"
                                    )
                                ) {
                                    Inertia.delete(
                                        route("attribute.destroy", row.id)
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
    const [data, setData] = React.useState(attributes);

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
                Inertia.delete(route("attribute.destroy", selectedItemString));
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

    const filteredItems = attributes.filter(
        item =>
            (item.name &&
                item.name.toLowerCase().includes(filterText.toLowerCase())) ||
            (item.slug &&
                item.slug.toLowerCase().includes(filterText.toLowerCase()))
    );

    const [pending, setPending] = React.useState(true);
    useEffect(() => {
        setPending(false);
    }, [attributes]);

    //datatable end


    return (
        <DashboardLayout>
            <Header title="Tag" />

            <div className="container-xl px-4">
                <div className="card mb-4">
                    <div className="card-header">
                        Tag Information{" "}
                        <Link
                            className="btn btn-primary"
                            style={{ float: "right" }}
                            href={route("attribute.create")}
                        >
                            Add tag
                        </Link>
                    </div>
                    <div className="card-body">

                    
                        <DataTable
                            title="Attribute List" //must enable the title to show selected row and button
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

                            //   theme="default"
                            //    progressPending={pending}
                            // expandableRows
                            //  expandableRowsComponent={ExpandedComponent}
                        />


                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
