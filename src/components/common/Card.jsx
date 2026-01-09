import clsx from 'clsx';

export default function Card({ children, className }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow',
        className
      )}
    >
      {children}
    </div>
  );
}
