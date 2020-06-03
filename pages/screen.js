var Datastore = require('nedb');
let db = new Datastore({ filename: './db', autoload: true })
import { Button, Badge, Pane, Strong } from 'evergreen-ui'
class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            making:[],
            ready:[]
        }
    }
    componentDidMount() {
        let _self=this;
        this.timer = setInterval(() => {
            _self.get();
        }, 1000);
    }
    get(){
        let _self=this;
        db = new Datastore({ filename: './db', autoload: true })
        db.count({}, function (err, count) {
            console.log('count:',count);
        });
        db.find({ state: 1 }, function (err, docs) {
            console.log(docs)
            _self.setState({
                making:docs
            })
        });
        db.find({ state: 2 }, function (err, docs) {
            _self.setState({
                ready:docs
            })
        });
    }
    making(){
        let list=[];
        this.state.making.map((item, i) => {   
            list.push(
                <Badge key={i} color="green">{item.id}</Badge>
            )   
        });
        return list;
    }
    render() {
        let css={
            height: '50px',
            fontSize: '40px',
            width: '120px',
            lineHeight: '50px',
            margin:'10px'
        }
        let flex={
            display:'flex'
        }
        let title={
            margin:'0 0 0 10px'
        }
        let half={
            width:'50%'
        }
        return (
            <div>
                <div style={flex}>
                    <div style={half}>
                    <h1 style={title}>制作中</h1>
                    {this.state.making.map((item, i) => {      
                    return (
                        <Badge style={css} key={i} color="green">{item.id}</Badge>
                    )})}
                    </div>
                    <div style={half}>
                    <h1 style={title}>已完成</h1>
                    {this.state.ready.map((item, i) => {      
                    return (
                        <Badge style={css} key={i} color="yellow">{item.id}</Badge>
                    )})}
                    </div>
                </div>
            </div>
        )
    }
}
export default Screen