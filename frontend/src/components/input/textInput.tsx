import React, { useRef } from 'react'
import './input.css'

interface TextInputProps {
  label?: boolean;
  name: string;
  type: string;
  image?: {src: string; alt: string};
  required?: boolean;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const TextInput = ({ label, name, type, image, required, onchange }: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Only add handlers if type is password and image is provided
  const addImageEvents = (img: HTMLImageElement | null) => {
    if (!img || type !== 'password') return;
    const showPassword = () => inputRef.current && inputRef.current.setAttribute("type", "text");
    const hidePassword = () => inputRef.current && inputRef.current.setAttribute("type", "password");

    img.addEventListener("mousedown", showPassword);
    img.addEventListener("mouseup", hidePassword);
    img.addEventListener("mouseleave", hidePassword);
    img.addEventListener("touchstart", showPassword);
    img.addEventListener("touchend", hidePassword);
  };

  return (
    <div className='form-group border-none'>
      {label && <label htmlFor={name}>{name.replace(/^\w/, (c) => c.toUpperCase()) + ":"}</label>}
      <div className='input_box'>
        <input
          className='input_field px-2 py-1 rounded-2'
          type={type}
          id={name}
          name={name}
          ref={inputRef}
          required={required}
          onChange={onchange}
        />
        {image && (
          <img
            src={image.src}
            alt={image.alt}
            ref={img => addImageEvents(img)}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    </div>
  )
}
