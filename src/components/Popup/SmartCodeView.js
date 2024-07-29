import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';

const SmartCodeView = ({ welcome, uniqueSlug }) => {
  const elementRef = useRef(null);

  const handleDownload = async () => {
    const element = elementRef.current;

    if (!element) {
      console.error('Ref not found');
      return;
    }

    try {
      const canvas = await html2canvas(element);
      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.download = 'my-image-name.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="smart-code-preview" ref={elementRef}>
        <div
          style={{
            position: 'relative',
            width: '250px',
            height: '250px',
          }}
          className="qr-image-wrapper"
        >
          <QRCode
            value={`https://smartcardgenerator.net/${uniqueSlug}`}
            size={250}
          />
          <img
            src={welcome.imageUrl}
            width={100}
            height={100}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      </div>
      <div className="qr-download mt-3">
        <div className="custom-btn" onClick={handleDownload}>
          Download QR Code
        </div>
      </div>

      <div className="card-list-right text-center">
        <h1 className="opening-preview-title">
          Scan this QR Code to preview
        </h1>
        <p>You can customize the design of your QR Code in the next step.</p>
      </div>
    </>
  );
};

export default SmartCodeView;
