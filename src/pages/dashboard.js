import Layout from "../components/Layout";
import Link from "next/link";

export default function start() {
  return (
    <Layout>
      <h1 className="bump">Account Dashboard</h1>
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
    </Layout>
  );
}
