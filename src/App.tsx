import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import { Rules } from './pages/Rules';
import { Integrations } from './pages/Integrations';
import { Monitoring } from './pages/Monitoring';
import { Reports } from './pages/Reports';
import { DataIngestion } from './pages/DataIngestion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/rules" element={
          <Layout>
            <Rules />
          </Layout>
        } />
        <Route path="/integrations" element={
          <Layout>
            <Integrations />
          </Layout>
        } />
        <Route path="/monitoring" element={
          <Layout>
            <Monitoring />
          </Layout>
        } />
        <Route path="/reports" element={
          <Layout>
            <Reports />
          </Layout>
        } />
        <Route path="/data" element={
          <Layout>
            <DataIngestion />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;