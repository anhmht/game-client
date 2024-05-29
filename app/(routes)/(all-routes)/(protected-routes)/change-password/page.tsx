"use client";

import { translate } from '@/src/languages';
import React from 'react';
import ChangePasswordForm from './components/change-password';

const page = () => {
    return (
        <div className="change-password-page">
            <div className="change-password__header">{translate('Change Password')}</div>
            <div className="change-password__body">
                <div className="row">
                    <div className="col-xl-6 col-md-9 col-12">
                        <ChangePasswordForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;