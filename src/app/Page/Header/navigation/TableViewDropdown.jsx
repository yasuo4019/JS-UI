import _ from 'lodash';
import { useMemo } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Constants from '../../../../config/constants';
import * as actions from '../../../../store/navigation/actions';
import * as builder from '../../../../features/url/builder';

function TableViewDropdown({ className, toggleTable }) {
    const navigate = useNavigate();

    const tableOptions = useMemo(() => _.toPairs(Constants.table)
        .map(([type, config]) =>
            <Dropdown.Item
                key={_.uniqueId(config.key)}
                onClick={() => {
                    toggleTable(`table.${type}`);
                    navigate(builder.buildTabledUrl(config.url.root, 'display'));
                }}
            >
                {config.title}
            </Dropdown.Item>
        ),
        [toggleTable, navigate]
    );

    const viewOptions = useMemo(() => _.toPairs(Constants.view)
        .map(([type, config]) =>
            <Dropdown.Item
                key={_.uniqueId(config.key)}
                onClick={() => {
                    toggleTable(`view.${type}`);
                    navigate(builder.buildViewUrl(config.url.root, 'display'));
                }}
            >
                {config.title}
            </Dropdown.Item>
        ),
        [toggleTable, navigate]
    );

    return (
        <DropdownButton id="view-table-dropdown" className={className} title="Display">
            <Dropdown.Header>Views</Dropdown.Header>
            {viewOptions}
            <Dropdown.Divider />
            <Dropdown.Header>Tables</Dropdown.Header>
            {tableOptions}
        </DropdownButton >
    );
}

const mapDispatchToProps = (dispatch) => ({
    toggleTable: (type) => dispatch(actions.setActiveTable(type))
});

export default connect(null, mapDispatchToProps)(TableViewDropdown);
