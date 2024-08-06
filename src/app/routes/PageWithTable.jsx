import { Container } from "react-bootstrap";
import { Outlet, useOutlet } from "react-router-dom";
import Table from "../Components/table/Table";

function PageWithTable(props) {
    const outletElement = useOutlet();

    if (outletElement) {
        return <Outlet />;
    }

    return (
        <Container>
            <div id="id_samples" className="d-grid gap-4">
                <h2>{props.title}</h2>
                <div id="id_samplesTableView" className="table-responsive">
                    <Table
                        defaultType={props.type}
                        isEditable={props.isEditable}
                    />
                </div>
            </div>
        </Container>
    );
};

export default PageWithTable;
