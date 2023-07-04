import React, { memo, useEffect, useRef, useState } from 'react';
import showMessage from 'react-hot-toast';
import PropTypes from 'prop-types';
import * as pdfjsLib from 'pdfjs-dist';

import useWindowSize from 'hooks/useWindowSize';

import { getAuthHeader } from 'utils/api';
import { getDocumentScale, getPagesMaxWidth } from 'utils/FormPreview.utils';

import PdfCard from '../PdfCard';

import { DivPage, DivRoot } from './DocumentView.styled';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const DocumentView = ({ renderSigningFields, pdfUrl, getToken, setIsLoading }) => {
  const containerRef = useRef();

  const isWindowResized = useWindowSize();

  const [{ scale, pdf, pagesMaxWidth }, setPdf] = useState({
    pdf: null,
    scale: null,
    pagesMaxWidth: null,
  });

  const numPages = pdf?.numPages || 0;

  useEffect(() => {
    setIsLoading(true);

    const getPDF = async () => {
      try {
        const PDFDocumentLoadingTask = pdfjsLib.getDocument({
          url: pdfUrl,
          httpHeaders: {
            authorization: getAuthHeader({ getToken }),
          },
        });

        const pdf = await PDFDocumentLoadingTask.promise;

        const pagesMaxWidth = await getPagesMaxWidth(pdf);

        setPdf(prev => ({ ...prev, pdf, pagesMaxWidth }));
      } catch {
        showMessage.error('Could not get PDF');
      } finally {
        setIsLoading(false);
      }
    };

    getPDF();
  }, [pdfUrl, getToken, setIsLoading]);

  useEffect(() => {
    setPdf(prev => ({ ...prev, scale: getDocumentScale({ pagesMaxWidth, containerRef }) }));
  }, [isWindowResized, pagesMaxWidth]);

  return (
    <DivRoot ref={containerRef}>
      {Array.from({ length: numPages }).map((__, index) => {
        const pageNumber = index + 1;

        return (
          <DivPage key={index}>
            <PdfCard pageNumber={pageNumber} pdf={pdf} scale={scale} />

            {renderSigningFields({ pageNumber, scale })}
          </DivPage>
        );
      })}
    </DivRoot>
  );
};

DocumentView.propTypes = {
  setIsLoading: PropTypes.func.isRequired,
  renderSigningFields: PropTypes.func.isRequired,
  pdfUrl: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
};

export default memo(DocumentView);
