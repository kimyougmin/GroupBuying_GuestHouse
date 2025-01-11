import React from 'react';
import "../styles/PhotoModal.css"
import CloseIcon from "@mui/icons-material/Close";
import {Add, PhotoLibrary} from "@mui/icons-material";
import {Button} from "@mui/material";
import i18n from "../utils/i18n";

interface props {
    setIsPhotoModal: (isPhotoModel: boolean) => void
}
function PhotoModal({setIsPhotoModal}: props) {
    const photoModalRef = React.useRef(null);
    const [isDragAction, setIsDragAction] = React.useState(false);

    const onPhotoModalClickHandler = (e: React.MouseEvent) => {
        const target = e.target as HTMLDivElement;
        if (target.className === "photoModal-background") {
            setIsPhotoModal(false);
        }
    }
    const onDragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }
    const onPhotoDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const blobUrl: string[] = [];
        for(const i in Object.keys(e.dataTransfer.files)){
            blobUrl.push(URL.createObjectURL(e.dataTransfer.files[i]));
        }
        console.log(blobUrl)
        setIsDragAction(false);

    }
    return (
        <div className={"photoModal-background"} ref={photoModalRef} onClick={onPhotoModalClickHandler}>
            <div className={"photoModal"}>
                <div className={"photoModal-header"}>
                    <CloseIcon onClick={() => setIsPhotoModal(false)}/>
                    <div>
                        <h1>{i18n.t("upload_photo")}</h1>
                        <p>{i18n.t("no_files_selected")}</p>
                    </div>
                    <Add />
                </div>
                <div className={isDragAction ? "photoModal-body-action": "photoModal-body"}
                     onDragEnter={() => setIsDragAction(true)}
                     onDragLeave={() => setIsDragAction(false)}
                     onDrop={onPhotoDropHandler}
                     onDragOver={onDragOverHandler}
                >
                    <PhotoLibrary/>
                    <h1 className={"dragAndDrop"}>{i18n.t("drag_and_drop_photos")}</h1>
                    <p>{i18n.t("or")}</p>
                    <p className={"directly"}>{i18n.t("directly_select")}</p>
                    <Button>{i18n.t("find")}</Button>
                </div>
                <div className={"photoModal-footer"}>
                    <Button onClick={() => setIsPhotoModal(false)}>{i18n.t("close")}</Button>
                    <Button>{i18n.t("upload")}</Button>
                </div>
            </div>
        </div>
    );
}

export default PhotoModal;
