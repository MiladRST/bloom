"use client"
import { useState } from "react";
import { IoMdStar } from "react-icons/io";
import styles from "./commentForm.module.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import api from "@/services/apiService"

const CommentForm = ({ productID, userID }) => {
  console.log(userID);
  
  const [score, setScore ] = useState(5)

  const { register, handleSubmit, reset, formState: { errors }  } = useForm({
    defaultValues: {
      username: "",
      body: "",
      email: "",
    }
  })

  const onSubmitForm = async (data) => {
    console.log(data)
    const { username , body , email } = data 

    const newCM = {
      username,
      body,
      email,
      score,
      productID: productID,
      user: userID,
    }

    const res = await api.post('/comments' , newCM )

    console.log(res)
    if(res.status === 201 ) {
      Swal.fire({
        title: "نظر با موفقیت ساخته شد"
      })
      reset()
    }
  }


  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
      <p className={styles.title}>دیدگاه خود را بنویسید</p>
      <p>
        نشانی ایمیل شما منتشر نخواهد شد. بخش‌های موردنیاز علامت‌گذاری شده‌اند{" "}
        <span style={{ color: "red" }}>*</span>
      </p>
      
      <div className={styles.rate}>
        <p>امتیاز شما : { score }</p>
        <div>
          <IoMdStar onClick={() => setScore(5)}/>
          <IoMdStar onClick={() => setScore(4)}/>
          <IoMdStar onClick={() => setScore(3)}/>
          <IoMdStar onClick={() => setScore(2)}/>
          <IoMdStar onClick={() => setScore(1)}/>
        </div>
      </div>

      <div className={styles.group}>
        <label htmlFor="">
          دیدگاه شما
          <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          id="comment"
          name="comment"
          cols="45"
          rows="8"
          required=""
          placeholder=""
          {...register('body', {required: "لطفا دیدگاه خود را وارد نمایید"})}
        ></textarea>
        { errors.body && <p className="error_msg">{errors.body.message}</p>}
      </div>

      <div className={styles.groups}>
        <div className={styles.group}>
          <label htmlFor="">
            نام
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="text" {...register('username', { required: "لطفا نام کاربری خود را وارد کنید" })} />
          { errors.username && <p className="error_msg">{errors.username.message}</p>}
        </div>
        <div className={styles.group}>
          <label htmlFor="">
            ایمیل
            <span style={{ color: "red" }}>*</span>
          </label>
          <input type="email" {...register('email' , { 
            required: 'لطفا ایمیل خود را وارد کنید', 
            pattern : {
              value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g ,
              message: "ایمیل نامعتبر می‌باشد"
            } 
                })} />

            { errors.email && <p className="error_msg">{errors.email.message}</p>}
        </div>
      </div>

      <div className={styles.checkbox}>
        <input type="checkbox" name="" id="" />
        <p>
          {" "}
          ذخیره نام، ایمیل و وبسایت من در مرورگر برای زمانی که دوباره دیدگاهی
          می‌نویسم.
        </p>
      </div>
      <button type="submit">ثبت</button>
    </form>
  );
};

export default CommentForm;
