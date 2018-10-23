import React from 'react';
import RootComponent from "./RootComponent";
import '../styles/_root.css';
import {Link} from 'react-router-dom';
import {post} from '../util/fetch';

class OrderComponent extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            orderList: [],
            logined: localStorage.getItem('name') !== null,
        }
    }

    componentDidMount() {
        //根据当前登录的用户名查询到该用户的订单
        post('getOwnOrder', {userName: localStorage.getItem('name')}).then(result => {
            let orderList = result.data.length > 10 ? result.data.slice(0, 10) : result.data;
            this.setState({orderList});
        }).catch(error => console.log(error))
    }

    //订单卡片
    showOrder = (info) => {
        return (
            <section key={info.orderId}>
                <p>订单编号:{info.serialNumber}</p>
                <h3>{info.shopName}</h3>
                <span>实付{info.totalPrice}元</span>
            </section>
        )
    };

    render() {
        // console.log(this.props.children)
        const {orderList, logined} = this.state;
        return (
            <div>
                <h3 className={'headerTop'}>订单</h3>

                <div className='order select_order'>
                    {logined ? <div>
                            {orderList.map(v => this.showOrder(v))}
                            {orderList.length === 0 && <div style={{textAlign: 'center'}}>
                                <img src={'../../empty_default.png'} alt={'暂无订单'} style={{marginTop: '0.2rem'}}/>
                                <p className={'no_login'} style={{fontSize: '0.16rem', marginTop: '0.1rem'}}>您还没有订单哦!</p>
                                <Link to={'/'} className={'order_login'}>去点餐</Link>
                            </div>}
                        </div>
                        : <div style={{textAlign: 'center'}}>
                            <p className={'no_login'}>您还没有登录，请先登录!</p>
                            <Link to={'/login'} className={'order_login'}>登录</Link>
                        </div>
                    }
                </div>
                <RootComponent/>
            </div>

        )
    }
}

//定义默认属性


export default OrderComponent
