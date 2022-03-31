import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { alertService, AlertType } from '@/_services';
import { useStateValue } from '@/_helpers';
import './Alert.css'

const propTypes = {
    id: PropTypes.string,
    fade: PropTypes.bool
};

const defaultProps = {
    id: 'default-alert',
    fade: true
};

function Alert({ id, fade }) {
    const [{ alerts }, dispatch] = useStateValue();

    useEffect(() => {
        const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);
    
        // remove 'keepAfterRouteChange' flag on the rest
        filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
        dispatch({
            type: "SELECT_KEEPS",
            alerts: filteredAlerts
        })

        // subscribe to new alert notifications
        const subscription = alertService.onAlert(id)
            .subscribe(alert => {
                if (!alert.message) {
                } else {
                    dispatch({
                        type: "UPDATE_ALERTS",
                        alert: alert
                    })


                    // auto close alert if required
                    if (alert.autoClose) {
                        setTimeout(() => removeAlert(alert), 5000);
                    }
                }
            });

        return () => {
            // unsubscribe & unlisten to avoid memory leaks
            subscription.unsubscribe();
            alertService.clear(id);
        };
    }, []);

    function removeAlert(alert) {
        dispatch({
            type: "REMOVE_ALERT",
            alert: alert
        })
    }

    function cssClasses(alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable'];
                
        const alertTypeClass = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }

    if (!alerts.length) return null;

    return (
        <div className="container Alert">
            <div className="m-3">
                {alerts.map((alert, index) =>
                    <div key={index} className={cssClasses(alert)}>
                        <div dangerouslySetInnerHTML={{__html: alert.message}}></div>
                        <a className="close ms-2" onClick={() => removeAlert(alert)}>&times;</a>
                    </div>
                )}
            </div>
        </div>
    );
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;
export { Alert };