import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'

const Spinner = () => {
    return (
        <div className='text-center'>
            <ProgressSpinner />
            <h5>Por favor espere</h5>
        </div>
    )
}

export default Spinner
