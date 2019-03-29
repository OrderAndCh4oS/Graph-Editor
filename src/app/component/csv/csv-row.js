import React from 'react';
import { Column, Row } from '../../elements/structure';
import CsvImport from './csv-import';
import transformCsvImportToGraphData
    from '../../transform/transform-csv-import-to-graph-data';
import CsvExport from './csv-export';
import transformGraphNodesToJson
    from '../../transform/transform-graph-nodes-to-json';
import { Button } from '../../elements/button';

const CsvRow = ({graph, createGraphFromJson, cloneModel, showClone}) =>
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
        {showClone() ? <Column span={3} className={'push-right'}>
            <div className={'tool-bar-item tool-bar--button align-right'}>
                <Button
                    onClick={cloneModel} className={'affirmative'}
                >Clone</Button>
            </div>
        </Column> : null}
    </Row>;

export default CsvRow;
