import React, { useEffect, useRef } from 'react'
import * as htmlToImage from 'html-to-image'
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image'
import QRCode from 'qrcode.react'
const SmartCodeViewUpdate = ({ uniqueSlug, componentRef, welcome}) => {
  const containerRef = useRef()

  const handleDownload = async () => {
      try {
          const dataUrl = await toPng(containerRef.current, {
              cacheBust: false,
              useCORS: true,
          })
          const link = document.createElement('a')
          link.href = dataUrl
          link.download = 'my-image-name.png'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
      } catch (error) {
          console.error('Error converting HTML to image:', error)
      }
  }
    return (
        <>
            <div className="smart-code-preview" ref={containerRef}>
                <div
                    style={{
                        position: 'relative',
                        width: '250px',
                        height: '250px',
                    }}
                    className="qr-image-wrapper">
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
                <p>
                    You can customize the design of your QR Code in the next
                    step.
                </p>
            </div>
        </>
    )
}

export default SmartCodeViewUpdate