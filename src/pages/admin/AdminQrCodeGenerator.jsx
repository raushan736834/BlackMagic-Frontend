import { useState } from "react";

const QRCodeDisplay = ({ qrData, tableName, onDownload, onPrint, onClose }) => {
  const [copied, setCopied] = useState(false);

  const copyToken = () => {
    navigator.clipboard.writeText(qrData.qrToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold">{tableName}</h3>
              <p className="text-orange-100 text-sm">QR Code Generated</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-6 mb-4">
            <div className="flex justify-center mb-4">
              <img
                src={`data:image/png;base64,${qrData.qrCodeImage}`}
                alt="QR Code"
                className="w-64 h-64 border-4 border-gray-300 rounded-lg shadow-lg"
              />
            </div>

            <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
              <p className="text-xs text-gray-500 mb-1">QR Token</p>
              <div className="flex items-center justify-between gap-2">
                <code className="text-sm font-mono text-gray-800 break-all">
                  {qrData.qrToken}
                </code>
                <button
                  onClick={copyToken}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  title="Copy token"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onDownload}
              className="flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={onPrint}
              className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main QR Code Generator Component
export default function QRCodeGenerator() {
  const [activeTab, setActiveTab] = useState('single');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [tableNumber, setTableNumber] = useState('');
  const [generatedQR, setGeneratedQR] = useState(null);
  const [showQRModal, setShowQRModal] = useState(false);

  const [startTable, setStartTable] = useState('');
  const [endTable, setEndTable] = useState('');
  const [bulkQRCodes, setBulkQRCodes] = useState([]);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const handleGenerateSingle = async () => {
    if (!tableNumber) {
      setError('Please enter a table number');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const qrToken = `TABLE-${tableNumber}-${Date.now()}`;
      
      // Simulate API call - replace with actual service
      const mockResponse = {
        qrCodeBytes: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
      };
      
      const base64Image = QRCodeService.byteArrayToBase64(mockResponse.qrCodeBytes);
      
      setGeneratedQR({
        tableNumber,
        qrToken: qrToken,
        qrCodeImage: base64Image
      });
      
      setShowQRModal(true);
      setSuccess(`QR Code generated for Table ${tableNumber}`);
      setTableNumber('');
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateBulk = async () => {
    const start = parseInt(startTable);
    const end = parseInt(endTable);

    if (!start || !end) {
      setError('Please enter start and end table numbers');
      return;
    }

    if (start > end) {
      setError('Start table must be less than or equal to end table');
      return;
    }

    if (end - start > 50) {
      setError('Maximum 50 tables can be generated at once');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const tableNumbers = Array.from(
        { length: end - start + 1 },
        (_, i) => start + i
      );

      const qrCodes = tableNumbers.map((num) => {
        const qrToken = `TABLE-${num}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const mockBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
        
        return {
          tableNumber: num,
          qrToken,
          qrCodeImage: mockBase64
        };
      });

      setBulkQRCodes(qrCodes);
      setShowBulkModal(true);
      setSuccess(`Generated ${qrCodes.length} QR codes successfully`);
      setStartTable('');
      setEndTable('');
    } catch (err) {
      setError('Failed to generate bulk QR codes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadSingle = () => {
    if (generatedQR) {
      QRCodeService.downloadQRCode(
        generatedQR.qrCodeImage,
        `table-${generatedQR.tableNumber}-qr-code.png`
      );
      setSuccess('QR Code downloaded successfully');
    }
  };

  const handlePrintSingle = () => {
    if (generatedQR) {
      QRCodeService.printQRCode(
        generatedQR.qrCodeImage,
        `Table ${generatedQR.tableNumber}`
      );
    }
  };

  const handleDownloadAllBulk = () => {
    bulkQRCodes.forEach((qr, index) => {
      setTimeout(() => {
        QRCodeService.downloadQRCode(
          qr.qrCodeImage,
          `table-${qr.tableNumber}-qr-code.png`
        );
      }, 100 * index);
    });
    setSuccess('All QR codes downloaded successfully');
  };

  const handlePrintAllBulk = () => {
    const printWindow = window.open('', '_blank');
    const qrCodesHTML = bulkQRCodes.map(qr => `
      <div class="qr-page">
        <h1>BlackMagic Restaurant</h1>
        <h2>Table ${qr.tableNumber}</h2>
        <img src="data:image/png;base64,${qr.qrCodeImage}" alt="QR Code" />
        <p class="instructions">Scan this QR code to start ordering</p>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print All QR Codes</title>
          <style>
            body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
            .qr-page {
              page-break-after: always;
              padding: 40px;
              text-align: center;
              min-height: 100vh;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }
            .qr-page:last-child { page-break-after: auto; }
            h1 { font-size: 32px; margin-bottom: 10px; color: #ff6b35; }
            h2 { font-size: 56px; margin: 10px 0 30px; color: #333; }
            img { max-width: 400px; height: auto; border: 4px solid #333; border-radius: 12px; }
            .instructions { margin-top: 30px; font-size: 18px; color: #666; }
          </style>
        </head>
        <body>
          ${qrCodesHTML}
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() { window.close(); };
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl">
              <QrCode className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">QR Code Generator</h1>
              <p className="text-gray-600">Generate QR codes for table ordering</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg animate-slide-in">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 font-medium">{error}</p>
              <button onClick={() => setError(null)} className="ml-auto text-red-500 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-lg animate-slide-in">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              <p className="text-green-700 font-medium">{success}</p>
              <button onClick={() => setSuccess(null)} className="ml-auto text-green-500 hover:text-green-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('single')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'single'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <QrCode className="w-5 h-5" />
              Single Table
            </button>
            <button
              onClick={() => setActiveTab('bulk')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'bulk'
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid className="w-5 h-5" />
              Bulk Generation
            </button>
          </div>

          {activeTab === 'single' && (
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Table Number
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                    placeholder="Enter table number (e.g., 5)"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleGenerateSingle()}
                    disabled={loading}
                  />
                </div>

                <button
                  onClick={handleGenerateSingle}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="w-5 h-5" />
                      Generate QR Code
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'bulk' && (
            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Start Table
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      placeholder="e.g., 1"
                      value={startTable}
                      onChange={(e) => setStartTable(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      End Table
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                      placeholder="e.g., 20"
                      value={endTable}
                      onChange={(e) => setEndTable(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleGenerateBulk()}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    <strong>Note:</strong> Maximum 50 tables can be generated at once.
                    {startTable && endTable && parseInt(endTable) >= parseInt(startTable) && (
                      <span className="block mt-1">
                        Will generate {parseInt(endTable) - parseInt(startTable) + 1} QR codes.
                      </span>
                    )}
                  </p>
                </div>

                <button
                  onClick={handleGenerateBulk}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Grid className="w-5 h-5" />
                      Generate Bulk QR Codes
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showQRModal && generatedQR && (
        <QRCodeDisplay
          qrData={generatedQR}
          tableName={`Table ${generatedQR.tableNumber}`}
          onDownload={handleDownloadSingle}
          onPrint={handlePrintSingle}
          onClose={() => setShowQRModal(false)}
        />
      )}

      {showBulkModal && bulkQRCodes.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold">Bulk QR Codes</h3>
                  <p className="text-orange-100 text-sm">{bulkQRCodes.length} codes generated</p>
                </div>
                <button onClick={() => setShowBulkModal(false)} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-4 border-b bg-gray-50 flex gap-3">
              <button
                onClick={handleDownloadAllBulk}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download All
              </button>
              <button
                onClick={handlePrintAllBulk}
                className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors"
              >
                <Printer className="w-5 h-5" />
                Print All
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-3 gap-4">
                {bulkQRCodes.map((qr) => (
                  <div key={qr.tableNumber} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200 hover:border-orange-500 transition-colors">
                    <h4 className="font-bold text-center mb-2 text-gray-800">
                      Table {qr.tableNumber}
                    </h4>
                    <img
                      src={`data:image/png;base64,${qr.qrCodeImage}`}
                      alt={`QR Code for Table ${qr.tableNumber}`}
                      className="w-full h-auto border-2 border-gray-300 rounded-lg"
                    />
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => QRCodeService.downloadQRCode(qr.qrCodeImage, `table-${qr.tableNumber}-qr-code.png`)}
                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => QRCodeService.printQRCode(qr.qrCodeImage, `Table ${qr.tableNumber}`)}
                        className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-1"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in { animation: slide-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}
