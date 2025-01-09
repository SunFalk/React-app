import React from 'react'; // eslint-disable-next-line
import s from './test.module.css'

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