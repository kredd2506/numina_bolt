import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Eye, X, Filter, Play, Pause, RefreshCw } from 'lucide-react';

export function Monitoring() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFlagDetail, setShowFlagDetail] = useState(null);
  const [isLiveMonitoring, setIsLiveMonitoring] = useState(true);

  const [flags, setFlags] = useState([
    {
      id: 1,
      timestamp: '2024-01-15 14:23:45',
      rule: 'Duplicate Invoice Detection',
      severity: 'critical',
      description: 'Potential duplicate invoice detected',
      transaction: {
        id: 'TXN-2024-001456',
        amount: '$2,450.00',
        vendor: 'Office Supplies Inc.',
        account: 'Office Expenses'
      },
      details: 'Invoice #INV-2024-0145 for $2,450.00 from Office Supplies Inc. matches a previous invoice processed 3 hours ago.',
      status: 'pending',
      assignedTo: 'Sarah Johnson',
      aiConfidence: 95
    },
    {
      id: 2,
      timestamp: '2024-01-15 13:15:22',
      rule: 'Expense Threshold Monitor',
      severity: 'warning',
      description: 'Single expense exceeds threshold',
      transaction: {
        id: 'TXN-2024-001445',
        amount: '$15,000.00',
        vendor: 'Tech Solutions LLC',
        account: 'IT Equipment'
      },
      details: 'Expense of $15,000.00 exceeds the $10,000 threshold set for IT Equipment category.',
      status: 'reviewing',
      assignedTo: 'Mike Chen',
      aiConfidence: 98
    },
    {
      id: 3,
      timestamp: '2024-01-15 12:08:11',
      rule: 'Unusual Vendor Payment',
      severity: 'medium',
      description: 'Payment to new vendor',
      transaction: {
        id: 'TXN-2024-001432',
        amount: '$8,750.00',
        vendor: 'Global Consulting Group',
        account: 'Professional Services'
      },
      details: 'Payment made to Global Consulting Group, which has not been paid in the last 90 days.',
      status: 'resolved',
      assignedTo: 'Lisa Park',
      aiConfidence: 89
    },
    {
      id: 4,
      timestamp: '2024-01-15 10:45:33',
      rule: 'Weekend Transaction Alert',
      severity: 'low',
      description: 'Transaction occurred on weekend',
      transaction: {
        id: 'TXN-2024-001398',
        amount: '$450.00',
        vendor: 'Emergency Repairs Co.',
        account: 'Maintenance'
      },
      details: 'Transaction processed on Saturday, which is outside normal business hours.',
      status: 'resolved',
      assignedTo: 'David Kim',
      aiConfidence: 76
    }
  ]);

  const filteredFlags = filterStatus === 'all' 
    ? flags 
    : flags.filter(flag => flag.status === filterStatus);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-red-600 bg-red-100';
      case 'reviewing': return 'text-yellow-600 bg-yellow-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const resolveFlag = (flagId) => {
    setFlags(flags.map(flag => 
      flag.id === flagId 
        ? { ...flag, status: 'resolved' }
        : flag
    ));
    alert('Flag marked as resolved!');
  };

  const assignForReview = (flagId) => {
    setFlags(flags.map(flag => 
      flag.id === flagId 
        ? { ...flag, status: 'reviewing' }
        : flag
    ));
    alert('Flag assigned for review!');
  };

  const markFalsePositive = (flagId) => {
    if (confirm('Are you sure this is a false positive? This will help improve our AI accuracy.')) {
      setFlags(flags.filter(flag => flag.id !== flagId));
      alert('Flag marked as false positive and removed. This feedback will improve our AI model.');
    }
  };

  const toggleLiveMonitoring = () => {
    setIsLiveMonitoring(!isLiveMonitoring);
    alert(isLiveMonitoring ? 'Live monitoring paused' : 'Live monitoring resumed');
  };

  const refreshFlags = () => {
    alert('Flags refreshed! Latest anomalies loaded.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Real-time Monitoring</h1>
          <p className="mt-2 text-gray-600">Live AI-powered anomaly detection and flag management</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleLiveMonitoring}
            className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              isLiveMonitoring 
                ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {isLiveMonitoring ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {isLiveMonitoring ? 'Pause Live' : 'Resume Live'}
          </button>
          <button
            onClick={refreshFlags}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLiveMonitoring ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-sm text-gray-600">
              {isLiveMonitoring ? 'Live monitoring active' : 'Monitoring paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Flags</p>
              <p className="text-2xl font-bold text-red-600">
                {flags.filter(f => f.status === 'pending').length}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-2xl font-bold text-yellow-600">
                {flags.filter(f => f.status === 'reviewing').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolved Today</p>
              <p className="text-2xl font-bold text-green-600">
                {flags.filter(f => f.status === 'resolved').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Accuracy</p>
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(flags.reduce((acc, flag) => acc + flag.aiConfidence, 0) / flags.length)}%
              </p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">AI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Flag Management</h3>
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Flags ({flags.length})</option>
              <option value="pending">Pending ({flags.filter(f => f.status === 'pending').length})</option>
              <option value="reviewing">Under Review ({flags.filter(f => f.status === 'reviewing').length})</option>
              <option value="resolved">Resolved ({flags.filter(f => f.status === 'resolved').length})</option>
            </select>
          </div>
        </div>
      </div>

      {/* Flags List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="divide-y divide-gray-200">
          {filteredFlags.map((flag) => (
            <div key={flag.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(flag.severity)}`}>
                      {flag.severity}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(flag.status)}`}>
                      {flag.status}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      AI: {flag.aiConfidence}%
                    </span>
                    <span className="text-sm text-gray-500">{flag.timestamp}</span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-1">{flag.rule}</h4>
                  <p className="text-gray-600 mb-3">{flag.description}</p>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Transaction ID:</span>
                        <p className="font-medium text-gray-900">{flag.transaction.id}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <p className="font-medium text-gray-900">{flag.transaction.amount}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Vendor:</span>
                        <p className="font-medium text-gray-900">{flag.transaction.vendor}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Account:</span>
                        <p className="font-medium text-gray-900">{flag.transaction.account}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Assigned to: <strong className="text-gray-900">{flag.assignedTo}</strong></span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setShowFlagDetail(flag)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  {flag.status !== 'resolved' && (
                    <>
                      <button 
                        onClick={() => resolveFlag(flag.id)}
                        className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Resolve
                      </button>
                      <button 
                        onClick={() => assignForReview(flag.id)}
                        className="px-3 py-1 text-sm bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                      >
                        Review
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flag Detail Modal */}
      {showFlagDetail && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setShowFlagDetail(null)}></div>
            <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Flag Details</h3>
                <button
                  onClick={() => setShowFlagDetail(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getSeverityColor(showFlagDetail.severity)}`}>
                    {showFlagDetail.severity}
                  </span>
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(showFlagDetail.status)}`}>
                    {showFlagDetail.status}
                  </span>
                  <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                    AI Confidence: {showFlagDetail.aiConfidence}%
                  </span>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Rule Triggered</h4>
                  <p className="text-gray-600">{showFlagDetail.rule}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">AI Analysis</h4>
                  <p className="text-gray-600">{showFlagDetail.details}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Transaction Details</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">ID:</span>
                        <p className="font-medium">{showFlagDetail.transaction.id}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <p className="font-medium">{showFlagDetail.transaction.amount}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Vendor:</span>
                        <p className="font-medium">{showFlagDetail.transaction.vendor}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Account:</span>
                        <p className="font-medium">{showFlagDetail.transaction.account}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    onClick={() => {
                      resolveFlag(showFlagDetail.id);
                      setShowFlagDetail(null);
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Mark as Resolved
                  </button>
                  <button 
                    onClick={() => {
                      assignForReview(showFlagDetail.id);
                      setShowFlagDetail(null);
                    }}
                    className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Assign for Review
                  </button>
                  <button 
                    onClick={() => {
                      markFalsePositive(showFlagDetail.id);
                      setShowFlagDetail(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    False Positive
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}