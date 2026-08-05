import { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

interface DropdownProps {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string) => void;
}

const Dropdown = ({ label, options, value, onChange }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={`${styles.trigger} ${value ? styles.triggerActive : ""}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value ?? label}
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>
          ▾
        </span>
      </button>

      {open && (
        <div className={styles.menu}>
          {options.map((option) => (
            <div
              key={option}
              className={`${styles.option} ${
                value === option ? styles.optionSelected : ""
              }`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
