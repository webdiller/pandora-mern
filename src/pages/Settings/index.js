import React, { useState } from 'react';
import { Aside, TopNavigation } from '../../components';
import Select from 'react-dropdown-select';
import './Settings.sass';

import bitcoin from '../../assets/img/bitcoin.png'
import qiwi from '../../assets/img/qiwi.png'
import visa from '../../assets/img/visa.png'
import yandex from '../../assets/img/yandex-money.png'

const Settings = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        location: '',
        garant: false,
        paymentVisa: false,
        paymentBitcoin: true,
        paymentQiwi: false,
        paymentYandex: true
    })

    const options_location = [
        { value: 'Хакасия', label: 'Хакасия', },
        { value: 'Приволжский', label: 'Приволжский', },
        { value: 'Ардатов', label: 'Ардатов', },
        { value: 'Москва', label: 'Москва', },
        { value: 'Санкт-Петербург', label: 'Санкт-Петербург', },
        { value: 'Армавир', label: 'Армавир', },
        { value: 'Владивосток', label: 'Владивосток', },
        { value: 'Артёмовск', label: 'Артёмовск', },
    ];

    const onChange = e => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="settings">
            <div className="settings__container">
                <Aside />
                <div className="settings__content">
                    <TopNavigation />
                    <div className="settings__body">

                        <div className="settings__title">Профиль</div>
                        <form className="settings__form">

                            <div className="settings__form-group">
                                <label className="settings__form-label">Имя пользователя</label>
                                <div className="settings__form-control">
                                    <input onChange={e => { onChange(e) }} name="name" type="text" className="settings__form-input" />
                                    <span className="settings__form-help">Видимо всем</span>
                                </div>
                            </div>

                            <div className="settings__form-group">
                                <label className="settings__form-label">Электронная почта</label>
                                <div className="settings__form-control">
                                    <input onChange={e => { onChange(e) }} autoComplete="email" name="email" type="email" className="settings__form-input" />
                                    <button type="button" className="settings__form-btn-hide icon-eye-off"></button>
                                </div>
                            </div>

                            <div className="settings__form-group">
                                <label className="settings__form-label">Регион / Город</label>
                                <div className="settings__form-control settings__form-control_select">
                                    <Select
                                        options={options_location}
                                        name="location"
                                        values={[]}
                                        placeholder="Регион"
                                        value
                                        onChange={(value) => {
                                            setFormData({
                                                ...formData,
                                                location: value[0].value
                                            })
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="settings__form-group">
                                <label className="settings__form-label settings__form-label_guarantor">Работа через гарант сервис</label>
                                <div className="settings__form-control settings__form-control_guarantor">
                                    <input
                                        name="garant"
                                        onChange={e => { setFormData({ ...formData, garant: !formData.garant }) }}
                                        checked={formData.garant}
                                        className="settings__form-custom-input"
                                        type="checkbox"
                                        id="garant" />
                                    <label className="settings__form-custom-label" htmlFor="garant"></label>
                                </div>
                            </div>

                            <div className="settings__form-group">
                                <label className="settings__form-label">Принимаемые формы оплаты</label>
                                <div className="settings__form-control settings__form-control_payment">

                                    <input
                                        name="paymentVisa"
                                        onChange={e => { setFormData({ ...formData, paymentVisa: !formData.paymentVisa }) }}
                                        checked={formData.paymentVisa}
                                        className="settings__form-custom-input settings__form-custom-input_payment"
                                        type="checkbox"
                                        id="paymentVisa" />
                                    <label className="settings__form-custom-label settings__form-custom-label_payment"
                                        htmlFor="paymentVisa">
                                        <img src={visa} alt="" />
                                    </label>

                                    <input
                                        name="paymentBitcoin"
                                        onChange={e => { setFormData({ ...formData, paymentBitcoin: !formData.paymentBitcoin }) }}
                                        checked={formData.paymentBitcoin}
                                        className="settings__form-custom-input settings__form-custom-input_paymen"
                                        type="checkbox"
                                        id="paymentBitcoin" />
                                    <label className="settings__form-custom-label settings__form-custom-label_payment"
                                        htmlFor="paymentBitcoin">
                                        <img src={bitcoin} alt="" />
                                    </label>

                                    <input
                                        name="paymentQiwi"
                                        onChange={e => { setFormData({ ...formData, paymentQiwi: !formData.paymentQiwi }) }}
                                        checked={formData.paymentQiwi}
                                        className="settings__form-custom-input settings__form-custom-input_paymen"
                                        type="checkbox"
                                        id="paymentQiwi" />
                                    <label className="settings__form-custom-label settings__form-custom-label_payment"
                                        htmlFor="paymentQiwi">
                                        <img src={qiwi} alt="" />
                                    </label>

                                    <input
                                        name="paymentYandex"
                                        onChange={e => { setFormData({ ...formData, paymentYandex: !formData.paymentYandex }) }}
                                        checked={formData.paymentYandex}
                                        className="settings__form-custom-input settings__form-custom-input_payment"
                                        type="checkbox"
                                        id="paymentYandex" />
                                    <label className="settings__form-custom-label settings__form-custom-label_payment"
                                        htmlFor="paymentYandex">
                                        <img src={yandex} alt="" />
                                    </label>
                                </div>
                            </div>

                            <div className="settings__btn-submit-wrapper text-center">
                                <button type="submit" className="settings__btn-submit site-btn site-btn_red site-btn_s3">Сохранить</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Settings;