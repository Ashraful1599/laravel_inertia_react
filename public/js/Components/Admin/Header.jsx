import React from 'react'

export default function Header({title}) {
  return (
    <header className="page-header page-header-compact page-header-light border-bottom bg-white mb-4">
    <div className="container-xl px-4">
        <div className="page-header-content">
            <div className="row align-items-center justify-content-between pt-3">
                <div className="col-auto mb-3">
                    <h1 className="page-header-title">
                        {title}
                    </h1>
                </div>
            </div>
        </div>
    </div>
</header>
  )
}
