import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, CheckCircle, Zap, Brain, Shield, TrendingUp } from 'lucide-react';

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Welcome to Numina",
      subtitle: "AI-Powered Real-Time Financial Anomaly Detection",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600 text-lg">
              Transform your financial closing process from reactive to proactive with AI-powered continuous monitoring.
            </p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What makes Numina different?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Real-time anomaly detection as transactions occur</li>
              <li>• Natural language rule creation - no coding required</li>
              <li>• Continuous closing readiness, not periodic surprises</li>
              <li>• Enterprise-grade security with encrypted API connections</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Step 1: Connect Your Data",
      subtitle: "Secure Integration with Your Financial Systems",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Secure Data Connections</h4>
              <p className="text-sm text-gray-600">Enterprise-grade encryption for all API credentials</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <h5 className="font-medium text-gray-900 mb-2">Supported Integrations:</h5>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>QuickBooks Online</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Xero</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Sage Intacct</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>NetSuite</span>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Next:</strong> Go to "Secure Integrations" → Select your accounting software → Enter API credentials
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: Create AI Rules",
      subtitle: "Define Monitoring Rules in Plain English",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Natural Language Rules</h4>
              <p className="text-sm text-gray-600">No coding required - just describe what to watch for</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <h5 className="font-medium text-gray-900 mb-2">Example Rules:</h5>
              <div className="space-y-2 text-sm">
                <div className="bg-gray-50 p-2 rounded">
                  "Flag any expense over $1,000 not tagged as capital expenditure"
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  "Alert me when the same vendor appears more than twice in one day"
                </div>
                <div className="bg-gray-50 p-2 rounded">
                  "Flag transactions occurring on weekends"
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h5 className="font-medium text-blue-900 mb-1">How it works:</h5>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. You describe the rule in plain English</li>
                <li>2. AI converts it to structured logic</li>
                <li>3. You review and confirm the generated rule</li>
                <li>4. Rule is deployed for real-time monitoring</li>
              </ol>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Next:</strong> Go to "AI Rules Engine" → Click "Create AI Rule" → Describe your monitoring needs
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 3: Monitor in Real-Time",
      subtitle: "Live Anomaly Detection and Flag Management",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Live Monitoring Dashboard</h4>
              <p className="text-sm text-gray-600">See anomalies the moment they occur</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <h5 className="font-medium text-gray-900 mb-2">Real-Time Features:</h5>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Instant flag notifications</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Live transaction processing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Immediate resolution tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Continuous closing readiness</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h5 className="font-medium text-green-900 mb-1">Flag Management:</h5>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Review flagged transactions instantly</li>
                <li>• Mark as resolved or false positive</li>
                <li>• Assign to team members for review</li>
                <li>• Track resolution times and accuracy</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Next:</strong> Go to "Live Monitoring" → Review active flags → Resolve or assign for review
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 4: Analyze & Report",
      subtitle: "Comprehensive Analytics and Reporting",
      content: (
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">Analytics & Insights</h4>
              <p className="text-sm text-gray-600">Track performance and identify trends</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <h5 className="font-medium text-gray-900 mb-2">Available Reports:</h5>
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Flag detection trends over time</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Rule performance and accuracy metrics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Resolution time analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Cost savings and ROI tracking</span>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <h5 className="font-medium text-blue-900 mb-1">Export Options:</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• PDF reports for stakeholders</li>
                <li>• Excel/CSV data for analysis</li>
                <li>• Shareable dashboard links</li>
                <li>• Automated report scheduling</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Next:</strong> Go to "Analytics & Reports" → Select time period → Export or share reports
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "You're Ready to Go!",
      subtitle: "Start Your Real-Time Financial Monitoring Journey",
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <p className="text-gray-600 text-lg mb-4">
              You now have everything you need to enable real-time financial closing with Numina!
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Quick Start Checklist:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
                <span>Connect your accounting software in "Secure Integrations"</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
                <span>Create your first AI rule in "AI Rules Engine"</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
                <span>Monitor live flags in "Live Monitoring"</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
                <span>Review analytics in "Analytics & Reports"</span>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-green-800 font-medium">
              🎉 Welcome to the future of financial closing!
            </p>
            <p className="text-sm text-green-700 mt-1">
              Your books will now be continuously audit-ready with real-time anomaly detection.
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={handleClose}></div>
        <div className="relative bg-white rounded-xl shadow-xl max-w-2xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{steps[currentStep].title}</h2>
              <p className="text-sm text-gray-600">{steps[currentStep].subtitle}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
              <span className="text-sm text-gray-600">{Math.round(((currentStep + 1) / steps.length) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {steps[currentStep].content}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                ></div>
              ))}
            </div>

            {currentStep === steps.length - 1 ? (
              <button
                onClick={handleClose}
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Get Started
                <CheckCircle className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}