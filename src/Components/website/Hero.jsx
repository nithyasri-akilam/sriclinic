import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, ShieldCheck, Activity } from 'lucide-react';
import CountUp from 'react-countup';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="home" className="py-4 md:py-8 bg-white flex items-center min-h-[50vh] overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center lg:text-left space-y-4"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-minimal bg-slate-50 border border-slate-100 text-slate-500 text-xs font-semibold tracking-wide uppercase">
            <Activity size={14} className="text-accent" /> Professional Medical Service
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-2xl md:text-5xl lg:text-5xl font-extrabold text-brand leading-tight">
            Healthcare designed <br />
            <span className="text-accent font-semibold tracking-tight">around your lifestyle.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-sm md:text-lg text-slate-500 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Dr. Kesav provides world-class medical consultation with a focus on modern diagnostics and personalized patient well-being.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-row gap-2 justify-center lg:justify-start pt-1">
            <Link to="/book" className="flex-1 sm:flex-none btn-simple btn-accent group text-[11px] md:text-sm font-bold shadow-md shadow-accent/20 px-2 sm:px-5">
              Book Appointment <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform sm:block hidden" />
            </Link>
            <a href="#services" className="flex-1 sm:flex-none btn-simple bg-brand text-white hover:bg-slate-800 text-[11px] md:text-sm font-bold px-2 sm:px-5">
              View Services
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-3 border-t border-slate-50 max-w-fit lg:mx-0 mx-auto">
            <div className="flex flex-col">
              <span className="font-extrabold text-brand text-lg md:text-2xl">10k+</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Patients</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-brand text-lg md:text-2xl">15+</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Exp Years</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-brand text-lg md:text-2xl">4.9</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Rating</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="hidden lg:block relative"
        >
          <div className="relative w-full aspect-square bg-slate-50 rounded-minimal overflow-hidden shadow-2xl border border-slate-100">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2670&auto=format&fit=crop" alt="Doctor profile" className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-sm border border-slate-100 rounded-minimal shadow-sm flex items-center gap-2">
              <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center shadow-md shadow-accent/30">
                <ShieldCheck size={18} />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-[11px]">Certified Professional</div>
                <div className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest">Specialist Doctor</div>
              </div>
            </div>
          </div>
          <div className="absolute -z-10 -bottom-8 -right-8 w-40 h-40 bg-accent/5 rounded-full blur-[60px]"></div>
        </motion.div>
      </div>
    </section>
  );
}
