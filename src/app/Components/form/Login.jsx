import { Form } from "react-bootstrap";

export default function LoginForm() {
    return (
        <Form>
            <Form.Group
                className="mb-3"
                controlId="ctrl-Login-Email"
            >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus={true}
                />
            </Form.Group>
            <Form.Group
                className="mb-3"
                controlId="ctrl-Login-Password"
            >
                <Form.Group
                    className="mb-3"
                    controlId="formBasicPassword"
                >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                    />
                </Form.Group>
            </Form.Group>
        </Form>
    );
}