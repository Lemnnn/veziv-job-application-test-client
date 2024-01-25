const FormDescription = ({ label, value, onChange, placeholder }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
        <textarea
          className="flex w-full text-black rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
          value={value}
          onChange={onChange}
          maxLength="250"
          placeholder={placeholder}
        ></textarea>
      </label>
    </div>
  );
};

export default FormDescription;
