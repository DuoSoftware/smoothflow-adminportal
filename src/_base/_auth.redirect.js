import React from 'react';

const RedirectOutside = (props) => {
    const _redirect = props._rollback_point.replace('/', '_');
    return window.location.replace(props.url + '?r=' + _redirect);
};

export default RedirectOutside;