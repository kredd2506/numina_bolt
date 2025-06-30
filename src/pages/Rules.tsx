import React, { useState } from 'react';
import { Plus, Edit, Trash2, Zap, CheckCircle, AlertTriangle, Brain, Code, Play, Pause } from 'lucide-react';

export function Rules() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newRule, setNewRule] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [generatedRule, setGeneratedRule] = useState(null);
  const [showRulePreview, setShowRulePreview] = useState(false);

  const rules = [
    {
      id: 1,
      name: 'Duplicate Invoice Detection',
      description: 'Flag any invoices with identical amounts from the same vendor within 24 hours',
      naturalLanguage: 'If an invoice amount from the same vendor appears twice within 24 hours, flag it as a potential duplicate',
      status: 'active',
      flagsTriggered: 3,
      lastTriggered: '2 hours ago',
      accuracy: 95,
      generatedLogic: {
        rule_id: "duplicate_invoice_detection",
        conditions: [
          { field: "vendor", operator: "==", value: "same_vendor" },
          { field: "amount", operator: "==", value: "same_amount" },
          { field: "time_diff", operator: "<=", value: 24 }
        ],
        action: "flag",
        reason: "Potential duplicate invoice detected"
      }
    },
    {
      id: 2,
      name: 'Expense Threshold Monitor',
      description: 'Alert when any single expense exceeds $10,000',
      naturalLanguage: 'Alert me when any expense transaction is greater than $10,000',
      status: 'active',
      flagsTriggered: 1,
      lastTriggered: '1 day ago',
      accuracy: 98,
      generatedLogic: {
        rule_id: "expense_threshold_monitor",
        conditions: [
          { field: "amount", operator: ">", value: 10000 },
          { field: "type", operator: "==", value: "expense" }
        ],
        action: "flag",
        reason: "Expense exceeds $10,000 threshold"
      }
    },
    {
      id: 3,
      name: 'Unusual Vendor Payments',
      description: 'Flag payments to vendors not seen in the last 90 days',
      naturalLanguage: 'Flag any payment to a vendor we haven\'t paid in the last 90 days',
      status: 'active',
      flagsTriggered: 0,
      lastTriggered: 'Never',
      accuracy: 89,
      generatedLogic: {
        rule_id: "unusual_vendor_payments",
        conditions: [
          { field: "vendor_last_payment", operator: ">", value: 90 },
          { field: "type", operator: "==", value: "payment" }
        ],
        action: "flag",
        reason: "Payment to vendor not seen in 90+ days"
      }
    },
    {
      id: 4,
      name: 'Weekend Transaction Alert',
      description: 'Monitor transactions occurring during weekends',
      naturalLanguage: 'Alert me of any transactions that occur on weekends',
      status: 'paused',
      flagsTriggered: 5,
      lastTriggered: '3 days ago',
      accuracy: 76,
      generatedLogic: {
        rule_id: "weekend_transaction_alert",
        conditions: [
          { field: "day_of_week", operator: "in", value: ["Saturday", "Sunday"] }
        ],
        action: "flag",
        reason: "Transaction occurred during weekend"
      }
    }
  ];

  const [rulesList, setRulesList] = useState(rules);

  const simulateAIProcessing = async (instruction) => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate a mock rule based on the instruction
    const mockRule = {
      rule_id: instruction.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      description: `AI-generated rule: ${instruction}`,
      conditions: [
        { field: "amount", operator: ">", value: 1000 },
        { field: "category", operator: "!=", value: "Capital Expenditure" }
      ],
      action: "flag",
      reason: `Flagged based on: ${instruction}`,
      category: "ai_generated"
    };
    
    setGeneratedRule(mockRule);
    setIsProcessing(false);
    setShowRulePreview(true);
  };

  const handleCreateRule = async () => {
    if (newRule.trim()) {
      await simulateAIProcessing(newRule);
    }
  };

  const confirmRule = () => {
    if (generatedRule) {
      const newRuleItem = {
        id: rulesList.length + 1,
        name: generatedRule.description,
        description: generatedRule.reason,
        naturalLanguage: newRule,
        status: 'active',
        flagsTriggered: 0,
        lastTriggered: 'Never',
        accuracy: 100,
        generatedLogic: generatedRule
      };
      
      setRulesList([...rulesList, newRuleItem]);
      setNewRule('');
      setGeneratedRule(null);
      setShowCreateForm(false);
      setShowRulePreview(false);
    }
  };

  const toggleRuleStatus = (id) => {
    setRulesList(rulesList.map(rule => 
      rule.id === id 
        ? { ...rule, status: rule.status === 'active' ? 'paused' : 'active' }
        : rule
    ));
  };

  const deleteRule = (id) => {
    if (confirm('Are you sure you want to delete this rule?')) {
      setRulesList(rulesList.filter(rule => rule.id !== id));
    }
  };

  const testRule = (rule) => {
    alert(`Testing rule: ${rule.name}\n\nThis would run the rule against recent transactions to validate its effectiveness.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Rules Engine</h1>
          <p className="mt-2 text-gray-600">Create financial monitoring rules in plain English - powered by advanced AI</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create AI Rule
        </button>
      </div>

      {/* Create Rule Form */}
      {showCreateForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Create New AI Rule</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your rule in plain English
              </label>
              <textarea
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Example: Alert me when any expense from travel category exceeds $5,000 in a single transaction"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                rows={4}
                disabled={isProcessing}
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. AI interprets your natural language instruction</li>
                <li>2. Generates structured validation logic</li>
                <li>3. You review and confirm the generated rule</li>
                <li>4. Rule is deployed for real-time monitoring</li>
              </ol>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={handleCreateRule}
                disabled={!newRule.trim() || isProcessing}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4 mr-2" />
                    Generate Rule
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewRule('');
                  setGeneratedRule(null);
                  setShowRulePreview(false);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rule Preview */}
      {showRulePreview && generatedRule && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Rule Preview</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Natural Language Input:</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mb-4">"{newRule}"</p>
              
              <h4 className="font-medium text-gray-900 mb-2">Generated Logic:</h4>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <pre>{JSON.stringify(generatedRule, null, 2)}</pre>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Rule Summary:</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rule ID:</span>
                  <span className="font-medium">{generatedRule.rule_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Action:</span>
                  <span className="font-medium capitalize">{generatedRule.action}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conditions:</span>
                  <span className="font-medium">{generatedRule.conditions.length}</span>
                </div>
              </div>
              
              <div className="mt-6 space-y-3">
                <button
                  onClick={confirmRule}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm & Deploy Rule
                </button>
                <button
                  onClick={() => setShowRulePreview(false)}
                  className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Modify Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Rules</p>
              <p className="text-2xl font-bold text-blue-600">{rulesList.filter(r => r.status === 'active').length}</p>
            </div>
            <Zap className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Flags Today</p>
              <p className="text-2xl font-bold text-red-600">3</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Auto-Resolved</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Accuracy</p>
              <p className="text-2xl font-bold text-green-600">
                {Math.round(rulesList.reduce((acc, rule) => acc + rule.accuracy, 0) / rulesList.length)}%
              </p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 font-bold">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rules List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Your AI Rules</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {rulesList.map((rule) => (
            <div key={rule.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-medium text-gray-900">{rule.name}</h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      rule.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rule.status}
                    </span>
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {rule.accuracy}% accuracy
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{rule.description}</p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-blue-800">
                      <strong>Natural Language:</strong> "{rule.naturalLanguage}"
                    </p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Code className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">Generated Logic:</span>
                    </div>
                    <pre className="text-xs text-gray-600 overflow-x-auto">
                      {JSON.stringify(rule.generatedLogic, null, 2)}
                    </pre>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>Flags triggered: <strong className="text-gray-900">{rule.flagsTriggered}</strong></span>
                    <span>Last triggered: <strong className="text-gray-900">{rule.lastTriggered}</strong></span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button 
                    onClick={() => testRule(rule)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Test Rule"
                  >
                    <Play className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => toggleRuleStatus(rule.id)}
                    className="p-2 text-gray-400 hover:text-yellow-600 transition-colors"
                    title={rule.status === 'active' ? 'Pause Rule' : 'Activate Rule'}
                  >
                    {rule.status === 'active' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => deleteRule(rule.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Suggested Rules</h3>
            <p className="text-gray-600 mb-4">Based on your transaction patterns, we suggest these additional rules:</p>
            <div className="space-y-3">
              {[
                'Monitor expense reports over $2,500 for required approvals',
                'Flag international wire transfers above $25,000',
                'Alert for vendor payments without matching purchase orders',
                'Detect meals expenses over $500 per transaction',
                'Flag transactions occurring outside business hours'
              ].map((suggestion, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow">
                  <span className="text-gray-800">{suggestion}</span>
                  <button 
                    onClick={() => {
                      setNewRule(suggestion);
                      setShowCreateForm(true);
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Add Rule
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}