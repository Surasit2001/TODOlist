import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";
import { PiChalkboardTeacher } from "react-icons/pi";
import {  Modal, Tour, message } from 'antd';
import './ToDoList.css';

function ToDoList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const storedLists = JSON.parse(localStorage.getItem('lists')) || [];
        setLists(storedLists);
    }, []);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = (id) => {
        deleteTask(id);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteTask = (id) => {
        const updatedLists = lists.filter(task => task.id !== id);
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
        message.success(' successfully ')
    };

    const toggleCheckbox = (id) => {
        const updatedLists = lists.map(task => {
            if (task.id === id) {
                return { ...task, checked: !task.checked };
            }
            return task;
        });
        setLists(updatedLists);
        localStorage.setItem('lists', JSON.stringify(updatedLists));
        
    };


    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const ref4 = useRef(null);
    const ref5 = useRef(null);
    const ref6 = useRef(null);
    const [open, setOpen] = useState(false);
    const steps = [
        {
            title: 'เพิ่มข้อมูล TOFOLIST ',
            description: 'ผู้ใช้สามารถเข้าไปเพิ่มข้อมูล ToDoList ได้ตามต้องการ.',
           
            target: () => ref1.current,
        },
        {
            title: 'แสดงข้อมูลที่เหลือต้องทำ',
            description: 'ถ้าผู้ใช้ยังทำงานไม่เสร็จสามารถเช็คได้ว่าเหลือกี่งานที่ยังไม่ได้ทำ',
            target: () => ref2.current,
        },
        {
            title: 'แสดงข้อข้อมูลที่ยังไม่ได้ทำ',
            description: 'ถ้าข้อมูลไหนที่ผู้ใช้ยังไม่ได้ทำจะแสดงเป็นกรอบสีแดง ',
            target: () => ref3.current,
        },
        {
            title: 'เลือกCheck box ',
            description: 'ผู้ใช้สามารถกดตรงปุ่มCheck box เพื่อเตือนว่ากระทำสิ่งใดไปแล้ว ',
            target: () => ref4.current,
        },
        {
            title: 'เลือกCheck box ',
            description: 'ผู้ใช้สามารถกดตรงปุ่มCheck box เพื่อเตือนว่ากระทำสิ่งใดไปแล้ว ',
            target: () => ref5.current,
        },
        {
            title: 'ลบข้อมูล ',
            description: 'ผู้ใช้สามารถเข้าไปลบข้อมูลข้อมูลได้ ',
            target: () => ref6.current,
        },
    ];

    return (
        <div>
            <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
            <div className="container">
                <div className="Area_list">
                    <div className="nav">
                        <header><h1>To-Do List</h1></header>
                        <button type="primary" onClick={() => setOpen(true)}>
                            <PiChalkboardTeacher />
                            </button>
                    </div>
                    <div className="Add_nav">
                        <div className="MyTasks">
                            <h2>My Tasks</h2>
                            <p ref={ref2}>You have {lists.filter(task => !task.checked).length} tasks left!</p>
                        </div>
                        <div className="inputTasks">
                         <Link ref={ref1} to="/Add_Task"><button>Add tasks</button></Link>
                            
                        </div>
                    </div>

                    <div className="task_list">
                        <ul className="list_nav">
                            {lists.map((task) => (
                                <li  ref={ref3} key={task.id} className="content_list" style={{ border: task.checked ? '2px solid #0cec13' : '2px solid #eb0b0b' }}>
                                    <input ref={ref4} type="checkbox" checked={task.checked} onChange={() => toggleCheckbox(task.id)} />
                                    <div className="task_details" onClick={() => toggleCheckbox(task.id)}>
                                        <h3 style={{ textDecoration: task.checked ? 'line-through' : 'none' }}>{task.title}</h3>
                                        <p>{task.descrip}</p>
                                        <p style={{ color: 'red' }}>Due : {task.date}</p>
                                    </div>
                                    <div className="Edit_delete">
                                        <Link ref={ref5} to={`/Edit_Task/${task.id}`}> <button className="edit_button"><MdEdit /></button></Link>
                                        <button ref={ref6} className="delete_button" onClick={showModal}><MdDelete /></button>
                                        <Modal
                                            title="Confirm Delete"
                                            visible={isModalOpen}
                                            onOk={() => handleOk(task.id)}
                                            onCancel={handleCancel}
                                            okText="Delete"
                                            cancelText="Cancel"
                                            className='model_de'
                                        >
                                            <p>Do you want delete item?</p>
                                        </Modal>
                                        
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ToDoList;
