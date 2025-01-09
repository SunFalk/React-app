import React, {useEffect, useState} from 'react';
import s from './todo_list.module.css';

function TodoList() {
    useEffect(() => {
        document.title = "Todo List";
    }, []);

    let [tasks, setTasks] = useState([]);
    let [count, setCount] = useState(0);


    function add_task() {
        let task_name = document.getElementById('task_name').value;
        let task_desc = document.getElementById('task_description').value
        if (task_name.length === 0) {return};
        if (task_desc.length === 0) {task_desc = 'Empty description.'}
        let task = {
            id: count,
            name: task_name,
            description: task_desc,
        };
        setTasks([...tasks, task]);
        setCount(count + 1);
    };

    function remove_task(id) {
        setTasks((old_list) => old_list.filter(task => task.id !== id));
    };

    function _onMouseEnter(e) {
        let parent = e.target.parentElement;
        let tooltip = parent.querySelector('.' + s.tooltip);
        if (tooltip && !tooltip.classList.contains(s.tooltip_activating)) {
            tooltip.classList.add(s.tooltip_activating);
            const onEnd = (e) => {
                if (e.animationName === s.show_tooltip) {
                    tooltip.classList.remove(s.tooltip_activating);
                    tooltip.classList.add(s.tooltip_active);
                }
                e.target.removeEventListener('animationend', onEnd);
            };
            tooltip.addEventListener('animationend', onEnd);
        }
    }

    function _onMouseLeave(e) {
        let parent = e.target.parentElement;
        let tooltip = parent.querySelector('.' + s.tooltip);
        if (tooltip) {
            if (tooltip.classList.contains(s.tooltip_activating)) {
                tooltip.classList.remove(s.tooltip_activating);
            };
            if (tooltip.classList.contains(s.tooltip_active)) {
                tooltip.classList.remove(s.tooltip_active);
                tooltip.classList.add(s.tooltip_deactivating);
                const onEnd = (e) => {
                    if (e.animationName === s.hide_tooltip) {
                        tooltip.classList.remove(s.tooltip_deactivating);
                    }
                    e.target.removeEventListener('animationend', onEnd);
                };
                tooltip.addEventListener('animationend', onEnd);
            };
        }
        
    }

    return (
        <>
            <div className='default_theme'>
                <h3>Todo List</h3>
            </div>
            <div className='default_theme'>
                <div className={s.task_entry_div}>
                    <input type="text" id='task_name' maxLength={50} className={s.task_entry} placeholder='Enter your task here' />
                    <button id={s.add_btn} onClick={add_task} className='button'>Add Task</button>
                </div>
                <div className={s.task_entry_div}>
                    <input type="text" id='task_description' maxLength='40' className={s.task_desc_entry} placeholder="Add a description for your task here." />
                    <span>Descriptions are visible when you hover the pointer over the task name</span>
                </div>
                <div id={s.task_list}>
                    {tasks.map(task => (
                        <div key={task.id} className={s.task}>
                            <span className={s.tooltip}>{task.description}</span>
                            <span className={s.task_name} onMouseEnter={_onMouseEnter} onMouseLeave={_onMouseLeave}>{task.name}</span>
                            <button className={'button ' + s.remove_btn} onClick={remove_task.bind(this, task.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}


export default TodoList;