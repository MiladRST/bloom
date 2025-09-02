import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import Swal from "sweetalert2";

const Register = ({ showloginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);

  const hideOtpForm = () => setIsRegisterWithOtp(false);

  const [name , setName] = useState("")
  const [phone , setPhone] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const signup = async () => {
    console.log('sign up')
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
    
    const data = await res.json()
    console.log(res)
    console.log(data)

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
          <div className={styles.form}>
            <input className={styles.input} type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="نام" />
            <input
              className={styles.input}
              value={phone}
              onChange={ e => setPhone(e.target.value)}

              type="text"
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              value={email}
              onChange={ e => setEmail(e.target.value)}
              type="email"
              placeholder="ایمیل (دلخواه)"
            />

            {isRegisterWithPass && (
              <input
                className={styles.input}
                value={password}
                onChange={ e => setPassword(e.target.value)}
                type="password"
                placeholder="رمز عبور"
              />
            )}

            <p
              style={{ marginTop: "1rem" }}
              className={styles.btn}
              onClick={() => setIsRegisterWithOtp(true)}
            >
              ثبت نام با کد تایید
            </p>

            <button
              style={{ marginTop: ".7rem" }}
              onClick={() => {
                if(isRegisterWithPass) {
                  signup()
                }else {
                  setIsRegisterWithPass(true)
                }
              }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showloginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;
