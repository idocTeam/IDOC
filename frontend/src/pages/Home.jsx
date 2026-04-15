import React from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  Video, 
  ShieldCheck, 
  ChevronRight, 
  Star, 
  Users, 
  Award, 
  ArrowRight,
  Stethoscope,
  Activity,
  Heart,
  BrainCircuit,
  Clock,
  CheckCircle2,
  Zap,
  Play
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: Search,
      title: 'Expert Matching',
      desc: 'Find the perfect specialist with our smart matching system.',
      color: 'bg-blue-500',
    },
    {
      icon: BrainCircuit,
      title: 'AI Diagnostics',
      desc: 'Advanced AI-driven symptom analysis for preliminary insights.',
      color: 'bg-indigo-600',
    },
    {
      icon: Video,
      title: 'HD Video Consult',
      desc: 'Crystal clear secure video sessions from any device.',
      color: 'bg-purple-500',
    },
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      desc: 'Manage appointments with automated reminders.',
      color: 'bg-green-500',
    },
    {
      icon: ShieldCheck,
      title: 'Bank-Level Security',
      desc: 'Your medical data is protected with 256-bit encryption.',
      color: 'bg-red-500',
    },
  ];

  const stats = [
    { label: 'Doctors', value: '500+', icon: Stethoscope },
    { label: 'Patients', value: '10K+', icon: Users },
    { label: 'Specialties', value: '30+', icon: Activity },
    { label: 'Rating', value: '4.9/5', icon: Award },
  ];

  const testimonials = [
    {
      name: "Alexander Wright",
      role: "Patient",
      text: "The AI checker predicted my condition accurately before I even saw the doctor. Truly futuristic!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Cardiologist",
      text: "IDOC provides the most seamless telemedicine experience I've used in my 15 years of practice.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-[60%] h-full bg-primary-50/50 rounded-bl-[200px] -z-10" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-40 left-1/4 w-96 h-96 bg-primary-200/30 blur-[120px] rounded-full -z-10" 
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <div className="inline-flex items-center space-x-2 px-5 py-2.5 bg-white shadow-premium rounded-full border border-primary-100">
                <span className="flex h-2.5 w-2.5 rounded-full bg-primary-600 animate-pulse" />
                <span className="text-primary-700 font-extrabold text-xs uppercase tracking-widest">Global Healthcare Network</span>
              </div>
              
              <h1 className="heading-xl">
                The Future of <br />
                <span className="text-primary-600">Personalized</span> <br />
                Care is Here.
              </h1>
              
              <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium">
                Experience world-class medical expertise with AI-powered insights and secure 
                telemedicine sessions. Anytime, anywhere.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-5 pt-4">
                <Link to="/doctors" className="btn btn-primary h-16 px-10 text-lg group w-full sm:w-auto">
                  <span>Book Appointment</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/ai-symptom-checker" className="btn btn-secondary h-16 px-10 text-lg w-full sm:w-auto">
                  <BrainCircuit className="w-5 h-5 text-primary-600" />
                  <span>AI Health Check</span>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-10 border-t border-slate-200/60">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center space-x-2 text-primary-600">
                      <stat.icon className="w-5 h-5" />
                      <span className="text-3xl font-black">{stat.value}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-black">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-[60px] overflow-hidden shadow-2xl shadow-primary-900/10 border-[12px] border-white group">
                <img 
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                  alt="Telemedicine" 
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Play Button Overlay */}
                <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500 hover:bg-white">
                  <Play className="w-8 h-8 text-primary-600 fill-current" />
                </button>
              </div>

              {/* Floating UI Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-12 -right-12 z-20 glass p-6 rounded-[32px] shadow-premium flex items-center space-x-4 min-w-[260px]"
              >
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                  <Video className="text-white w-7 h-7" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Live Consultation</p>
                  <p className="text-base font-bold text-slate-900">Dr. Sarah Smith</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-12 -left-12 z-20 glass p-6 rounded-[32px] shadow-premium flex items-center space-x-4 min-w-[260px]"
              >
                <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/20">
                  <Zap className="text-white w-7 h-7" fill="currentColor" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">AI Diagnostics</p>
                  <p className="text-base font-bold text-slate-900">98% Accuracy Rate</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-12 border-y border-slate-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 lg:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
           <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" className="h-8" alt="IBM" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-8" alt="Google" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" className="h-8" alt="Microsoft" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-8" alt="Amazon" />
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
            <h2 className="heading-lg">
              The Healthcare <span className="text-primary-600 underline decoration-primary-100 underline-offset-8">Ecosystem</span> <br /> 
              Built for the 21st Century.
            </h2>
            <p className="text-lg text-slate-500 font-medium">
              We've redesigned every touchpoint of the medical journey to be 
              faster, safer, and more intelligent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -12 }}
                className="card group bg-white border-none"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-inherit/20 group-hover:rotate-[10deg] transition-all duration-500`}>
                  <feature.icon className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-primary-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium mb-8">
                  {feature.desc}
                </p>
                <Link to="/register" className="flex items-center space-x-2 text-primary-600 font-black text-xs uppercase tracking-widest group/btn">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="heading-lg">What Our <br /> Community Says.</h2>
              <div className="space-y-8">
                {testimonials.map((t, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative"
                  >
                    <Star className="absolute top-8 right-8 w-6 h-6 text-yellow-400 fill-current" />
                    <p className="text-lg text-slate-700 font-medium leading-relaxed mb-8 italic">"{t.text}"</p>
                    <div className="flex items-center space-x-4">
                      <img src={t.image} className="w-14 h-14 rounded-2xl object-cover" alt={t.name} />
                      <div>
                        <p className="font-bold text-slate-900">{t.name}</p>
                        <p className="text-xs text-primary-600 font-black uppercase tracking-widest">{t.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative">
               <div className="absolute inset-0 bg-primary-600 rounded-[60px] rotate-3 -z-10" />
               <img 
                src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                className="rounded-[60px] shadow-2xl" 
                alt="Medical Professional"
               />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[60px] p-12 lg:p-24 relative overflow-hidden flex flex-col items-center text-center space-y-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500/10 blur-[100px] rounded-full" />
            
            <div className="relative z-10 space-y-6">
              <h2 className="text-4xl lg:text-7xl font-black text-white tracking-tighter">
                Ready to Join <br /> 
                the <span className="text-primary-500 italic">Revolution?</span>
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                Join 10,000+ users who have already upgraded their healthcare 
                experience. Secure, smart, and always available.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 relative z-10 w-full justify-center">
              <Link to="/register" className="btn btn-primary !bg-white !text-slate-900 hover:!bg-slate-100 h-16 px-12 text-lg shadow-2xl">
                Get Started for Free
              </Link>
              <Link to="/doctors" className="btn btn-outline !border-slate-700 !text-white hover:!bg-slate-800 h-16 px-12 text-lg">
                Browse Specialists
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
