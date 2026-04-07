import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle, ChevronRight, MapPin, MessageCircle } from 'lucide-react';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'General Consultation',
    date: '',
    time: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-12 min-h-[60vh] flex items-center justify-center text-center"
      >
        <div className="p-8 bg-white border border-slate-100 rounded-minimal shadow-xl max-w-lg space-y-6">
          <div className="w-16 h-16 bg-accent/10 text-accent flex items-center justify-center rounded-full mx-auto shadow-md shadow-accent/20">
            <CheckCircle size={32} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-brand tracking-tight">Request Received</h2>
            <p className="text-lg text-slate-500 font-medium">
              We've received your appointment request, <span className="text-brand font-bold">{formData.name}</span>. Our clinic staff will review and contact you within the next hour.
            </p>
          </div>
          <button onClick={() => setSubmitted(false)} className="btn-simple bg-slate-900 text-white hover:bg-slate-800 text-sm font-bold w-full">
            Make Another Request
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="py-8 bg-slate-50/20 min-h-[calc(100vh-64px)] relative isolate">
      <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start w-full">

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5 lg:sticky lg:top-8 order-2 lg:order-1"
        >
          <div className="space-y-3">
            <span className="text-accent font-bold tracking-widest uppercase text-xs block">Secure Scheduling</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand tracking-tight leading-tight">
              Consultation <br /> Appointment.
            </h1>
            <p className="text-base text-slate-500 font-medium leading-relaxed max-w-md">
              Connect with leading medical expertise. Your personalized healthcare journey is managed with minimal friction and maximum care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-3">
            <div className="flex gap-4 group">
              <div className="w-10 h-10 bg-white rounded-minimal border border-slate-100 flex items-center justify-center text-accent shadow-sm transition-all group-hover:border-accent/40 group-hover:bg-accent/5">
                <Phone size={18} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">Office Support</span>
                <p className="font-bold text-slate-900 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>


            <div className="flex gap-4 group">
              <div className="w-10 h-10 bg-white rounded-minimal border border-slate-100 flex items-center justify-center text-accent shadow-sm transition-all group-hover:border-accent/40 group-hover:bg-accent/5">
                <Mail size={18} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">Email</span>
                <p className="font-medium text-slate-900 text-sm">contact@drkesav.com</p>
              </div>
            </div>

            <div className="flex gap-4 group">
              <div className="w-10 h-10 bg-white rounded-minimal border border-slate-100 flex items-center justify-center text-accent shadow-sm transition-all group-hover:border-accent/40 group-hover:bg-accent/5">
                <MessageCircle size={18} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">WhatsApp</span>
                <p className="font-medium text-slate-900 text-sm">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex gap-4 group">
              <div className="w-10 h-10 bg-white rounded-minimal border border-slate-100 flex items-center justify-center text-accent shadow-sm transition-all group-hover:border-accent/40 group-hover:bg-accent/5">
                <MapPin size={18} />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest leading-none mb-1">Clinic Address</span>
                <p className="font-medium text-slate-900 text-sm leading-snug">T-4, Third Floor, JC Tower,<br />Karur Bypass Road, Annamalai Nagar,<br />Trichy – 620 018.</p>
              </div>
            </div>
          </div>


        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-minimal border border-slate-100 p-5 md:p-6 shadow-md relative group order-1 lg:order-2"
        >
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 pl-1">Full Name</label>
              <div className="relative group/field">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-accent transition-colors" />
                <input type="text" name="name" className="w-full bg-slate-50/50 border border-slate-100 focus:border-accent focus:bg-white rounded-minimal py-3 px-12 font-normal text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 shadow-inner" placeholder="Enter your full name" required onChange={handleChange} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-600 pl-1">Email Address</label>
                <div className="relative group/field">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-accent transition-colors" />
                  <input type="email" name="email" className="w-full bg-slate-50/50 border border-slate-100 focus:border-accent focus:bg-white rounded-minimal py-3 px-12 font-normal text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 shadow-inner" placeholder="you@email.com" required onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 pl-1">Phone Number</label>
                <div className="relative group/field">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within/field:text-accent transition-colors" />
                  <input type="tel" name="phone" className="w-full bg-slate-50/50 border border-slate-100 focus:border-accent focus:bg-white rounded-minimal py-3 px-12 font-normal text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 shadow-inner" placeholder="+1 (555) 000-0000" required onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 pl-1">Select Service</label>
              <select name="service" className="w-full bg-slate-50/50 border border-slate-100 focus:border-accent focus:bg-white rounded-minimal py-3 px-5 font-normal text-slate-700 outline-none transition-all appearance-none cursor-pointer shadow-inner" required onChange={handleChange}>
                <option>General Consultation</option>
                <option>Cardiology Clinic</option>
                <option>Laboratory Tests</option>
                <option>Neurology Consultation</option>
                <option>Vaccinations</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 pl-1">Preferred Date</label>
                <input type="date" name="date" className="w-full bg-slate-50/50 border border-slate-100 focus:border-accent focus:bg-white rounded-minimal py-3 px-6 font-normal text-slate-700 outline-none transition-all shadow-inner" required onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-600 pl-1">Preferred Time</label>
                <input type="time" name="time" className="w-full bg-slate-50/50 border border-slate-100 focus:border-accent focus:bg-white rounded-minimal py-3 px-6 font-normal text-slate-700 outline-none transition-all shadow-inner" required onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-600 pl-1">Symptoms / Notes <span className="text-slate-400 font-normal">(Optional)</span></label>
              <div className="relative group/field">
                <MessageSquare size={18} className="absolute left-4 top-5 text-slate-300 group-focus-within/field:text-accent transition-colors" />
                <textarea name="notes" className="w-full bg-slate-50/50 border border-slate-100 focus:border-accent focus:bg-white rounded-minimal py-3 px-12 font-normal text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 min-h-[100px] shadow-inner" placeholder="Briefly describe your symptoms or reason for visit..." onChange={handleChange}></textarea>
              </div>
            </div>

            <button type="submit" className="btn-simple btn-accent w-full py-4 text-sm font-semibold shadow-xl shadow-accent/20 mt-2 group/btn overflow-hidden relative">
              <span className="relative z-10 flex items-center justify-center gap-2">Confirm Appointment <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" /></span>
              <div className="absolute top-0 left-[-100%] w-full h-full bg-white/5 skew-x-[-20deg] group-hover:left-[100%] transition-all duration-1000"></div>
            </button>
          </form>
        </motion.div>
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-6 max-w-6xl mt-10">
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <div className="bg-white px-6 py-4 flex items-center gap-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent">
              <MapPin size={16} />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">Find Us Here</p>
              <p className="text-xs text-slate-400 font-medium">T-4, JC Tower, Karur Bypass Road, Annamalai Nagar, Trichy – 620 018</p>
            </div>
          </div>
          <iframe
            title="Dr. Kesav Clinic Location"
            src="https://maps.google.com/maps?q=JC+Tower+Karur+Bypass+Road+Annamalai+Nagar+Trichy+Tamil+Nadu&output=embed&z=15"
            width="100%"
            height="380"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
