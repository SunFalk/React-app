import React from 'react'; // eslint-disable-next-line
import s from './test.module.css'

// This is not a component neither a page, is just a file for testing things before applying to the real ones.

function Test() {
    React.useEffect(() => {
        document.title = "Test"
    }, []);

    return (
        <>
        <div className='default_theme'>
            <h1>Area de testes.</h1>
        </div>
        </>
    )
}

export default Test;