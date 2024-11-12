import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from "./FileUpload.module.css"

interface FileUploadProps {
  onFileChange: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const [buttonText, setButtonText] = useState("Выберите аватар");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setButtonText(file.name); // Обновляем текст на имя файла
      onFileChange(file); // Передаем файл в родительский компонент
    } else {
      setButtonText("Выберите аватар");
      onFileChange(null);
    }
  };

  return (
    <Form.Group className={styles.InputFileContainer} >
      <Button 
        variant="primary" 
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {buttonText === "Выберите аватар" ? "Загрузить файл" : "Изменить файл"}
      </Button>
      <Form.Label className="d-block">{buttonText}</Form.Label>
      <Form.Control 
        type="file" 
        id="fileInput" 
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </Form.Group>
  );
};

export default FileUpload;
