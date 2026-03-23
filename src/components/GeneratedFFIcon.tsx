type GeneratedFFIconProps = {
  className?: string;
};

const GeneratedFFIcon = ({ className = "h-7 w-7" }: GeneratedFFIconProps) => {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ff-icon-bg" x1="6" y1="6" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD580" />
          <stop offset="0.55" stopColor="#F5A623" />
          <stop offset="1" stopColor="#FF8C00" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#ff-icon-bg)" />
      <rect x="5" y="5" width="38" height="38" rx="11" stroke="rgba(255,255,255,0.42)" />
      <text x="19" y="30" fill="rgba(255,255,255,0.42)" fontFamily="Baloo 2, Nunito Sans, sans-serif" fontSize="19" fontWeight="800">
        F
      </text>
      <text x="24" y="33" fill="rgba(255,255,255,0.95)" fontFamily="Baloo 2, Nunito Sans, sans-serif" fontSize="19" fontWeight="800">
        F
      </text>
    </svg>
  );
};

export default GeneratedFFIcon;
