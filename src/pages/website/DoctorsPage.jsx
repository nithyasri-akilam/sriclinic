import DoctorProfile from '../../Components/website/DoctorProfile';
import { motion } from 'framer-motion';
import { Heart, Brain, Baby, Activity, FlaskConical, Bone } from 'lucide-react';

const specialties = [
  {
    name: 'Cardiology',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=300&h=300',
    desc: 'Expert heart care including diagnostics, surgery, and preventive wellness programs.'
  },
  {
    name: 'Neurology',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=300&h=300',
    desc: 'Specialized treatment for brain, spine, and neurological disorders with advanced tech.'
  },
  {
    name: 'Pediatrics',
    image: 'https://images.unsplash.com/photo-1502781259889-38fe4b172ba7?auto=format&fit=crop&q=80&w=300&h=300',
    desc: 'Compassionate medical care for infants, children, and adolescents throughout development.'
  },
  {
    name: 'Oncology',
    image: 'https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&q=80&w=300&h=300',
    desc: 'Comprehensive cancer treatment focusing on early detection and personalized therapies.'
  },
  {
    name: 'Dermatology',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300&h=300',
    desc: 'Clinical and cosmetic skin care solutions tailored to your unique dermatological needs.'
  },
  {
    name: 'Orthopedics',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300&h=300',
    desc: 'Bone and joint specialists providing surgical and non-surgical recovery pathways.'
  }
];

export default function DoctorsPage() {
  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      <div className="bg-brand py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 rounded-l-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent/5 rounded-r-full blur-3xl -z-10" />

        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter"
          >
            Meet Our <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">Experts</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto font-medium"
          >
            Dedicated experts providing world-class medical care with a personal touch.
          </motion.p>
        </div>
      </div>

      <DoctorProfile />

      <section className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-brand mb-12 uppercase tracking-tight">Our Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {specialties.map((spec, i) => {
              return (
                <motion.div
                  key={spec.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:border-accent hover:shadow-xl transition-all cursor-pointer group text-left"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 overflow-hidden border border-slate-100 group-hover:border-accent transition-all">
                    <img
                      src={spec.image}
                      alt={spec.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100"
                    />
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-xl tracking-tight mb-3 group-hover:text-accent transition-colors">{spec.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {spec.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
