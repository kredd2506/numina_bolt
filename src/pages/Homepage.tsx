import React from 'react';
import { ArrowRight, Shield, Zap, CheckCircle, Users, Clock, DollarSign, AlertTriangle, Target, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';

export default function Homepage() {
  const navigate = useNavigate();

  const stats = [
    { value: "99.2%", label: "Detection Accuracy", icon: <CheckCircle className="w-6 h-6" /> },
    { value: "0.3s", label: "Processing Speed", icon: <Clock className="w-6 h-6" /> },
    { value: "500+", label: "Enterprise Clients", icon: <Users className="w-6 h-6" /> },
    { value: "$2.4M", label: "Losses Prevented", icon: <DollarSign className="w-6 h-6" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Bolt.new Badge - Top Right */}
      <div className="fixed top-4 right-4 z-50">
        <a 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:scale-105 transition-transform duration-200"
        >
          <img 
            src="/white_circle_360x360.png" 
            alt="Made with Bolt.new" 
            className="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg hover:drop-shadow-xl transition-all duration-200"
          />
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Greek-inspired decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-blue-400 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-4 border-purple-400 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 border-4 border-indigo-400 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Logo and Brand */}
            <Transition
              appear={true}
              show={true}
              enter="transition-all duration-1000"
              enterFrom="opacity-0 scale-95 translate-y-8"
              enterTo="opacity-100 scale-100 translate-y-0"
            >
              <div className="flex flex-col items-center justify-center mb-8">
                <img 
                  src="/numina .jpg" 
                  alt="Numina Logo" 
                  className="w-32 h-32 md:w-40 md:h-40 mb-6 object-contain"
                />
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Numina
                </h1>
              </div>
            </Transition>

            {/* Main Headline */}
            <Transition
              appear={true}
              show={true}
              enter="transition-all duration-1000 delay-300"
              enterFrom="opacity-0 translate-y-8"
              enterTo="opacity-100 translate-y-0"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Real-Time Financial
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Anomaly Detection
                </span>
              </h2>
            </Transition>

            <Transition
              appear={true}
              show={true}
              enter="transition-all duration-1000 delay-500"
              enterFrom="opacity-0 translate-y-8"
              enterTo="opacity-100 translate-y-0"
            >
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Transform your financial closing process with AI-powered continuous monitoring. 
                Detect anomalies the moment they occur, not weeks later.
              </p>
            </Transition>

            {/* CTA Buttons */}
            <Transition
              appear={true}
              show={true}
              enter="transition-all duration-1000 delay-700"
              enterFrom="opacity-0 translate-y-8"
              enterTo="opacity-100 translate-y-0"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="inline-flex items-center px-8 py-4 border-2 border-gray-600 text-gray-300 text-lg font-semibold rounded-xl hover:border-blue-400 hover:text-blue-400 transition-all duration-200"
                >
                  View Live Demo
                </button>
              </div>
            </Transition>

            {/* Trust Indicators */}
            <Transition
              appear={true}
              show={true}
              enter="transition-all duration-1000 delay-900"
              enterFrom="opacity-0 translate-y-8"
              enterTo="opacity-100 translate-y-0"
            >
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>500+ Enterprise Clients</span>
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Transition
                key={index}
                appear={true}
                show={true}
                enter={`transition-all duration-1000 delay-${(index + 1) * 200}`}
                enterFrom="opacity-0 scale-95 translate-y-8"
                enterTo="opacity-100 scale-100 translate-y-0"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900/50 rounded-full mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
              PROBLEM
            </h3>
          </div>

          <div className="space-y-12">
            {/* Main Problem */}
            <div className="text-center">
              <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                Financial analysts are overwhelmed with information,
                <span className="block text-red-400 font-semibold">scattered tools and notes block real insight.</span>
              </p>
            </div>

            {/* Context Switching Issue */}
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-700/50">
              <p className="text-xl text-gray-200 text-center leading-relaxed">
                Analysts juggle between apps to complete one task
              </p>
              <p className="text-lg text-gray-300 text-center mt-4 leading-relaxed">
                It's always easier to ask someone who's been there and done that before, but the real pain is having 
                <span className="font-semibold text-red-400"> no way around the endless context switching</span> needed to complete one task.
              </p>
              <p className="text-lg text-gray-300 text-center mt-4 leading-relaxed">
                The challenge intensifies when multiple tasks stack up, amplifying inefficiency and cognitive load.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
              WHY NOW?
            </h3>
          </div>

          <div className="space-y-8">
            <div className="text-center">
              <p className="text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                However, for coding, there is a tool for almost everything:
              </p>
            </div>

            <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-700/50 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
                <span className="text-2xl font-bold text-white">C</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Cursor (Anysphere)</h4>
              <p className="text-3xl font-bold text-green-400 mb-2">Valued at $2.5B*</p>
              <p className="text-gray-300">The AI-powered code editor that revolutionized development</p>
            </div>

            <div className="text-center">
              <p className="text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                We are building <span className="font-bold text-blue-400">Numina</span> because 
                <span className="font-bold text-red-400"> there is no Cursor for finance.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-900/50 rounded-full mb-6">
              <Lightbulb className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Vision
            </h3>
          </div>

          <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-gray-700/50 text-center">
            <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-medium">
              The first tool to help analysts to 
              <span className="block text-blue-400 font-bold mt-2">complete a task and share it with their team</span>
              <span className="block text-green-400 font-bold mt-2">and execute for them.</span>
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              How Numina Works
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Four simple steps to transform your financial monitoring from reactive to proactive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Connect Data",
                description: "Securely integrate with QuickBooks, Xero, and other financial systems",
                icon: <Shield className="w-8 h-8" />
              },
              {
                step: "02",
                title: "Create Rules",
                description: "Define monitoring rules in plain English using our AI engine",
                icon: <Lightbulb className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Monitor Live",
                description: "Watch as anomalies are detected and flagged in real-time",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "04",
                title: "Analyze Results",
                description: "Review comprehensive reports and optimize your processes",
                icon: <Target className="w-8 h-8" />
              }
            ].map((step, index) => (
              <Transition
                key={index}
                appear={true}
                show={true}
                enter={`transition-all duration-1000 delay-${(index + 1) * 200}`}
                enterFrom="opacity-0 scale-95 translate-y-8"
                enterTo="opacity-100 scale-100 translate-y-0"
              >
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-sm font-bold text-blue-400 border-2 border-blue-400">
                      {step.step}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{step.title}</h4>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              </Transition>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Financial Closing?
          </h3>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join hundreds of finance teams who have eliminated month-end surprises 
            with real-time anomaly detection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/numina .jpg" 
                alt="Numina Logo" 
                className="w-10 h-10 mr-3 object-contain"
              />
              <span className="text-2xl font-bold">Numina</span>
            </div>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Real-time AI-powered financial anomaly detection for continuous closing readiness.
            </p>
            
            {/* Created by section with LinkedIn links */}
            <div className="mb-8">
              <p className="text-gray-400 mb-4">Created by</p>
              <div className="flex justify-center space-x-8">
                <a 
                  href="https://www.linkedin.com/in/manishkreddy/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">in</span>
                  </div>
                  <span className="font-medium">Manish</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/harshul-chandrasekhar/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">in</span>
                  </div>
                  <span className="font-medium">Harshul</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Numina. All rights reserved.
            </p>
            
            {/* Bolt.new Badge - Bottom Right */}
            <div className="mt-4 md:mt-0">
              <a 
                href="https://bolt.new/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
              >
                <span className="text-sm">Powered by</span>
                <img 
                  src="/white_circle_360x360.png" 
                  alt="Made with Bolt.new" 
                  className="w-8 h-8 hover:scale-110 transition-transform duration-200"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}