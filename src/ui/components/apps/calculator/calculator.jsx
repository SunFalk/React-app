import React, {useEffect, useState} from 'react';
import s from './calculator.module.css';

function Calculator() {
    const [input, setInput] = useState("");
    
    function onButtonPressed(button) {
        const buttons = [
                     '<-', 'c',
            '7', '8', '9', '/',
            '4', '5', '6', '+',
            '1', '2', '3', '-',
            '.', '0', '*', '='
        ]
        switch (button) {
            case '/':
            case '*':
            case '+':
            case '-':
                switch (button) {
                    case '/':
                        button = '÷';
                        break;
                    case '*':
                        button = 'x';
                        break;
                    default:
                        break;
                }
                if (input.length > 0 && ['+', '-', 'x', '÷', '.'].includes(input[input.length - 1])) {
                    setInput(input.slice(0, -1) + button)
                } else if (input.length >= 1) {
                    setInput(input + button)
                }
                break;
            case '=':
                calculate();
                break;
            case '.':
                if (input.length < 1 || ['+', '-', 'x', '÷', '.'].includes(input[input.length - 1])) {return};
                // eslint-disable-next-line
                const numbers = input.split(/[+\-x÷]/);
                console.log(numbers);
                const lastNumber = numbers[numbers.length - 1];
                if (lastNumber.includes('.')) {
                    break;
                }
                setInput(input + button);
                break;
            case 'c':
                setInput('');
                break;
            case '<-':
                setInput(input.slice(0, -1));
                break;
            default:
                if (buttons.includes(button)) {
                    setInput(input + button)
                }
        }
    }

    function calculate() {
        try {
            let evaluate = input;
            evaluate = evaluate.replace('÷', '/'); // eslint-disable-next-line
            evaluate = evaluate.replace('x', '*'); // eslint-disable-next-line
            evaluate = evaluate.replace(/[a-zA-Z\=]/, ''); // eslint-disable-next-line
            let result = eval(evaluate);
            if (result % 1 !== 0) {
                result = result.toFixed(2);
            }
            console.log("Result: " + result);
            setInput(String(result));
        } catch {
            setInput('')
        }
    }

    function handeKeyPress(event) {
        const key = event.key;

        if (key === 'c') {
            onButtonPressed(key);
        }
        else if (key === ' ') { // Space
            onButtonPressed('<-');
        } // eslint-disable-next-line
        else if (/[0-9+\-*\/\.\=]/.test(key)) {
            onButtonPressed(key);
        }
    }

    useEffect(() => {
        document.title = 'Calculator'
        document.addEventListener('keypress', handeKeyPress)
        return () => {
            document.removeEventListener('keypress', handeKeyPress)
        }
    })
    
    return (
        <>
            <div className='default_theme'>
                <h3>Calculator</h3>
            </div>
            <div className='default_theme'>
                <div>
                    <input type='text' tabIndex={-1} readOnly defaultValue={input} className={s.calculator_input}/>
                </div>
                <table className={'default_theme ' + s.buttons_table}>
                    <tbody>
                        <tr>
                            <td colSpan={2}><button className={s.button} onClick={() => onButtonPressed('<-')}>←</button></td>
                            <td colSpan={2}><button className={s.button} onClick={() => onButtonPressed('c')}>C</button></td>
                        </tr>
                        <tr>
                            <td><button className={s.button} onClick={() => onButtonPressed('7')}>7</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('8')}>8</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('9')}>9</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('/')}>÷</button></td>
                        </tr>
                        <tr>
                            <td><button className={s.button} onClick={() => onButtonPressed('4')}>4</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('5')}>5</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('6')}>6</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('+')}>+</button></td>
                        </tr>
                        <tr>
                            <td><button className={s.button} onClick={() => onButtonPressed('1')}>1</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('2')}>2</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('3')}>3</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('-')}>-</button></td>
                        </tr>
                        <tr>
                            <td><button className={s.button} onClick={() => onButtonPressed('.')}>.</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('0')}>0</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('*')}>x</button></td>
                            <td><button className={s.button} onClick={() => onButtonPressed('=')}>=</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
        </>
    )
}

export default Calculator;