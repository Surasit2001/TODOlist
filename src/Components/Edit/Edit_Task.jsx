import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {  message } from 'antd';
function Edit_Task() {
    const [lists, setLists] = useState([]);
    const [title, setTitle] = useState("");
    const [descrip, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [err, setErr] = useState("");
    const { id } = useParams();  
    

    useEffect(() => {
        const storedLists = JSON.parse(localStorage.getItem('lists'));
        if (storedLists) {
            setLists(storedLists);
        }
    }, []);

    useEffect(() => {
        if (lists.length > 0) {
            localStorage.setItem('lists', JSON.stringify(lists));
        }
    }, [lists]);

    useEffect(() => {
        if (id) {
            const taskToEdit = lists.find(task => task.id === parseInt(id));
            if (taskToEdit) {
                setTitle(taskToEdit.title);
                setDescription(taskToEdit.descrip);
                setDate(taskToEdit.date);
            }
        }
    }, [id, lists]);

    const TitleChange = (e) => {
        setTitle(e.target.value);
    };

    const DescripChange = (e) => {
        setDescription(e.target.value);
    };

    const DateChange = (e) => {
        setDate(e.target.value);
    };

    const submit = () => {
        if (title !== "" && descrip !== "" && date !== "") {
            const newTask = {
                id: id ? parseInt(id) : lists.length + 1, 
                title,
                descrip,
                date
            };

            let updatedLists;
            if (id) {
                updatedLists = lists.map(task => task.id === parseInt(id) ? newTask : task);
            } else {
                updatedLists = [...lists, newTask];
            }

            setLists(updatedLists);
            setTitle("");
            setDescription("");
            setDate("");
            setErr("");
            message.success(' successfully ')
           
        } else {
            const errMessage = "กรุณากรอกข้อมูลให้ครบถ้วน";
            setErr(errMessage);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="Area_list">
                    <div className="nav_aad">
                        <header><h1>{id ? "Edit Task" : "Add Task"}</h1></header>
                        <div className="err">
                            {err && <div className="err"><p>{err}</p></div>}
                        </div>
                        <div className="inputTasks">
                            <Link to="/"><button>Backward</button></Link>
                        </div>
                    </div>
                    <div className="Add_nav_">
                        <div className="err"></div>
                        <div className="Add_content">
                            <label htmlFor=''>Title :</label>
                            <input
                                type="text"
                                placeholder='Title...'
                                className={`title ${title ? 'valid' : 'invalid'}`}
                                name='title'
                                value={title}
                                onChange={TitleChange}
                            />
                        </div>
                        <div className="Add_content">
                            <label htmlFor=''>Description :</label>
                            <textarea
                                placeholder='Description...'
                                className={`Descrip ${descrip ? 'valid' : 'invalid'}`}
                                name='descrip'
                                value={descrip}
                                onChange={DescripChange}
                            />
                        </div>
                        <div className="Add_content">
                            <label htmlFor=''>Date :</label>
                            <input
                                type="date"
                                className={`date ${date ? 'valid' : 'invalid'}`}
                                value={date}
                                onChange={DateChange}
                                min={moment().format('YYYY-MM-DD')}
                            />
                        </div>
                        <div className="submit">
                            <button onClick={submit}>{id ? "Update Task" : "Add Task"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit_Task;
