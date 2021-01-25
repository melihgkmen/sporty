import React from 'react';

import Home from './home.svg';
import HomeYellow from './homeYellow.svg';
import PaidBills from './faturalar-m.svg';
import PaidBillsYellow from './faturalar-mYellow.svg';
import PayBill from './group.svg';
import PayBillYellow from './groupYellow.svg';
import Outgoings from './harcamalar-m.svg';
import OutgoingsYellow from './harcamalar-mYellow.svg';
import Profile from './profile.svg';
import ProfileYellow from './profileYellow.svg';


function CustomIcons({ icon, size ,color}) {
  switch (icon) {
    case 'home':
      return <Home height={size} width={size} />;
    case 'homeYellow':
      return <HomeYellow height={size} width={size} />;
    case 'faturalar-m':
      return <PaidBills height={size} width={size} />;
    case 'faturalar-mYellow':
      return <PaidBillsYellow height={size} width={size} />;  
    case 'group':
      return <PayBill height={60} width={60} marginBottom={20} />;
    case 'groupYellow':
      return <PayBillYellow height={60} width={60} marginBottom={20} />;
    case 'harcamalar-m':
      return <Outgoings height={size} width={size} />;
      case 'harcamalar-mYellow':
      return <OutgoingsYellow height={size} width={size}/>;
    case 'profile':
      return <Profile height={size} width={size}/>;
    case 'profileYellow':
      return <ProfileYellow height={size} width={size}/>;
    default:
      break;
  }
}

export default CustomIcons;