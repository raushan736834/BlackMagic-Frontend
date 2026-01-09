import React, { useState } from 'react';
import { QrCode, Download, Printer, RefreshCw, Grid, Copy, Check, AlertCircle, X } from 'lucide-react';

// QR Code Service
class QRCodeService {
  static async generateQRCode(qrToken) {
    try {
      // Call your backend API
      const response = await fetch('/api/admin/qr-code/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
        },
        body: JSON.stringify({ qrToken })
      });

      if (!response.ok) throw new Error('Failed to generate QR code');

      const data = await response.json();
      // data.qrCodeBytes is the byte array from server
      return data;
    } catch (error) {
      console.error('QR Code generation error:', error);
      throw error;
    }
  }

  // Convert byte array to base64 image
  static byteArrayToBase64(byteArray) {
    if (typeof byteArray === 'string') {
      return byteArray;
    }
    const binary = new Uint8Array(byteArray).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ''
    );
    return btoa(binary);
  }

  // Download QR code as PNG
  static downloadQRCode(base64Image, fileName = 'qr-code.png') {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Image}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Print QR code
  static printQRCode(base64Image, tableName) {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print QR Code - ${tableName}</title>
          <style>
            body {
              margin: 0;
              padding: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              font-family: Arial, sans-serif;
            }
            .qr-container {
              text-align: center;
              page-break-inside: avoid;
            }
            h1 {
              font-size: 28px;
              margin-bottom: 10px;
              color: #ff6b35;
            }
            h2 {
              font-size: 48px;
              margin: 10px 0 20px;
              color: #333;
            }
            img {
              max-width: 400px;
              height: auto;
              border: 3px solid #333;
              border-radius: 10px;
            }
            .instructions {
              margin-top: 20px;
              font-size: 16px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="qr-container">
            <h1>BlackMagic Restaurant</h1>
            <h2>${tableName}</h2>
            <img src="data:image/png;base64,${base64Image}" alt="QR Code" />
            <div class="instructions">
              <p>Scan this QR code to start ordering</p>
            </div>
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}