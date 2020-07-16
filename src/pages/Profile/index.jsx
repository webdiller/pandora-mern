import React, { Component } from 'react';
import { Aside, TopNavigation } from '../../components';
import './Profile.sass';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeModal: false,
      activePersonalArea: true,
      activeOrders: false,
      confirmOrder: false,
    }
  }

  // Навигация по сделкам
  authorShowCustomerOrders = (e) => {
    e.preventDefault();
    this.setState({ activePersonalArea: false });
    this.setState({ activeOrders: true });
  }

  // Активные сделки
  authorShowExecuterOrders() {
    console.log(this);
  }

  // Подтверждение выполненной сделки
  authorFinishOrder = (e) => {
    e.preventDefault();
    this.setState({ activeOrders: false });
    this.setState({ confirmOrder: true });
  }

  // Вызов модального окна, подтверждающего сделку
  confirmOrderModal = (e) => {
    e.preventDefault();
    this.setState({ activeModal: !this.state.activeModal });
  }

  // Закрытие модального окна, подтверждающего сделку
  confirmOrderModalClose = (e) => {
    e.preventDefault();
    this.setState({ activeModal: false })
  }

  render() {
    return (
      <React.Fragment>
        <div className="profile">
          <div className="profile__container">
            <Aside />
            <div className="profile__content">
              <TopNavigation />

              {/* Навигация по сделкам */}
              <div className={this.state.activePersonalArea ? 'profile__status' : 'profile__status disabled'}>

                <div className="profile__status-item">
                  <p className="profile__status-title">Личные сообщения:</p>
                  <div className="profile__status-info">
                    <div className="profile__status-row">
                      <span className="profile__status-name">Новых</span>
                      <span className="profile__status-value">5</span>
                    </div>
                    <div className="profile__status-row">
                      <span className="profile__status-name">Всего</span>
                      <span className="profile__status-value">41</span>
                    </div>
                  </div>
                </div>

                <div className="profile__status-item">
                  <p className="profile__status-title">Сделки ожидающие завершения:</p>
                  <div className="profile__status-info">
                    <button onClick={this.authorShowCustomerOrders} className="profile__status-row">
                      <span className="profile__status-name">Вы исполнитель</span>
                      <span className="profile__status-value">1</span>
                    </button>
                    <button onClick={this.authorShowExecuterOrders} className="profile__status-row">
                      <span className="profile__status-name">Вы заказчик</span>
                      <span className="profile__status-value">2</span>
                    </button>
                  </div>
                </div>

                <div className="profile__status-item">
                  <p className="profile__status-title">Ваш депозит:</p>
                  <div className="profile__status-info">
                    <p className="profile__status-deposit">120000 руб</p>
                  </div>
                </div>

                <div className="profile__status-item">
                  <p className="profile__status-title">Ваш последний вход:</p>
                  <div className="profile__status-info">
                    <p className="profile__status-date">17 марта 2021 года</p>
                  </div>
                </div>

              </div>

              {/* Активные сделки */}
              <div className={this.state.activeOrders ? 'active-orders profile__active-orders' : 'active-orders profile__active-orders disabled'}>
                <div className="active-orders__wrapper">
                  <p className="active-orders__title">Активные сделки</p>

                  <ul className="active-orders__list">

                    {/* {OrdersItems.map((item, index) => {
                      return <li key={index} className="active-orders__item">
                        <p className="active-orders__author">Вы</p>
                        <div className="active-orders__type">
                          <i className={JSON.parse(item.is_own) ? 'active-orders__type-icon fa fa-arrow-left' : 'active-orders__type-icon fa fa-arrow-right'} aria-hidden="true"></i>
                          <p className="active-orders__type-code">Сделка № {item.id}</p>
                        </div>
                        <Link to="/profile" className="active-orders__user">{item.partner_name}</Link>
                        <div className="active-orders__status">
                          <p className="active-orders__status-price">{item.order_price} руб</p>
                          <button onClick={this.authorFinishOrder} className="active-orders__status-apply site-btn site-btn_red site-btn_s2">Завершить</button>
                        </div>
                      </li>
                    })} */}

                  </ul>

                </div>
              </div>

              <div className="profile__username">
                <p className="profile__username-title">Имя пользователя</p>
                <div className="profile__username-group">
                  <input readOnly defaultValue="user4040" type="text" className="profile__username-input" />
                  <span className="profile__username-description">видно всем</span>
                </div>
              </div>


            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}