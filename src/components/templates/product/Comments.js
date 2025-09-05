import Comment from "@/components/modules/comment/Comment";
import styles from "./comments.module.css";
import CommentForm from "./CommentForm";

const Comments = ({name, comments}) => {
  return (
    <div>
      <p>نظرات ({comments.length}) :</p>
      <hr />

      <main className={styles.comments}>
        <div className={styles.user_comments}>
          <p className={styles.title}>
            {name}
          </p>
          <div>
            {
              comments.map( comment => <Comment key={comment._id} {...comment} />)
            }

          </div>
        </div>
        <div className={styles.form_bg}>
          <CommentForm />
        </div>
      </main>
    </div>
  );
};

export default Comments;
