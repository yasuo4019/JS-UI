import _ from 'lodash';
import { useMemo } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Constants from '../../../../config/constants';
import * as actions from '../../../../store/navigation/actions';
import { buildTabledUrl } from '../../../../features/url/builder';

function TableEditDropdown({ className, toggleTable }) {
    const navigate = useNavigate();
    const tableOptions = useMemo(() => _.toPairs(Constants.table)
        .filter(([type, config]) => config.isEditable)
        .map(([type, config]) =>
            <Dropdown.Item
                key={_.uniqueId(config.key)}
                onClick={() => {
                    toggleTable(`table.${type}`);
                    navigate(buildTabledUrl(config.url.root, 'edit'));
                }}
            >
                {config.title}
            </Dropdown.Item>
        ),
        [toggleTable, navigate]
    );

    return (
        <DropdownButton id="edit-table-dropdown" className={className} title="Edit">
            {tableOptions}
        </DropdownButton >
    );
}

const mapDispatchToProps = (dispatch) => ({
    toggleTable: (type) => dispatch(actions.setActiveTable(type))
});

export default connect(null, mapDispatchToProps)(TableEditDropdown);
