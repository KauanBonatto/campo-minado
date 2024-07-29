import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  textLabel?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, textLabel, ...props }, ref) => {
    return (
      <div className="">
        {textLabel && <p className="text-slate-700 dark:text-white mb-1">{textLabel}</p>}
        <input
          type={type}
          className={`flex h-11 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
