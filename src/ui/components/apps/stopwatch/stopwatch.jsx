import {React, useRef, useEffect} from 'react'
import s from './stopwatch.module.css'

function Stopwatch () {
    const pointer = useRef();
    const display = useRef();
    const loop_ref = useRef();
    let seconds = 0.0;
    let minutes = 0;

    let started = false;


    useEffect(() => {
        document.title = 'Stopwatch'
        start_loop();
        return () => {
            if (loop_ref.current) {
                cancelAnimationFrame(loop_ref.current);
            };
        };
    })

    /**
     * Start the main loop that run in same frames per second (fps) of your machine.
     */
    function start_loop() {
        let last_time = 0;

        const updateState = (current_time) => {
            const delta = (current_time - last_time) / 1000;
            last_time = current_time;
            _process(delta);
            loop_ref.current = requestAnimationFrame(updateState);
        };

        loop_ref.current = requestAnimationFrame(updateState);
    }

    /**
     * Callback called in each frame of the main loop.
     * It check if the stopwatch has started and if so, it update the time.
     * @param {number} delta - Value of the time interval between frames.
     */
    function _process(delta) {
        if (started) {
            updateStopwatch(delta);
        }
    }

    /**
     * Start the stopwatch.
     */
    function startStopwatch() {
        started = true;
    }

    /**
     * Update the stopwatch time by the delta value.
     * @param {number} delta - Value of the time interval between frames.
     */
    function updateStopwatch(delta) {
        seconds = seconds + delta;
        minutes = Math.floor(seconds / 60);
        pointer.current.style.transform = 'rotate(' + ((seconds * 6) % 360) + 'deg)';
        let time = (String(minutes).padStart(2, '0').slice(-2) + ':' + (seconds % 60).toFixed(2).padStart(5, '0'));
        display.current.innerHTML = time;
    }

    /**
     * Stop the stopwatch.
     */
    function stopStopwatch() {
        started = false;
    }

    /**
     * Reset the stopwatch's time.
     */
    function resetStopwatch() {;
        pointer.current.style.transform = 'rotate(0deg)';
        started = false;
        seconds = 0.0;
        minutes = 0;
        display.current.innerHTML = '00:00.00'
    }

    return (
        <>
            <div className='default_theme'>
                <h3>Stopwatch</h3>
            </div>
            <div className={'default_theme ' + s.stopwatch_div}>
                <div id={s.stopwatch_btns_div}>
                <button className='button' onClick={startStopwatch}>Start</button>
                <button className='button' onClick={stopStopwatch}>Stop</button>
                <button className='button' onClick={resetStopwatch}>Reset</button>
                </div>
                <div className={s.stopwatch_circle}>
                    <div className={s.pointer} ref={pointer}></div>
                    <span className={s.time_display} ref={display}>00:00.00</span>
                </div>
            </div>
        </>
    )
}

export default Stopwatch;