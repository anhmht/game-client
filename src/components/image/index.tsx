import React, { FC, CSSProperties, useState, useEffect } from 'react'

import { ClassNames } from '../../modules';
import { Icon } from '../icon';

type Props = {
    src: string,
    alt?: string,
    className?: string,
    onClick?: (props: Props) => void,
    onError?: Function,
    style?: CSSProperties,
    errorStyle?: CSSProperties,
    type?: 'normal' | 'avatar',
}

export const Image: FC<Props> = (props) => {
    const { src, alt = '', className = '', onClick = () => false, onError = () => false, style = {}, errorStyle, type = 'normal' } = props;
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (type === 'avatar' && !props.src) setIsError(false);
        else setIsError(!!!props.src);
        setIsLoaded(false);
    }, [props.src])

    let ImgClasses = ClassNames({
        "Image": true,
        isLoading: !isLoaded,
        isLoaded,
        isError,
        // @ts-ignore
        [type]: true,
    });

    if (className) ImgClasses += ` ${className}`;

    if (isError) return <div className={`Image error ${type} ${className}`} style={errorStyle} onClick={() => onClick ? onClick(props) : null}>
        <span className="icon"><Icon.Info /></span>
    </div>

    return (
        <img
            src={src || (type === 'avatar' ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2ut8RN6uAMrUi44a3i2HEMpDSU3ZXeoW-ObyKwavIZOEBtIMuoQ&s' : '')}
            className={ImgClasses}
            alt={alt}
            style={style}
            onLoad={() => setIsLoaded(true)}
            onError={e => {
                e.preventDefault();
                onError ? onError() : null;
                setIsError(true);
            }}
            onClick={() => onClick ? onClick(props) : null}
        />
    )
}