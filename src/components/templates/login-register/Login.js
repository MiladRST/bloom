import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";

import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { redirect } from "next/navigation";
//
import api from "@/services/apiService";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);

  const hideOtpForm = () => setIsLoginWithOtp(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data) => {
    console.log('login form submitted')

    console.log(data);

    const res = await api.post('/auth/signin' , data)

    console.log(res)
    
    if(res.status === 200 ) {
      console.log('xxxx');
      
      Swal.fire({
        title: "ورود با موفقیت انجام شد!",
        icon: "success"
      }).then(() => {
        redirect('/')
      })
    }

  }

  return (
    <>
      {!isLoginWithOtp ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form}>
            <input
              {...register('email' , { 
                required: "وارد کردن ایمیل الزامی است" , 
                pattern : {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g ,
                  message: "ایمیل نامعتبر می‌باشد"
                }
               })}
              className={styles.input}
              type="text"
              placeholder="ایمیل *"
            />
            { errors.email && <p className="error_msg">{errors.email.message}</p>}
            
            <input
              {...register('password' , { required: "وارد کردن رمز عبور الزامی است"})}
              className={styles.input}
              type="password"
              placeholder="رمز عبور *"
            />
            { errors.password && <p className="error_msg">{errors.password.message}</p>}

            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button className={styles.btn}>ورود</button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              onClick={() => setIsLoginWithOtp(true)}
              className={styles.btn}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button onClick={showRegisterForm} className={styles.btn_light}>
              ثبت نام
            </button>
          </div>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </form>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
