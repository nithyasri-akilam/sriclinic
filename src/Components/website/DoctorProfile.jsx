import { motion } from 'framer-motion';
import { Star, Award, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { doctors } from '../../data/doctors';

export default function DoctorProfile({ hideHeader = false }) {
  return (
    <section className={`${hideHeader ? 'py-0' : 'py-20'} bg-transparent`}>
      <div className="container mx-auto px-6">
        {!hideHeader && (
          <div className="max-w-3xl mb-16 px-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-accent font-bold text-sm uppercase tracking-widest"
            >
              Meet Our Specialists
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-brand mt-4 mb-6"
            >
              World-Class Care from Expert Physicians
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 font-medium"
            >
              Our team of board-certified specialists is dedicated to providing personalized treatment plans using the latest medical advancements.
            </motion.p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-accent/20 transition-all duration-500 group"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 relative overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="h-64 md:h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-accent px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      {doctor.specialty}
                    </span>
                  </div>
                </div>
                
                <div className="md:w-3/5 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-2xl font-bold text-brand group-hover:text-accent transition-colors">
                        {doctor.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                        <Star size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-bold text-brand">{doctor.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-accent font-bold text-sm mb-4">
                      {doctor.expertise}
                    </p>
                    
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3">
                      {doctor.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Award size={18} className="text-accent/60" />
                        <span className="text-sm font-medium">{doctor.education}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Clock size={18} className="text-accent/60" />
                        <span className="text-sm font-medium">{doctor.availability}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <Link to={`/doctors/${doctor.id}`} className="text-accent font-bold text-sm hover:underline flex items-center gap-2">
                      View full profile
                    </Link>
                    <button className="btn-simple btn-accent text-xs">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
