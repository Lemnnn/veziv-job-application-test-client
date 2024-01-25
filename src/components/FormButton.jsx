const FormButton = ({ label, type, onClick }) => {
  return (
    <button
      className="inline-flex mt-2 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-primary-foreground hover:bg-gray-200 h-10 px-4 py-2 w-full"
      type={type}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default FormButton;
