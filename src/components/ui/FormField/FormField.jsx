/**
 * FormField Wrapper Component
 * Handles labels, required indicators, helper text, and validation error messages.
 */
export default function FormField({
  label,
  htmlFor,
  required = false,
  error,
  helperText,
  children,
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`.trim()}>
      {/* Label Header */}
      {label && (
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-gray-700 flex items-center gap-1"
        >
          {label}
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
      )}

      {/* Input Slot */}
      {children}

      {/* Validation Message or Helper Text */}
      {error ? (
        <p className="text-xs text-red-600 flex items-center gap-1 font-medium mt-0.5">
          <span>⚠️</span> {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-gray-500 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
}