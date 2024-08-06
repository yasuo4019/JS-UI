import { Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";


import Layout from '../Components/common/Layout'; 

const AboutUs = () => (
    <Layout>
    <Container>
        <div id="id_home" className="d-grid gap-4 home-page">
            <h2>About us</h2>
            <div id="id_homeNews">
                <p>
                    Our team includes lecturers and scientists with extensive
                    teaching experience, as well as rich experience in
                    fundamental and applied scientific research in the field of
                    biological and medical data analysis. A summary of our team
                    members is provided below. For more information about each
                    of us, you can follow the links provided.
                </p>

                <div className="flex-div profile-card">
                    <a href="http://www.bio.bsu.by/genetics/grinev_ru.html">
                        <Image
                            src="https://biodata-analytics.sstcenter.com/wp-content/uploads/2021/04/grinev_vv-228x300.jpg"
                            alt="Grinev V."
                            width="152"
                            height="200"
                        />
                    </a>
                    <div>
                        <div className="subtitle">
                            <a href="http://bio.bsu.by/genetics/grinev.html">
                                {" "}
                                Vasily V. Grinev{" "}
                            </a>
                        </div>
                        <p>
                            Candidate of Biological Sciences, Associate
                            Professor, Principal Investigator, Department of
                            Genetics, Belarusian State University.
                        </p>
                        <p>
                            Phone: +375 (17) 209-58-60
                            <br />
                            E-mail: grinev_vv@bsu.by
                        </p>
                    </div>
                </div>

                <div className="flex-div profile-card">
                    <a href="https://rfe.bsu.by/info/people/staff/prepodavateli/61650/61525">
                        <Image
                            className="alignleft"
                            src="https://biodata-analytics.sstcenter.com/wp-content/uploads/2021/04/yatskou_nn-228x300.jpg"
                            alt="Yatskou M."
                            width="152"
                            height="200"
                        />
                    </a>
                    <div>
                        <div className="subtitle">
                            <a href="https://rfe.bsu.by/info/people/staff/prepodavateli/61650/61525">
                                Mikalai M. Yatskou
                            </a>
                        </div>
                        <p>
                            Candidate of Physical and Mathematical Sciences,
                            Associate Professor, Head of Department of System
                            Analysis and Computer Modeling, Belarusian State
                            University.
                        </p>
                        <p>
                            Phone: +375 (17) 326-02-22
                            <br />
                            E-mail: yatskou@bsu.by
                        </p>
                    </div>
                </div>

                <div className="flex-div profile-card">
                    <a href="https://rfe.bsu.by/info/people/staff/prepodavateli/61650/skakun">
                        <Image
                            className="alignleft"
                            src="https://biodata-analytics.sstcenter.com/wp-content/uploads/2021/04/skakun_vv-228x300.jpg"
                            alt="Skakun V."
                            width="152"
                            height="200"
                        />
                    </a>
                    <div>
                        <div className="subtitle">
                            <a href="https://rfe.bsu.by/info/people/staff/prepodavateli/61650/skakun">
                                Victor V. Skakun
                            </a>
                        </div>
                        <p>
                            Candidate of Physical and Mathematical Sciences,
                            Associate Professor, Department of System Analysis
                            and Computer Modeling, Belarusian State University.
                        </p>
                        <p>
                            Phone: +375 (17) 326-70-42
                            <br />
                            E-mail: skakun.victor@gmail.com
                        </p>
                    </div>
                </div>

                <div className="flex-div profile-card">
                    <a href="http://edu.modas.lu/">
                        <Image
                            className="alignleft"
                            src="https://biodata-analytics.sstcenter.com/wp-content/uploads/2021/04/nazarov_p-228x300.jpg"
                            alt="Nazarov P."
                            width="152"
                            height="200"
                        />
                    </a>
                    <div>
                        <div className="subtitle">
                            <a href="http://edu.modas.lu/">Petr V. Nazarov</a>
                        </div>
                        <p>
                            Guest Lecturer, PhD, Candidate of Physical and
                            Mathematical Sciences, Head of the Department of
                            Bioinformatics, Luxembourg Institute of Health
                            (Integrated Bed to Bench Operations 1A-B, rue Thomas
                            Edison, L-1445 Strassen, Luxembourg).
                        </p>
                        <p>
                            Phone: +352 2697-03-85
                            <br />
                            E-mail: Petr.Nazarov@lih.lu
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </Container>
    </Layout>
);

export default AboutUs;
