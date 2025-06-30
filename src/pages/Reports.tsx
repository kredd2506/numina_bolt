import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, PieChart, BarChart3, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

export function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');

  const flagTrendData = [
    { date: '2024-01-01', flags: 12, resolved: 11 },
    { date: '2024-01-08', flags: 8, resolved: 8 },
    { date: '2024-01-15', flags: 15, resolved: 13 },
    { date: '2024-01-22', flags: 6, resolved: 6 },
    { date: '2024-01-29', flags: 11, resolved: 9 },
  ];

  const severityData = [
    { name: 'Critical', value: 15, color: '#ef4444' },
    { name: 'Warning', value: 28, color: '#f59e0b' },
    { name: 'Medium', value: 22, color: '#f97316' },
    { name: 'Low', value: 35, color: '#3b82f6' },
  ];

  const rulePerformanceData = [
    { rule: 'Duplicate Invoice', triggered: 24, accuracy: 95 },
    { rule: 'Expense Threshold', triggered: 18, accuracy: 98 },
    { rule: 'Unusual Vendor', triggered: 12, accuracy: 89 },
    { rule: 'Weekend Transactions', triggered: 8, accuracy: 76 },
  ];

  const resolutionData = [
    { timeRange: '0-1h', count: 45 },
    { timeRange: '1-4h', count: 32 },
    { timeRange: '4-8h', count: 18 },
    { timeRange: '8-24h', count: 12 },
    { timeRange: '1-3d', count: 5 },
    { timeRange: '3d+', count: 2 },
  ];

  const exportToPDF = () => {
    // Simulate PDF export
    const reportData = {
      period: selectedPeriod,
      totalFlags: 156,
      resolutionRate: 94,
      avgResolutionTime: '2.3h',
      costSavings: '$47K',
      flagTrends: flagTrendData,
      severityDistribution: severityData,
      rulePerformance: rulePerformanceData
    };

    // Create a blob with report data
    const reportContent = `
NUMINA FINANCIAL ANOMALY DETECTION REPORT
Generated: ${new Date().toLocaleDateString()}
Period: ${selectedPeriod}

SUMMARY METRICS:
- Total Flags: 156
- Resolution Rate: 94%
- Average Resolution Time: 2.3h
- Cost Savings: $47K

FLAG TRENDS:
${flagTrendData.map(item => `${item.date}: ${item.flags} flags, ${item.resolved} resolved`).join('\n')}

SEVERITY DISTRIBUTION:
${severityData.map(item => `${item.name}: ${item.value} flags`).join('\n')}

RULE PERFORMANCE:
${rulePerformanceData.map(item => `${item.rule}: ${item.triggered} triggers, ${item.accuracy}% accuracy`).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `numina-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('PDF Report downloaded successfully! (Note: This is a demo - actual implementation would generate a formatted PDF)');
  };

  const exportToExcel = () => {
    // Simulate Excel export
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Flags', '156'],
      ['Resolution Rate', '94%'],
      ['Average Resolution Time', '2.3h'],
      ['Cost Savings', '$47K'],
      [''],
      ['Date', 'Flags', 'Resolved'],
      ...flagTrendData.map(item => [item.date, item.flags, item.resolved]),
      [''],
      ['Severity', 'Count'],
      ...severityData.map(item => [item.name, item.value]),
      [''],
      ['Rule', 'Triggered', 'Accuracy'],
      ...rulePerformanceData.map(item => [item.rule, item.triggered, `${item.accuracy}%`])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `numina-data-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Excel data exported successfully! (CSV format for demo purposes)');
  };

  const shareDashboard = () => {
    // Simulate dashboard sharing
    const shareUrl = `${window.location.origin}/shared-dashboard/${Date.now()}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert(`Dashboard link copied to clipboard!\n\nShare URL: ${shareUrl}\n\nNote: This is a demo URL - actual implementation would generate secure, time-limited sharing links.`);
    }).catch(() => {
      alert(`Dashboard sharing link generated:\n\n${shareUrl}\n\nNote: This is a demo URL - actual implementation would generate secure, time-limited sharing links.`);
    });
  };

  const exportMainReport = () => {
    // Main export functionality
    const reportData = {
      period: selectedPeriod,
      generatedAt: new Date().toISOString(),
      summary: {
        totalFlags: 156,
        resolutionRate: 94,
        avgResolutionTime: '2.3h',
        costSavings: '$47K'
      },
      charts: {
        flagTrends: flagTrendData,
        severityDistribution: severityData,
        rulePerformance: rulePerformanceData,
        resolutionTimes: resolutionData
      }
    };

    const jsonContent = JSON.stringify(reportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `numina-complete-report-${selectedPeriod}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    alert('Complete report exported successfully! This includes all data and can be imported into other systems.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="mt-2 text-gray-600">Comprehensive insights into your financial monitoring performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
          <button 
            onClick={exportMainReport}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Flags</p>
              <p className="text-2xl font-bold text-blue-600">156</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600">↓ 12% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
              <p className="text-2xl font-bold text-green-600">94%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-600" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600">↑ 3% from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-purple-600">2.3h</p>
            </div>
            <Calendar className="w-8 h-8 text-purple-600" />
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600">↓ 0.8h from last period</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cost Savings</p>
              <p className="text-2xl font-bold text-green-600">$47K</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">$</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-sm text-green-600">Prevented losses</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flag Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Flag Detection Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={flagTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="flags" stroke="#ef4444" strokeWidth={2} name="Flags Detected" />
              <Line type="monotone" dataKey="resolved" stroke="#22c55e" strokeWidth={2} name="Resolved" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Severity Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Flag Severity Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                dataKey="value"
                data={severityData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>

        {/* Rule Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rule Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rulePerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rule" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="triggered" fill="#3b82f6" name="Times Triggered" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resolution Time Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resolution Time Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={resolutionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeRange" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" name="Number of Flags" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Rules by Accuracy */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Rule Accuracy Rankings</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {rulePerformanceData.map((rule, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{rule.rule}</p>
                    <p className="text-sm text-gray-600">{rule.triggered} triggers</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{rule.accuracy}%</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${rule.accuracy}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">System Performance Metrics</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Average Processing Time</span>
                <span className="font-medium text-gray-900">0.3 seconds</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">System Uptime</span>
                <span className="font-medium text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">False Positive Rate</span>
                <span className="font-medium text-gray-900">2.1%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Transactions Processed</span>
                <span className="font-medium text-gray-900">45,678</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Data Sources Connected</span>
                <span className="font-medium text-gray-900">5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export & Sharing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={exportToPDF}
            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <FileText className="w-5 h-5 text-gray-600 mr-2 group-hover:text-blue-600 transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">PDF Report</span>
          </button>
          <button 
            onClick={exportToExcel}
            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <BarChart3 className="w-5 h-5 text-gray-600 mr-2 group-hover:text-green-600 transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition-colors">Excel Export</span>
          </button>
          <button 
            onClick={shareDashboard}
            className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors group"
          >
            <PieChart className="w-5 h-5 text-gray-600 mr-2 group-hover:text-purple-600 transition-colors" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700 transition-colors">Dashboard Link</span>
          </button>
        </div>
      </div>
    </div>
  );
}