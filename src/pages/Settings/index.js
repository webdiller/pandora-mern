import React from 'react';
import { Aside, TopNavigation } from '../../components';
import './Settings.sass';

const Settings = () => {

    return (
        <div className="settings">
            <div className="settings__container">
                <Aside />
                <div className="settings__content">
                    <TopNavigation />
                    <div className="settings__body">
                        Контент
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Settings;