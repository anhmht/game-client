import React, { FC, useState, useCallback, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { ClassNames, CreateAlert, EAlertType, IInputProps } from "../../modules";
import { Icon } from "../icon";
import { translate } from "../../languages";
import { MainService } from "../../../src/services";
import Axios from "axios";
import { ETypeApplication } from "../../types";

const maxFileSizeUpload = 50;

export const InputImageSingle: FC<IInputProps> = (props) => {
  const [data, setData] = useState(props.defaultValue) as any;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const inputFile = acceptedFiles[0];

    if (acceptedFiles.find((file) => file.size > maxFileSizeUpload * 1024 * 1024))
      return CreateAlert({
        type: EAlertType.ERROR,
        message: translate("File exceeds the allowed size of {limit}", {
          limit: `${maxFileSizeUpload} MB`,
        }),
      });

    if (inputFile) {
      const formData = new FormData();
      formData.append("file", inputFile);
      Axios.post(`${process.env["NEXT_PUBLIC_URL_API_MAIN_STORAGE_SIDE"]}/upload/single`, formData, {
        timeout: 50000,
        headers: { channelid: "gam" },
      })
        .then(function (response) {
          const inputData = {
            file: inputFile,
            src: response.data.result.url,
          };
          setData(inputData);
          props.onChange(inputData);
          props.onChangeEvent ? props.onChangeEvent(inputData) : null;
        })
        .catch(function (response) {
          return CreateAlert({
            type: EAlertType.ERROR,
            message: response,
          });
        });
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  }: // rootRef, // Ref to the `<div>`
  // inputRef // Ref to the `<input>`
  any = useDropzone({
    multiple: false,
    onDrop,
    accept: props.customTypeAccept ? props.customTypeAccept : ["image/jpeg", "image/png", "image/svg+xml"],
  } as any);

  const isHasImage = !!data;
  let typeFile1 = data?.file?.name?.slice(-4)?.toLowerCase();
  let typeFile2 = data?.file?.name?.slice(-3)?.toLowerCase();
  let isImage = false;
  if (
    typeFile1 == ETypeApplication.PNG ||
    typeFile1 == ETypeApplication.JPEG ||
    typeFile1 == ETypeApplication.JPG ||
    typeFile2 == ETypeApplication.PNG ||
    typeFile2 == ETypeApplication.JPEG ||
    typeFile2 == ETypeApplication.JPG
  ) {
    isImage = true;
  }
  return (
    <div
      {...getRootProps()}
      className={ClassNames({
        InputImage: true,
        hasImage: !!isHasImage,
        hasFile: !isImage,
        isDragActive,
      })}
    >
      <div className="d-flex align-items-center">
        <svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.6" clipPath="url(#clip0_562_1909)">
            <path
              d="M14.5125 7.53C14.0025 4.9425 11.73 3 9 3C6.8325 3 4.95 4.23 4.0125 6.03C1.755 6.27 0 8.1825 0 10.5C0 12.9825 2.0175 15 4.5 15H14.25C16.32 15 18 13.32 18 11.25C18 9.27 16.4625 7.665 14.5125 7.53ZM10.5 9.75V12.75H7.5V9.75H5.25L8.7375 6.2625C8.8875 6.1125 9.12 6.1125 9.27 6.2625L12.75 9.75H10.5Z"
              fill="#090909"
            />
          </g>
          <defs>
            <clipPath id="clip0_562_1909">
              <rect width={18} height={18} fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span className="ml6">{translate("Choose photo")}</span>
      </div>
      {isImage && (isHasImage ? <img src={data.src} alt="" /> : null)}
      {data && <span>{data?.file?.name}</span>}
      {!props.isDisabled ? (
        <Fragment>
          {!isHasImage ? (
            <div className="mesage">
              <Icon.Image />
              {isDragActive ? "Drop the files here " : translate("Drop the files here, or click to select files")}
            </div>
          ) : null}
          <input {...getInputProps()} />
        </Fragment>
      ) : null}
    </div>
  );
};
