import React, {useEffect, useState} from 'react'
import DashboardLayout from '@/Layouts/DashboardLayout'
import Header from '@/Components/Admin/Header'
import * as fIcon from 'react-feather';
import { Link } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import DataTable  from 'react-data-table-component';

  const columns = [
      {
          name: 'Name',
          selector: row => row.name,
          sortable: true,
      },
      {
          name: 'Slug',
          selector: row => row.slug,
          sortable: true,
      },
      {
        name: 'Preview',
        selector: row=> <img className='preview_img' src={'/uploads/'+row.slug} />
      },
      {
        name: 'Action',
        selector: row=> {

          return(
            <div>
              <Link  href={route('file.edit',row.id)} className="btn btn-datatable btn-icon btn-transparent-dark me-2"> <fIcon.Edit2 /></Link>
              <button onClick={() => {if(window.confirm('Are you sure to delete this record?')){  Inertia.get(route('file.destroy',row.id))  };}}  className="btn btn-datatable btn-icon btn-transparent-dark deleteBtn"><fIcon.Trash2 /></button>
            </div>
          )

        }
      }
  ];
  

export default function FileIndex({files}) {


	const [selectedRows, setSelectedRows] = React.useState([]);
	const [toggleCleared, setToggleCleared] = React.useState(false);
	const [data, setData] = React.useState(files);

	const handleRowSelected = React.useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	
	const contextActions = React.useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
				setToggleCleared(!toggleCleared);
				setData(differenceBy(data, selectedRows, 'name'));
			}
		};

		return (
			<button onClick={handleDelete} className='btn btn-primary'>Delete</button>
		);
	}, [data, selectedRows, toggleCleared]);




// data provides access to your row data
  const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
	const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
	const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			// <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
      <div className="input-group mb-3">
        <input onChange={e => {setFilterText(e.target.value)}} value={filterText} type="text" className="form-control" placeholder="Search here" />
        <div className="input-group-append">
          <button onClick={handleClear} className="btn btn-outline-secondary" type="button">Clear</button>
        </div>
      </div>
		 );
	}, [filterText, resetPaginationToggle]);

	const filteredItems = files.filter(
		item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) || item.slug && item.slug.toLowerCase().includes(filterText.toLowerCase()),
	);

  const [pending, setPending] = React.useState(true);
  useEffect(()=>{
    setPending(false);
  },[files])

  return (
    <DashboardLayout>
        <Header title ="Tag"/>
        <div className="container-xl px-4">
            <div className="card mb-4">
                <div className="card-header">Files Information</div>
                <div className="card-body">
                <DataTable
                //	title="File List"
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
  )
}
