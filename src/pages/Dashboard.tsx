import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  FileText,
  Zap,
  Users,
  Play,
  Pause,
  RefreshCw,
  HelpCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { OnboardingTour } from '../components/OnboardingTour';

const realtimeData = [
  { time: '09:00', flags: 2, transactions: 45 },
  { time: '10:00', flags: 1, transactions: 67 },
  { time: '11:00', flags: 4, transactions: 89 },
  { time: '12:00', flags: 0, transactions: 34 },
  { time: '13:00', flags: 3, transactions: 78 },
  { time: '14:00', flags: 1, transactions: 56 },
];

const monthlyData = [
  { month: 'Jan', flags: 24, resolved: 22 },
  { month: 'Feb', flags: 18, resolved: 18 },
  { month: 'Mar', flags: 31, resolved: 28 },
  { month: 'Apr', flags: 22, resolved: 20 },
  { month: 'May', flags: 15, resolved: 15 },
  { month: 'Jun', flags: 8, resolved: 8 },
];

export default function Dashboard() {
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [activeFlags, setActiveFlags] = useState(3);
  const [todayTransactions, setTodayTransactions] = useState(1247);
  const [closingReadiness, setClosingReadiness] = useState(94);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check if user is new (for demo purposes, using localStorage)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('numina-onboarding-seen');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    localStorage.setItem('numina-onboarding-seen', 'true');
  };

  // Simulate real-time updates
  useEffect(() => {
    if (isMonitoring) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
        // Randomly update some metrics to simulate real-time changes
        if (Math.random() > 0.8) {
          setTodayTransactions(prev => prev + Math.floor(Math.random() * 5));
        }
        if (Math.random() > 0.9) {
          setActiveFlags(prev => Math.max(0, prev + (Math.random() > 0.5 ? 1 : -1)));
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isMonitoring]);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  const runClosingCheck = () => {
    // Simulate running a closing check
    setClosingReadiness(Math.floor(Math.random() * 10) + 90);
    alert('Closing check initiated! Results will be available in the Reports section.');
  };

  const createRule = () => {
    window.location.href = '/rules';
  };

  const viewReports = () => {
    window.location.href = '/reports';
  };

  const manageAccess = () => {
    alert('Access management feature - would integrate with your authentication system');
  };

  const refreshData = () => {
    setLastUpdate(new Date());
    setTodayTransactions(prev => prev + Math.floor(Math.random() * 20));
    alert('Data refreshed successfully!');
  };

  const showTour = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="space-y-6">
      {/* Onboarding Tour */}
      <OnboardingTour isOpen={showOnboarding} onClose={handleOnboardingClose} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Real-time Financial Control Center</h1>
            <p className="mt-2 text-gray-600">AI-powered anomaly detection enabling continuous financial closing</p>
            <p className="text-sm text-gray-500 mt-1">Last updated: {lastUpdate.toLocaleTimeString()}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={showTour}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              How it Works
            </button>
            <button
              onClick={toggleMonitoring}
              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                isMonitoring 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isMonitoring ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isMonitoring ? 'Pause Monitoring' : 'Resume Monitoring'}
            </button>
            <button
              onClick={refreshData}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">AI Monitoring</p>
              <p className={`text-2xl font-bold ${isMonitoring ? 'text-green-600' : 'text-red-600'}`}>
                {isMonitoring ? 'Active' : 'Paused'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              isMonitoring ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <Zap className={`w-6 h-6 ${isMonitoring ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="ml-2 text-sm text-gray-600">
              {isMonitoring ? 'Real-time processing' : 'Monitoring paused'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Flags</p>
              <p className="text-2xl font-bold text-red-600">{activeFlags}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-4">
            <button 
              onClick={() => window.location.href = '/monitoring'}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View details →
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Transactions</p>
              <p className="text-2xl font-bold text-blue-600">{todayTransactions.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600">↑ 12% from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Closing Readiness</p>
              <p className="text-2xl font-bold text-green-600">{closingReadiness}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full transition-all duration-500" style={{ width: `${closingReadiness}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={realtimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="flags" stroke="#dc2626" strokeWidth={2} name="Flags" />
              <Line type="monotone" dataKey="transactions" stroke="#2563eb" strokeWidth={2} name="Transactions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Flag Resolution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="flags" fill="#ef4444" name="Flags Detected" />
              <Bar dataKey="resolved" fill="#22c55e" name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Flags & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Anomaly Flags</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { id: 1, rule: 'Duplicate invoice detection', amount: '$2,450.00', status: 'critical', time: '2 min ago', description: 'AI detected potential duplicate invoice from Office Supplies Inc.' },
                { id: 2, rule: 'Expense threshold exceeded', amount: '$15,000.00', status: 'warning', time: '15 min ago', description: 'Single expense exceeds $10,000 threshold for IT Equipment' },
                { id: 3, rule: 'Unusual vendor payment', amount: '$8,750.00', status: 'resolved', time: '1 hour ago', description: 'Payment to new vendor flagged and verified' },
              ].map((flag) => (
                <div key={flag.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      flag.status === 'critical' ? 'bg-red-500' :
                      flag.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{flag.rule}</p>
                      <p className="text-sm text-gray-600">{flag.description}</p>
                      <p className="text-sm font-medium text-gray-900">{flag.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{flag.time}</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      flag.status === 'critical' ? 'bg-red-100 text-red-800' :
                      flag.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {flag.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Connections</span>
              <span className="text-sm font-medium text-green-600">5/5 Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Rule Engine</span>
              <span className="text-sm font-medium text-green-600">Optimal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Data Sync</span>
              <span className="text-sm font-medium text-green-600">Real-time</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Backup</span>
              <span className="text-sm font-medium text-gray-600">5 min ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Processing Speed</span>
              <span className="text-sm font-medium text-green-600">0.3s avg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button 
            onClick={createRule}
            className="flex items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
          >
            <FileText className="w-5 h-5 text-blue-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-blue-600">Create AI Rule</span>
          </button>
          <button 
            onClick={runClosingCheck}
            className="flex items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
          >
            <CheckCircle className="w-5 h-5 text-green-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-green-600">Run Closing Check</span>
          </button>
          <button 
            onClick={viewReports}
            className="flex items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
          >
            <TrendingUp className="w-5 h-5 text-purple-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-purple-600">View Analytics</span>
          </button>
          <button 
            onClick={manageAccess}
            className="flex items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
          >
            <Users className="w-5 h-5 text-orange-600 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-orange-600">Manage Access</span>
          </button>
        </div>
      </div>

      {/* AI-Powered Features Highlight */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Continuous Closing</h3>
            <p className="text-gray-700 mb-4">
              Numina's AI engine continuously monitors your financial data, applying custom rules you define in plain English. 
              Our system enables real-time closing by detecting anomalies the moment they occur, not weeks later.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Natural language rule creation</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Real-time anomaly detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">Continuous closing readiness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}