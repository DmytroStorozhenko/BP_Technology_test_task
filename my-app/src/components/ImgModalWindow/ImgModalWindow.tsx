import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {addComment, ImgModalStateType, setImgModal} from "../../state/imgModalWindowReducer";
import styles from "./imgModalWindow.module.css"
import {useForm} from "../../common/customHooks/useForm";
import {Validate} from "../../common/helpers/validations_rules";
import closeBtn from "../../assets/img/close_btn.svg"

export const ImgModalWindow: FC<ImgModalPropsType> = (props) => {
    const dispatch = useDispatch()
    let imgInfo = useSelector<AppRootStateType, ImgModalStateType>(state => state.imgModalWindow)
    let {comments, src} = imgInfo

    useEffect(() => {
        dispatch(setImgModal(props.image_id))
    }, [])

    const submitCallback = () => {
        dispatch(addComment({
            name: values.name,
            description: values.description,
            image_id: props.image_id
        }))
        dispatch(setImgModal(props.image_id))
    }

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(submitCallback, Validate)
    return (
        <>
            <div className={styles.modal_container}>
                <div className={styles.modal}>
                    <button
                        className={styles.btn_close}
                        onClick={props.closeHandler}>
                        <img src={closeBtn} alt="close_btn"/>
                    </button>
                    <div className={styles.img}>
                        <img src={src} alt="big_img"/>
                    </div>
                    <div className={styles.comments_block}>
                        {comments.length > 0 ? comments.map(comment => {
                                return (
                                    <div
                                        key={comment.image_id}
                                        className={styles.comment_item}>
                                        <div className={styles.name}>{comment.name}</div>
                                        <div className={styles.comment}>{comment.description}</div>
                                    </div>
                                )
                            })
                            : <div>This image is without comments</div>
                        }
                    </div>
                    <div className={styles.form_container}>
                        <form onSubmit={handleSubmit} noValidate className={styles.form}>
                            <input
                                className={styles.form_input}
                                type='text'
                                name='name'
                                value={values.name || ''}
                                placeholder='Ваше имя'
                                onChange={handleChange}
                                autoComplete='off'
                            />
                            {errors.name && <div className={styles.invalid_value}>{errors.name}</div>}
                            <input
                                className={styles.form_input}
                                type='text'
                                name='description'
                                value={values.description || ''}
                                placeholder='Ваш комментарий'
                                onChange={handleChange}
                                autoComplete='off'
                            />
                            {errors.description && <div className={styles.invalid_value}>{errors.description}</div>}
                            <button
                                className={styles.form_btn}
                                type='submit'
                            >Оставить комментарий
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

// types

type ImgModalPropsType =
    {
        image_id: number
        closeHandler: () => void
    }