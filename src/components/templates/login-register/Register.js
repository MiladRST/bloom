import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import Swal from "sweetalert2";

//react-hook-form
import { useForm } from "react-hook-form";

const Register = ({ showloginForm }) => {

  const { register,handleSubmit , formState:{ errors } } = useForm({
    defaultValues : {
      name: "",
      phone: "",
      email: "",
      password: ""
    }
   })

  // const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const hideOtpForm = () => setIsRegisterWithOtp(false);



  const signup = async (data) => {
    
    console.log(data)

    const { name, phone, email, password } = data 

    const user = {
      name,
      phone,
      email,
      password
    }

    const res = await fetch('/api/auth/signup' , {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(user)
    })    

    console.log(res)

    if(res.status === 201) {
      Swal.fire({
        title: "کاربر با موفقیت ثبت نام شد!",
        icon: "success"
      })
    }

  }

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <form className={styles.form} onSubmit={handleSubmit(signup)}>

            <input 
            {...register('name' , { required: "وارد کردن نام اجباری است" } )} 
            className={styles.input} 
            type="text" 
            placeholder="نام *" />
            { errors.name && <p className={styles.error_msg}>{errors.name.message}</p>}

            <input
              {...register('phone' , { required: "وارد کردن شماره تماس الزامی است" })}
              className={styles.input}
              type="text"
              placeholder="شماره موبایل * "
            />
            { errors.phone && <p className={styles.error_msg}>{errors.phone.message}</p>}


            <input
              className={styles.input}
              {...register('email' , { 
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
                  message: "ایمیل نامعتبر می باشد!"
                }
              })}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />


             <input
                {...register('password')}
                className={styles.input}
                type="password"
                placeholder="رمز عبور"
              />

            <p
              style={{ marginTop: "1rem" }}
              className={styles.btn}
              onClick={() => setIsRegisterWithOtp(true)}
            >
              ثبت نام با کد تایید
            </p>

            <button
              style={{ marginTop: ".7rem" }}
              className={styles.btn}
              type="submit"
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showloginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </form>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;
