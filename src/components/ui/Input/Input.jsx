import { forwardRef } from 'react';

/**
 * Atomic Input Component
 * @param {string} state - Validation state ('default' | 'error' | 'success')
 * @param {React.ReactNode} leftIcon - Icon inside the left edge of the input
 * @param {React.ReactNode} rightIcon - Icon or action button inside the right edge
 * @param {boolean} fullWidth - Takes 100% width of parent container
 */
const Input = forwardRef(function Input(
  {
    type = 'text',
    state = 'default',
    leftIcon,
    rightIcon,
    fullWidth = true,
    disabled = false,
    className = '',
    id,
    ...props
  },
  ref
) {
  // Base styling for the input element
  const baseStyles =
    'block rounded-lg text-sm transition-colors duration-150 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed placeholder:text-gray-400';

  // State-based border and focus styles
  const STATE_STYLES = {
    default:
      'border-gray-300 bg-white text-gray-900 border focus:border-blue-600 focus:ring-blue-500/20',
    error:
      'border-red-500 bg-red-50/30 text-red-900 border focus:border-red-600 focus:ring-red-500/20 placeholder:text-red-300',
    success:
      'border-green-500 bg-green-50/30 text-gray-900 border focus:border-green-600 focus:ring-green-500/20',
  };

  const stateStyle = STATE_STYLES[state] || STATE_STYLES.default;
  const paddingStyles = `${leftIcon ? 'pl-10' : 'pl-3.5'} ${rightIcon ? 'pr-10' : 'pr-3.5'} py-2.5`;
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <div className={`relative ${fullWidth ? 'w-full' : 'inline-block'}`}>
      {/* Left Icon Container */}
      {leftIcon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
          {leftIcon}
        </div>
      )}

      {/* Main Input Element */}
      <input
        ref={ref}
        id={id}
        type={type}
        disabled={disabled}
        className={`${baseStyles} ${stateStyle} ${paddingStyles} ${widthStyle} ${className}`.trim()}
        {...props}
      />

      {/* Right Icon Container */}
      {rightIcon && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          {rightIcon}
        </div>
      )}
    </div>
  );
});

export default Input;