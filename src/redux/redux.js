import { combineReducers, legacy_createStore as createStore } from "redux";

const locationAction = (latitude, longitude) => {
    return {
        type: 'updateLocation',
        lat: latitude,
        lon: longitude
    }
}
const cityNameAction = (name) => {
    return {
        type: 'updateCityName',
        payload: name
    }
}
const locationReducer = (state = [21.0245, 105.84117], action) => {
    switch(action.type){
        case 'updateLocation': return [action.lat, action.lon];
        default: return state;
    }
}
const cityNameReducer = (state = 'Hanoi', action) => {
    switch(action.type){
        case 'updateCityName': return action.payload;
        default: return state;
    }
}

const allReducer = combineReducers({
    location: locationReducer,
    cityName: cityNameReducer
})
const store = createStore(allReducer);

export {locationAction, cityNameAction, store};