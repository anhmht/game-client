import React, { FC } from 'react';
import { Icon } from '../icon';
import {animateScroll as scroll} from 'react-scroll';

export const BackToTopCompnt:FC<{className: string}> = (props) => { 
    return <>
        <div className={(props.className) ? "back-to-top-compnt "+props.className : "back-to-top-compnt"} onClick={()=>scroll.scrollToTop()}>
            <div className="icon icon-arrow-top">
                <Icon.IconBackToTop />
            </div>
        </div>
    </>
};
