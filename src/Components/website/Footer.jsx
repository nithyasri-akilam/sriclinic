import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-brand text-white border-t border-slate-800 py-16 md:py-20 overflow-hidden relative isolate">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
        
        <div className="space-y-8">
          <div className="flex items-center gap-3 font-extrabold text-2xl text-white group transition-colors hover:text-accent">
            <img src="/logo.jpg" alt="Sri Clinic Logo" className="h-10 w-10 object-contain rounded-full bg-white p-0.5" />
            <span>Sri Clinic</span>
          </div>
          <p className="text-slate-400 font-medium leading-relaxed max-w-sm">
            Professional medical services tailored for your well-being. Dedicated to clinical excellence and personalized patient care since 2009.
          </p>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h4 className="font-bold text-sm text-white uppercase tracking-widest pl-1">Clinical Specialties</h4>
          <ul className="space-y-3 pl-1 text-[13px] text-slate-400 font-bold">
            {['Cardiology', 'General Consultation', 'Neurology', 'Lab Testing', 'Vaccinations'].map((service, i) => (
              <li key={i} className="hover:text-accent cursor-pointer transition-colors w-fit underline-offset-4 hover:underline">
                {service}
              </li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          <h4 className="font-bold text-sm text-white uppercase tracking-widest pl-1">Contact Info</h4>
          <ul className="space-y-5 pl-1 text-[13px] text-slate-400 font-bold">
            <li className="flex gap-4 items-start group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                <MapPin size={14} className="text-accent group-hover:text-white transition-colors" />
              </div>
              <span className="leading-tight pt-1">123 Health Avenue, Medical City, TX 75001</span>
            </li>
            <li className="flex gap-4 items-center group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                <Phone size={14} className="text-accent group-hover:text-white transition-colors" />
              </div>
              <span>+1 (555) 123-4567</span>
            </li>
            <li className="flex gap-4 items-center group">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                <Mail size={14} className="text-accent group-hover:text-white transition-colors" />
              </div>
              <span>contact@drkesav.com</span>
            </li>
          </ul>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <h4 className="font-bold text-sm text-white uppercase tracking-widest pl-1">Clinic Schedule</h4>
          <div className="bg-slate-800 border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
             <ul className="space-y-4 text-xs text-slate-400 font-bold">
                <li className="flex items-center justify-between pb-3 border-b border-slate-700 last:border-0 last:pb-0">
                  <span className="flex items-center gap-2"><Clock size={14} className="text-accent" /> Mon - Fri</span>
                  <span className="text-white">8AM - 6PM</span>
                </li>
                <li className="flex items-center justify-between pb-3 border-b border-slate-700 last:border-0 last:pb-0">
                  <span className="flex items-center gap-2"><Clock size={14} className="text-accent" /> Saturday</span>
                  <span className="text-white">9AM - 2PM</span>
                </li>
                <li className="flex items-center justify-between last:pb-0">
                  <span className="flex items-center gap-2"><Clock size={14} className="text-accent" /> Sunday</span>
                  <span className="text-rose-400">Closed</span>
                </li>
             </ul>
          </div>
        </motion.div>
      </div>
      
      <div className="container mx-auto px-6 mt-16 md:mt-24 pt-8 border-t border-slate-800 text-center text-[10px] text-slate-500 font-extrabold uppercase tracking-widest">
        &copy; {new Date().getFullYear()} Dr. Kesav Medical Practice. All rights reserved globally.
      </div>
      
      {/* Decorative hints - very subtle */}
      <div className="absolute -z-10 -bottom-24 -left-24 w-80 h-80 bg-accent/10 rounded-full blur-[120px]"></div>
    </footer>
  );
}
