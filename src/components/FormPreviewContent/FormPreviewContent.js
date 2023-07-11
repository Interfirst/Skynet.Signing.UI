import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import showMessage, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { downloadFileFromBlob } from '@interfirst/utils';
import { get, isEmpty, last, size } from 'lodash';

import { toastContainerStyle } from 'constants/FormPreview.constants';

// import { defaultProps, previewData } from 'constants/FormPreview.stubData';
import Button from 'shared/Button';

import BrandSettingsContext from 'contexts/brandSettings';

import { axiosAccountsInstance } from 'utils/accountsApi';
import { catchHandler, checkIsAppLoadedInIframe, getAuthHeader } from 'utils/api';
import { getInitialFormValues, getSignatureSubmitData, validateFormFields } from 'utils/data';
import { axiosSigningInstance } from 'utils/signingApi';

import DocumentView from '../DocumentView';
import SigningFields from '../SigningFields';

import { Badge, DivBottom, DivRoot, DivTop, ProgressBar } from './FormPreviewContent.styled';
import PreSignPanel from './PreSignPanel';

const FormPreviewContent = ({ signingRequestId, getToken, getDomainName }) => {
  const [data, setData] = useState({});
  const [viewer, setViewer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [isSigningFinished, setIsSigningFinished] = useState(false);

  const [form, setForm] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [focusedRequiredField, setFocusedRequiredField] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);

  const isEmptyData = isEmpty(data);

  const brandSettings = useMemo(() => {
    const data = get(companyInfo, '[0].brandSettings', null);
    return JSON.parse(data);
  }, [companyInfo]);

  const elements = useMemo(
    () => data.signatures?.find(({ id }) => id.signer.name === viewer?.value)?.tags || [],
    [data.signatures, viewer],
  );

  const validationErrorsNumber = size(validationErrors);
  const isValidationErrorsExist = validationErrorsNumber > 0;

  useEffect(() => {
    setIsLoading(true);

    [axiosSigningInstance, axiosAccountsInstance].forEach(axiosInstance => {
      axiosInstance.defaults.headers.common['Authorization'] = getAuthHeader({ getToken });
      axiosInstance.defaults.headers.common['sourceMode'] = checkIsAppLoadedInIframe()
        ? 'Iframe'
        : 'Browser';
    });

    Promise.all([
      axiosSigningInstance
        .get(`/api/SigningRequests/${signingRequestId}`)
        .then(({ data }) => setData(data)),

      axiosAccountsInstance
        .get('/api/companies', {
          params: { domainName: getDomainName(), include: 'brandsettings' },
        })
        .then(({ data }) => setCompanyInfo(data)),
    ])
      .catch(catchHandler)
      .finally(() => {
        setIsLoading(false);
        setIsDataLoaded(true);
      });
  }, [setIsLoading, signingRequestId, getToken, getDomainName]);

  const onDownloadDocument = useCallback(() => {
    const fileName = data.files.combinedPdfFile.name;

    setIsLoading(true);

    axiosSigningInstance
      .get(`/api/SigningRequests/${signingRequestId}/files/${fileName}`, {
        responseType: 'blob',
      })
      .then(({ data }) => downloadFileFromBlob(data, fileName))
      .catch(catchHandler)
      .finally(() => setIsLoading(false));
  }, [data.files, signingRequestId]);

  useEffect(() => {
    if (!isEmpty(data)) {
      const validationErrors = validateFormFields({ elements, form });
      setValidationErrors(validationErrors);
    }
  }, [data, elements, form]);

  useEffect(() => {
    if (!isEmpty(data)) {
      const initialFormValues = getInitialFormValues(elements);
      setForm(initialFormValues);
    }
  }, [data, elements]);

  const onGoToNextReqField = useCallback(() => {
    const validationErrorKeys = Object.keys(validationErrors);

    setFocusedRequiredField(prev => {
      const currentFieldIndex = validationErrorKeys.findIndex(key => key === prev);
      const isLastElem = prev === last(validationErrorKeys);

      if (!prev || isLastElem) {
        return validationErrorKeys[0];
      }

      return validationErrorKeys[currentFieldIndex + 1];
    });
  }, [validationErrors]);

  const onSubmit = useCallback(
    e => {
      setIsLoading(true);

      axiosSigningInstance
        .put(`/api/SigningRequests/${signingRequestId}/signaturerequests/${viewer.value}/status`, {
          signatures: getSignatureSubmitData({ elements, form }),
          type: e.currentTarget.dataset.type,
        })
        .then(() => {
          showMessage.success('Thanks for submitting your document!');
          setIsSigningFinished(true);
        })
        .catch(catchHandler)
        .finally(() => setIsLoading(false));
    },
    [signingRequestId, viewer, form, elements],
  );

  const renderSigningFields = useCallback(
    ({ pageNumber, scale }) => (
      <SigningFields
        data={elements}
        focusedRequiredField={focusedRequiredField}
        form={form}
        isLoading={isLoading}
        pageNumber={pageNumber}
        scale={scale}
        setForm={setForm}
        validationErrors={validationErrors}
      />
    ),
    [focusedRequiredField, form, validationErrors, elements, isLoading],
  );

  return (
    <BrandSettingsContext.Provider value={brandSettings}>
      <DivRoot>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Caveat&family=Dancing+Script&family=Mrs+Saint+Delafield&family=Overpass:ital,wght@0,300;0,400;0,700;0,800;1,300&display=swap"
            rel="stylesheet"
          />
        </Helmet>

        {!isDataLoaded && <ProgressBar>Loading...</ProgressBar>}

        {!isSigningFinished && isDataLoaded && (
          <>
            <DivTop>
              <PreSignPanel
                isLoading={isLoading}
                isValidationErrorsExist={isValidationErrorsExist}
                setForm={setForm}
                setViewer={setViewer}
                signatures={data?.signatures}
                viewer={viewer}
                onSubmit={onSubmit}
              />

              <div>
                <div>
                  <Badge $brandSettings={brandSettings} num={validationErrorsNumber}>
                    Req* fields left
                  </Badge>

                  <Button
                    color="primary"
                    disabled={isEmptyData || isLoading}
                    variant="text"
                    onClick={onDownloadDocument}
                  >
                    Download
                  </Button>
                </div>

                <Button
                  disabled={!isValidationErrorsExist || isEmptyData || isLoading}
                  variant="contained"
                  onClick={onGoToNextReqField}
                >
                  {'Next Req >'}
                </Button>
              </div>
            </DivTop>

            {isLoading && <ProgressBar>Loading...</ProgressBar>}

            {!isEmptyData && (
              <DivBottom>
                <DocumentView
                  getToken={getToken}
                  pdfUrl={data.files?.combinedPdfFile?.location}
                  renderSigningFields={renderSigningFields}
                  setIsLoading={setIsLoading}
                />
              </DivBottom>
            )}
          </>
        )}

        <Toaster containerStyle={toastContainerStyle} />
      </DivRoot>
    </BrandSettingsContext.Provider>
  );
};

FormPreviewContent.propTypes = {
  getDomainName: PropTypes.func.isRequired,
  signingRequestId: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
};

// <--- For dev purposes --->

// FormPreviewContent.defaultProps = defaultProps;

export default memo(FormPreviewContent);
