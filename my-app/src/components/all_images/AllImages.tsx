import styles from './allImages.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AllImgStateType, setAllImg} from "../../state/allImgReducer";
import {AppRootStateType} from "../../state/store";
import {FC, useEffect, useState} from "react";
import {ImgModalWindow} from "../ImgModalWindow/ImgModalWindow";

export const AllImages: FC<AllImagesPropsType> = (props) => {
    const allImg = useSelector<AppRootStateType, AllImgStateType>(state => state.allImg)
    const dispatch = useDispatch()
    const [currentImage, setCurrentImage] = useState<number>(0)

    useEffect(() => {
        dispatch(setAllImg())
    }, [])

    const openImgModalHandler = (image_id: number) => {
        props.setIsModalOpen()
        setCurrentImage(image_id)
    }

    return (
        <>
            <div className={styles.all_img_container}>
                {
                    allImg.images.map(img => {
                        return (
                            <div
                                onClick={() => openImgModalHandler(img.image_id)}
                                className={styles.img_item}
                                key={img.image_id}>
                                <img src={img.src} alt="small_img"/>
                            </div>
                        )
                    })
                }
                {props.isModalOpen &&
                <ImgModalWindow
                    image_id={currentImage}
                    closeHandler={props.setIsModalOpen}
                />
                }
            </div>
        </>
    )
}

// types

type AllImagesPropsType =
{
    isModalOpen: boolean
    setIsModalOpen: () => void
}