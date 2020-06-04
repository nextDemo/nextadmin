import React, { useState, useEffect, useContext } from "react";
var Datastore = require('nedb');
let db = new Datastore({ filename: './db', autoload: true });
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Jumbotron, Tabs, Tab, Table } from 'react-bootstrap';

const MyContext = React.createContext()

function Todo(props) {
    let { item, update } = useContext(MyContext);
    let click = () => {
        update(item.id, props.state);
    }
    return (
        <Button onClick={click} variant="primary">{props.name}</Button>
    )
}
export default () => {
    const [order, setOrder] = useState([]);
    const [making, setMaking] = useState([]);
    const [ready, setReady] = useState([]);
    let get = () => {
        db = new Datastore({ filename: './db', autoload: true });
        db.find({ state: 0 }, function (err, docs) {
            setOrder(docs);
        });
        db.find({ state: 1 }, function (err, docs) {
            setMaking(docs);
        });
        db.find({ state: 2 }, function (err, docs) {
            setReady(docs);
        });
    }
    useEffect(() => {
        let timer = setInterval(() => {
            get();
        }, 1000);
        console.log('componentDidMount');
    }, []);
    let update = (id, state) => {
        db.update({ id: id }, { $set: { state: state } }, {}, function (err, numReplaced) {
            get()
        });
    }
    return (
        <div>
            <Tabs defaultActiveKey="home" id="tabs">
                <Tab eventKey="home" title="新订单">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>时间</th>
                                <th>总价</th>
                                <th>详情</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.time}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            {
                                                item.list.map((li, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <img width="40" src={li.img} />
                                                            {li.title}({li.price}) x {li.count} = {li.price * li.count}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            <MyContext.Provider value={{ item, update }}>
                                                <Todo state={1} name={"接单"}></Todo>
                                            </MyContext.Provider>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="profile" title="制作中">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>时间</th>
                                <th>总价</th>
                                <th>详情</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {making.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.time}</td>
                                        <td>{item.price}</td>
                                        <td>
                                            {
                                                item.list.map((li, i) => {
                                                    return (
                                                        <div key={i}>
                                                            <img width="40" src={li.img} />
                                                            {li.title}({li.price}) x {li.count} = {li.price * li.count}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                        <td>
                                            <MyContext.Provider value={{ item, update }}>
                                                <Todo state={2} name={"制作完毕"}></Todo>
                                            </MyContext.Provider>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="contact" title="已完成">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>编号</th>
                                <th>时间</th>
                                <th>总价</th>
                                <th>详情</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ready.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.time}</td>
                                        <td>{item.price}</td>
                                        <td>{
                                            item.list.map((li, i) => {
                                                return (
                                                    <div key={i}>
                                                        <img width="40" src={li.img} />
                                                        {li.title}({li.price}) x {li.count} = {li.price * li.count}
                                                    </div>
                                                )
                                            })
                                        }</td>
                                        <td>
                                            <MyContext.Provider value={{ item, update }}>
                                                <Todo state={3} name={"顾客已取"}></Todo>
                                            </MyContext.Provider>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
            <style jsx>
                {
                    `
                body{
                    width:96%;
                    margin:0 auto;
                }
                `
                }
            </style>
        </div>
    )
}