import React, { useState } from 'react';
import { Modal } from 'antd';
import { RegisterForm } from "../../modules";

export default function ModalRegistration({activeRegistration}) {

    const [open, setOpen] = useState(activeRegistration);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = e => {
        console.log(e);
        setOpen(false);
    };

    const handleCancel = e => {
        console.log(e);
        setOpen(false);
    };

    return (
        <Modal
            title="Регистрация"
            visible={open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {/* Авторизация */}
            <RegisterForm />

        </Modal>
    );
}
