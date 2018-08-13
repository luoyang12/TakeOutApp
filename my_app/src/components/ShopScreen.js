import React from 'react';
// import RootComponent from "./RootComponent";
import '../styles/_root.css';
import {Link} from 'react-router-dom';

class ShopScreen extends React.Component {
    constructor(props, context) {
        super(props, context)

        this.state = {
            shopDetail: [],
            totalPrice: 0,
            num: 0,//总件数
            selectDish: [],
            logined: localStorage.getItem('name') !== null,
        }
    }

    componentDidMount() {
        fetch('api/shopDetail', {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: 'shopId=' + this.props.match.params.number
        }).then(res => res.json().then(data => {
            // window.location.href='/';
            this.setState({shopDetail: data.data})
        }))
    }

    showDishes(dish) {
        return (
            <section key={dish.dishId}>
                <img src={dish.img} alt={dish.dishName}/>
                <div>
                    <h3>{dish.dishName}</h3>
                    <p>{dish.description}</p>
                    <nav>
                        <span>￥{dish.price}</span>
                        <i>{dish.tips}</i>
                        <b onClick={this.addCart.bind(this, dish.price, dish)}>+</b>
                    </nav>
                </div>
            </section>
        )
    }

    addCart(price, dish) {
        let totalPrice = this.state.totalPrice + price;
        let num = this.state.num + 1;
        let selectDish = Object.assign({}, dish, {num: 1});
        this.state.selectDish.find(v => v.dishId === dish.dishId) ? this.state.selectDish.find(v => v.dishId === dish.dishId).num++ : this.state.selectDish.push(selectDish);
        this.setState({totalPrice, num});
    }

    render() {
        return (
            <div>
                <h3 className={'headerTop'}>
                    <img src={'../../back.png'} alt={'返回'} onClick={() => {
                        window.history.go(-1)
                    }} style={{
                        position: 'absolute',
                        width: '0.3rem',
                        height: '0.3rem',
                        left: '0.05rem',
                        top: '0.05rem'
                    }}/>
                    菜品列表
                </h3>
                <div className='order dishes'>
                    {this.state.shopDetail && this.state.shopDetail.map(v => this.showDishes(v))}
                </div>
                {this.state.selectDish.length !== 0 &&
                <footer>
                    <img src={'../../icn_eated.png'} alt={'总价'} style={{width: '0.4rem', height: '0.4rem'}}/>
                    <i>{this.state.num}</i>
                    <span>共{this.state.totalPrice}元</span>
                    {this.state.logined ? <Link to={{
                            pathname: '/confirm',
                            state: {select: this.state.selectDish, total: this.state.totalPrice}
                        }}>去下单</Link> :
                        <Link to={{pathname: '/mine'}}>去登录</Link>
                    }
                </footer>}
            </div>

        )
    }
}

//定义默认属性


export default ShopScreen
