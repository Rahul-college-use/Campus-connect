import { forwardRef } from 'react';

/**
 * Atomic Select Component
 * @param {Array<{value: string|number, label: string, disabled?: boolean}>} options - Option list array
 * @param {string} placeholder - Unselectable default option prompt
 * @param {'default' | 'error' | 'success'} state - Validation visual state
 * @param {React.ReactNode} leftIcon - Icon element on the left side
 * @param {boolean} fullWidth - Expands to 100% of parent container width
 */
const Select = forwardRef(function Select(
  {
    options = [],
    placeholder,
    state = 'default',
    leftIcon,
    fullWidth = true,
    disabled = false,
    className = '',
    children,
    id,
    ...props
  },
  ref
) {
  const baseStyles =
    'block rounded-lg text-sm transition-colors duration-150 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed appearance-none cursor-pointer';

  const STATE_STYLES = {
    default:
      'border-gray-300 bg-white text-gray-900 border focus:border-blue-600 focus:ring-blue-500/20',
    error:
      'border-red-500 bg-red-50/30 text-red-900 border focus:border-red-600 focus:ring-red-500/20',
    success:
      'border-green-500 bg-green-50/30 text-gray-900 border focus:border-green-600 focus:ring-green-500/20',
  };

  const stateStyle = STATE_STYLES[state] || STATE_STYLES.default;
  const paddingStyles = `${leftIcon ? 'pl-10' : 'pl-3.5'} pr-10 py-2.5`;
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'inline-block'}`}>
      {/* Optional Left Icon */}
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400 z-10">
          {leftIcon}
        </div>
      )}

      {/* Select Element */}
      <select
        ref={ref}
        id={id}
        disabled={disabled}
        className={`${baseStyles} ${stateStyle} ${paddingStyles} ${widthStyle} ${className}`.trim()}
        {...props}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}

        {/* Options via Array Prop */}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}

        {/* Custom Option Children (Fallback) */}
        {!options.length && children}
      </select>

      {/* Custom Chevron Indicator */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
});

export default Select;