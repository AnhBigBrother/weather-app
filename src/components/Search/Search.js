import { useEffect, useRef, useState } from "react";
import spinner from '../../icons/spinner';
import { GEOGRAPHY_API_OPTION, GEOGRAPHY_URL } from "../../API";
import './Search.css';
import { useDispatch } from "react-redux";
import { locationAction, cityNameAction } from '../../redux/redux.js'


const Search = () => {
    const dispatch = useDispatch();
    const [inputVal, setInputVal] = useState('');
    const [displayDropDown, setDisplayDropDown] = useState({display: "none"});
    const [dropDownList, setDropDownList] = useState();
    const [placeHolder, setPlaceHolder] = useState('Hanoi, Vietnam');
    const location = useRef([]); //keys word: 'Stale Closures when Using React Hooks
    
    useEffect(() => {
        setDropDownList(spinner);
        if (inputVal === ""){setDisplayDropDown({display: "none"})}
        else {setDisplayDropDown({display: "block"})}
        let timer = setTimeout(() => {
            const url = GEOGRAPHY_URL + `&namePrefix=${inputVal}`;
            console.log("fetch: " + "url = " + url);
            fetch(url, GEOGRAPHY_API_OPTION)
                .then((res) => res.json())
                .then((data) => {
                    if (data.data.length === 0){
                        setDropDownList(<div style={{marginLeft: "15px"}}>can not find this location</div>)
                    }
                    else {
                        const newDropDownList = data.data.map((e, i) => <div key={i} className="dropdownItem" onClick={() => handleSelectLocation(i)}>{e.name}, {e.country}</div>)
                        location.current = data.data
                        setDropDownList(newDropDownList);
                        console.log("location respone:");
                        console.log(location.current);
                    }
                })
                .catch((err) => {console.log(err)});
        }, 800);
        if (inputVal === "") { clearTimeout(timer) };
        return () => clearTimeout(timer);
    }, [inputVal]);
    const handleSelectLocation = (i) => {
        dispatch(locationAction(location.current[i].latitude, location.current[i].longitude));
        dispatch(cityNameAction(location.current[i].city));
        setInputVal("");
        setPlaceHolder(location.current[i].city + ", " + location.current[i].country);
        console.log("chose: " + location.current[i].city + ", " + location.current[i].country)
    }
    return (
        <div id="search">
            <input id='searchInput' onChange={(e) => { setInputVal(e.target.value) }} 
            value={inputVal} placeholder={placeHolder}></input>
            <div id='dropdown' style={displayDropDown}>{dropDownList}</div>
        </div>
    );
}

export default Search;