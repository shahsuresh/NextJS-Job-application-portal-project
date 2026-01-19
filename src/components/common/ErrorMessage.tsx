export const FieldError = ({ error }: { error?: string }) =>
  error ? <p className='text-sm text-red-500 p-0.5'>{error}</p> : null;
