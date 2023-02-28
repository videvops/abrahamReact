import React from 'react'

const ErrorSistema = ({ texto }) => {
    return (
        <div className='card-container yellow-container overflow-hidden w-8' style={{ display: 'flex', justifyContent: 'center' }}>
            <div className='relative bg-yellow-400 border-round border-1 border-yellow-400'>
                <div className='absolute top-0 left-0 px-4 py-3 w-full font-bold text-center text-4xl'>
                    Algo salió mal
                </div>
                <div className='text-center surface-overlay mt-7 pt-2 text-xl border-round'>
                    <p>Lo sentimos pero hubo un error durante el proceso.</p>
                    <p>Tipo de error: <span className='underline'>{texto}</span>.</p>
                </div>
            </div>
        </div>
    )
}

export default ErrorSistema
