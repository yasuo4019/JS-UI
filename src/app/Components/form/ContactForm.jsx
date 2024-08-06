import React from "react";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useRef } from "react";
//import emailjs from 'emailjs-com';

const FORM_ENDPOINT = ""; // TODO - fill on the later step

const ContactForm = () => {
    const [submitted, setSubmitted] = useState(false);
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            Name: form.current.name,
            subject: form.current.subject,
            email: form.current.email,
            message: form.current.message,
        };
        alert("tadaaa!: \n" + JSON.stringify(data) + "Your data");

        setTimeout(() => {
            setSubmitted(true);
        }, 100);
    };
    if (submitted) {
        return (
            <>
                <div className="text-2xl">Thank you!</div>
                <div className="text-md">We'll be in touch soon.</div>
            </>
        );
    }

    //   const sendEmail = (e) => {
    //     e.preventDefault();

    //     emailjs
    //       .sendForm(
    //         "service_b4qmiqc",
    //         "template_h9rzd14",
    //         form.current,
    //         "user_UHpNJFij8MtQD1aAfs38X"
    //       )
    //       .then(
    //         (result) => {
    //           console.log(result.text);
    //           alert("SUCCESS!");
    //         },
    //         (error) => {
    //           console.log(error.text);
    //           alert("FAILED...", error);
    //         }
    //       );
    //   };

    return (
        // <form ref={form} onSubmit={sendEmail}>
        <Form
            ref={form}
            action={FORM_ENDPOINT}
            onSubmit={handleSubmit}
            method="POST"
            target="_blank"
        >
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="enter your name"
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="enter your email"
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subject">
                <Form.Label>Subject of your message</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="enter message subject"
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="message">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={5} required />
            </Form.Group>
            <Button
                className="btn btn-primary submit-button"
                value="submit"
                type="submit"
            >
                Submit
            </Button>
        </Form>

        // <form ref={form} action={FORM_ENDPOINT} onSubmit={handleSubmit} method="POST" target="_blank">
        //     <div className="form-group">
        //         <label htmlFor="name">Name</label>
        //         <input
        //             type="name"
        //             name="name"
        //             className="form-control"
        //             id="name"
        //             placeholder="enter your name"
        //             required
        //         />
        //     </div>

        //     {/* <!-- email --> */}
        //     <div className="form-group">
        //         <label htmlFor="email">Email address</label>
        //         <input
        //             type="email"
        //             name="email"
        //             className="form-control"
        //             id="email"
        //             placeholder="enter your email"
        //             required
        //         />
        //     </div>

        //     {/* <!-- subject --> */}
        //     <div className="form-group">
        //         <label htmlFor="subject">Subject</label>
        //         <input
        //             type="text"
        //             name="subject"
        //             className="form-control"
        //             id="subject"
        //             placeholder="enter email subject"
        //             required
        //         />
        //     </div>

        //     <div className="form-group">
        //         <label htmlFor="message">Message</label>
        //         <textarea
        //             className="form-control"
        //             name="message"
        //             id="message"
        //             rows="5"
        //         ></textarea>
        //     </div>

        //     <button type="submit" className="btn btn-primary">
        //         Submit
        //     </button>
        // </form>
    );
};
export default ContactForm;
