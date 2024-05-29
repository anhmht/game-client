import React, { FC, useState } from 'react'

import { Button, ClassNames } from '../../modules'
import { Icon } from '../icon';

export interface IPromptConfig {
    head: any,
    message: any,
    onNext: (value: any) => Promise<any> | void,
    onClose?: (value: any) => Promise<any> | void,
}

export let openPrompt = (config: IPromptConfig): any => { return config }

const defaultConfig: IPromptConfig = {
    head: '',
    message: '',
    onNext: () => undefined,
    onClose: () => undefined,
}

export const Prompt: FC = () => {
    const [value, setValue] = useState('');
    const [state, setState] = useState({
        isVisible: false,
        error: '',
        ...defaultConfig,
    }) as any;

    openPrompt = (config: IPromptConfig) => setState({ isVisible: true, ...config });

    if (!state.isVisible) return null

    return (
        <div className="Prompt">
            <div className="box">
                <div className="head">
                    {state.head}
                </div>

                <div className="content">
                    {state.message}

                    <input className={ClassNames({ hasError: !!state.error })} type="text" onChange={e => setValue(e.target.value)} value={value} />

                    {state.error ? <div className="error">
                        <Icon.Info />
                        {state.error}
                    </div> : null}
                </div>

                <div className="ctas">
                    <Button
                        label="Close"
                        className="grey-outline"
                        buttonType="secondary"
                        onClick={() => setState({ isVisible: false, ...defaultConfig })}
                    />

                    <Button
                        label="Confirm"
                        onClick={async () => {
                            try {
                                await state.onNext(value)
                            } catch (error:any) {
                                setState((state: any) => ({ ...state, error: error.message }))
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}