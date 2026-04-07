import Hero from '../../Components/website/Hero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Services from '../../Components/website/Services';
import About from '../../Components/website/About';
import DoctorProfile from '../../Components/website/DoctorProfile';

export default function Home() {
  return (
    <div className="animate-fade-in space-y-0">
      <Hero />

      {/* Short Landing CTA section - much tighter */}
      <section className="py-6 md:py-8 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-3xl font-extrabold text-brand tracking-tight leading-tight"
          >
            Ready to experience better health?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-row gap-2 justify-center pt-2"
          >
            <Link to="/book" className="flex-1 sm:flex-none btn-simple btn-accent text-[11px] md:text-sm font-bold shadow-lg shadow-accent/20 px-2 sm:px-8 py-3">
              Request Appointment
            </Link>
            <Link to="/services" className="flex-1 sm:flex-none btn-simple bg-brand text-white hover:bg-slate-800 text-[11px] md:text-sm font-bold px-2 sm:px-8 py-3">
              Browse Services
            </Link>
          </motion.div>
        </div>
      </section>

      <Services />

      {/* Featured Doctors Section */}
      <div className="bg-slate-50 py-12 md:py-20 border-y border-slate-100">
        <div className="container mx-auto px-6 text-center max-w-4xl mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-brand mb-4">OUR EXPERT <span className="text-accent underline decoration-4 underline-offset-4">SPECIALISTS</span></h2>
          <p className="text-slate-500 font-medium">World-class medical professionals dedicated to your health and well-ability.</p>
        </div>
        <div className="overflow-hidden">
          <DoctorProfile hideHeader={true} />
          <div className="text-center mt-12">
            <Link to="/doctors" className="btn-simple bg-brand text-white hover:bg-slate-800 px-10 py-4 font-bold text-sm tracking-widest uppercase">
              View All Specialists
            </Link>
          </div>
        </div>
      </div>

      <About />
    </div>
  );
}
