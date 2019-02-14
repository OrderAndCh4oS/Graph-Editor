import React from 'react';
import moment from 'moment';

export const Title = ({tag = 'h1', className = '', children, ...rest}) => {
    const HeadingTag = `${tag}`;
    return (<HeadingTag
        className={'title ' + className} {...rest}>{children}</HeadingTag>);
};

export const Pretitle = ({className = '', children, ...rest}) =>
    <p className={'pretitle ' + className} {...rest}>{children}</p>;

export const IntroText = ({className = '', children, ...rest}) =>
    <p className={'intro-text ' + className} {...rest}>{children}</p>;

export const Text = ({className = '', children, ...rest}) =>
    <p className={'text ' + className} {...rest}>{children}</p>;

export const Date = ({className = '', date = '', format = 'dddd, MMMM Do YYYY, h:mm:ssa', ...rest}) => {
    const formattedDate = moment(date, 'YYYY-MM-DDTkk:mm:ss.SSSSSSZ')
        .format(format);
    return <span
        className={'text date' + className} {...rest}>{formattedDate}</span>;
};
