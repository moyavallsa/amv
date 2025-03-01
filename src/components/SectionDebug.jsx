import React, { useEffect, useState } from "react";
import { navLinks } from "../constants";

const SectionDebug = () => {
  const [sections, setSections] = useState([]);
  
  useEffect(() => {
    // Collect information about all sections
    const sectionInfo = navLinks.map(nav => {
      const element = document.getElementById(nav.id);
      const hashElement = document.getElementById(`#${nav.id}`);
      const dataElement = document.querySelector(`[data-section-id="${nav.id}"]`);
      
      return {
        id: nav.id,
        title: nav.title,
        elementExists: !!element,
        hashElementExists: !!hashElement,
        dataElementExists: !!dataElement,
        offsetTop: element ? element.offsetTop : 'N/A'
      };
    });
    
    setSections(sectionInfo);
  }, []);
  
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      zIndex: 9999,
      maxWidth: '300px',
      fontSize: '12px'
    }}>
      <h3>Section Debug</h3>
      <ul>
        {sections.map(section => (
          <li key={section.id} style={{ marginBottom: '8px' }}>
            <strong>{section.title} ({section.id})</strong>
            <div>Element: {section.elementExists ? '✅' : '❌'}</div>
            <div>Hash Element: {section.hashElementExists ? '✅' : '❌'}</div>
            <div>Data Element: {section.dataElementExists ? '✅' : '❌'}</div>
            <div>Offset: {section.offsetTop}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionDebug; 