import "../SearchBar.css";

import React, { useState, useRef } from "react";

import { SearchOutlined, CloseOutlined } from '@ant-design/icons'

import { isChannelNameValid } from "../utils/validation-utils";
import useOutsideClick from "../utils/useOutsideClick";

import { useSelector, useDispatch } from "react-redux/es/exports";
import { changeChannelName } from "../redux/channelDataSlice";

import {v4 as uuidv4} from 'uuid';

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const channelName  = useSelector((state) => state.channelData.channelName);
  const dispatch = useDispatch();
  const dataResultRef = useRef();
  const inputRef = useRef();

  useOutsideClick(dataResultRef, () => {
    if (isDisplayed) { 
      setIsDisplayed(false);
    }
  }, inputRef)

  const handleFilter = () => {
    const newFilter = data.filter((value) => {
      return value.toLowerCase().includes(channelName.toLowerCase());
    });

    if (channelName === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
  };

  const handleOnChange = (name) => {
    dispatch(changeChannelName({
        isChannelNameValid: isChannelNameValid(name.trim()),
        channelName: name
    }));
    handleFilter();
  }

  const triggerInputEvent = (value) => {
    const input = document.getElementById("input");

    const lastValue = input.value;
    input.value = value;
    const event = new Event("input", { bubbles: true });
    const tracker = input._valueTracker;
    if (tracker) {
      tracker.setValue(lastValue);
    }
    input.dispatchEvent(event);
  }

  return (
    <div className="search">
      <div className="search-inputs">
        <input 
            id="input"
            type="text"
            placeholder={placeholder}
            value={channelName}
            onClick={() => setIsDisplayed(true)}
            onChange={(event) => {
                event.preventDefault();
                handleOnChange(event.target.value)
            }}
            ref={inputRef}
        />
        <div className="search-icon">
          {filteredData.length === 0 ? (
            <SearchOutlined />
          ) : (
            <CloseOutlined id="close-icon" onClick={clearInput}/>
          )}
        </div>
      </div>
      {filteredData.length !== 0 && isDisplayed && (
        <div className="data-result-wrapper">
            <div className="data-result" ref={dataResultRef}>
            {filteredData.slice(0, 15).map((value) => {
                return (
                    <div 
                        key={uuidv4()} 
                        className="data-item" 
                        onClick={() => triggerInputEvent(value)}
                    >
                        <p>{value}</p>
                    </div>
                );
            })}
            </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;