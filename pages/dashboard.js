var Datastore = require('nedb');
let db = new Datastore({ filename: './db', autoload: true });
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Jumbotron, Tabs, Tab, Table } from 'react-bootstrap';
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: [],
            making: [],
            ready: []
        }
    }
    componentDidMount() {
        let _self = this;
        this.timer = setInterval(() => {
            console.log('get')
            _self.get();
        }, 1000);
    }
    get() {
        let _self = this;
        db = new Datastore({ filename: './db', autoload: true });
        db.find({ state: 0 }, function (err, docs) {
            _self.setState({
                order: docs
            })
        });
        db.find({ state: 1 }, function (err, docs) {
            _self.setState({
                making: docs
            })
        });
        db.find({ state: 2 }, function (err, docs) {
            _self.setState({
                ready: docs
            })
        });
    }
    make(id) {
        let _self = this;
        console.log('make', id);
        db.update({ id: id }, { $set: { state: 1 } }, {}, function (err, numReplaced) {
            _self.get();
        });
    }
    finish(id) {
        let _self = this;
        console.log('make', id);
        db.update({ id: id }, { $set: { state: 2 } }, {}, function (err, numReplaced) {
            _self.get();
        });
    }
    over(id) {
        let _self = this;
        console.log('make', id);
        db.update({ id: id }, { $set: { state: 3 } }, {}, function (err, numReplaced) {
            _self.get();
        });
    }
    render() {
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
                                {this.state.order.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.id}</td>
                                            <td>{item.time}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                {
                                                    item.list.map((li, i) => {
                                                        return (
                                                            <div>
                                                                <img width="40" src={li.img} />
                                                                {li.title}({li.price}) x {li.count} = {li.price * li.count}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <Button onClick={this.make.bind(this, item.id)} variant="primary">接单</Button>
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
                                {this.state.making.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.id}</td>
                                            <td>{item.time}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                {
                                                    item.list.map((li, i) => {
                                                        return (
                                                            <div>
                                                                <img width="40" src={li.img} />
                                                                {li.title}({li.price}) x {li.count} = {li.price * li.count}
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </td>
                                            <td>
                                                <Button onClick={this.finish.bind(this, item.id)} variant="primary">制作完毕</Button>
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
                                {this.state.ready.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.id}</td>
                                            <td>{item.time}</td>
                                            <td>{item.price}</td>
                                            <td>{
                                                item.list.map((li, i) => {
                                                    return (
                                                        <div>
                                                            <img width="40" src={li.img} />
                                                            {li.title}({li.price}) x {li.count} = {li.price * li.count}
                                                        </div>
                                                    )
                                                })
                                            }</td>
                                            <td>
                                                <Button onClick={this.over.bind(this, item.id)} variant="primary">顾客已取</Button>
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
}
export default Dashboard