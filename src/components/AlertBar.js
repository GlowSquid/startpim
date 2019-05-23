import Link from "next/link";

const AlertBar = () => {
  return (
    <div className="dev-bar">
      <p>
        <Link href="/">
          <a>Landing</a>
        </Link>
      </p>
      <p>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </p>
      <p>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </p>
    </div>
  );
};

export default AlertBar;
