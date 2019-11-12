import React from 'react';
import AppSectionHeader from '../AppSectionHeader';

const AppSection = ({ title, icon, data, children }) => 
  <section className='app-section'>
    <AppSectionHeader title={title} icon={icon}/>
    {children}
  </section>

export default AppSection;