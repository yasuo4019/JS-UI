import { Container, Row, Col } from "react-bootstrap";
import ContactForm from "../Components/form/ContactForm";


import Layout from '../Components/common/Layout'; 


const Contacts = () => (
<Layout>
    <Container>
        <h3>Contacts</h3>
        <Row>
            {/* <div id="id_home" className="d-grid"> */}
            <Col md={6} sm={12}>
                <p>
                    Our team are professionals teaching at two geographically
                    close faculties of{" "}
                    <a href="https://bsu.by/">Belarusian State University</a>:
                    Faculty of Radiophysics and Computer Technologies and
                    Faculty of Biology. Our team is united by the implementation
                    of joint scientific research in the field of bioinformatics.
                </p>
                <p>Our contact details:</p>
                <p>
                    <strong>
                        Department of System Analysis and Computer Modeling
                        <br />
                        Belarusian State University
                    </strong>
                </p>
                <address>
                    St. Kurchatova, 1, room 51 and 54, 220108 Minsk, Belarus
                    <br />
                    Tel: +375 (17) 326-70-42
                </address>
                <p>
                    <strong>
                        Department of Genetics
                        <br />
                        Belarusian State University
                    </strong>
                </p>
                <address>
                    St. Kurchatova, 10, room 425, 220108 Minsk, Belarus
                    <br />
                    Tel: +375 (17) 209-58-60
                </address>
                <p>
                    <strong>You can contact us at this address: </strong>
                    <br />
                    <a href="mailto:bioinformatics.rfct.bio.bsu@gmail.com">
                        bioinformatics.rfct.bio.bsu@gmail.com
                    </a>
                </p>
                <hr />
                <p>Web-site developers: </p>
                <p>
                    E-mail:{" "}
                    <a href="mailto:yury.kabernik.berazouski@gmail.com">
                        Yuri Kobernik-Berezovsky
                    </a>
                </p>
                <p>
                    E-mail:{" "}
                    <a href="mailto:skakun.victor.@gmail.com">Victor Skakun</a>
                </p>
            </Col>
            <Col md={{ span: 5, offset: 1 }} sm={12} style={{
                border: '1px solid #dee2e6', 
                borderRadius: '0.25rem', 
                padding: '1rem', 
                marginTop: '-50px' 
            }}>
                <h4>Contact form</h4>
                <div>
                    <ContactForm />
                </div>
            </Col>
            {/* </div> */}
        </Row>
    </Container>
    </Layout>
);

export default Contacts;
