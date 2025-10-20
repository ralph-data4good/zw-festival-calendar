import React, { useState } from 'react';
import styles from './Logo.module.css';

function Logo({ size = 'default', className = '' }) {
  const [useImage, setUseImage] = useState(true);
  const [imageError, setImageError] = useState(false);

  const sizeMap = {
    small: 50,
    default: 60,
    large: 80,
  };

  const height = sizeMap[size] || sizeMap.default;
  const imageHeight = height * 1.2; // Slightly larger for image version

  // Try to load the actual logo image first, fallback to SVG
  const logoImagePath = '/festival-2025/assets/zerowaste-festival-logo.png';

  const handleImageError = () => {
    setImageError(true);
    setUseImage(false);
  };

  // SVG Fallback Logo
  const SVGLogo = () => (
    <svg 
      viewBox="0 0 400 100" 
      className={styles.logo}
      style={{ height: `${height}px`, width: 'auto' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* "ZERO" in lime green */}
      <text 
        x="10" 
        y="50" 
        fontFamily="'Schibsted Grotesk', Arial, sans-serif" 
        fontSize="42" 
        fontWeight="700"
        fill="#A4BF3D"
        letterSpacing="-1"
      >
        ZERO
      </text>
      
      {/* Circular arrow/globe element */}
      <circle 
        cx="145" 
        cy="35" 
        r="22" 
        fill="none" 
        stroke="#4A8FC7" 
        strokeWidth="3"
      />
      <circle 
        cx="145" 
        cy="35" 
        r="15" 
        fill="#5B8C5A" 
        opacity="0.6"
      />
      <path 
        d="M 130 35 Q 145 20, 160 35" 
        fill="none" 
        stroke="#4A8FC7" 
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      
      {/* "WASTE" in blue */}
      <text 
        x="175" 
        y="50" 
        fontFamily="'Schibsted Grotesk', Arial, sans-serif" 
        fontSize="42" 
        fontWeight="700"
        fill="#4A8FC7"
        letterSpacing="-1"
      >
        WASTE
      </text>
      
      {/* "FESTIVAL" below in black */}
      <text 
        x="10" 
        y="80" 
        fontFamily="'Schibsted Grotesk', Arial, sans-serif" 
        fontSize="24" 
        fontWeight="600"
        fill="#1A1A1A"
        letterSpacing="2"
      >
        FESTIVAL
      </text>
      
      {/* Small accent triangle/arrow */}
      <path 
        d="M 370 75 L 380 80 L 370 85 Z" 
        fill="#A4BF3D"
      />
    </svg>
  );

  return (
    <div className={`${styles.logoContainer} ${className}`}>
      {useImage && !imageError ? (
        <img
          src={logoImagePath}
          alt="Zero Waste Festival"
          className={styles.logo}
          style={{ height: `${imageHeight}px`, width: 'auto' }}
          onError={handleImageError}
        />
      ) : (
        <SVGLogo />
      )}
    </div>
  );
}

export default Logo;
