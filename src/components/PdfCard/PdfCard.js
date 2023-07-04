import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import usePrevious from 'hooks/usePrevious';

const PdfCard = ({ pageNumber, scale, pdf }) => {
  const [canvas, setCanvas] = useState(null);
  const [isRenderTaskInProgress, setIsRenderTaskInProgress] = useState(false);

  const prevIsRenderTaskInProgress = usePrevious(isRenderTaskInProgress);

  useEffect(() => {
    const isNotAllowedToComplete =
      isRenderTaskInProgress || prevIsRenderTaskInProgress !== isRenderTaskInProgress;

    if (isNotAllowedToComplete) {
      return;
    }

    (async () => {
      if (canvas && pdf) {
        try {
          const page = await pdf.getPage(pageNumber);
          const viewport = page.getViewport({ scale });

          const context = canvas.getContext('2d', { willReadFrequently: true, alpha: false });

          canvas.width = viewport.width;
          canvas.height = viewport.height;

          setIsRenderTaskInProgress(true);

          await page.render({ canvasContext: context, viewport }).promise;
        } catch (err) {
          Error(err);
        } finally {
          setIsRenderTaskInProgress(false);
        }
      }
    })();
  }, [canvas, scale, pdf, pageNumber, isRenderTaskInProgress, prevIsRenderTaskInProgress]);

  if (!pdf) {
    return null;
  }

  return <canvas ref={setCanvas} />;
};

PdfCard.propTypes = {
  pageNumber: PropTypes.number,
  scale: PropTypes.number,
  pdf: PropTypes.object,
};

PdfCard.defaultProps = {
  pageNumber: 1,
  scale: 1,
  pdf: null,
};

export default memo(PdfCard);
