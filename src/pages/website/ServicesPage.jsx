import Services from '../../Components/website/Services';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Services />
    </motion.div>
  );
}
