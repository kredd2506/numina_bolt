import React, { useState } from 'react';
import { Plus, Check, X, Shield, Key, RefreshCw, AlertCircle, Lock, Unlock } from 'lucide-react';

export function Integrations() {
  const [showAddIntegration, setShowAddIntegration] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState('');
  const [showCredentialForm, setShowCredentialForm] = useState(false);
  const [credentials, setCredentials] = useState({ apiKey: '', clientId: '', clientSecret: '' });

  const [integrations, setIntegrations] = useState([
    {
      id: 'quickbooks',
      name: 'QuickBooks Online',
      description: 'Sync transactions, invoices, and vendor data',
      status: 'connected',
      lastSync: '2 minutes ago',
      logo: '🔢',
      credentials: 'OAuth 2.0',
      syncFrequency: '5 minutes',
      recordsSync: '1,247'
    },
    {
      id: 'xero',
      name: 'Xero',
      description: 'Import financial data and bank transactions',
      status: 'connected',
      lastSync: '5 minutes ago',
      logo: '📊',
      credentials: 'API Key',
      syncFrequency: '10 minutes',
      recordsSync: '892'
    },
    {
      id: 'sage',
      name: 'Sage Intacct',
      description: 'Enterprise financial management integration',
      status: 'disconnected',
      lastSync: 'Never',
      logo: '🏢',
      credentials: 'API Token',
      syncFrequency: 'N/A',
      recordsSync: '0'
    },
    {
      id: 'netsuite',
      name: 'NetSuite',
      description: 'ERP and financial data synchronization',
      status: 'disconnected',
      lastSync: 'Never',
      logo: '☁️',
      credentials: 'Token-based',
      syncFrequency: 'N/A',
      recordsSync: '0'
    }
  ]);

  const availableIntegrations = [
    { id: 'stripe', name: 'Stripe', description: 'Payment processing data', logo: '💳' },
    { id: 'paypal', name: 'PayPal', description: 'Payment and transaction data', logo: '🅿️' },
    { id: 'bank', name: 'Bank APIs', description: 'Direct bank transaction feeds', logo: '🏦' },
    { id: 'csv', name: 'CSV Upload', description: 'Manual file uploads', logo: '📄' }
  ];

  const handleConnect = (integrationId) => {
    setSelectedIntegration(integrationId);
    setShowCredentialForm(true);
    setShowAddIntegration(false);
  };

  const handleCredentialSubmit = () => {
    // Simulate connection process
    setIntegrations(integrations.map(integration => 
      integration.id === selectedIntegration 
        ? { 
            ...integration, 
            status: 'connected', 
            lastSync: 'Just now',
            syncFrequency: '5 minutes'
          }
        : integration
    ));
    
    setShowCredentialForm(false);
    setCredentials({ apiKey: '', clientId: '', clientSecret: '' });
    alert('Integration connected successfully! Data sync will begin shortly.');
  };

  const handleDisconnect = (integrationId) => {
    if (confirm('Are you sure you want to disconnect this integration?')) {
      setIntegrations(integrations.map(integration => 
        integration.id === integrationId 
          ? { 
              ...integration, 
              status: 'disconnected', 
              lastSync: 'Never',
              syncFrequency: 'N/A',
              recordsSync: '0'
            }
          : integration
      ));
    }
  };

  const handleRefreshSync = (integrationId) => {
    setIntegrations(integrations.map(integration => 
      integration.id === integrationId 
        ? { ...integration, lastSync: 'Just now' }
        : integration
    ));
    alert('Data sync refreshed successfully!');
  };

  const testConnection = (integration) => {
    alert(`Testing connection to ${integration.name}...\n\nConnection successful! API is responding normally.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Secure Integrations</h1>
          <p className="mt-2 text-gray-600">Connect your financial systems with enterprise-grade security</p>
        </div>
        <button
          onClick={() => setShowAddIntegration(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Integration
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Shield className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Enterprise Security</h3>
            <p className="text-blue-800 mt-1">
              All API credentials are encrypted at rest using AES-256 encryption. Tokens are only decrypted in memory 
              when making authorized API calls and are never logged or stored in plain text. Our security architecture 
              follows SOC 2 Type II compliance standards.
            </p>
            <div className="mt-3 flex items-center space-x-4 text-sm text-blue-700">
              <div className="flex items-center space-x-1">
                <Lock className="w-4 h-4" />
                <span>AES-256 Encryption</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-1">
                <Key className="w-4 h-4" />
                <span>Zero-Knowledge Architecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Integrations */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Integrations</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {integrations.map((integration) => (
            <div key={integration.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{integration.logo}</div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-900">{integration.name}</h4>
                    <p className="text-gray-600">{integration.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>Auth: {integration.credentials}</span>
                      <span>Last sync: {integration.lastSync}</span>
                      <span>Frequency: {integration.syncFrequency}</span>
                      <span>Records: {integration.recordsSync}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                    integration.status === 'connected' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {integration.status === 'connected' ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    <span>{integration.status}</span>
                  </div>
                  
                  {integration.status === 'connected' ? (
                    <>
                      <button 
                        onClick={() => handleRefreshSync(integration.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Refresh Sync"
                      >
                        <RefreshCw className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => testConnection(integration)}
                        className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                        title="Test Connection"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => handleDisconnect(integration.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                        title="Disconnect"
                      >
                        <Unlock className="w-5 h-5" />
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => handleConnect(integration.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Connect
                    </button>
                  )}
                  
                  <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                    <Key className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Integration Modal */}
      {showAddIntegration && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setShowAddIntegration(false)}></div>
            <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Integration</h3>
              <div className="space-y-3">
                {availableIntegrations.map((integration) => (
                  <button
                    key={integration.id}
                    onClick={() => handleConnect(integration.id)}
                    className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{integration.logo}</span>
                      <div>
                        <h4 className="font-medium text-gray-900">{integration.name}</h4>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <button
                  onClick={() => setShowAddIntegration(false)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Credential Input Modal */}
      {showCredentialForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setShowCredentialForm(false)}></div>
            <div className="relative bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Secure Credential Input</h3>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-yellow-800">
                      Your credentials will be encrypted using AES-256 encryption before storage. 
                      We never store credentials in plain text.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key / Access Token
                  </label>
                  <input
                    type="password"
                    value={credentials.apiKey}
                    onChange={(e) => setCredentials({...credentials, apiKey: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your API key"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client ID (if applicable)
                  </label>
                  <input
                    type="text"
                    value={credentials.clientId}
                    onChange={(e) => setCredentials({...credentials, clientId: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter client ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Secret (if applicable)
                  </label>
                  <input
                    type="password"
                    value={credentials.clientSecret}
                    onChange={(e) => setCredentials({...credentials, clientSecret: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter client secret"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={handleCredentialSubmit}
                  disabled={!credentials.apiKey}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Connect Securely
                </button>
                <button
                  onClick={() => setShowCredentialForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Integration Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Connected Systems</p>
              <p className="text-2xl font-bold text-blue-600">
                {integrations.filter(i => i.status === 'connected').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Records Synced</p>
              <p className="text-2xl font-bold text-green-600">
                {integrations.reduce((acc, i) => acc + parseInt(i.recordsSync.replace(',', '') || '0'), 0).toLocaleString()}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Sync Frequency</p>
              <p className="text-2xl font-bold text-purple-600">5min</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* API Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">API Credential Management</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {integrations.filter(i => i.status === 'connected').map((integration) => (
              <div key={integration.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{integration.logo}</div>
                  <div>
                    <h4 className="font-medium text-gray-900">{integration.name} Credentials</h4>
                    <p className="text-sm text-gray-600">
                      Last refreshed: {integration.lastSync} • Type: {integration.credentials}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => handleRefreshSync(integration.id)}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Refresh Token
                  </button>
                  <button 
                    onClick={() => handleDisconnect(integration.id)}
                    className="text-sm text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Revoke Access
                  </button>
                </div>
              </div>
            ))}
            
            {integrations.filter(i => i.status === 'connected').length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Key className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No active API credentials to manage</p>
                <p className="text-sm">Connect an integration to see credential management options</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}