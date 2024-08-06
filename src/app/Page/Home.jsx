import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';


const Home = () => {
    const [newsData, setNewsData] = useState([]); 

    useEffect(() => {
        const fetchNewsData = async () => {
            const fetchedNewsData = [
                {
                    title: 'Mortgages, state support, rental housing government discusses ways to provide housing for citizens',
                    summary: 'MINSK, 3 April (BelTA) - BelTA reports. Under the leadership of Prime Minister Roman Golovchenko, the government...',
                    url: 'https://chn.belta.by/society/view/-26086-2024/'
                },
                {
                    title: 'Introduction to Belarus State University',
                    summary: 'Belarusian State University (Belarusian: Белару́скі Дзяржа́ўны Унівэрсытэ́т; Russian: Белору́сский Госуда́рственный Университете́т)...',
                    url: 'https://bsu.by/'
                },
                {
                    title: 'Introduction to Belarus State University',
                    summary: 'Belarusian State University (Belarusian: Белару́скі Дзяржа́ўны Унівэрсытэ́т; Russian: Белору́сский Госуда́рственный Университете́т)...',
                    url: 'https://bsu.by/'
                },
            ];
            setNewsData(fetchedNewsData); 
        };

        fetchNewsData();
    }, []); 

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            {/* 渲染新闻数据 */}
                            {newsData.map((newsItem, index) => (
                                <Card key={index} className="mb-3">
                                    <Card.Body>
                                        <Card.Title>{newsItem.title}</Card.Title>
                                        <Card.Text>
                                            {newsItem.summary}
                                            <a href={newsItem.url} target="_blank" rel="noopener noreferrer"> Read more</a>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>

                
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <div id="id_home" className="home-page">
                                <h4>
                                    HGSV - Human Genome Sequence Variations - information and
                                    analysis system of identifying and annotating sites of genetic
                                    polymorphism of human genomic sequencing data.
                                </h4>
                                <div id="id_homeNews" className="custom-font-size">
                                    <p>
                                        High-performance methods for reading nucleotide sequences,
                                        due to the rapid development and cost reduction of new
                                        generation sequencing technologies, are increasingly used in
                                        the diagnosis and prediction of the course of various human
                                        diseases (including personalized medicine), are used in
                                        sports medicine, forensics, as well as agriculture, forestry
                                        and hunting. At the same time, it is not the problem of
                                        obtaining primary genomic sequencing data that comes to the
                                        fore, but the problems of data storage, preliminary
                                        processing, and analysis.
                                    </p>
                                    <p>
                                        The HGSV information and analysis system consist of the
                                        database containing both experimental data and results of
                                        analysis and the integrated package of computer programs
                                        written in the programming languages R and C++, aimed at
                                        identifying and annotating sites of genetic polymorphism
                                        according to genome sequencing data. This analysis pipeline
                                        will be able to produce a full cycle of identification and
                                        annotation of nucleotide variations of functionally
                                        significant regions of human genomes and economically
                                        valuable species, breeds and varieties of animals and
                                        plants.
                                    </p>
                                    <p>The analysis includes the following steps:</p>
                                    <ul>
                                        <li>assessment of the quality of primary data;</li>
                                        <li>preprocessing and filtering of primary data;</li>
                                        <li>short read mapping;</li>
                                        <li>identification of polymorphic sites;</li>
                                        <li>annotation of identified polymorphic sites;</li>
                                        <li>
                                            visualization and interpretation of the analysis
                                            results.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
export default Home;
