import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { FaShoppingCart, FaBox, FaUsers, FaCog, FaChartLine } from 'react-icons/fa';
import CountUp from 'react-countup';
import { useTodayVisitor } from '../hooks/useTodayVisitor';
import { useVisitorHistory } from '../hooks/useVisitorHistory';
import { useRegPatients } from '../hooks/useRegPatients';
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import { Person2Rounded, Person3, PersonPin, TodaySharp } from '@mui/icons-material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);



// === Card UI Component ===
const StatCard = ({ icon, title, value }) => (
  <Paper elevation={3} sx={{ p: 2, borderRadius: 2, display: 'flex', alignItems: 'center' }}>
    <Box sx={{ mr: 2, fontSize: 30, color: 'primary.main' }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="h6" fontWeight={700}>
        <CountUp end={value} duration={2} separator="," />
      </Typography>
    </Box>
  </Paper>
);

// === Main Static Dashboard ===
const WelcomeDashboard = () => {
     const {visitors}=useTodayVisitor();
     const {data}=useVisitorHistory();
     const {filteredCustomers}=useRegPatients();

      const Todayvisiors=visitors.length;
      const TotalRegPatients=filteredCustomers.length;
      const TotalTodayVisitors=data.length;
      const TodayRegPatients = filteredCustomers.filter(customer => {
        const visitDate = new Date(customer.lastvisited).toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];
        return visitDate === today;
      }).length;
      const Doctor = 2;

      // Dynamic chart data
      // Get last 7 days
      const getLast7Days = () => {
        const dates = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          dates.push(date.toISOString().split('T')[0]);
        }
        return dates;
      };

      const dynamicChartData = {
        line: {
          labels: getLast7Days().map(date => 
            new Date(date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short'
            })
          ),
          datasets: [{
            label: 'Daily Booking Patients',
            data: getLast7Days().map(date => 
              data.filter(item => 
                item.date.split('T')[0] === date
              ).length
            ),
            fill: false,
            borderColor: '#3f51b5',
            tension: 0.1,
          }],
        },
        bar: {
          labels: [ 'Total Visitors', 'Registered Patients', 'Today Visitors','Doctor'],
          datasets: [{
            label: 'Sri Clinic',
            data: [ TotalTodayVisitors, TotalRegPatients, Todayvisiors,Doctor],
            backgroundColor: '#3f51b5',
          }],
        },
        stats: [
          { icon: 'shopping', title: 'Doctor', value: Doctor },
          { icon: 'box', title: 'Total Visitors', value: TotalTodayVisitors },
          { icon: 'dashboard', title: 'Today Visitors', value: Todayvisiors },
          { icon: 'users', title: 'Registered Patients', value: TotalRegPatients },
          { icon: 'cog', title: 'Today Registered', value: TodayRegPatients },
        ],
      };

      //for line chart 

      const lablforsevendate=data;  //date basedon

      console.log(lablforsevendate);
      


  
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Welcome, Sri Clinic ...!
      </Typography>

      {/* Stat Cards */}
      <Grid container spacing={2} sx={{ mb: 3, justifyContent: 'center' }}>
        {dynamicChartData.stats.map((item, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={2.4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', maxWidth: 300 }}>
              <StatCard
                icon={
                  item.icon === 'dashboard' ? <HistoryIcon /> :
                  item.icon === 'shopping' ? <Person2Rounded  /> :
                  item.icon === 'box' ? <PersonIcon /> :
                  item.icon === 'users' ? <FaChartLine /> :
                  <Person3 />
                }
                title={item.title}
                value={item.value}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Daily Booking Patients
            </Typography>
            <Line data={dynamicChartData.line} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              Sri Clinic
            </Typography>
            <Bar data={dynamicChartData.bar} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomeDashboard;