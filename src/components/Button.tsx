export interface ButtonProps<T = any> {
  text: string;
  onClick?: () => Promise<T> | void;
}
export default function Button<T>({ text, onClick }: ButtonProps<T>) {
  return (
    <button
      className="
          shadow-md
          visited:underline
          bg-tertiary-light
          hover:bg-tertiary-dark
          border
          border-black
          rounded-md
          inline-block
          p-1
          m-1
          min-w-28
          font-semibold
        "
      onClick={async () => {
        if (onClick) {
          await onClick();
        }
      }}
    >
      {text}
    </button>
  );
}
