import React from 'react';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./UserAvatar.css"

interface UserAvatarProps {
    avatar: string | null; // Base64 строка изображения
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatar }) => (
    <div className="d-flex align-items-center">
        <div className="user-photo-container me-3">
            <Image
                src={`data:image/png;base64,${avatar}`}
                alt="User Avatar"
                roundedCircle
                className="user-avatar"
            />
        </div>
    </div>
);

export default UserAvatar;
