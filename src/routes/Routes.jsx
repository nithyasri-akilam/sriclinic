import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLayout from '../pages/LayOut';
//import Dashboard from '../pages/Dashboard';
import WelcomeDashboard from '../pages/WelcomeDashboard';
import CustomerPage from '../pages/CustomerPage';
import NewCustomer from '../pages/NewCustomer';
import RegPatients from '../pages/RegMembers';
import VisitorHistory from '../pages/visiterhistory';
import TodayVisitor from '../pages/TodayVisitor';
import { PublicLayout } from './public.routes.jsx';
import Home from '../pages/website/Home.jsx';
import AboutPage from '../pages/website/AboutPage.jsx';
import ServicesPage from '../pages/website/ServicesPage.jsx';
import DoctorsPage from '../pages/website/DoctorsPage.jsx';
import DoctorDetail from '../pages/website/DoctorDetail.jsx';
import Booking from '../pages/website/Booking.jsx';

function StaticRouter() {
  return (
    <Router>
      <Routes>

        {/* ✅ Routes WITH Navbar */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/book" element={<Booking />} />
        </Route>

        {/* ❌ Routes WITHOUT Navbar */}
        <Route path="/login" element={<>login</>} />
        <Route path="/401" element={<>401</>} />

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<WelcomeDashboard />} />
          <Route path="todayvisitor" element={<TodayVisitor />} />
          <Route path="CustomerPage" element={<CustomerPage />} />
          <Route path="NewCustomer" element={<NewCustomer />} />
          <Route path="RegMembers" element={<RegPatients />} />
          <Route path="VisitorHistory" element={<VisitorHistory />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<>not found</>} />

      </Routes>
    </Router>
  );
}

export default StaticRouter;