import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import PropTypes from 'prop-types';

import { HelloSignTagType } from 'constants/FormPreview.constants';

import useWindowSize from 'hooks/useWindowSize';

import Button from 'shared/Button';
import Dialog from 'shared/Dialog';

import { convertTextToImage } from 'utils/FormPreview.utils';

import { DivRoot } from '../SigningField.styled';

import ChooseFont from './ChooseFont';
import { canvasProps, fonts } from './Signature.constants';
import {
  baseModalWidth,
  ConfirmationText,
  DialogBottom,
  DialogMain,
  dialogMainMargin,
  DialogNavigation,
  DivPlaceholder,
  ResetButton,
  SignatureImg,
  SignatureInput,
} from './Signature.styled';

const Signature = ({
  value,
  scale,
  setForm,
  name,
  fieldRef,
  signatureRelatedElementIds,
  isLoading,
  type,
  brandSettings,
  ...props
}) => {
  const tempSignatureFieldRef = useRef();
  const windowSize = useWindowSize();

  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const [activeSignatureType, setActiveSignatureType] = useState(type);
  const [tempSignatureFont, setTempSignatureFont] = useState(fonts[0]);
  const [isSubmitButtonDisabled, setIsSubmitButtonDisabled] = useState(true);

  const isMoreThanOneSigTypeField = signatureRelatedElementIds.length > 1;

  const formattedCanvasProps = useMemo(
    () => ({
      ...canvasProps,
      width: Math.min(baseModalWidth, windowSize.width) - 2 * dialogMainMargin,
    }),
    [windowSize.width],
  );

  const onDialogOpen = useCallback(() => {
    if (isLoading) {
      return;
    }

    setIsDialogOpened(true);
  }, [isLoading]);

  const onDrawingEnd = useCallback(() => {
    switch (activeSignatureType) {
      case HelloSignTagType.SIGNATURE:
        const isEmpty = tempSignatureFieldRef.current?.isEmpty?.() ?? true;
        setIsSubmitButtonDisabled(isEmpty);
        break;

      case HelloSignTagType.INITIAL:
        setIsSubmitButtonDisabled(!tempSignatureFieldRef.current.value);
        break;

      default:
        break;
    }
  }, [activeSignatureType]);

  const onClearTempSignature = useCallback(() => {
    switch (activeSignatureType) {
      case HelloSignTagType.SIGNATURE:
        tempSignatureFieldRef.current.clear();
        onDrawingEnd();
        break;

      case HelloSignTagType.INITIAL:
        tempSignatureFieldRef.current.value = '';
        onDrawingEnd();
        break;

      default:
        break;
    }
  }, [activeSignatureType, onDrawingEnd]);

  const onDialogClose = useCallback(() => {
    onClearTempSignature();
    setIsDialogOpened(false);
    setActiveSignatureType(type);
  }, [onClearTempSignature, type]);

  const onSignatureInsert = useCallback(
    e => {
      e.preventDefault();

      const getSignatureUrl = () => {
        switch (activeSignatureType) {
          case HelloSignTagType.SIGNATURE: {
            return tempSignatureFieldRef.current.getTrimmedCanvas().toDataURL('image/png');
          }

          case HelloSignTagType.INITIAL: {
            return convertTextToImage(tempSignatureFieldRef.current.value, {
              fontFamily: tempSignatureFont.name,
            });
          }

          default:
            return null;
        }
      };

      const signatureUrl = getSignatureUrl();

      if (!signatureUrl) {
        return;
      }

      const signedElements = signatureRelatedElementIds.reduce(
        (acc, id) => {
          if (isMoreThanOneSigTypeField) {
            acc[id] = signatureUrl;
          }

          return acc;
        },
        { [name]: signatureUrl },
      );

      setForm(prev => ({ ...prev, ...signedElements }));

      onDialogClose();
      onClearTempSignature();
    },
    [
      setForm,
      name,
      onDialogClose,
      onClearTempSignature,
      activeSignatureType,
      tempSignatureFont,
      signatureRelatedElementIds,
      isMoreThanOneSigTypeField,
    ],
  );

  const onSignatureTypeTabOpen = useCallback(
    e => {
      setActiveSignatureType(e.currentTarget.dataset.id);
      onClearTempSignature();
    },
    [onClearTempSignature],
  );

  const onFieldClear = useCallback(
    e => {
      e.stopPropagation();
      setForm(prev => ({ ...prev, [name]: undefined }));
    },
    [setForm, name],
  );

  return (
    <>
      <DivRoot
        {...props}
        $brandSettings={brandSettings}
        ref={fieldRef}
        scale={scale}
        onClick={onDialogOpen}
      >
        {!!value && (
          <>
            <SignatureImg alt="signature" src={value} />
            <ResetButton
              $brandSettings={brandSettings}
              disabled={isLoading}
              height={props.height}
              scale={scale}
              type="button"
              onClick={onFieldClear}
            >
              x
            </ResetButton>
          </>
        )}

        {!value && <DivPlaceholder scale={scale}>Click to sign</DivPlaceholder>}
      </DivRoot>

      <Dialog
        brandSettings={brandSettings}
        header="Signature"
        isOpened={isDialogOpened}
        onClose={onDialogClose}
      >
        <form noValidate onSubmit={onSignatureInsert}>
          <DialogNavigation $brandSettings={brandSettings}>
            <Button
              data-id={HelloSignTagType.SIGNATURE}
              data-is-active={activeSignatureType === HelloSignTagType.SIGNATURE}
              type="button"
              variant="text"
              onClick={onSignatureTypeTabOpen}
            >
              Draw
            </Button>

            <Button
              data-id={HelloSignTagType.INITIAL}
              data-is-active={activeSignatureType === HelloSignTagType.INITIAL}
              type="button"
              variant="text"
              onClick={onSignatureTypeTabOpen}
            >
              Type
            </Button>
          </DialogNavigation>

          <DialogMain $brandSettings={brandSettings}>
            {activeSignatureType === HelloSignTagType.SIGNATURE && (
              <>
                <Button type="button" variant="text" onClick={onClearTempSignature}>
                  Clear
                </Button>

                <SignatureCanvas
                  canvasProps={formattedCanvasProps}
                  ref={tempSignatureFieldRef}
                  onEnd={onDrawingEnd}
                />
              </>
            )}

            {activeSignatureType === HelloSignTagType.INITIAL && (
              <>
                <ChooseFont
                  brandSettings={brandSettings}
                  setTempSignatureFont={setTempSignatureFont}
                  tempSignatureFieldRef={tempSignatureFieldRef}
                  tempSignatureFont={tempSignatureFont}
                />

                <SignatureInput
                  autoFocus
                  fontFamily={tempSignatureFont.name}
                  ref={tempSignatureFieldRef}
                  type="text"
                  onChange={onDrawingEnd}
                />
              </>
            )}
          </DialogMain>

          <DialogBottom>
            <ConfirmationText>
              I understand this is a legal representation of my signature.
            </ConfirmationText>

            <div>
              <Button color="secondary" type="button" variant="contained" onClick={onDialogClose}>
                Cancel
              </Button>

              <div>
                <Button
                  color="primary"
                  disabled={isSubmitButtonDisabled}
                  type="submit"
                  variant="contained"
                >
                  {isMoreThanOneSigTypeField ? 'Accept and Sign Everywhere' : 'Accept and Sign'}
                </Button>
              </div>
            </div>
          </DialogBottom>
        </form>
      </Dialog>
    </>
  );
};

Signature.propTypes = {
  brandSettings: PropTypes.object.isRequired,
  signatureRelatedElementIds: PropTypes.array.isRequired,
  scale: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  setForm: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  fieldRef: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default memo(Signature);
