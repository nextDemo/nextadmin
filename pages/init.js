import React, { useState, useEffect } from "react";
const Datastore = require('nedb');
import { Jumbotron, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
export default () => {
    useEffect(() => {
        let db = new Datastore({ filename: './db', autoload: true });
        db.remove({}, { multi: true }, function (err, numRemoved) {
        });
        db.insert(
            {
                id: '1024',
                state: 0, //0订单生效 1制作中 2等待顾客取走 3已完成
                price: 25,
                list: [
                    {
                        title: '迈阿密风情',
                        price: 10,
                        count: 2,
                        img: "/static/images/1.jpg"
                    },
                    {
                        title: '小黄好心情',
                        price: 5,
                        count: 1,
                        img: "/static/images/2.jpg"
                    },
                ],
                time: Date.now()
            }, function (err) {
            });
        console.log('componentDidMount');
    }, []);
    return (
        <Jumbotron>
            <h1>nextAdmin</h1>
            <p>
                已经初始化完毕    
            </p>
            <p>
                <Button href="/menu" variant="primary">点餐</Button>{' '}
                <Button href="/dashboard" variant="primary">接单</Button>{' '}
                <Button href="/screen" variant="primary">屏幕</Button>
            </p>
        </Jumbotron>
    )
}