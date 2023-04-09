import { ChangeEvent, useRef, useState } from "react";
import StyledImage from "./Style";
import { Button } from "@mui/material";

export interface IFile {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

type Props = {
  imageUrl?: string;
  className?: string;
  onChange: (img: IFile) => void;
};

export const UploadImage = ({ imageUrl, className, onChange }: Props) => {
  const [imgUrl, setImgUrl] = useState<string>("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) {
      return;
    }
    setImgUrl(URL.createObjectURL(files[0]));
    onChange(files[0]);
  };

  return (
    <StyledImage className={className}>
      <Button
        onClick={() => fileRef.current?.click()}
        variant="contained"
      >
        Загрузить картинку
      </Button>
      <input
        style={{display : "none"}}
        className="img-input"
        type="file"
        ref={fileRef}
        onChange={changeHandler}
        accept="image/*"
      />
      {imgUrl ? <img className="img" src={imgUrl} alt="" /> : "" }
      
    </StyledImage>
  );
}


