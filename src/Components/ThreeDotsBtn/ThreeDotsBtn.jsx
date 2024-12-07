import React, { useState, useEffect, useRef } from 'react';
import styles from './ThreeDotsBtn.module.scss';
function ThreeDotsBtn({ options, optionsPlaylist, onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen && onOpen) {
      onOpen();
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.menuContainer} ref={menuRef}>

      <button
        className={styles.menuBtn}
        ref={buttonRef}
        onClick={toggleMenu}
      >
        &#8226;&#8226;&#8226;
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          <ul>
            {options.map((option, index) => (
              <li key={index}>
                {index === 0 ? (
                  <div className={styles.hoverMenu}>
                    <button
                      className={styles.dropdownItem}
                      onClick={option.onClick}
                    >
                      {option.label}
                    </button>

                    <div className={styles.subMenu}>
                      <ul>
                        {optionsPlaylist.map((option, index) => (
                          <button
                            key={index}
                            className={styles.dropdownItem}
                            onClick={option.onClick}
                          > {option.label}</button>
                        ))}

                      </ul>
                    </div>
                  </div>
                ) : (
                  <button
                    className={styles.dropdownItem}
                    onClick={option.onClick}
                  >
                    {option.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThreeDotsBtn;
