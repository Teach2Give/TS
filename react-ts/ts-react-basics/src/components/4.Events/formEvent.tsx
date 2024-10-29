import React, { useState } from "react";

// Define the FunctionProps and EventProps types
type FunctionProps = {
  onSubmit: (data: { name: string; email: string }) => Promise<void>;
};

type EventProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// Define the combined props for the component
type UserFormProps = FunctionProps & EventProps;

const UserForm: React.FC<UserFormProps> = ({ onSubmit, onClick, onChange }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent page reload
    await onSubmit({ name, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            onChange(e); // Trigger onChange prop
          }}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            onChange(e); // Trigger onChange prop
          }}
        />
      </div>
      <button type="submit" onClick={onClick}>
        Register
      </button>
    </form>
  );
};

// Example usage of the UserForm component
const EventForm = () => {
  const handleFormSubmit = async (data: { name: string; email: string }) => {
    console.log("Form submitted with:", data);
    // Simulate an API call or data processing
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(`User ${data.name} with email ${data.email} registered!`);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("Button clicked:", event);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", event.target.value);
  };

  return (
    <div>
      <h1>User Registration</h1>
      <UserForm
        onSubmit={handleFormSubmit}
        onClick={handleButtonClick}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default EventForm;
