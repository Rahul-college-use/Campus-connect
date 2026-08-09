const VARIANTS = {
  bordered: 'border border-gray-200 bg-white hover:border-gray-300',
  shadow: 'bg-white shadow-md hover:shadow-lg border border-transparent',
  flat: 'bg-gray-100 hover:bg-gray-200/80 border border-transparent',
  elevated: 'bg-white shadow-xl border border-gray-100'
};

/**
 * Atomic Card Component
 * @param {'bordered'|'shadow'|'flat'|'elevated'} variant - Visual style preset
 * @param {boolean} isClickable - Enables interactive hover effects and focus rings
 * @param {function} onClick - Optional click handler
 * @param {string} className - Extra custom Tailwind utility classes
 */
export default function Card({
  children,
  variant = 'bordered',
  isClickable = false,
  onClick,
  className = '',
  ...props
}) {
  const baseStyles = 'rounded-xl p-5 transition-all duration-200 text-gray-900';
  const variantStyles = VARIANTS[variant] || VARIANTS.bordered;
  const clickableStyles = isClickable || onClick
    ? 'cursor-pointer hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50'
    : '';

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e);
        }
      }}
      className={`${baseStyles} ${variantStyles} ${clickableStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

/* Optional Sub-components for Structured Card Layouts */
Card.Header = function CardHeader({ children, className = '' }) {
  return <div className={`mb-3 pb-3 border-b border-gray-100 ${className}`}>{children}</div>;
};

Card.Title = function CardTitle({ children, className = '' }) {
  return <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>;
};

Card.Body = function CardBody({ children, className = '' }) {
  return <div className={`text-sm text-gray-600 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({ children, className = '' }) {
  return <div className={`mt-4 pt-3 border-t border-gray-100 flex items-center justify-between ${className}`}>{children}</div>;
};