import React from 'react';
import s from './notepad.module.css'

function Notepad() {
    function addOnClick() {
        console.log("downloaded");
        const text_content = document.getElementById('notepad').value;
        const blob = new Blob([text_content], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url
        a.download = 'note.txt';
        document.body.appendChild(a);
        a.click()
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        return () => {
            document.getElementById('save_btn').removeEventListener('click')
        }
    }

    React.useEffect(() => {
        document.title = "Notepad"
        document.getElementById('save_btn').removeEventListener('click', addOnClick);
        document.getElementById('save_btn').addEventListener('click', addOnClick)
    }, []);

    return(
        <>
            <div className='default_theme'>
                <h3>Notepad</h3>
            </div>
            <div className={'default_theme ' + s.notepad_div}>
                <textarea id='notepad' spellCheck='false' className={s.notepad}></textarea>
                <button id='save_btn' className={'button ' + s.save_btn}>Download</button>
            </div>
        </>
    )
}

export default Notepad;