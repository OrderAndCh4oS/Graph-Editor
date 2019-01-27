import React from 'react';
import * as Papa from 'papaparse';

const handleCSVImport = (complete, transform) => (event) => {
    Papa.parse(event.target.files[0], {
        header: true,
        complete,
        transform,
    });
};

const CsvImport = ({complete, transform}) =>
    <div className={'tool-bar-item import-csv'}>
        <label>
            <span>Import CSV</span>
            <input
                type='file' onChange={handleCSVImport(complete, transform)}
            />
        </label>
    </div>;

export default CsvImport;
