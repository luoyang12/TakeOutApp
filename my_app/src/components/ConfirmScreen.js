/**
 * Created By Luo Yang On 2018/4/2
 *
 * 确认支付
 *
 */
import React from 'react';
import '../styles/_root.css';

// import {Link} from 'react-router-dom';
class ConfirmScreen extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            address: '',
            phoneNumber: '',
        }
    }

    //展示订单信息
    showSelectDish = (dish) => {
        return (
            <section key={dish.dishId}>
                <img src={dish.img} alt={dish.dishName}/>
                <div className={'confirm-right'}>
                    <div>
                        <h3>{dish.dishName}</h3>
                        <p>{dish.description}</p>
                        <nav>
                            <i>x&nbsp;{dish.num}</i>
                        </nav>
                    </div>
                    <span>￥{dish.price}</span>
                </div>

            </section>
        )
    };

    /**
     * 去支付
     * 为了解决parseInt抛警告：Missing radix parameter radix  尽量给parseInt加上第二个参数
     * 解决方案参考：https://blog.csdn.net/skeletonx/article/details/7787169
     */
    pay = () => {
        const {total, select} = this.props.location.state;
        const shopName = select[0].shopName;
        let model = {total: Number(total), number: Date.parse(new Date()) + String(parseInt(total, 10))};
        console.log(model);
        const userName = localStorage.getItem('name');
        const {address, phoneNumber} = this.state;
        if (address.replace(/^\s+|\s+$/g, '') === '') {
            alert('送餐地址不能为空！')
        } else if (phoneNumber.replace(/^\s+|\s+$/g, '') === '') {
            alert('联系电话不能为空！')
        } else {
            fetch('api/orderPay', {
                method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
                body: 'number=' + model.number + '&total=' + model.total + '&shopName=' + shopName + '&userName=' + userName + '&address=' + address + '&phoneNumber=' + phoneNumber
            }).then(() => {
                alert('支付成功');
                window.location.href = '/order';
            })
        }
    };

    render() {
        // console.log(this.props);
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
                    确认订单
                </h3>
                <div className='order confirm dishes'>
                    <div>
                        <div className={'address-edit'}>
                            <span className={'order-info'}>送餐地址:</span>
                            <textarea className={'order-address'}
                                      onBlur={(e) => this.setState({address: e.target.value})}/>
                            <img src={'../../icn_edit_normal.png'} alt={'编辑'}/>
                        </div>
                        <div className={'address-edit'}>
                            <span className={'order-info'}>联系电话:</span>
                            <input className={'order-phone'}
                                   onBlur={(e) => this.setState({phoneNumber: e.target.value})}/>
                            <img src={'../../icn_edit_normal.png'} alt={'编辑'}/>
                        </div>
                        <p className={'confirm_info'}>订单信息</p>
                        {this.props.location.state.select.map(v => this.showSelectDish(v))}
                        {/*<p className={'order-info'}>支付方式</p>*/}
                        {/*<p className={'pay'}><img src={'../../weixin.png'} alt={'微信'}/>微信支付</p>*/}
                        {/*<p className={'pay'}><img src={'../../zfb.png'} alt={'支付宝'}/>支付宝支付</p>*/}
                    </div>
                </div>
                <footer>
                    <span>合计￥{this.props.location.state.total}</span>
                    <a onClick={this.pay}>去支付</a>
                </footer>
            </div>

        )
    }
}

//定义默认属性


export default ConfirmScreen
