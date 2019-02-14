const transformCsvImportToGraphData = (value, header) => {
    switch(header) {
        case 'value':
        case 'conv':
        case 'min':
        case 'max':
        case 'step':
            return value !== '' ? parseFloat(value) : null;
        default:
            return value !== '' ? value : null;
    }
};

export default transformCsvImportToGraphData;