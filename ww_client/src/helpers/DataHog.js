import data_bls_city from '../samples/city_bls_samples.js';
import data_bls_state from '../samples/state_bls_samples.js';
import data_bls_nation from '../samples/nation_bls_samples.js';
import data_bls_metro from '../samples/metro_bls_samples.js';
import data_col from '../samples/state_col_samples.js';
import state_and_cities from '../samples/state_and_cities';

class DataHog {

    constructor(type) {

        this.data_col = data_col;
        this.data_bls_state = data_bls_state;
        this.data_bls_nation = data_bls_nation;
        this.data_bls_metro = data_bls_metro;
        this.data_bls_city = data_bls_city;
        this.state_and_cities = state_and_cities;

        // console.log("BLS CITY");
        // console.log(data_bls_city);
        // console.log("BLS STATE")
        // console.log(data_bls_state);
        // console.log("BLS NATION");
        // console.log(data_bls_nation);
        // console.log("BLS METRO");
        // console.log(data_bls_metro);
        // console.log("DATA_COL");
        // console.log(data_col);

    }

    COLdataByState(state) {

    }

    COLdataByCity(city) {

    }

    COLdataByCityAndState(city, state) {
        
    }

    ////////

    dataByIndustry(industry) {
        
    }
    
    dataByRegion(region) {

    }
}

export default DataHog;