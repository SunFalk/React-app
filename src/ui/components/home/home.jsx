import React from 'react';
import s from './home.module.css'


function Home() {
    React.useEffect(() => {
        document.title = 'Home page';
    })

    return (
        <>
            <div className='default_theme'>
                <h2>Wellcome to your apps' website</h2>
                <p>Here you can find some usefull apps</p>
            </div>
            <div id={s.list_div}className='default_theme'>
                <span>List of apps:</span>
                <ul>
                    <li className='default_theme'>
                        <a href='/calculator'>Calculator</a>
                    </li>
                    <li className='default_theme'>
                        <a href='/notepad'>Notepad</a>
                    </li>
                    <li className='default_theme'>
                        <a href='/todo-list'>Todo List</a>
                    </li>
                    <li className='default_theme'>
                        <a href='/stopwatch'>Stopwatch</a>
                    </li>
                    <li className='default_theme'>
                        <a href='/chess'>Chess</a>
                    </li>
            
                </ul>
                
            </div>
        </>
    )
};

export default Home;