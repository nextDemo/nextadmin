import React, { useState, useEffect } from "react";
var Datastore = require('nedb');
let db = new Datastore({ filename: './db', autoload: true })
import { Button, Badge, Pane, Strong } from 'evergreen-ui'

export default () => {
    const [making, setMaking] = useState([]);
    const [ready, setReady] = useState([]);
    let get=()=>{
        db = new Datastore({ filename: './db', autoload: true })
        db.count({}, function (err, count) {
            console.log('count:', count);
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
    let css = {
        height: '50px',
        fontSize: '40px',
        width: '120px',
        lineHeight: '50px',
        margin: '10px'
    }
    let flex = {
        display: 'flex'
    }
    let title = {
        margin: '0 0 0 10px'
    }
    let half = {
        width: '50%'
    }
    return (
        <div>
            <div style={flex}>
                <div style={half}>
                    <h1 style={title}>制作中</h1>
                    {making.map((item, i) => {
                        return (
                            <Badge style={css} key={i} color="green">{item.id}</Badge>
                        )
                    })}
                </div>
                <div style={half}>
                    <h1 style={title}>已完成</h1>
                    {ready.map((item, i) => {
                        return (
                            <Badge style={css} key={i} color="yellow">{item.id}</Badge>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}