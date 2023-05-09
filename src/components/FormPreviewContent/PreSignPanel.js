import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PreviewAsAutocomplete from '../../components/PreviewAsAutocomplete';
import { SignStatus } from '../../constants/FormPreview.constants';
import BrandSettingsContext from '../../contexts/brandSettings';
import Button from '../../shared/Button';

const PreSignRow = styled.div({
  display: 'flex',
  alignItems: 'center',

  '@media (max-width: 560px)': {
    flexDirection: 'column',
  },
});

const ButtonGroup = styled.div({
  flexShrink: 0,

  '& button': {
    marginLeft: 10,
    flexShrink: 0,
  },

  '@media (max-width: 560px)': {
    marginTop: 10,
  },
});

const PreSignPanel = ({
  isValidationErrorsExist,
  viewer,
  isLoading,
  onSubmit,
  setForm,
  setViewer,
  signatures,
}) => {
  const [isPreSignStepActive, setIsPreSignStepActive] = useState(false);

  const isContinueButtonDisabled = isValidationErrorsExist || !viewer || isLoading;

  const onToggleStep = useCallback(
    () => setIsPreSignStepActive(prev => !prev),
    [setIsPreSignStepActive],
  );

  return (
    <BrandSettingsContext.Consumer>
      {brandSettings => (
        <div>
          {!isPreSignStepActive && (
            <>
              <Button
                color="primary"
                disabled={isContinueButtonDisabled}
                variant="contained"
                onClick={onToggleStep}
              >
                Continue
              </Button>

              <PreviewAsAutocomplete
                brandSettings={brandSettings}
                isLoading={isLoading}
                setForm={setForm}
                setViewer={setViewer}
                signatures={signatures}
                viewer={viewer}
              />
            </>
          )}

          {isPreSignStepActive && (
            <PreSignRow>
              <div>{`Almost done. I agree to be legally bound by this document. Click to sign this
          document.`}</div>

              <ButtonGroup>
                <Button
                  color="secondary"
                  disabled={isLoading}
                  variant="contained"
                  onClick={onToggleStep}
                >
                  Cancel
                </Button>

                <Button
                  color="primary"
                  data-type={SignStatus.SIGN}
                  disabled={isLoading}
                  variant="contained"
                  onClick={onSubmit}
                >
                  Sign
                </Button>
              </ButtonGroup>
            </PreSignRow>
          )}
        </div>
      )}
    </BrandSettingsContext.Consumer>
  );
};

PreSignPanel.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isValidationErrorsExist: PropTypes.bool.isRequired,
  setForm: PropTypes.func.isRequired,
  setViewer: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  signatures: PropTypes.array,
  viewer: PropTypes.object,
};

PreSignPanel.defaultProps = {
  signatures: undefined,
  viewer: undefined,
};

export default memo(PreSignPanel);
