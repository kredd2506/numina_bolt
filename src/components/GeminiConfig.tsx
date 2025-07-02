import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle, AlertCircle, Key, Cloud } from 'lucide-react';
import { geminiService } from '../services/geminiService';

interface GeminiConfigProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GeminiConfig({ isOpen, onClose }: GeminiConfigProps) {
  const [apiKey, setApiKey] = useState('');
  const [projectId, setProjectId] = useState('');
  const [location, setLocation] = useState('us-central1');
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      // Load existing values from environment
      setApiKey(import.meta.env.VITE_GEMINI_API_KEY || '');
      setProjectId(import.meta.env.VITE_GOOGLE_CLOUD_PROJECT_ID || '');
      setLocation(import.meta.env.VITE_GOOGLE_CLOUD_LOCATION || 'us-central1');
    }
  }, [isOpen]);

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus('idle');
    setErrorMessage('');

    try {
      // Temporarily update environment variables for testing
      (import.meta.env as any).VITE_GEMINI_API_KEY = apiKey;
      (import.meta.env as any).VITE_GOOGLE_CLOUD_PROJECT_ID = projectId;
      (import.meta.env as any).VITE_GOOGLE_CLOUD_LOCATION = location;

      const isConnected = await geminiService.testConnection();
      
      if (isConnected) {
        setConnectionStatus('success');
      } else {
        setConnectionStatus('error');
        setErrorMessage('Connection test failed. Please check your credentials.');
      }
    } catch (error) {
      setConnectionStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
    } finally {
      setIsTestingConnection(false);
    }
  };

  const saveConfiguration = () => {
    // In a real application, you would save these to your backend or environment
    // For demo purposes, we'll update the environment variables
    (import.meta.env as any).VITE_GEMINI_API_KEY = apiKey;
    (import.meta.env as any).VITE_GOOGLE_CLOUD_PROJECT_ID = projectId;
    (import.meta.env as any).VITE_GOOGLE_CLOUD_LOCATION = location;

    alert('Configuration saved! The AI rule generation will now use Gemini AI Vertex.');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onClose}></div>
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Gemini AI Configuration</h3>
              <p className="text-sm text-gray-600">Configure your Google Cloud Vertex AI credentials</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Setup Instructions */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Setup Instructions:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                <li>2. Create or select a project</li>
                <li>3. Enable the Vertex AI API</li>
                <li>4. Create an API key or service account</li>
                <li>5. Copy your credentials below</li>
              </ol>
            </div>

            {/* Configuration Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Key className="w-4 h-4 inline mr-1" />
                  Gemini API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Cloud className="w-4 h-4 inline mr-1" />
                  Google Cloud Project ID
                </label>
                <input
                  type="text"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  placeholder="your-project-id"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location/Region
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="us-central1">us-central1</option>
                  <option value="us-east1">us-east1</option>
                  <option value="us-west1">us-west1</option>
                  <option value="europe-west1">europe-west1</option>
                  <option value="asia-southeast1">asia-southeast1</option>
                </select>
              </div>
            </div>

            {/* Connection Test */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">Connection Test</h4>
                <button
                  onClick={testConnection}
                  disabled={!apiKey || !projectId || isTestingConnection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTestingConnection ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white inline-block mr-2"></div>
                      Testing...
                    </>
                  ) : (
                    'Test Connection'
                  )}
                </button>
              </div>

              {connectionStatus === 'success' && (
                <div className="flex items-center space-x-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Connection successful! Gemini AI is ready.</span>
                </div>
              )}

              {connectionStatus === 'error' && (
                <div className="flex items-start space-x-2 text-red-600">
                  <AlertCircle className="w-5 h-5 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Connection failed</p>
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800">
                    <strong>Security Note:</strong> Your API credentials are stored locally in your browser and are only used to communicate with Google's Vertex AI service. Never share your API keys.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={saveConfiguration}
                disabled={!apiKey || !projectId || connectionStatus !== 'success'}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Configuration
              </button>
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}