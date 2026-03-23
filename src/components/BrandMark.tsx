type BrandMarkProps = {
  className?: string;
  letterClassName?: string;
};

const BrandMark = ({ className = "", letterClassName = "text-lg" }: BrandMarkProps) => {
  return (
    <span aria-hidden="true" className={`relative inline-flex h-8 w-8 select-none items-center justify-center ${className}`}>
      <span
        className={`absolute left-[42%] top-[38%] -translate-x-1/2 -translate-y-1/2 font-black leading-none text-primary/35 ${letterClassName}`}
      >
        F
      </span>
      <span
        className={`absolute left-[58%] top-[60%] -translate-x-1/2 -translate-y-1/2 font-black leading-none text-primary ${letterClassName}`}
      >
        F
      </span>
    </span>
  );
};

export default BrandMark;
