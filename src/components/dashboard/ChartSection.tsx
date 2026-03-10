import { ReactNode } from "react";

interface ChartSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

const ChartSection = ({
  title,
  description,
  children,
  className = "",
}: ChartSectionProps) => {
  return (
    <div
      className={`chart-container transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 ${className}`}
    >
      <div className="mb-5">
        <h3 className="text-md font-bold uppercase tracking-wider text-foreground">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
};

export default ChartSection;
