import axios from "axios";


type RegisterProps = {
    fullName: string,
    login: string,
    pass: string,
    avatar: File | null
}
//registration
export async function registerRequest(data: RegisterProps) {

    const formData = new FormData();
    formData.append("FullName", data.fullName);
    formData.append("Login", data.login);
    formData.append("Password", data.pass);

    if (data.avatar) {
        formData.append("Avatar", data.avatar);
    }
    else {
        return "Загрузите изображение.";
    }

    console.log(formData);

    try {
        const response = await axios.post("https://localhost:7115/api/auth/registr", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Регистрация прошла успешно:", response.data);

        return "Регистрация прошла успешно.";
    } catch (error) {
        console.error("Ошибка при регистрации:", error);
        return "Ошибка при регистрации.";
    }
}

//authorization
type LoginRequest = {
    login: string,
    pass: string
}
export async function loginReauest(data: LoginRequest) {
    const formData = new FormData();
    formData.append("Login", data.login);
    formData.append("Password", data.pass);

    console.log(formData);

    try {
        const response = await axios.post("https://localhost:7115/api/auth/login", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = response.data;
        console.log("Авторизация прошла успешно:", response['data']);
        return result;

    } catch (error) {
        console.error("Ошибка при авторизации:", error);
        return null;
    }

}