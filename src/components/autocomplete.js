import React, { useState, useEffect, useRef } from 'react';

const Autocomplete = ({ placeholder,  onSelectOption }) => {
    const [inputValue, setInputValue] = useState('');
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
        setInputValue(value);
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
            case 'Tab': // Tab 키 추가
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
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
            <div
                className="autocomplete"
                style={{
                    backgroundColor: 'white',
                    maxHeight: '100px',
                    overflowY: 'auto',
                    position: 'relative'
                }}
                ref={listRef}
            >
                {autoCompleteList.map((option, index) => (
                    <div
                        key={option}
                        className={index === activeIndex ? 'active' : ''}
                        style={{
                            backgroundColor: index === activeIndex ? 'lightblue' : 'white', // 선택된 항목은 연한 파란색, 기본 배경은 흰색
                            padding: '5px', // 항목의 높이를 맞추기 위해 패딩 추가
                            boxShadow: '0 0 0 0.5px gray', // 얇은 회색 경계선
                            marginBottom: '2px' // 항목 간 간격 추가
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
