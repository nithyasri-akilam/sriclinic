import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doctors } from '../../data/doctors';
import { Star, Award, Clock, Phone, Mail, MapPin, ChevronLeft, Calendar, ShieldCheck } from 'lucide-react';

export default function DoctorDetail() {
  const { id } = useParams();
  const doctor = doctors.find(d => d.id === parseInt(id));

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-brand mb-4">Doctor Not Found</h2>
        <Link to="/doctors" className="btn-simple btn-accent font-bold">
          Back to Specialists
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-brand text-white pt-24 pb-48 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 rounded-l-full blur-3xl -z-10" />
        <div className="container mx-auto px-6">
          <Link to="/doctors" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-12 font-medium">
            <ChevronLeft size={20} />
            Back to Specialists
          </Link>
          <div className="max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-4"
            >
              {doctor.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap items-center gap-4"
            >
              <span className="bg-accent px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
                {doctor.specialty}
              </span>
              <div className="flex items-center gap-1.5 text-yellow-400">
                <Star size={18} fill="currentColor" />
                <span className="text-lg font-bold text-white">{doctor.rating}</span>
                <span className="text-slate-400 text-sm font-medium">({doctor.reviews} Reviews)</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column - Image & Contact */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-3 rounded-3xl shadow-xl border border-slate-100"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full aspect-square object-cover rounded-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100"
            >
              <h3 className="text-xl font-bold text-brand mb-6 flex items-center gap-2">
                <Phone size={20} className="text-accent" />
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Phone</p>
                    <p className="text-slate-700 font-medium">{doctor.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Email</p>
                    <p className="text-slate-700 font-medium">{doctor.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-slate-400" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Location</p>
                    <p className="text-slate-700 font-medium">{doctor.contact.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Info */}
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-brand mb-6 tracking-tight">Biography</h2>
              <p className="text-slate-600 leading-relaxed mb-8 text-lg">
                {doctor.fullDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Qualifications</h4>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <Award size={20} className="text-accent" />
                      {doctor.education}
                    </li>
                    <li className="flex items-center gap-3 text-slate-700 font-medium">
                      <ShieldCheck size={20} className="text-accent" />
                      {doctor.experience} Experience
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Availability</h4>
                  <p className="flex items-center gap-3 text-slate-700 font-medium">
                    <Clock size={20} className="text-accent" />
                    {doctor.availability}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100"
            >
              <h2 className="text-2xl font-bold text-brand mb-6 tracking-tight">Core Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {doctor.achievements.map((achievement, i) => (
                  <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center mb-4 text-white shadow-lg shadow-accent/20">
                      <Star size={18} fill="currentColor" />
                    </div>
                    <p className="text-sm font-bold text-brand leading-snug">{achievement}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-accent rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8"
            >
              <div>
                <h3 className="text-3xl font-black mb-2">Book an Appointment</h3>
                <p className="text-accent-foreground/80 font-medium">Schedule your consultation with {doctor.name.split(' ')[1]} today.</p>
              </div>
              <Link to="/book" className="bg-white text-accent px-10 py-4 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform">
                Book Visit Now
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
