import { Row, Col, } from 'antd';

class DynamicGrid {
    constructor(rowsCount, span) {
        this._rowsCount = rowsCount;
        this._span = span;
    }

    getRowsCount() {
        return this._rowsCount;
    };

    getSpan() {
        return this._span;
    };

    fillGrid(data) {
        const cols = [];
        data.forEach(element => {
            cols.push(<Col span={this.getSpan()}>{element}</Col>);
        });

        const rows = [];
        let start = 0;
        let end = 3;
        for (let row = 0; row < this.getRowsCount(); row++) {
            rows.push(<Row>{cols.slice(start, end)}</Row>);
            start += 3;
            end += 3;
        }

        return rows;
    }
}

export default DynamicGrid;
