import Table from "react-bootstrap/Table";
import * as utils from "../utilities/utils";

function FileDescription({ file = [] }) {
    return (
        <div id="id_filesTable">
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Size (bytes)</th>
                        <th>Type</th>
                        <th>State</th>
                    </tr>
                </thead>
                <tbody>
                    {file.map((f, index) => {
                        const sizeFormatted = utils.byteSizeAsText(f.size);

                       return (<tr key={`${index}_${f.name}`}>
                            <td>{index}</td>
                            <td>{f.name}</td>
                            <td>{sizeFormatted}</td>
                            <td>{f.type}</td>
                            <td>{f.state}</td>
                        </tr>)
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default FileDescription;
