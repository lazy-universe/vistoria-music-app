import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({children, className = "", ...props}) => {
  return (
    <button
      className={`cursor-pointer bg-accent hover:bg-accent/90 text-text px-6 py-4 rounded-3xl font-manrope text-sm transition-all hover:scale-105 ${className}`}
      {...props} // Spreads all button props like onClick, type, disabled, etc.
    >
      {children}
    </button>
  );
};

// export const Button: React.FC<{ children: React.ReactNode, onClick? : () => void, type? :  }> = ({
//   children,
//   onClick,
//   type
// }) => {
//   return (
//     <button
//       type={type}
//       onClick={onClick}
//       className="cursor-pointer bg-accent hover:bg-accent/90 text-text px-8 py-4 rounded-3xl font-manrope text-sm transition-all hover:scale-105"
//     >
//       {children}
//     </button>
//   );
// };

export const Line = () => {
  return <div className="h-1/5 w-1 border-2 inline mr-4 ml-4"></div>;
};
