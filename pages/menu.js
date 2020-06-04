import React, { useState, useEffect,useContext } from "react";
var Datastore = require('nedb');
let db = new Datastore({ filename: './db', autoload: true });
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Jumbotron, Image, Modal, Badge, ListGroup,InputGroup} from 'react-bootstrap';

const MyContext = React.createContext()

function Item(){
    let {item,update} = useContext(MyContext)
    let sub = () => {
        item.count -= 1;
        update(item)
        // setData(data)
    }
    let add = () => {
        item.count += 1;
        update(item)
    }
    return(
        <div className="flex">
            <Image src={item.img} width="120" rounded />{item.title}
            <div>
                <Button variant="secondary" onClick={sub} size="sm">-</Button>
                    {' '}x{' '}{item.count}{' '}
                <Button variant="secondary" onClick={add} size="sm">+</Button>
            </div>
            <style jsx>
                {
                    `
                    .flex{
                        display:flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    `
                }
            </style>
        </div>
    )
}
export default () => {
    const [data, setData] = useState([
        {
            id: 0,
            title: "迈阿密风情",
            price: 10,
            count: 1,
            img: "/static/images/1.jpg"
        },
        {
            id: 1,
            title: "小黄好心情",
            price: 5,
            count: 1,
            img: "/static/images/2.jpg"
        },
        {
            id: 3,
            title: "水果的夏天",
            price: 9.9,
            count: 1,
            img: "/static/images/3.jpg"
        }
    ]);
    const [show, setShow] = useState(false);
    const [id, setId] = useState(0);
    let getChildrenMsg=(count)=>{
        console.log(count)
    }

    let update=(item)=>{
        let newdata=[]
        data.map((one,i)=>{
            if(one.id==item.id){
                newdata.push(item)
            }else{
                newdata.push(one);
            }
        });
        setData(newdata);
    }

    let select = () => {
        let count = 0;
        data.map((item, i) => {
            if (item.count > 0) {
                count += item.count;
            }
        })
        return count;
    }
    let disabled = () => {
        if (select() > 0) {
            return false;
        } else {
            return true;
        }
    }

    let handleClose = () => {
        setShow(false);
    }
    let post = () => {
        console.log('post')
        let select = [];
        let price = 0;
        data.map((item, i) => {
            if (item.count > 0) {
                price += (item.price * item.count);
                select.push(item)
            }
        })
        db = new Datastore({ filename: './db', autoload: true });
        db.count({}, function (err, count) {
            // count equals to 4
            console.log(count);
            let id = count + 1;
            if (id < 1000) {
                id += 1000;
            }
            db.insert(
                {
                    id: id,
                    state: 0, //0订单生效 1制作中 2等待顾客取走 3已完成,
                    time: Date.now(),
                    price: price,//总价
                    list: select
                }, function (err) {
                    setId(id);
                });
        });
        setShow(true)
    }
    return (
        <Jumbotron>
            <h1>奶茶点餐系统</h1>
            <ListGroup>
                
                {data.map((item, i) => {
                    if (item.count >= 0) {
                        return (
                            <ListGroup.Item key={item.id}>
                                <MyContext.Provider value={{item,update}}>
                                    <Item />
                                </MyContext.Provider>
                            </ListGroup.Item>
                        )
                    }
                })}
                
            </ListGroup>
            <p><br></br>
                <Button onClick={post} disabled={disabled()} variant="primary">选好了
                    <Badge variant="light">{select()}</Badge>
                </Button>
            </p>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>订单已经生效</Modal.Title>
                </Modal.Header>
                <Modal.Body>您的订单号是 {id}，请注意大屏幕!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        确定
                    </Button>
                </Modal.Footer>
            </Modal>
        </Jumbotron>
    )
}