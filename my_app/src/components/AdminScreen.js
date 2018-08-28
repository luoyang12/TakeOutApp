import React from 'react';
import '../styles/_root.css';
import {post, get} from "../util/fetch";

let ID = 0;

//import {Link} from 'react-router-dom';
class AdminScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            shopList: [],
            showShop: false,
            orderList: [],
            showOrder: false,
            showAdd: false,
            shopName: '',
            shopDetail: '',
            shopImg: '',
            dishName: '',
            dishPrice: '',
            dishShop: '',
            dishDetail: '',
            dishImg: '',
            showAddFood: false,
            logined: localStorage.getItem('name') !== null,
        }
    }

    componentDidMount() {

    }

    //展示店铺列表
    showShopList = (shop) => {
        return (
            <li key={shop.shopId}>{shop.shopName}
                <img src={'../../delete.png'} alt={'删除'}
                     style={{width: '0.2rem', height: '0.2rem', float: 'right', color: '#8a8a8a'}}
                     onClick={this.deleteShop.bind(this, shop.shopId)}/>
            </li>
        )
    };
    //删除店铺
    deleteShop = (id) => {
        let shopList = this.state.shopList.filter(v => v.shopId !== id);
        this.setState({shopList});
        post("deleteShop", {shopId: id}).then(alert('店铺已删除！'))
    };
    //管理店铺
    manageShop = () => {
        if (this.state.shopList.length === 0) {
            get("shopList").then(data => {
                this.setState({
                    shopList: data.data,
                    showShop: !this.state.showShop
                });
                console.log(this.state.shopList)
            })
        } else {
            this.setState({showShop: !this.state.showShop})
        }
    };
    //管理订单
    manageOrder = () => {
        if (this.state.orderList.length === 0) {
            get("getOrderList").then(data => {
                this.setState({
                    orderList: data.data,
                    showOrder: !this.state.showOrder
                });
                // console.log(this.state.orderList)
            })
        } else {
            this.setState({showOrder: !this.state.showOrder})
        }

    };
    //展示订单
    showOrderList = (order) => {
        return (
            <li key={order.orderId}>
                <p>订单编号：{order.serialNumber}</p>
                <p>店铺名称：{order.shopName}</p>
                <p>消费金额：{order.totalPrice}元</p>
            </li>
        )
    };
    addShop = () => {
        this.setState({
            showAdd: !this.state.showAdd
        })
    };
    addFood = () => {
        this.setState({
            showAddFood: !this.state.showAddFood
        })
    };
    //新增店铺保存
    saveShop = () => {
        if (this.state.shopName.replace(/^\s+|\s+$/g, '') === '') {
            alert('店铺名称不能为空！')
        } else {
            fetch('api/addShop', {
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: 'shopName=' + this.state.shopName + '&address=' + this.state.shopDetail + '&img=' + this.state.shopImg
            }).then(res => res.json().then(result => {
                    alert('新增店铺成功！');
                    if (this.state.shopList.length !== 0) {
                        this.state.shopList.push({shopId: result.shopId, shopName: this.state.shopName});
                    }
                    this.setState({
                        showAdd: false,
                        shopName: '',
                        shopDetail: '',
                        shopImg: ''
                    })
                })
            )
        }
    };
    //新增商品
    saveDish = () => {
        if (this.state.dishName.replace(/^\s+|\s+$/g, '') === '') {
            alert('商品名称不能为空！')
        } else if (this.state.dishPrice.replace(/^\s+|\s+$/g, '') === '') {
            alert('商品价格不能为空！')
        } else if (/[^0-9.]/g.test(this.state.dishPrice)) {
            alert('商品价格必须为数字！')
        } else if (this.state.dishShop.replace(/^\s+|\s+$/g, '') === '') {
            alert('所属店铺不能为空！')
        } else {
            fetch('api/addDish', {
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: 'dishName=' + this.state.dishName + '&price=' + this.state.dishPrice + '&shopName=' + this.state.dishShop + '&description=' + this.state.dishDetail + '&img=' + this.state.dishImg
            }).then(res => res.json().then(result => {
                    if (result.status === 0) {
                        alert(result.data);
                    } else if (result.status === 1) {
                        alert('新增商品成功！');
                    }
                    this.setState({
                        showAddFood: false,
                        dishName: '',
                        dishPrice: '',
                        dishShop: '',
                        dishDetail: '',
                        dishImg: '',
                    })
                })
            )
        }
    };

    //退出登录
    exit = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('password');
        this.setState({
            logined: false
        });
        window.location.href = '/mine';
    };

    render() {
        // console.log(this.props.children)
        const {shopList, showShop, orderList, showOrder, showAdd, showAddFood, logined} = this.state;
        return (
            <div>
                {/*<h3 className={'headerTop'}>管理员界面</h3>*/}
                <img src={'../../bannerAdmin.png'} style={{width: '100%', height: 'auto', marginBottom: '0.15rem'}}
                     alt={'banner'}/>
                <div className='order admin'>
                    <p onClick={this.manageShop}>管理店铺<span className={showShop ? 'angleBottom' : 'angleRight'}> </span>
                    </p>
                    {showShop && <ul>
                        {shopList.map(v => this.showShopList(v))}
                    </ul>}
                    {/*<p>管理菜品</p>*/}
                    <p onClick={this.manageOrder}>查看订单<span
                        className={showOrder ? 'angleBottom' : 'angleRight'}> </span></p>
                    {showOrder && <ul>
                        {orderList.map(v => this.showOrderList(v))}
                    </ul>}
                    <p onClick={this.addShop}>添加店铺<span className={showAdd ? 'angleBottom' : 'angleRight'}> </span></p>
                    {showAdd && <div className={'addShop'}>
                        <p>店铺名称：<input type={'text'} onBlur={e => this.setState({shopName: e.target.value})}/>（必填）</p>
                        <p>店铺描述：<input type={'text'} onBlur={e => this.setState({shopDetail: e.target.value})}/>（选填）</p>
                        <p>图片链接：<input type={'text'} onBlur={e => this.setState({shopImg: e.target.value})}/>（选填）</p>
                        <button onClick={this.saveShop}>保存店铺</button>
                    </div>}
                    <p onClick={this.addFood}>添加商品<span className={showAddFood ? 'angleBottom' : 'angleRight'}> </span>
                    </p>
                    {showAddFood && <div className={'addShop'}>
                        <p>商品名称：<input type={'text'} onBlur={e => this.setState({dishName: e.target.value})}/>（必填）</p>
                        <p>商品价格：<input type={'text'} onBlur={e => this.setState({dishPrice: e.target.value})}/>（必填）</p>
                        <p>所属店铺：<input type={'text'} onBlur={e => this.setState({dishShop: e.target.value})}/>（必填）</p>
                        <p>商品描述：<input type={'text'} onBlur={e => this.setState({dishDetail: e.target.value})}/>（选填）</p>
                        <p>图片链接：<input type={'text'} onBlur={e => this.setState({dishImg: e.target.value})}/>（选填）</p>
                        <button onClick={this.saveDish}>保存商品</button>
                    </div>}

                </div>
                {logined && <p className={'exit'} onClick={this.exit}>退出登录</p>}
            </div>

        )
    }
}

//定义默认属性


export default AdminScreen
