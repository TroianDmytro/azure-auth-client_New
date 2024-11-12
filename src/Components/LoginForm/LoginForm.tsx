import { FC, useContext, useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import styles from './LoginForm.module.css';
import { loginReauest } from "../../Requests/Requests";
import { UserContext } from "../../Contexts/Context";

const LoginForm: FC = () => {
    const [login, setLogin] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const {user,setUser} = useContext(UserContext);

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    }

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log(login,pass);

        if ( !login || !pass) {
            console.log("Incorrectly filled out form.");
            return;
        }

        const request = {
            login:login,
            pass:pass
        }
        loginReauest(request).then(promise=>{
            console.log("promise",promise)
            setUser(promise);
        });
        
    }

    useEffect(()=>{console.log("user",user);},[user]);

    return (<div className={styles.LoginContainerStyles}>
        <Form className={styles.LoginFormStyles} onSubmit={handleOnSubmit} >
            <FloatingLabel
                controlId="floatingLogin"
                label="Login"
                className="mb-3"
            >
                <Form.Control type="text" placeholder="Login"
                    onChange={handleChangeLogin} />
            </FloatingLabel>
            <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
            >
                <Form.Control type="password" placeholder="Password"
                    onChange={handleChangePass} />
            </FloatingLabel>
            <Button variant="primary" type="submit" className="mt-3" >
                Submit
            </Button>
        </Form>
    </div >);
}

export default LoginForm;