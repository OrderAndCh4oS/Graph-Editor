import React from 'react';
import { Column, Row } from '../../elements/structure';
import CsvImport from './csv-import';
import transformCsvImportToGraphData
    from '../../transform/transform-csv-import-to-graph-data';
import CsvExport from './csv-export';
import transformGraphNodesToJson
    from '../../transform/transform-graph-nodes-to-json';

const CsvRow = ({graph, createGraphFromJson}) =>
    <Row>
        <Column span={3}>
            <CsvImport
                complete={createGraphFromJson}
                transform={transformCsvImportToGraphData}
            />
        </Column>
        <Column span={3}>
            <CsvExport
                data={graph} transform={transformGraphNodesToJson}
            />
        </Column>
    </Row>;

export default CsvRow;