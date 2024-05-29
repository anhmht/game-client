import React, { FC } from 'react'

export const Panel: FC<{ className?: string, children?:any }> = ({ children, className }) => {

  return (
    <div className={`d-panel ${className || ''}`}>
      {children}
    </div>
  )
}