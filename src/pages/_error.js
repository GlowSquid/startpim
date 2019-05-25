import Link from "next/link";
import Layout from "../components/Layout";

const Error = () => {
  return (
    <Layout>
      <h1 className="bumper">404 - Page Not Found</h1>
      <p>
        Try going back to the{" "}
        <Link href="/">
          <a>main page</a>
        </Link>{" "}
        and let's forget about this.
      </p>
    </Layout>
  );
};

export default Error;
