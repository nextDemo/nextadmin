var Datastore = require('nedb');
let db = new Datastore({ filename: './db', autoload: true });
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Jumbotron, Image, Form, Modal,Badge, Card, ListGroup, Navbar, Container, Tabs, Tab, Table } from 'react-bootstrap';
class App extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                {
                    id: 0,
                    title: "迈阿密风情",
                    price:10,
                    count: 1,
                    img: "/static/images/1.jpg"
                },
                {
                    id: 1,
                    title: "小黄好心情",
                    price:5,
                    count: 1,
                    img: "/static/images/2.jpg"
                },
                {
                    id: 3,
                    title: "水果的夏天",
                    price:9.9,
                    count: 1,
                    img: "/static/images/3.jpg"
                }
            ],
            show:false,
            id:0
        }
    }
    sub(item) {
        item.count -= 1;
        this.setState({
            data: this.state.data
        })
    }
    add(item) {
        item.count += 1;
        this.setState({
            data: this.state.data
        })
    }
    select() {
        let count = 0;
        this.state.data.map((item, i) => {
            if (item.count > 0) {
                count += item.count;
            }
        })
        return count;
    }
    disabled() {
        if (this.select() > 0) {
            return false;
        } else {
            return true;
        }
    }

    handleClose(){
        this.setState({
            show:false
        })
    }
    post(){
        let _self=this;
        let select=[];
        let price=0;
        this.state.data.map((item, i) => {
            if (item.count > 0) {
                price+=(item.price*item.count);
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
                    time:Date.now(),
                    price:price,//总价
                    list:select
                }, function (err) {
                    _self.setState({
                        id:id
                    })
                });
        });
        this.setState({
            show:true
        })
    }
    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>奶茶点餐系统</h1>
                    <ListGroup>
                        {this.state.data.map((item, i) => {
                            if (item.count >= 0) {
                                return (
                                    <ListGroup.Item key={item.id}>
                                        <Image src={item.img} width="120" rounded />{item.title}x{item.count}
                                        <Button variant="secondary" onClick={this.sub.bind(this, item)} size="sm">-</Button>
                                        {' '}<Button variant="secondary" onClick={this.add.bind(this, item)} size="sm">+</Button>
                                    </ListGroup.Item>
                                )
                            }
                        })}
                    </ListGroup>
                    <p><br></br>
                        <Button onClick={this.post.bind(this)} disabled={this.disabled()} variant="primary">选好了
                            <Badge variant="light">{this.select()}</Badge>
                        </Button>
                    </p>
                    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>订单已经生效</Modal.Title>
                        </Modal.Header>
                    <Modal.Body>您的订单号是 {this.state.id}，请注意大屏幕!</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={this.handleClose.bind(this)}>
                                确定
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Jumbotron>
            </div>
        )
    }
}
export default App