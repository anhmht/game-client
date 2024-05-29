import NextLink from 'next/link'
import React, { FC } from 'react'
import { ClassNames } from '../../modules'
import { usePathname } from 'next/navigation'

export interface ILinkProps {
    href: string,
    path?: string,
    className?: any,
    exact?: boolean,
    children?: any
}

export const Link: FC<ILinkProps> = ({ children, href, path, className, exact }) => {
    const pathname = usePathname()

    return (
        <NextLink href={href} as={path} passHref>
            <span className={ClassNames({ active: exact ? pathname === href : pathname?.search(href) !== -1, ...className })}>
                {children}
            </span>
        </NextLink>
    )
}