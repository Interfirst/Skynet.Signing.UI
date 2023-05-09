export const convertTextToImage = (text, { fontFamily }) => {
  const cvs = document.createElement('canvas');
  const ctx = cvs.getContext('2d');

  const height = 40;
  const fontHeight = 0.75 * height;

  // this context is used only for text width calculation
  const cloneCtx = cvs.getContext('2d');

  const applyStyles = ctx => {
    ctx.font = `italic ${fontHeight}px ${fontFamily}`;
  };

  applyStyles(cloneCtx);

  const textWidth = cloneCtx.measureText(text).width;
  const margin = 10;

  cvs.height = height;
  cvs.width = textWidth + 2 * margin;

  applyStyles(ctx);

  ctx.fillText(text, margin, fontHeight);

  return cvs.toDataURL();
};

export const getPagesMaxWidth = async pdf => {
  const pagesWidth = await Promise.all(
    Array.from({ length: pdf.numPages }).map((__, index) =>
      pdf.getPage(index + 1).then(pdfData => {
        const width = pdfData.view[2];
        return width;
      }),
    ),
  );

  const pagesMaxWidth = Math.max(...pagesWidth);

  return pagesMaxWidth;
};

export const getDocumentScale = ({ pagesMaxWidth, containerRef }) => {
  const offsetWidth = containerRef.current?.clientWidth;

  if (!pagesMaxWidth || !offsetWidth) {
    return 1;
  }

  return offsetWidth / pagesMaxWidth;
};
