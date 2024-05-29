import React, { FC, useState, useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'

import { IInputProps, ClassNames, CreateAlert, EAlertType } from '../../../modules'
import { Icon } from '../../icon'
import { translate } from '../../../languages';

const maxFileSizeUpload = 5;

export const InputImage: FC<IInputProps> = (props) => {
    const [data, setData] = useState(props.defaultValue) as any

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const inputFile = acceptedFiles[0];

        if (acceptedFiles.find(file => file.size > maxFileSizeUpload * 1024 * 1024)) return CreateAlert({
            type: EAlertType.ERROR,
            message: translate('File exceeds the allowed size of {limit}', { limit: `${maxFileSizeUpload} MB` })
        });

        if (inputFile) {
            const inputData = {
                file: inputFile,
                src: URL.createObjectURL(inputFile)
            }
            setData(inputData)
            props.onChange(inputData)
        }

    }, [])

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        // rootRef, // Ref to the `<div>`
        // inputRef // Ref to the `<input>`
    }:any = useDropzone({
        multiple: false,
        onDrop,
        accept: ['image/jpeg', 'image/png', 'image/svg+xml'],
    } as any);

    const isHasImage = !!data

    return (
        <div
            {...getRootProps()}
            className={ClassNames({
                InputImage: true,
                hasImage: !!isHasImage,
                isDragActive
            })}
        >
            {isHasImage ? <img src={data.src} alt="" /> : null}

            {!props.isDisabled ? <Fragment>
                <div className="mesage">
                    <Icon.Image />
                    {isDragActive ? 'Drop the files here ' : 'Drop the files here, or click to select files'}
                </div>
                <input {...getInputProps()} />
            </Fragment> : null}
        </div>
    )
}