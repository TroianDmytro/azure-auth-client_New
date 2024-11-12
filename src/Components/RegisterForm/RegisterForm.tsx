import { FC, useContext, useState } from "react"
import { Button, FloatingLabel, Form } from "react-bootstrap";
import styles from "./RegistrationForm.module.css"
import FileUpload from "../FileUpload/FileUpload";
import { registerRequest } from "../../Requests/Requests";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/Context";

const RegistrationForm: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>("");
    const [login, setLogin] = useState<string>('');
    const [pass, setPass] = useState<string>('');
    const [repeatPass, setRepeatPass] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [status, setStatus] = useState<string | null>(null);
    const {setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handleChangeFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    }

    const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    }

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    }

    const handleChangePass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    }

    const handleChangeRepeatPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRepeatPass(event.target.value);
    }

    

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!firstName || !lastName || !login || !pass || pass != repeatPass || !selectedFile) {
            console.log("Incorrectly filled out form.");
            return;
        }

        

        const request = {
            fullName: firstName + ' ' + lastName,
            login: login,
            pass: pass,
            avatar: selectedFile
        }

        registerRequest(request).then((prom) => {
            console.log("promise", prom);
            if (!prom)
                return;

            setStatus(prom);
            
        })

        if(status === "Регистрация прошла успешно."){
            setTimeout(() => {
                setUser(null);
                // Переход на другую страницу с обновлением
                navigate('/login', { replace: true });
            }, 3000);
        }

    }

    return (<>
        <div className={styles.RegisterContainerStyles}>
            <div className={styles.StatusContainer}>{status}</div>
            <Form className={styles.RegisterFormStyles} onSubmit={handleOnSubmit} >
                <FloatingLabel
                    controlId="floatingFirstName"
                    label="First name"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="First name"
                        onChange={handleChangeFirstName}
                    />
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingLastName"
                    label="Last name"
                    className="mb-3"
                >
                    <Form.Control type="text" placeholder="Last name"
                        onChange={handleChangeLastName} />
                </FloatingLabel>
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
                <FloatingLabel
                    controlId="floatingRepeatPassword"
                    label="Repeat password"
                    className="mb-3"
                >
                    <Form.Control type="password" placeholder="Repeat password"
                        onChange={handleChangeRepeatPass} />
                </FloatingLabel>

                <FileUpload onFileChange={setSelectedFile}></FileUpload>

                <Button variant="primary" type="submit" className="mt-5" >
                    Submit
                </Button>
            </Form>
        </div>

    </>);

}

export default RegistrationForm