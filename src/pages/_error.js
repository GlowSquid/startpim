import Link from "next/link";
import Layout from "../components/Layout";

const Error = () => {
  return (
    <Layout>
      <div className="page">
        <h1 className="bumper">404 - Page Not Found</h1>
        <p>
          Try going back to the{" "}
          <Link href="/">
            <a>main page</a>
          </Link>{" "}
          and let's forget about this.
        </p>
      </div>
    </Layout>
  );
};

export default Error;
