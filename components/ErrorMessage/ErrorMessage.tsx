import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
    return (
        <p className={css.text}>
            Sorry, there was an error, please try again...
        </p>
    );
}
