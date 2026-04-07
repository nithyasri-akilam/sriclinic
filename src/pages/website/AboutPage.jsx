import About from '../../Components/website/About';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <About />
    </motion.div>
  );
}
