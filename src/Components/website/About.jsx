import { CheckCircle2, Award, CalendarHeart, Target, Eye, Users, ShieldCheck, Heart, Stethoscope } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function About() {
  const stats = [
    { label: "Happy Patients", value: "10k+", icon: Users },
    { label: "Years Experience", value: "15+", icon: CalendarHeart },
    { label: "Medical Awards", value: "25+", icon: Award },
    { label: "Surgeries Done", value: "500+", icon: Stethoscope }
  ];

  const values = [
    { title: "Patient First", desc: "Our approach is centered on individual needs and compassionate care.", icon: Heart },
    { title: "Clinical Excellence", desc: "We adhere to the highest standards of medical precision and evidence-based practice.", icon: ShieldCheck },
    { title: "Innovative Tech", desc: "Equipped with state-of-the-art diagnostic tools for accurate assessments.", icon: CheckCircle2 }
  ];

  return (
    <section id="about" className="pt-5 pb-24 bg-white overflow-hidden isolate relative">
      <div className="container mx-auto px-6">

        {/* === Top Section: Hero-style About === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">

          {/* Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=2670&auto=format&fit=crop"
                  alt="Doctor consulting"
                  className="w-full h-64 object-cover rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500"
                />
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&auto=format&fit=crop"
                  alt="Patient care"
                  className="w-full h-48 object-cover rounded-3xl shadow-xl border-4 border-white"
                />
              </div>
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2523&auto=format&fit=crop"
                  alt="Hospital equipment"
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500"
                />
                <div className="bg-accent rounded-3xl p-8 text-white shadow-2xl flex flex-col items-center justify-center text-center">
                  <Award size={40} className="mb-4 text-white/90" />
                  <span className="text-2xl font-black mb-1">BOARD</span>
                  <span className="text-xs font-bold uppercase tracking-[0.2em]">Certified 2024</span>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-5 md:right-10 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 max-w-[240px]">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                <ShieldCheck size={28} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">ISO Certified</p>
                <p className="font-bold text-slate-800 text-sm leading-tight">National Health Standards</p>
              </div>
            </div>
          </motion.div>

          {/* Primary Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="inline-block px-4 py-1 bg-accent/10 text-accent rounded-full font-bold tracking-widest uppercase text-xs">
                Our Commitment
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-brand tracking-tighter leading-[1.1]">
                Leading The Future Of <span className="text-accent">Healthcare</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                Dr. Kesav has dedicated over 15 years to building a medical practice that combines the warmth of traditional care with the precision of modern clinical technology. Our facility is designed to provide a seamless, stress-free health experience for every family member.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Target size={24} />
                </div>
                <h4 className="text-lg font-black text-brand">Our Mission</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  To provide accessible, high-quality medical evaluations that prioritize long-term preventative health over short-term fixes.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                  <Eye size={24} />
                </div>
                <h4 className="text-lg font-black text-brand">Our Vision</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  To be the primary health partner for our community, known for clinical excellence and technological innovation.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-10 flex flex-wrap gap-4">
              <Link to="/book" className="btn-simple bg-brand text-white hover:bg-brand/90 px-10 py-4 font-bold rounded-2xl shadow-xl shadow-brand/10 transition-all flex items-center gap-2">
                <CalendarHeart size={20} /> Book Appointment
              </Link>
              <Link to="/doctors" className="btn-simple border-2 border-slate-100 text-slate-700 hover:border-accent hover:text-accent px-10 py-4 font-bold rounded-2xl transition-all">
                The Specialist Team
              </Link>
            </div>
          </motion.div>
        </div>

        {/* === Stats Section === */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-[40px] p-10 text-center border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-white rounded-3xl shadow-lg flex items-center justify-center mx-auto mb-6 text-accent">
                  <Icon size={32} />
                </div>
                <h3 className="text-4xl font-black text-brand mb-2">{stat.value}</h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* === Core Values Section (Dark Card) === */}
        <div className="bg-slate-900 rounded-[50px] p-12 md:p-20 text-white overflow-hidden relative isolate">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/20 rounded-l-full blur-3xl -z-10 animate-pulse"></div>

          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
              Core Values That <br />
              <span className="text-accent underline decoration-4 underline-offset-8">Drive Our Clinic</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              We believe that every patient deserves more than just a diagnosis — they deserve a healthcare partnership built on trust and respect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-6 group"
                >
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Icon size={28} />
                  </div>
                  <h4 className="text-xl font-black">{v.title}</h4>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] -z-10"></div>
    </section>
  );
}
