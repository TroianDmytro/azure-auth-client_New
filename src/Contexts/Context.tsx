import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export interface User {
    fullName: string,
    login: string,
    avatar: string | null
}

export interface UserContextInterface {
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
}

//значение по умолчанию
const defaultState = {
    user: {
        fullName: '',
        login: '',
        avatar: ""
    }, // Порожній user
    setUser: () => { } // Заглушка для функції
} as UserContextInterface

//создаем context
export const UserContext = createContext(defaultState);

//указуем что должно бить в провайдере 
export type UserProviderProps = {
    children: ReactNode;
}

//создаем сам провайдер context
export default function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<User | null>(() => {
        // Проверяем наличие данных в localStorage
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        // Обновляем localStorage при изменении пользователя
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}