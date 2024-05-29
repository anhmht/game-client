"use client";

import { Icon } from "@/src/modules";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

export default function Sample(props:any) {
  const containerPDFRef = useRef<any>(null);
  const [numPages, setNumPages] = useState<any>(null);
  const [containerPDFWidth, setContainerPDFWidth] = useState<any>(0);
  const onDocumentLoadSuccess = ({ numPages }: any) => {
    setNumPages(numPages);
  };
  useEffect(() => {
    const container = containerPDFRef?.current;

    if (containerPDFRef?.current) {
      setContainerPDFWidth(container?.offsetWidth);
    }
  }, []);
  return (
    <div className="container">
      <div
        ref={containerPDFRef}
        className="white-paper"
      >
        <Document
          file={'/whitepaper.pdf'}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={Icon.Loading}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              width={containerPDFWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          ))}
        </Document>
      </div>
    </div>
  );
}
