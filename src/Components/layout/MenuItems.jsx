
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import GroupIcon from "@mui/icons-material/Group";
import HistoryIcon from "@mui/icons-material/History";
import { PersonPin, TodaySharp } from '@mui/icons-material';
export const getMenuItems = () => {
  return [
    { text: 'Dashboard', icon: <HomeIcon />, path: '/admin' },
    { text: 'Today Visitor', icon: <TodaySharp />, path: '/admin/todayvisitor' },
    { text: 'Patient Page', icon: <PersonIcon />, path: '/admin/CustomerPage' },
    { text: 'Add New Patient', icon: <AddCircleIcon />, path: '/admin/NewCustomer' },
    { text: 'Registered Patient', icon: <PersonPin />, path: '/admin/RegMembers' },
    { text: 'Visitor History', icon: <HistoryIcon />, path: '/admin/VisitorHistory' },
   
  ];
};


// { 
    //   text: 'Flight', 
    //   icon: <FlightIcon />, 
    //   path: '/superadmin/flight',
    //   subMenu: [
    //     { 
    //       text: 'Airlines', 
    //       icon: <AirplanemodeActiveIcon />, 
    //       path: '/superadmin/flight/airlines' 
    //     },
    //     { 
    //       text: 'Kingfisher', 
    //       icon: <AirplanemodeActiveIcon />, 
    //       path: '/superadmin/flight/kingfisher' 
    //     }
    //   ]
    // },