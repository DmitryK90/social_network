import React from "react";
import style from './MyPosts.module.css';
import Posts from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../Utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10)

const MyPosts = React.memo((props) => {
    let postsElements = props.posts.map(p => <Posts key={p.id} messege={p.message} likes={p.likesCount}/>)

    let onAddPost = (values) => { // в values бужет newPostText
        props.addPost(values.newPostText);
    }

    return (
        <div>
            Введите комментарий:
            <div className={style.main}>
                <AddNewPostForm onSubmit={onAddPost}/>
            </div>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    )
});

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={Textarea} name='newPostText' validate={[required, maxLength10]} placeholder={'Post message'}/>
            <button className={style.add_post_btn}>Add post</button>
        </form>
    )
} // validate - валидация, сама фугкция в папке utils. required - название функции.
  // maxLength10 - второй валидатор(вынесли чтобы не циклилось за пределы комп.).
  // maxLength10 вызывает maxLengthCreator(10) креэйтор валидатора который возвращает функцию.

AddNewPostForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm)

export default MyPosts;