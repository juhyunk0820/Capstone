// Autocomplete.js
import React, { useState, useEffect, useRef } from 'react';

const Autocomplete = ({ placeholder, dataList, onSelectOption }) => {
    const [inputValue, setInputValue] = useState('');
    const [autoCompleteList, setAutoCompleteList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isFocused, setIsFocused] = useState(false);
    const autoCompleteRef = useRef(null);
    const listRef = useRef(null);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        const filteredOptions = dataList.filter(option => option.toLowerCase().includes(value.toLowerCase()));
        setAutoCompleteList(filteredOptions);
    };

    const handleSelectOption = (option) => {
        setInputValue(option);
        setAutoCompleteList([]);
        onSelectOption(option);
    };

    const handleKeyPress = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                setActiveIndex((prevIndex) => (prevIndex === 0 ? autoCompleteList.length - 1 : prevIndex - 1));
                event.preventDefault(); // Prevent default arrow key behavior
                break;
            case 'ArrowDown':
                setActiveIndex((prevIndex) => (prevIndex === autoCompleteList.length - 1 ? 0 : prevIndex + 1));
                event.preventDefault(); // Prevent default arrow key behavior
                break;
            case 'Enter':
                if (activeIndex !== -1) {
                    handleSelectOption(autoCompleteList[activeIndex]);
                }
                break;
            default:
                break;
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)) {
                setAutoCompleteList([]);
                setActiveIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (listRef.current && activeIndex !== -1) {
            listRef.current.scrollTo(0, 30 * activeIndex);
        }
    }, [activeIndex]);

    return (
        <div ref={autoCompleteRef} className="InputContainer">
            <input
                className='SearchTextInput'
                type="text"
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <div
                className="autocomplete"
                style={{ backgroundColor: 'skyblue', maxHeight: '100px', overflowY: 'auto' }}
                ref={listRef}
            >
                {autoCompleteList.map((option, index) => (
                    <div
                        key={option}
                        className={index === activeIndex ? 'active' : ''}
                        style={{ backgroundColor: index === activeIndex ? 'yellow' : 'transparent' }}
                        onClick={() => handleSelectOption(option)}
                        onMouseEnter={() => setActiveIndex(index)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Autocomplete;
