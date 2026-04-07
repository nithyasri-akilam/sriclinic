import { HeartPulse, Stethoscope, Microscope, BrainCircuit, Activity, Syringe } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <HeartPulse size={32} className="text-accent" />,
    title: 'Cardiology Clinic',
    description: 'Comprehensive heart care, from routine checkups to advanced diagnostics and treatments.'
  },
  {
    icon: <Stethoscope size={32} className="text-accent" />,
    title: 'General Consultation',
    description: 'Expert medical advice and health management for your everyday wellness needs.'
  },
  {
    icon: <Microscope size={32} className="text-accent" />,
    title: 'Laboratory Tests',
    description: 'Accurate and timely lab results to ensure precise diagnosis and effective treatment plans.'
  },
  {
    icon: <BrainCircuit size={32} className="text-accent" />,
    title: 'Neurology Consultation',
    description: 'Specialized care for neurological disorders with advanced treatment methodologies.'
  },
  {
    icon: <Activity size={32} className="text-accent" />,
    title: 'Health Checkups',
    description: 'Preventive health screening packages tailored for all age groups and lifestyles.'
  },
  {
    icon: <Syringe size={32} className="text-accent" />,
    title: 'Vaccinations',
    description: 'Complete immunization programs for adults and children following global standards.'
  }
];

export default function Services() {
  const cardVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.98 },
    visible: (i) => ({ 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.5, delay: i * 0.1 } 
    })
  };

  return (
    <section id="services" className="pt-2 pb-6 md:pt-4 md:pb-8 bg-slate-50 border-y border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-6 space-y-2 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl md:text-4xl font-extrabold text-brand tracking-tight"
          >
            Specialist Services
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-lg text-slate-500 leading-relaxed font-medium"
          >
            We provide a wide range of medical services with a minimalist focus on patient outcomes and state-of-the-art care.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 bg-white border border-slate-100 rounded-minimal shadow-sm hover:border-accent/40 group relative overflow-hidden transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-minimal bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 transition-colors group-hover:bg-accent/5">
                {service.icon}
              </div>
              <h3 className="font-bold text-xl mb-4 text-brand">{service.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">{service.description}</p>
              
              {/* Minimal decoration */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="w-1.5 h-1.5 bg-accent/40 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
