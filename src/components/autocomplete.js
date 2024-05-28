import React, { useState, useEffect, useRef } from 'react';

const Autocomplete = ({ placeholder, onSelectOption, inputValue, setInputValue }) => {
    const [autoCompleteList, setAutoCompleteList] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const autoCompleteRef = useRef(null);
    const listRef = useRef(null);

    const dataList = [
        '서울특별시청',
        '인천광역시청',
        '대전광역시청',
        '광주광역시청',
        '대구광역시청',
        '부산광역시청',
        '울산광역시청'
    ];

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value === '' ? null : value); // Set to null if input is empty
        const filteredOptions = dataList.filter(option => option.toLowerCase().includes(value.toLowerCase()));
        setAutoCompleteList(filteredOptions);
        setActiveIndex(0);
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
                event.preventDefault();
                break;
            case 'ArrowDown':
                setActiveIndex((prevIndex) => (prevIndex === autoCompleteList.length - 1 ? 0 : prevIndex + 1));
                event.preventDefault();
                break;
            case 'Enter':
                if (activeIndex !== -1 && autoCompleteList.length > 0) {
                    handleSelectOption(autoCompleteList[activeIndex]);
                }
                break;
            case 'Tab': // Tab key
                if (activeIndex !== -1 && autoCompleteList.length > 0) {
                    handleSelectOption(autoCompleteList[activeIndex]);
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (autoCompleteRef.current && !autoCompleteRef.current.contains(event.target)) {
                setAutoCompleteList([]);
                setActiveIndex(0);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (listRef.current && activeIndex !== -1) {
            const activeItem = listRef.current.children[activeIndex];
            if (activeItem) {
                activeItem.scrollIntoView({
                    block: 'nearest',
                    behavior: 'smooth'
                });
            }
        }
    }, [activeIndex]);

    return (
        <div ref={autoCompleteRef} className="InputContainer">
            <input
                className='SearchTextInput'
                type="text"
                placeholder={placeholder}
                value={inputValue || ''} // Display empty string if inputValue is null
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
            <div
                className="autocomplete"
                ref={listRef}
            >
                {autoCompleteList.map((option, index) => (
                    <div
                        key={option}
                        className={index === activeIndex ? 'active' : ''}
                        style={{
                            backgroundColor: index === activeIndex ? 'lightgray' : 'white', // Selected item is light gray, default is white
                            padding: '5px', // Add padding to match the item height
                            boxShadow: '0 0 0 1px gray', // Thin gray border
                            marginBottom: '1px', // Add spacing between items
                        }}
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
