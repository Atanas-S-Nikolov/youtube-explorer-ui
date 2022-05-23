import React from "react";

import { Row, Col, } from 'antd';

class DynamicGrid {
    constructor(rowsCount, span) {
        this.rowsCount = rowsCount;
        this.span = span;
    }

    fillGrid(data) {
        const cols = [];
        data.forEach(element => {
            cols.push(<Col span={this.span}>{element}</Col>);
        });

        const rows = [];
        let start = 0;
        let end = 3;
        for (let row = 0; row < this.rowsCount; row++) {
            rows.push(<Row>{cols.slice(start, end)}</Row>);
            start += 3;
            end += 3;
        }

        return rows;
    }
}

export default DynamicGrid;
