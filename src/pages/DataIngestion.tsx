import React, { useState } from 'react';
import { Upload, Database, FileText, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export function DataIngestion() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const recentUploads = [
    {
      id: 1,
      filename: 'january_transactions.csv',
      status: 'completed',
      records: 1247,
      timestamp: '2024-01-15 14:30:22',
      source: 'CSV Upload'
    },
    {
      id: 2,
      filename: 'QB_sync_data.json',
      status: 'processing',
      records: 2893,
      timestamp: '2024-01-15 14:25:10',
      source: 'QuickBooks API'
    },
    {
      id: 3,
      filename: 'december_invoices.xlsx',
      status: 'completed',
      records: 456,
      timestamp: '2024-01-15 13:45:55',
      source: 'Excel Upload'
    },
    {
      id: 4,
      filename: 'xero_bank_feed.json',
      status: 'failed',
      records: 0,
      timestamp: '2024-01-15 13:20:33',
      source: 'Xero API',
      error: 'API authentication failed'
    }
  ];

  const dataStats = [
    { label: 'Total Records', value: '45,678', change: '+12%' },
    { label: 'Sources Connected', value: '5', change: '+1' },
    { label: 'Processing Rate', value: '99.2%', change: '+0.3%' },
    { label: 'Data Quality Score', value: '96%', change: '+2%' }
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Ingestion Hub</h1>
        <p className="mt-2 text-gray-600">Manage and monitor all your financial data sources</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {dataStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="text-sm text-green-600">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Financial Data</h3>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="space-y-4">
                <RefreshCw className="w-12 h-12 text-blue-600 mx-auto animate-spin" />
                <div>
                  <p className="text-lg font-medium text-gray-900">Uploading...</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{uploadProgress}% complete</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <p className="text-lg font-medium text-gray-900">Drop files here or click to upload</p>
                  <p className="text-sm text-gray-600">Supports CSV, Excel, JSON formats</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".csv,.xlsx,.xls,.json"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Choose Files
                </label>
              </div>
            )}
          </div>

          <div className="mt-4 text-xs text-gray-500">
            <p>• Maximum file size: 50MB</p>
            <p>• Supported formats: CSV, Excel (.xlsx, .xls), JSON</p>
            <p>• Data is automatically validated and processed</p>
          </div>
        </div>

        {/* API Data Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Data Sources</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">QuickBooks Online</p>
                  <p className="text-sm text-gray-600">Last sync: 2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Xero</p>
                  <p className="text-sm text-gray-600">Last sync: 5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Sage Intacct</p>
                  <p className="text-sm text-gray-600">Not connected</p>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Connect
              </button>
            </div>
          </div>

          <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Manage Connections
          </button>
        </div>
      </div>

      {/* Recent Uploads */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Data Ingestion</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentUploads.map((upload) => (
            <div key={upload.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(upload.status)}
                  <div>
                    <h4 className="font-medium text-gray-900">{upload.filename}</h4>
                    <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                      <span>Source: {upload.source}</span>
                      <span>Records: {upload.records.toLocaleString()}</span>
                      <span>{upload.timestamp}</span>
                    </div>
                    {upload.error && (
                      <p className="text-sm text-red-600 mt-1">Error: {upload.error}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(upload.status)}`}>
                    {upload.status}
                  </span>
                  {upload.status === 'failed' && (
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Retry
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Data Quality Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Quality Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Completeness</span>
              <span className="text-sm font-medium text-gray-900">98%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '98%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Accuracy</span>
              <span className="text-sm font-medium text-gray-900">96%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '96%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Consistency</span>
              <span className="text-sm font-medium text-gray-900">94%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}