import { Container, Row, Col } from "react-bootstrap";

function Footer() {
    return (
        <Container fluid>
            <div className="container App-footer-content">
                <Row>
                    <Col>
                        <div>
                            <p>Belarusian State University</p>
                            <p>HGSV developers team</p>
                        </div>
                        <div>
                            +375 17 398 7042; +375 17 398 0222; +375 (17)
                            209-58-60{" "}
                        </div>
                    </Col>
                    <Col>
                        <p>
                            <a href="https://orfhunter.bsu.by">ORFHunteR</a> -
                            service to find Open Reading Frames in RNA sequences
                        </p>
                        <p>
                            <a href="https://biodata-analytics.sstcenter.com/en/main-en/">
                                Biodata-Analytics
                            </a>{" "}
                            - educational and advisory services in the field of
                            analysis of big biological and medical data
                        </p>
                        <p>
                            <a href="https://spma.bsu.by">SPMA laboratory</a>
                        </p>
                    </Col>
                </Row>
                <Row>
                    <hr className="Hr-footer" />
                    <Col>
                        <div className="copyright">
                            &copy; HGSV - 2022-2023, Belarusian State University
                        </div>
                    </Col>
                    <Col>
                        <div className="copyright">
                            This site does not use cookies
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}

export default Footer;
